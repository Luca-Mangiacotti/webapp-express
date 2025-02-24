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

//SHOW
const show = (req, res) => {
  //recuperiamo l'id
  const { id } = req.params;

  const movieSql = `
      SELECT * 
      FROM movies
      WHERE id = ?`;

  //mandiamo la query che comprende il parametro [id] per il contenuto richiesto
  connection.execute(movieSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: `Database query failed: ${movieSql}`,
      });
    }

    //salviamo in una variabile il contenuto richiesto
    const movie = results[0];

    if (!movie) {
      return res.status(404).json({
        error: "Not found",
        message: "MOVIE not found",
      });
    }
    res.json(movie);
  });
};

module.exports = { index, show };
