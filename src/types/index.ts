import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  FirebaseFirestoreTypes,
  Timestamp,
} from '@react-native-firebase/firestore';

export type ProductCardProps = {
  item: Product;
  languagePref: string;
};

// export type UserInfo = {
//   avatarUrl
//   bio: string;
//   birthday: Date;
//   gender: 'Male' | 'Female';
//   languagePreference: 'English' | 'Vietnamese';
//   phoneNumber: number;
//   creationDate: Date;
//   email: string;

// }; // database section of firebase (firestore)
export type UserProfile = {
  displayName?: string;
  email?: string;
  photoURL?: string;
};
export type UserInfo = {
  uid: string;
  name: string;
  //email: string;
  //avatarUrl: string;
  bio: string;
  birthday: Timestamp | {seconds: number; nanoseconds: number} | string;
  createdAt: Timestamp | Date | string;
  gender: 'Male' | 'Female' | 'Other' | string;
  phoneNumber: string;
  languagePreference: 'Vietnamese' | 'English';
  role: 'user' | 'admin' | 'moderator' | string;
  shippingAddress: ShippingAddressType[];
};

export type CreateUserAccountFirestore = {
  avatarPhoto: avatarType | null;
  email: string;
  username: string;
  pass: string;
};
export type AppLanguage = {
  languages: 'English' | 'Vietnamese';
};

export type updatedUserInfo = {
  name?: string;
  bio?: string;
  birthday?: Date;
  gender: string;
  phoneNumber?: number;
};
export type avatarType = {
  uri: string;
  type: string;
  name: string;
};

export type registerInputType = {
  username?: string;
  email?: string;
  password?: string;
  avatarPhoto?: string;
};
export type LoginIputType = {
  email?: string;
  password?: string;
};
export type NewAddressInputType = {
  name?: string;
  phoneNum?: string;
  detailInfo?: string;
};
export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
};

export type ProductType = {
  product: Product;
};

export type CategoryType = {
  id: number;
  name: string;
  url: string;
  slug: string;
};

export type ProductModalType = {
  product: Product;

  setIsShownPage: React.Dispatch<React.SetStateAction<boolean>>;
};
//The object inside { ... } is a single cart item (with productId, quantity, and the full product).
// The [] after it means: an array of such items.
export type ItemType = {
  productId: number;
  quantity: number;
  product: Product;
};

export type AddToCartType = {
  userId: string;
  items: {[brand: string]: ItemType[]};
  creationDate: Date | string;
  updatedAt: Date | string;
};

export type AddToCartItem = {
  cartItem: AddToCartType;
};

export type SelectedItemsType = {
  isSelected: boolean;
  price: number;
};
export type ShippingAddressType = {
  id: string;
  receiverName: string;
  phoneNumber: string;
  address: string;
  type: 'Home' | 'Workplace' | '';
  isDefault: boolean;
};

// without the userId
// A single order
// in brandOrders
// that contains multiple brand orders, each brand orders is a collection of order items belong to that brand

export type OrderType = {
  orderId: string;
  userId: string;
  status: string;
  shippingAddress?: ShippingAddressType;
  paymentMethod: string;
  createdAt: Date | string | Timestamp;
  updatedAt: Date | string | Timestamp;
  sumCost: number;
  brandOrders: BrandOrderType[];
};

// brand orders
// each order (of type SingleOrderType) is grouped by brand
// brand: Apple: {orderItem1, orderItem2}, all of the orderItems must belong to the same brand

export type BrandOrderType = {
  brand: string;
  orders: SingleOrderType[];
  brandShippingPrice: number;
  brandProductsPrice: number;
  brandSumPrice: number;
  shippingMethod: string;
};
// orderItem
export type SingleOrderType = {
  brand: string;
  createdAt: Timestamp | Date | string;
  updatedAt: Timestamp | Date | string;
  quantity: number;
  productId: number;
  product: Product;
  singleOrderProductPrice: number;
  status: 'pending' | 'processing' | 'in_delivery' | 'cancelled' | 'completed';
};

export type CurrentUserType = {
  userAuthData: FirebaseAuthTypes.User;
  userProfileData: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;
};

export type NotificationType = {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'order_update' | 'promotion' | 'reminder';
  metadata?: {
    brandOrder: BrandOrderType;
    orderId?: string;
    brand?: string;
    status?:
      | 'pending'
      | 'processing'
      | 'in_delivery'
      | 'cancelled'
      | 'completed';
    createdAt: Timestamp | Date | string;
    paymentMethod: string;
    shippingAddress: ShippingAddressType;
  };
  read: boolean;
  createdAt: Timestamp | Date | string;
};

export type AdditionalOrderInfoType = {
  paymentMethod: string;
  orderId: string;
  shippingAddress: ShippingAddressType;
  createdAt: Timestamp | Date | string;
};
