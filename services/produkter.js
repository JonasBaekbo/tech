const database = require('../config/mysql').connect();
database.connect((err) => {
    if (err) {
        console.log(Date(), err.stack);
        return;
    }
});


module.exports = {

    'getAll': (next) => {
        let query = `SELECT produkter.*, kategori.kategori, producent.producent FROM(( produkter INNER JOIN kategori ON fk_kategori_id = kategori.ID) INNER JOIN producent ON fk_producent = producent.ID)`;

        database.query(query, (err, results) => {
            if (err) {
                next(err);
            } else {
                next(null, results);
            }
        });
    },

    'getOne': (varenr, next) => {
        let query = `SELECT produkter.*, kategori.kategori, producent.producent FROM(( produkter INNER JOIN kategori ON fk_kategori_id = kategori.ID) INNER JOIN producent ON fk_producent = producent.ID) where produkter.id = ${varenr}`;

        database.query(query, (err, results) => {
            if (err) {
                next(err);
            } else {
                next(null, results);
            }
        });
    },

    'deleteById': (id, next) => {
        let query = `DELETE FROM produkter WHERE id = ?`;

        database.query(query, [id], (err, results) => {
            if (err) {
                next(err);
            } else {
                next(null, results);
            }
        });
    },
    'kategori': (next) => {
        let query = `SELECT kategori.* FROM kategori`;

        database.query(query, (err, results) => {
            if (err) {
                next(err);
            } else {
                next(null, results);
            }
        });
    },
    'producent': (next) => {
        let query = `SELECT * FROM producent`;

        database.query(query, (err, results) => {
            if (err) {
                next(err);
            } else {
                next(null, results);
            }
        });
    }
}