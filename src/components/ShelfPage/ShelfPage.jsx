import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddToShelf from "../AddToShelf/AddToShelf";

function ShelfPage() {
  const dispatch = useDispatch();
  const shelfContents = useSelector((store) => store.shelf);
  console.log("shelfContents :>> ", shelfContents);

  useEffect(() => {
    dispatch({ type: "SET_SHELF_LIST" });
  }, []);

  return (
    <div className="container">
      <AddToShelf />
      <h2>Shelf</h2>
      {shelfContents.map((item, index) => (
        <li key={index}>
          <img src={item.image_url} />
          <br />
          {item.description} posted by {item.user_id}
          {/* conditionally render per user */}
          <button onClick={() => dispatch({type: 'DELETE_ITEM', payload: {id: item.id}})}>Delete</button>
        </li>
      ))}
    </div>
  );
}

export default ShelfPage;
