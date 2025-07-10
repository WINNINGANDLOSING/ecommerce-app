/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
// /** @type {import('tailwindcss').Config} */
// const {browserPopupRedirectResolver} = require('firebase/auth');
// const plugin = require('tailwindcss/plugin');

// module.exports = {
//   // NOTE: Update this to include the paths to all of your component files.
//   content: [
//     // './App.{js,jsx,ts,tsx}',
//     './App.{js,jsx,ts,tsx}',
//     './app/**/*.{js,jsx,ts,tsx}',
//     './src/**/*.{js,jsx,ts,tsx}',
//     './src/components/**/*.{js,jsx,ts,tsx}',
//   ],
//   presets: [require('nativewind/preset')],
//   theme: {
//     extend: {
//       // backgroundColor: {
//       //   'custom-blue': '#325d88',
//       // },
//       colors: {
//         primary: '#B388FF',
//         accent: '#82B1FF',
//         // 'text-accent': '#82B1FF',
//         // 'bg-light': '#f5f5f5',
//         // 'text-main': '#333333',
//         // 'text-muted': '#666666',
//       },
//       textColor: {
//         primary: '#292929',
//         accent: '#82B1FF',
//         disabled: '#cccccc', // those can be used in tailwind utility classes, like className='bg-accent', but to use custom css classes in react native, read "readme"
//       },
//       fontSize: {
//         sm: '14px',
//         base: '16px',
//         lg: '18px',
//         xl: '24px',
//       },
//       borderRadius: {
//         sm: '8px',
//         md: '12px',
//         lg: '20px',
//       },
//       spacing: {
//         xs: '4px',
//         sm: '8px',
//         md: '16px',
//         lg: '24px',
//       },
//       boxShadow: {
//         light: '0 1px 3px rgba(0, 0, 0, 0.05)',
//       },
//     },
//   },
//   // with tailwind plugins, we can do scss-like styling here (nested css)
//   // maybe instead of setting the overall theme in forms.scss,
//   plugins: [
//     // plugin(function ({addComponents}) {
//     //   const generalBar = {
//     //     paddingTop: 20,
//     //     paddingBottom: 20,
//     //     backgroundColor: '#f3f4f6',
//     //     borderRadius: 12,
//     //     paddingLeft: 10,
//     //     width: '100%',
//     //   };
//     //   const iconCircle = {
//     //     borderRadius: '9999px',
//     //     alignItems: 'center',
//     //     justifyContent: 'center',
//     //     width: 55,
//     //     height: 55,
//     //     backgroundColor: '#e5e7eb',
//     //   };
//     //   const view = {
//     //     backgroundColor: 'white',
//     //     display: 'flex',
//     //     flexDirection: 'column',
//     //     paddingBottom: 15,
//     //     paddingLeft: 15,
//     //     paddingRight: 15,
//     //     paddingTop: 15,
//     //     gap: 20,
//     //   };
//     //   // const button = {
//     //   //   // flex  rounded-3xl mb-5 justify-center items-center px-3 py-3
//     //   //   display: flex,
//     //   //   borderRadius: '20px',
//     //   //   alignItems: 'center',
//     //   //   justifyContent: 'center',
//     //   //   paddingLeft: 12,
//     //   //   paddingRight: 12,
//     //   //   paddingTop: 12,
//     //   //   paddingBottom: 12,
//     //   // };
//     //   addComponents({
//     //     '.text-primary': {
//     //       color: '#383838',
//     //       fontSize: '18px',
//     //     },
//     //     '.text-muted': {
//     //       color: '#666666',
//     //     },
//     //     '.text-disabled': {
//     //       color: '#cccccc',
//     //     },
//     //     '.text-accent': {
//     //       color: '#ffc107',
//     //     },
//     //     '.header-view': {
//     //       ...view,
//     //     },
//     //     '.offer-view': {
//     //       ...view,
//     //       borderBottomRightRadius: 24,
//     //       borderBottomLeftRadius: 24,
//     //       marginBottom: 20,
//     //     },
//     //     '.general-view': {
//     //       ...view,
//     //       borderTopRightRadius: 24,
//     //       borderTopLeftRadius: 24,
//     //       borderBottomRightRadius: 24,
//     //       borderBottomLeftRadius: 24,
//     //       marginBottom: 20,
//     //     },
//     //     '.product-card': {
//     //       ...view,
//     //       borderRadius: 16,
//     //       width: '49%',
//     //       marginBottom: 16,
//     //       paddingBottom: 8,
//     //     },
//     //     '.circle-gray': {
//     //       ...iconCircle,
//     //     },
//     //     '.see-all-circle': {
//     //       ...iconCircle,
//     //       width: 20,
//     //       height: 20,
//     //       display: 'flex',
//     //       alignItems: 'center',
//     //       justifyContent: 'center',
//     //     },
//     //     '.category-circle': {
//     //       ...iconCircle,
//     //       width: 80,
//     //       height: 80,
//     //     },
//     //     '.general-bar': {
//     //       ...generalBar,
//     //     },
//     //     '.search-bar': {
//     //       ...generalBar,
//     //       display: 'flex',
//     //       paddingTop: 10,
//     //       paddingBottom: 10,
//     //       flexDirection: 'row',
//     //       alignItems: 'center',
//     //       justifyContent: 'space-between',
//     //     },
//     //     '.offer-bar': {
//     //       ...generalBar,
//     //       paddingTop: 10,
//     //       paddingBottom: 10,
//     //       paddingLeft: 10,
//     //       paddingRight: 10,
//     //       flexDirection: 'row',
//     //       height: 170,
//     //     },
//     //     // flex  rounded-3xl mb-5 justify-center items-center px-3 py-3
//     //     // '.btn-main': {
//     //     //   ...button,
//     //     //   backgroundColor: 'yellow',
//     //     // },
//     //     '.title': {
//     //       fontSize: 24,
//     //       fontWeight: 'bold',
//     //       color: '#333333',
//     //     },
//     //     '.subtitle': {
//     //       fontSize: 18,
//     //       color: '#666666',
//     //     },
//     //     '.badge-success': {
//     //       backgroundColor: '#4CAF50',
//     //       color: '#fff',
//     //       paddingVertical: 2,
//     //       paddingHorizontal: 6,
//     //       borderRadius: 8,
//     //       fontSize: 14,
//     //     },
//     //     '.badge-error': {
//     //       backgroundColor: '#FF3B30',
//     //       color: '#fff',
//     //       paddingVertical: 2,
//     //       paddingHorizontal: 6,
//     //       borderRadius: 8,
//     //       fontSize: 14,
//     //     },
//     //     /*  use this later
//     //     '.card': {
//     //       backgroundColor: '#ffffff',
//     //       padding: 16,
//     //       marginBottom: 16,
//     //       borderRadius: 12,
//     //       shadowColor: '#000',
//     //       shadowOpacity: 0.05,
//     //       shadowRadius: 8,
//     //       elevation: 1,
//     //     },
//     //     */
//     //     '.card': {
//     //       backgroundColor: 'blue',
//     //       borderRadius: 30,
//     //       width: 96, // = 6rem x 16px
//     //       height: 96,
//     //       padding: 16,
//     //       '&-title': {
//     //         fontWeight: 800,
//     //         color: 'pink',
//     //       },
//     //     },
//     //     // '&-title': {
//     //     //   fontWeight: bold,
//     //     //   color: 'pink',
//     //     // },
//     //   });
//     // }),
//     // plugin(function ({addBase}) {
//     //   addBase({
//     //     TouchableOpacity: {
//     //       width: 96, // = 6rem x 16px
//     //       height: 96,
//     //       backgroundColor: 'gray',
//     //     },
//     //   });
//     // }),
//   ],
// };
