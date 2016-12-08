import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import ItemTypes from './ItemTypes'
import { DragSource, DropTarget } from 'react-dnd'
import flow from 'lodash/flow'



const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index


    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()


    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2


    const clientOffset = monitor.getClientOffset()


    const hoverClientY = clientOffset.y - hoverBoundingRect.top


    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }


    props.moveCard(dragIndex, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  }
}

const Proptypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
  moveCard: PropTypes.func.isRequired
}




class Card extends Component {


  render() {

    const { text, isDragging, connectDragSource, connectDropTarget, index } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <li style={{ opacity }} className={'element-' + index} >
        {text}
      </li>
    ))
  }
}

Card.propTypes = Proptypes

export default flow(
  DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Card)
