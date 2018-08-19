import React from 'react'
import { shallow } from 'enzyme'
import Button from './Button'

describe('<Button />', () => {
  const wrapper = shallow(<Button />)
  it('should render a button element', () => {
    expect(wrapper.find('button[type="button"]').exists()).toBeTruthy()
    expect(wrapper.prop('isHidden')).toBeFalsy()
  })
  it('matches the snapshot', () => {
    const tree = shallow(<Button />)
    expect(tree).toMatchSnapshot()
  })
})
