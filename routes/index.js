const database = require('../config/mysql').connect();
const service = require('../services/produkter');


module.exports = function (app) {
	// index page
	app.get('/', (req, res) => {
		service.getAll((err, result) => {
			if (err) {
				console.log(Date(), err);
				res.status(500);
			} else {
				res.render('pages/index', { titel: "Forside", data: result });
			}
		})
	})

	app.get('/om', function (req, res) {
		res.render('pages/om', { titel: "Om Os" })
	})
	app.get('/produkt/:id', function (req, res) {
		service.getOne(req.params.id, (err, result) => {
			if (err) {
				console.log(Date(), err);
				res.status(500);
			} else {
				res.render('pages/produkt', { titel: result[0].navn, data: result[0] });
			}
		})
	});
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
