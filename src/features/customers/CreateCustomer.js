import { useState } from "react";

// remember to import the `useDispatch` Hook
import { useDispatch } from "react-redux";
// import action creator (helper function) too
import { createCustomer } from "./customerSlice";

function Customer() {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");

  // useDispatch returns dispatch funcion
  const dispatch = useDispatch();

  function handleClick() {
    if (!fullName || !nationalId) return;
    // use disptach in standard way
    dispatch(createCustomer(fullName, nationalId));
    setFullName("");
    setNationalId("");
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default Customer;
