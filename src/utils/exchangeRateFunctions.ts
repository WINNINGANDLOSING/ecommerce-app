import {setValue} from '../redux/slices/exchangeRateSlice';
import {AppDispatch} from '../redux/store';

export const getExchangeRate = async (dispatch: AppDispatch) => {
  try {
    const res = await fetch(
      'https://hexarate.paikama.co/api/rates/latest/USD?target=VND',
    );
    const data = await res.json();
    dispatch(setValue(data.data.mid));
  } catch (err) {
    console.log('Failed to fetch exchange rate:', err);
  }
};
