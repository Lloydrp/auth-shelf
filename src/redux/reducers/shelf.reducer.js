const shelf = (state = [], action) => {
  switch (action.type) {
    case "SET_SHELF":
      console.log("In the shelf reducer");
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.shelf
export default shelf;
