import {useContext} from 'react';
import {CategoryType, Product} from '../types';
import {FirestoreContext} from '../firestore/FirestoreContext';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {setCategory} from '../redux/slices/categoriesSlice';

export const fetchCategories = async (dispatch: AppDispatch) => {
  const response = await fetch('https://dummyjson.com/products/categories/');
  if (response) {
    const data = (await response.json()) as CategoryType[];
    dispatch(setCategory(data));
  } else {
    console.log('cannot fetch categories');
  }
  return response;
};
