import * as React from 'react';
import renderer from 'react-test-renderer';

import  CreateClient  from '../../screens/CreateClient';

it(`renders correctly`, () => {
  const tree = renderer.create(<CreateClient />).toJSON();

  expect(tree).toMatchSnapshot();
});

