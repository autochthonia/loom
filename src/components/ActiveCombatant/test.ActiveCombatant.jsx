import React from 'react'
import { shallow } from 'enzyme'

import ActiveCombatant from './ActiveCombatant'

describe('ActiveCombatant', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<ActiveCombatant {...props} />)
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})