const database = require('../config/mysql').connect();
var bodyParser = require('body-parser');
const session = require('express-session');
const service = require('../services/produkter');


module.exports = function (app) {
    // index page
    app.get('/admin/produkter', function (req, res) {
        var user = req.session.user;
        var userId = req.session.userId;

        if (userId == null) {
            res.redirect("/login");
            return;
        }
        service.getAll((err, result) => {
            if (err) {
                console.log(Date(), err);
                res.status(500);
            } else {
                res.render('pages/admin/produkter', {
                    titel: "Produkter", arrangement: result
                })
            }
        });
    })
    app.get('/admin/opretprodukt', function (req, res) {
        var user = req.session.user;
        var userId = req.session.userId;

        if (userId == null) {
            res.redirect("/login");
            return;
        }

        service.producent((err, producent) => {
            if (err) {
                console.log(Date(), err);
                res.status(500);
            } else {
                service.kategori((err, kategori) => {
                    if (err) {
                        console.log(Date(), err);
                        res.status(500);
                    } else {
                        res.render('pages/admin/opretprodukt', { titel: "Opret produkt", producent: producent, kategori: kategori })
                    }
                })
            }
        })
    })

    app.get('/admin/retprodukt/:id', function (req, res) {
        var user = req.session.user;
        var userId = req.session.userId;

        if (userId == null) {
            res.redirect("/login");
            return;
        }
        database.connect();
        let sql = `SELECT produkter.*, kategori.kategori, producent.producent FROM(( produkter INNER JOIN kategori ON fk_kategori_id = kategori.ID) INNER JOIN producent ON fk_producent = producent.ID) WHERE produkter.ID = ?`;
        database.query(sql, [req.params.id], function (err, data) {
            if (err) {
                console.log(err);
            }
            res.render('pages/admin/retprodukt', {
                titel: "Ret produkt", produkt: data[0]
            })
        });
    })


    app.get('/slet/:id', function (req, res) {
        var user = req.session.user;
        var userId = req.session.userId;

        if (userId == null) {
            res.redirect("/login");
            return;
        } else {
            service.deleteById(req.params.id, (err, result) => {
                if (err) {
                    console.log(Date(), err);
                    res.status(500);
                } else {
                    res.render('pages/index', { titel: "Forside", data: result });
                }
            })
        }
    });
    app.post('/opret', (req, res, next) => {
        let sql = 'INSERT INTO produkter(navn, pris, beskrivelse, fk_kategori_id, fk_producent, billede) VALUES (?, ?, ?, ?, ?, ?)';

        let productImage = req.body.productImage;
        console.log(req.body.dato);
        if (req.body.navn != '' && req.body.beskrivelse != '') {
            database.query(`INSERT INTO arrangementer(navn, Pris, Dato, Sal_fk, beskrivelse, billede) VALUES ('${req.body.navn}', ${req.body.pris}, '${req.body.beskrivelse}', '${req.body.kategori}', '${req.body.producent}', '${req.body.productImage}')`, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('pages/admin/arrangement')
                }
            })
        } else {
            // console.log(name, price, dato, sal_id, description, image);
            res.status(400).json({
                message: 'validering fejlede'
            });
        }
    });

    app.put('/admin/retprodukt/:id', function (req, res, next) { // selve routet som har put metoden. Opdatering af produkter.
        if (req.body.navn != '' && req.body.beskrivelse != '' && !isNaN(req.body.pris)) {

            database.query(`UPDATE produkter SET navn= '${req.body.navn}', pris = ${req.body.pris} ,beskrivelse = '${req.body.beskrivelse}', billede = '${req.body.productImage}' WHERE id = ${req.params.id}`, function (err, data) {

                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/admin/produkter')
                }
            })

        };
    });



};