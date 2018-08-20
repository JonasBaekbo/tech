const database = require('../config/mysql').connect();


module.exports = function (app) {
	// index page
	app.get('/', function (req, res) {
		database.connect();
		let sql = `SELECT * FROM produkter`;
		database.query(sql, function (err, data) {
			if (err) {
				console.log(err);
			}
			res.render('pages/index', { titel: "Forside", data: data });
		});
	})
	app.get('/om', function (req, res) {
		res.render('pages/om', { titel: "Om Os" })
	})
	app.get('/produkt/:id', function (req, res) {
		database.connect();
		let sql = `SELECT * FROM produkter where ID = ?`;
		database.query(sql, [req.params.id], function (err, data) {
			if (err) {
				console.log(err);
			}
			res.render('pages/produkt', { titel: data[0].navn, data: data[0] });
		});
	})
	app.get('/produkt/soeg/:key', function (req, res) {
		database.connect();
		database.query(`SELECT * from produkter where navn like '%${req.params.key}%'`, function (err, data) {
			if (err) {
				console.log(err);
			}
			res.render('pages/soeg', { titel: 'Søgning', soegning: req.params.key, resultater: data.length, data: data });
		});
	});
};
