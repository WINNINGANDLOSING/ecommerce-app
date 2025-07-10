import {Colors} from './colors';

export const Typography = {
  base: {fontSize: 15, color: Colors.text},
  semiBold: {fontSize: 15, fontWeight: '500' as const, color: Colors.text},
  bold: {fontSize: 18, fontWeight: '600' as const, color: Colors.text},
  smallGrey: {fontSize: 13, color: Colors.muted},
  // Product Preview
  itemDiscountPrice: {
    color: Colors.subdued,
    fontSize: 13,
    fontWeight: 'bold' as const,
    textDecorationLine: 'line-through' as const,
  },
  brandTitle: {fontSize: 20, color: Colors.text, fontWeight: 'bold' as const},
  itemTitle: {
    fontSize: 17,
    color: Colors.text,
    fontWeight: 'bold' as const,
  },

  subCostTitle: {
    color: Colors.muted,
    fontSize: 12,
    fontStyle: 'italic' as const,
  },
  itemUserCartPrice: {
    fontSize: 17,
    color: Colors.primary,
    fontWeight: 'bold' as const,
  },

  itemPrice: {
    fontSize: 18,
    color: Colors.highlight,
    fontWeight: 'bold' as const,
  },
};
