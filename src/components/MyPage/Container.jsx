import React, { Component } from 'react'
import update from 'react/lib/update'
import Card from './Card'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'



class Container extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cards:props.cards
    }


    this.moveCard   = this.moveCard.bind(this)
  }


  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state
    const dragCard = cards[dragIndex]

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      }
    }))
  }


  render() {
    const { cards } = this.state

    return (
      <ul className="organizer__priorityList">
        {cards.map((card, i) => {
          return (
            <Card
                key={card.id}
                index={i}
              
                id={card.id}
                text={card.text}
                moveCard={this.moveCard} />
          )
        })}
      </ul>
    )

  }
}

export default DragDropContext(HTML5Backend)(Container)
