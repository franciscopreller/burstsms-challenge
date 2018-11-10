import React from 'react';
import { shallow } from 'enzyme';

import Header from '../index';

// Override window.open
window.open = () => {};

describe('<Header />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(<Header />);
    expect(renderedComponent.length).toEqual(1);
  });
});
