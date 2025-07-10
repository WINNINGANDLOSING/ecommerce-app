const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withNativeWind} = require('nativewind/metro');

const config = mergeConfig(getDefaultConfig(__dirname), {
  /* your config */
});

module.exports = withNativeWind(config, {input: './src/global.css'});
// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
// const {withNativeWind} = require('nativewind/metro');
// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('@react-native/metro-config').MetroConfig}
//  */
// // Sync version (no async/await!)
// const defaultConfig = getDefaultConfig(__dirname);

// const config = mergeConfig(defaultConfig, {
//   transformer: {
//     babelTransformerPath: require.resolve('react-native-sass-transformer'),
//   },
//   resolver: {
//     sourceExts: [...defaultConfig.resolver.sourceExts, 'scss', 'sass'],
//   },
// });

// module.exports = withNativeWind(config, {
//   input: './src/global.css',
// });
