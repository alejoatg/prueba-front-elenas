import * as React from 'react';
import renderer from 'react-test-renderer';

import  ListClient  from '../../screens/ListClient';

it(`renders correctly`, () => {
  const tree = renderer.create(<ListClient />).toJSON();

  expect(tree).toMatchSnapshot();
});

