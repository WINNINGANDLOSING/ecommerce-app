import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// ENGLISH
import homeEN from '../locales/en/home.json';
import buttonsEN from '../locales/en/buttons.json';
import settingsEN from '../locales/en/settings.json';
import bottomTabsEN from '../locales/en/bottomTabs.json';
import cartEN from '../locales/en/cart.json';
import categoriesEN from '../locales/en/categories.json';
import errorsEN from '../locales/en/errors.json';
import orderEN from '../locales/en/order.json';
import orderSuccessEN from '../locales/en/orderSuccess.json';
import productCardEN from '../locales/en/productCard.json';
import productDetailEN from '../locales/en/productDetail.json';
import profileEN from '../locales/en/profile.json';
import chooseLanEN from '../locales/en/chooseLan.json';
import searchResultsEN from '../locales/en/searchResults.json';
import userOrdersEN from '../locales/en/userOrder.json';
import addressListEN from '../locales/en/addressList.json';
import orderDetailEN from '../locales/en/orderDetail.json';
import notificationCenterEN from '../locales/en/notificationCenter.json';

// VIETNAMESE
import homeVI from '../locales/vi/home.json';
import buttonsVI from '../locales/vi/buttons.json';
import settingsVI from '../locales/vi/settings.json';
import bottomTabsVI from '../locales/vi/bottomTabs.json';
import cartVI from '../locales/vi/cart.json';
import categoriesVI from '../locales/vi/categories.json';
import errorsVI from '../locales/vi/errors.json';
import orderVI from '../locales/vi/order.json';
import orderSuccessVI from '../locales/vi/orderSuccess.json';
import productCardVI from '../locales/vi/productCard.json';
import productDetailVI from '../locales/vi/productDetail.json';
import profileVI from '../locales/vi/profile.json';
import chooseLanVI from '../locales/vi/chooseLan.json';
import searchResultsVI from '../locales/vi/searchResults.json';
import userOrdersVI from '../locales/vi/userOrder.json';
import addressListVI from '../locales/vi/addressList.json';
import orderDetailVI from '../locales/vi/orderDetail.json';
import notificationCenterVI from '../locales/vi/notificationCenter.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: [
    'home',
    'buttons',
    'settings',
    'bottomTabs',
    'cart',
    'categories',
    'errors',
    'order',
    'orderSuccess',
    'productCard',
    'productDetail',
    'profile',
    'chooseLan',
    'searchResults',
    'userOrder',
    'addressList',
    'orderDetail',
    'notificationCenter',
  ],
  defaultNS: 'home',
  resources: {
    en: {
      home: homeEN,
      buttons: buttonsEN,
      settings: settingsEN,
      bottomTabs: bottomTabsEN,
      cart: cartEN,
      categories: categoriesEN,
      errors: errorsEN,
      order: orderEN,
      orderSuccess: orderSuccessEN,
      productCard: productCardEN,
      productDetail: productDetailEN,
      profile: profileEN,
      chooseLan: chooseLanEN,
      searchResults: searchResultsEN,
      userOrder: userOrdersEN,
      addressList: addressListEN,
      orderDetail: orderDetailEN,
      notificationCenter: notificationCenterEN,
    },
    vi: {
      home: homeVI,
      buttons: buttonsVI,
      settings: settingsVI,
      bottomTabs: bottomTabsVI,
      cart: cartVI,
      categories: categoriesVI,
      errors: errorsVI,
      order: orderVI,
      orderSuccess: orderSuccessVI,
      productCard: productCardVI,
      productDetail: productDetailVI,
      profile: profileVI,
      chooseLan: chooseLanVI,
      searchResults: searchResultsVI,
      userOrder: userOrdersVI,
      addressList: addressListVI,
      orderDetail: orderDetailVI,
      notificationCenter: notificationCenterVI,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
