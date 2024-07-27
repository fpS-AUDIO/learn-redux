import { combineReducers, createStore } from "redux";
import AccountReducer from "./features/accounts/accountSlice";
import CustomerReducer from "./features/customers/customerSlice";

// ------ ROOT REDUCER -----

// since you have 2 reducers you need to do is to combine all the
// reducers that you have in order to create one root reducer
// combineReducers accepts object where key is a meaningful name
const rootReducer = combineReducers({
  account: AccountReducer,
  customer: CustomerReducer,
});

const store = createStore(rootReducer);
export default store;
