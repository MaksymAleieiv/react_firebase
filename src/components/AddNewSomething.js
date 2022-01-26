import React from "react";

function AddNewSomething({
  func,
  otherFuncOptions,
  placeholder = "",
  btnText = "Confirm",
  className = "addNewSomething",
}) {
  const [newSomething, setNewSomething] = React.useState("");
  return (
    <div className={className}>
      <input
        placeholder={placeholder}
        value={newSomething}
        onChange={(e) => setNewSomething(e.target.value)}
      ></input>
      <button
        onClick={() => {
          func(newSomething, ...otherFuncOptions);
          setNewSomething("");
        }}
      >
        {btnText}
      </button>
    </div>
  );
}

export default AddNewSomething;
