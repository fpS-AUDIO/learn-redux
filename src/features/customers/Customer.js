// 'useSelector' hook is used to read data from Redux Store
import { useSelector } from "react-redux";

function Customer() {
  // useSelector accepts a callback
  // inside the callback there is argument which is the entire Redux Store
  // so you can import whatever you need (use keys provided into rootReducer)
  const customer = useSelector((reduxStore) => reduxStore.customer);
  return <h2>👋 Welcome, {customer.fullName}</h2>;
}

export default Customer;
