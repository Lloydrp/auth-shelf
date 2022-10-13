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
  // query to get the user id of the item to be deleted.
  const queryText2 = `SELECT "user_id" FROM "item" WHERE "id"=$1;`;
  pool.query(queryText2, [itemid])
  .then(response => {

    // console.log(response.rows[0].user_id);
    // store the selected item's user id into a variable for the check.
    const itemUserId = response.rows[0].user_id;
    // check if the item's user_id is the same as the logged in user's id.
    if(itemUserId === req.user.id) {
      // if id's match then user is authorized to delete that item.
      // res.status(200).send('You are authorized ;)');
      const queryText = `DELETE FROM "item"
      WHERE "id"=$1 AND "user_id"=$2;`;

      pool.query(queryText, [itemid, req.user.id])
      .then(() => {
        res.status(200);
      })
      .catch(err => {
        // ERROR for nested query / delete query.
        console.log(`Error deleting item with id:${itemid}`, err);
        res.sendStatus(500);
      });
    } else {
      // If the id's do not match notify the system that the user is unauthorized.
      res.status(401).send('You are unauthorized :(');
    }
  })
  .catch(err => {
    // ERROR for query to get item's user id.
    console.log('error getting user id of the item to be deleted', err);
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
