import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ShelfPage() {
  const dispatch = useDispatch();
  const shelfContents = useSelector((store) => store.shelf);
  console.log("shelfContents :>> ", shelfContents);

  useEffect(() => {
    dispatch({ type: "SET_SHELF_LIST" });
  }, []);

  return (
    <div className="container">
      <h2>Shelf</h2>
      {shelfContents.map((item, index) => (
        <li key={index}>
          <img src={item.image_url} />
          <br />
          {item.description} posted by {item.user_id}
        </li>
      ))}
    </div>
  );
}

export default ShelfPage;
