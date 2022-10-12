const express = require("express");

const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const pool = require("../modules/pool");
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  let queryText = 'SELECT * FROM "item" ORDER by "id";';
  pool
    .query(queryText)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log("error in getting items", error);
      res.sendStatus(500);
    });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  const queryText = `INSERT INTO "item" ("description", "image_url", "user_id")
                   VALUES ($1, $2, $3);`;
  pool.query(queryText, [req.body.description, req.body.image_url, req.user.id])
      .then(result => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('Error in POSTING new item: ', err);
      });
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  const itemid = req.params.id;
  const queryText = `DELETE FROM "item"
  WHERE "id"=$1 AND "user_id"=$2;`;

  pool.query(queryText, [itemid, req.user.id])
  .then(() => {
    res.status(200).send('Item deleted');
  })
  .catch(err => {
    console.log(`Error deleting item with id:${itemid}`, err);
    res.sendStatus(500);
  });
});

/**
 * Update an item if it's something the logged in user added
 */
router.put("/:id", (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get("/count", (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get("/:id", (req, res) => {
  // endpoint functionality
});

module.exports = router;
