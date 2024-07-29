/* ----- createSlice():
 - automatically creates action creators from the reducers
 - makes writing these reducers a lot easier (no switch statement/default case)
 - syntax is like the state is mutated (behind the scene 'Immer' converts it to pure code )
*/

import { createSlice } from "@reduxjs/toolkit";

// creating inital state
const initalStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

// createSlice accepts an object of options:
// - name of the slice
// - initialState
// - reducers (object) -> one reducer for each action

const accountSlice = createSlice({
  name: `account`,
  initialState: initalStateAccount,
  reducers: {
    // each reducer recives current state and action
    // same as writing case "account/deposit"
    deposit(state, action) {
      // writing mutating logic
      state.balance += action.payload;
      state.isLoading = false;
    },

    withdraw(state, action) {
      state.balance -= action.payload;
    },

    // by default the action creators of RTK accepts only one argument,
    // so or pass-in a precreated object with different key-parameters
    // or use the prepare() method
    // so the action function becomes an object,
    // the logic (function itself) is called 'reducer'
    // and before the reducer function the data is prepared
    // prepare() can accept multiple arguments
    // prepare() should return an object which becomes 'payload' in the reducer

    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        // use just 'return' not 'return state' like in old way (since its mutating logic)
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },

    payLoan(state, action) {
      // NOTE: since it's a function and not object careful on the sequence
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },

    convertinCurrency(state) {
      state.isLoading = true;
    },
  },
});

// console.log(accountSlice);
// OUTPUT:
// { name: "account",
//     reducer: reducer(state, action),
//     actions: {…}, caseReducers: {…},
//     getInitialState: getInitialState(),
//     reducerPath: "account", getSelectors:
//     getSelectors(selectState), selectors: {},
//     selectSlice: selectSlice(state),
//     injectInto: injectInto(injectable)
// }

// named export for action functions (destructure and immediatly extract)
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// this work out of the box

// Action Creator Function for Account deposit
// (!) REMOVE the deposit from above and export this one
export function deposit(amount, currency) {
  // possible currencies for this example: USD, EUR, GBP

  // if currency is USD, we don't need to convert anything, so we're not using middleware
  if (currency === "USD")
    return {
      // (!) IMPORTANT to mantain the [name]/[action name] convention
      type: "account/deposit",
      payload: amount,
    };

  return async function (dispatch, getState) {
    // this dispatch only activate the loadig state (just for UI)
    dispatch({
      type: "account/convertinCurrency",
    });

    // making simple API call using frankfurter API
    // https://www.frankfurter.app/docs/
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await response.json();
    // converted value in USD
    const converted = data.rates.USD;

    // finally dispatch action again after dealing operation
    dispatch({
      type: "account/deposit",
      payload: converted,
    });
  };
}

// default export for reducer
export default accountSlice.reducer;

/* ===== OLD WAY BELOW =====

export default function AccountReducer(state = initalStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };

    case "account/convertinCurrency":
      return {
        ...state,
        isLoading: true,
      };

    default:
      // in useReduce in default you usually throw a new Error
      // but in Redux in default you usually should return original state
      return state;
  }
}

// ------ ACTION CREATORS -----
// they're just helper functions, that return actions, it's a convenition, not redux thing

// Action Creator Function for Account deposit
export function deposit(amount, currency) {
  // possible currencies for this example: USD, EUR, GBP

  // if currency is USD, we don't need to convert anything, so we're not using middleware
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
    };

  // return a function to
  // when Redux sees that you return a function its know this is the thunk
  // so before dispatch action to the store it executes this function
  // this function has access to 'dispatch' function and the 'getState' (currentState)
  // since we're doing a fetch request it's an async function
  return async function (dispatch, getState) {
    // this dispatch only activate the loadig state (just for UI)
    dispatch({
      type: "account/convertinCurrency",
    });

    // making simple API call using frankfurter API
    // https://www.frankfurter.app/docs/
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await response.json();
    // converted value in USD
    const converted = data.rates.USD;

    // finally dispatch action again after dealing operation
    dispatch({
      type: "account/deposit",
      payload: converted,
    });
  };
}

export function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}

export function requestLoan(amount, purposeStr) {
  return {
    type: "account/requestLoan",
    payload: {
      amount: amount,
      purpose: purposeStr,
    },
  };
}

export function payLoan() {
  return {
    type: "account/payLoan",
  };
}
*/
