import React from 'react'
import { shallow } from 'enzyme'

import Home from './Home'

describe('Home', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<Home {...props} />)
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})