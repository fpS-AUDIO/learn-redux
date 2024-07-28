// creating inital state
const initalStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

// define reducer function like in 'useReducer' hook
// REMEMBER:
// - reducers are not allowed to modify the existing state
// - reducers are not allowed to do any asynchronous logic
// usually in Redux the initial state is passed as default parameter inside the reducer
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
