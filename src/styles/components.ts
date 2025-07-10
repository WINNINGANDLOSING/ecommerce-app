import {StyleSheet} from 'react-native';
import {Colors} from './colors';
//       <View className="flex flex-row items-center bg-white border-b-[1px] border-b-gray-300 pb-4 justify-between  w-full px-3 pt-12">

const bar = {
  paddingTop: 20,
  paddingBottom: 20,
  backgroundColor: '#ebeff5',
  borderRadius: 12,
  paddingLeft: 10,
  width: '100%' as const,
};
const iconCircle = {
  borderRadius: 9999,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,

  backgroundColor: '#e5e7eb',
};

const button = {
  borderRadius: 10,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 12,
  paddingBottom: 12,
};
const view = {
  backgroundColor: 'white',
  flexDirection: 'row' as const,
  paddingBottom: 20,
  paddingLeft: 12,
  paddingRight: 12,
  //width: '100%' as const,
  paddingTop: 48,
  justifyContent: 'space-between' as const,
  gap: 20,
};

export const ComponentStyles = StyleSheet.create({
  homeHeaderView: {
    ...view,
    flexDirection: 'column' as const,

    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
  },

  otherHeaderView: {
    ...view,
    marginBottom: 0,
    alignItems: 'center' as const,
  },

  offerView: {
    ...view,
    paddingTop: 15,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    marginBottom: 20,
  }, //        className=" flex flex-col min-h-[100%]">

  // Product Detail Views
  //         <View className="p-5 bg-white rounded-t-3xl rounded-b-3xl mb-3">

  productDetailView: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    marginTop: 10,
    gap: 7,
    borderBottomRightRadius: 24,
  },
  //       className="flex items-center h-full bg-white  flex-1 flex-col "

  bodyView: {
    alignItems: 'center' as const,
    height: '100%' as const,
    backgroundColor: 'white' as const,
    flexDirection: 'column' as const,
  },

  mainView: {
    ...view,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 15,
    flexDirection: 'column' as const,
  },

  // All kinds of circle
  circleGray: {
    ...iconCircle,
    width: 55,
    height: 55,
  },
  backCircle: {
    ...iconCircle,
    width: 40,
    height: 40,
  },
  iconCircle: {
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 55,
    backgroundColor: '#e5e7eb',
  },

  seeAllCircle: {
    ...iconCircle,
    width: 20,
    height: 20,
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center' as const,
  },

  categoryCircle: {
    ...iconCircle,
    width: 80,
    height: 80,
  },

  // All kinds of bars
  mainBar: {
    ...bar,
  },
  searchBar: {
    ...bar,
    display: 'flex',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  offerBar: {
    ...bar,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    height: 170,
    borderRadius: 20,
  },

  // Product Preview (in Home)
  // productCard: {
  //   ...view,
  //   borderRadius: 16,
  //   width: '49%',
  //   height: '30%',
  //   padding: 2,
  //   marginBottom: 16,
  //   paddingBottom: 8,
  // },

  productCard: {
    borderRadius: 16,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    gap: 10,
    width: '49%',
    backgroundColor: 'white',
    marginBottom: 10,
    marginRight: 10,
  },
  productCardImageSm: {
    width: '100%' as const,
    height: 208,
    borderRadius: 8,
  }, //        className="flex-row items-center gap-1 mt-auto ml-3"

  deliveryDateText: {
    marginTop: 10,

    marginBottom: 1,
    gap: 3,
    flexDirection: 'row' as const,
    alignItems: 'center',
  },
  btnAddToCard: {
    ...button,
    width: '50%',
    backgroundColor: Colors.accent,
  },
  btnBuyNow: {
    ...button,
    width: '50%',

    backgroundColor: Colors.primary,
  },
  btnAddToCartSm: {
    ...button,
    backgroundColor: Colors.accent,
  },
  btnAddToCartSmText: {
    color: 'white',
    fontWeight: 'bold' as const,
  },

  btnClearAll: {
    ...button,
    backgroundColor: Colors.accent,
    marginRight: 15,
    marginLeft: 'auto' as const,
  },
});
