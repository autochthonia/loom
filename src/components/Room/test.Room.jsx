import React from 'react'
import { shallow } from 'enzyme'

import Room from './Room'

describe('Room', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<Room {...props} />)
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})