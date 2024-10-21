
// import { configureStore } from "@reduxjs/toolkit";

// import { cryptoApi } from "../services/cryptoApi";

// // export default configureStore({
// //     reducer:{
// //         [cryptoApi.reducerPath]:cryptoApi.reducer,
// //     },
// // })


// export default configureStore({
//     reducer:{
//         [cryptoApi.reducerPath]:cryptoApi.reducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(cryptoApi.middleware),

// })




// src/app/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import { cryptoApi } from '../services/cryptoApi'; // Import your cryptoApi
// import { cryptoNewsApi } from '../services/cryptoNewsApi';

// export const store = configureStore({
//   reducer: {
//     // Add the cryptoApi reducer to the store
//     [cryptoApi.reducerPath]: cryptoApi.reducer,
//     [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
//   },
//   // Add the middleware for caching, invalidation, polling, and other features
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(cryptoApi.middleware),
//   getDefaultMiddleware().concat(cryptoNewsApi.middleware),
// });
import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi'; // Import your cryptoApi
import { cryptoNewsApi } from '../services/cryptoNewsApi';

export const store = configureStore({
  reducer: {
    // Add the cryptoApi reducer to the store
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
  // Add the middleware for caching, invalidation, polling, and other features
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cryptoApi.middleware)
      .concat(cryptoNewsApi.middleware),
});
