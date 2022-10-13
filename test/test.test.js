import { mount } from '@vue/test-utils'
import Notification from '../components/Notification'

describe('Notification', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(Notification)

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<div class=\"Notification__background\"></div>')
  })

  // it's also easy to check for the existence of elements
  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })
})