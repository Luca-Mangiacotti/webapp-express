//connettiamo il database
const connection = require("../data/db");

//INDEX
const index = (req, res) => {
  const sql = "SELECT * FROM movies";

  //mandiamo la query
  connection.execute(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: `Database query failed: ${sql}`,
      });
    }

    res.json(results);
  });
};
module.exports = { index };
