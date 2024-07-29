import AccountReducer from "./features/accounts/accountSlice";
import CustomerReducer from "./features/customers/customerSlice";

// import configureStore() instead of deprecated createStore()
import { configureStore } from "@reduxjs/toolkit";

/* ----- configureStore() automatically:
- combine our reducers
- add the Thunk middleware
- set up the developer tools
*/

// configureStore accepta object of options
// 'reducer' is the root reducer
// 'reducer' should be object which tells RTK about the reducers

const store = configureStore({
  reducer: {
    account: AccountReducer,
    customer: CustomerReducer,
  },
});

export default store;
