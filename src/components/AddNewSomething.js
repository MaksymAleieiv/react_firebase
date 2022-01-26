import React from "react";

function AddNewSomething({ func, otherFuncOptions, btnText }) {
  const [newSomething, setNewSomething] = React.useState("");
  return (
    <div>
      <button
        onClick={() => {
          func(newSomething, ...otherFuncOptions);
          setNewSomething("");
        }}
      >
        {btnText}
      </button>
      <input
        value={newSomething}
        onChange={(e) => setNewSomething(e.target.value)}
      ></input>
    </div>
  );
}

export default AddNewSomething;
