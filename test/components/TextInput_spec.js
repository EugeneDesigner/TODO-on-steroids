import React from 'react'
import TestUtils from 'react-addons-test-utils'
import TextInput from '../../src/components/TextInput'
import {expect} from 'chai'

const {renderIntoDocument,
        scryRenderedDOMComponentsWithTag,
        Simulate} = TestUtils

describe('TextInput', () => {
  it('calls a callback when pressing enter', () => {
    const text = 'React'
    let hasDoneEditing = false
    const doneEditing = () => hasDoneEditing = true
    const component = renderIntoDocument(
      <TextInput text={text} doneEditing={doneEditing}/>
    )
    const input = component.refs.itemInput
    Simulate.keyDown(input, {key: 'Enter', keyCode: 13, which: 13})

    expect(hasDoneEditing).to.equal(true)
  })

  it('calls a callaback when Escape is pressed', () => {
    const text = 'React'
    let hasCancelledEditing = false
    const cancelEditing = () => hasCancelledEditing = true
    const component = renderIntoDocument(
      <TextInput text={text} cancelEditing={cancelEditing}/>
    )

    const input = component.refs.itemInput
    Simulate.keyDown(input, {key: "Escape", keyCode: 27, which: 27})

    expect(hasCancelledEditing).to.equal(true)
  })
})
