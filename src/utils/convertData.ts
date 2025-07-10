import i18n from '../i18n/i18n';

// export const handleChangeCurrency = async (price: number) => {
//   //return vnd

//   //api.exchangeratesapi.io/v1/latest?access_key=a42bbbfa1b72daee827d5623a41a4e15&format=1
//   const res = await fetch(
//     `https://v6.exchangerate-api.com/v6/b71779aecca981ff94c75d9b/pair/USD/VND/${price}`,
//   );
//   const data = await res.json();
//   const vnd = data.conversion_result;
//   const formattedPrice = vnd.toLocaleString(
//     i18n.language === 'vi' ? 'vi-VN' : 'en-US',
//     {
//       style: 'currency',
//       currency: 'VND',
//     },
//   );
//   return formattedPrice;
// };

export const handleGetOriginalPrice = (
  discountPrice: number,
  discountRate: number,
): string => {
  const originalPrice = discountPrice / (1 - discountRate / 100);
  return Math.round(originalPrice).toLocaleString('vi-VN');
};

export const getFormattedPrice = (
  raw_price: number,
  type: 'discount' | 'original',
  exChangeRate: number,
  discountRate?: number,
  isShownCurrency: boolean = true,
) => {
  let price = exChangeRate * raw_price;
  price = type === 'discount' ? price : price / (1 - discountRate! / 100);

  const formatted = isShownCurrency
    ? Math.round(price).toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
      })
    : Math.round(price).toLocaleString('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
  return formatted;
};
