import { applyMiddleware, combineReducers, createStore } from "redux";
import AccountReducer from "./features/accounts/accountSlice";
import CustomerReducer from "./features/customers/customerSlice";
import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "@redux-devtools/extension/lib/types/logOnly";
import { composeWithDevTools } from "@redux-devtools/extension";

// ------ ROOT REDUCER -----
const rootReducer = combineReducers({
  account: AccountReducer,
  customer: CustomerReducer,
});

// to connect thunk to store you need, insdie the 'createStore' function,
// specify the second argument: 'applyMiddleware' function (remember to import it)
// 'applyMiddleware' accepts the middleware itself, in this case is 'thunk' (remember to import it
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
