// creating inital state
const initalStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
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

    default:
      // in useReduce in default you usually throw a new Error
      // but in Redux in default you usually should return original state
      return state;
  }
}

// ------ ACTION CREATORS -----
// they're just helper functions, that return actions, it's a convenition, not redux thing

// Action Function for Account
export function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
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
