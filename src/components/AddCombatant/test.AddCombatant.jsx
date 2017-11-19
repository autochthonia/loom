import React from 'react'
import { shallow } from 'enzyme'

import AddCombatant from './AddCombatant'

describe('AddCombatant', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<AddCombatant {...props} />)
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})