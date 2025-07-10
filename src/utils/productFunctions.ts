import {setProducts} from '../redux/slices/productsSlice';
import {AppDispatch} from '../redux/store';

export const fetchingProducts = async (dispatch: AppDispatch) => {
  const response = await fetch('https://dummyjson.com/products?limit=0&skip=0');
  if (response) {
    let data = await response.json();
    //console.log(data.products);
    let products = data.products.filter(
      (product: any) => product.brand !== undefined,
    );
    dispatch(setProducts(products));
  }
  return null;
};
