// File: redux/slices/productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  [key: string]: any;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct,
  setLoading,
  setError
} = productSlice.actions;

export default productSlice.reducer;

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Product {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   [key: string]: any;
// }

// interface ProductState {
//   products: Product[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ProductState = {
//   products: [],
//   loading: false,
//   error: null,
// };

// const productSlice = createSlice({
//   name: 'product',
//   initialState,
//   reducers: {
//     setProducts: (state, action: PayloadAction<Product[]>) => {
//       state.products = action.payload;
//     },
//   },
// });

// export const { setProducts } = productSlice.actions;

// export default productSlice.reducer;
