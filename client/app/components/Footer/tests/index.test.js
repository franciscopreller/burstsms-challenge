import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../index';

describe('<Footer />', () => {
  it('should render the copyright notice', () => {
    const renderedComponent = shallow(<Footer />);
    expect(
      renderedComponent.contains(
        <section>Copyright &copy; {new Date().getFullYear()}.</section>
      )
    ).toBe(true);
  });

  it('should render the credits', () => {
    const renderedComponent = shallow(<Footer />);
    expect(renderedComponent.text()).toContain('Francisco Preller');
  });
});
