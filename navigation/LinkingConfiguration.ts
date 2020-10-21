import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          ListClient: {
            screens: {
              ListClient: 'lista',
            },
          },
          CreateClient: {
            screens: {
              CreateClient: 'crear',
            },
          },
         },
      },
      Edit:'edit',
      NotFound: '*',

    },
  },
};
