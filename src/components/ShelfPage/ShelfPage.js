import React from 'react';
import AddToShelf from '../AddToShelf/AddToShelf';

function ShelfPage() {
  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      <AddToShelf />
    </div>
  );
}

export default ShelfPage;
