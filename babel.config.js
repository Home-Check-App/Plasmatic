module.exports = {
  presets: ['module:metro-react-native-babel-preset', ['@babel/preset-typescript', { onlyRemoveTypeImports: true }]],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: 'src',
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    'babel-plugin-parameter-decorator',
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: [
        [
          'babel-plugin-root-import',
          {
            rootPathSuffix: 'src',
          },
        ],
        'react-native-reanimated/plugin',
      ],
    },
  },
};
