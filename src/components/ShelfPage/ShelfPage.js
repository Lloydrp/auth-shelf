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
      <p>All of the available items can be seen here.</p>
    </div>
  );
}

export default ShelfPage;
