const database = require('../config/mysql').connect();
var multer = require('multer');
var bodyParser = require('body-parser');
const session = require('express-session');


module.exports = function (app) {
    app.use(bodyParser.json());
    // index page
    app.get('/admin/produkter', function (req, res) {
        var user = req.session.user;
        var userId = req.session.userId;

        if (userId == null) {
            res.redirect("/login");
            return;
        }
        database.connect();
        let sql = `SELECT produkter.*, kategori.kategori, producent.producent FROM(( produkter INNER JOIN kategori ON fk_kategori_id = kategori.ID) INNER JOIN producent ON fk_producent = producent.ID)`;
        database.query(sql, function (err, data) {
            if (err) {
                console.log(err);
            }
            res.render('pages/admin/produkter', {
                titel: "Produkter", arrangement: data
            })
        });
    })
    app.get('/admin/opretprodukt', function (req, res) {
        var user = req.session.user;
        var userId = req.session.userId;

        if (userId == null) {
            res.redirect("/login");
            return;
        }
        res.render('pages/admin/opretprodukt', { titel: "Opret produkt" })
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
            console.log(data);
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
        }
        database.query(`DELETE FROM produkter WHERE id = ${req.params.id}`, (error, rows) => {
            res.json(rows);
        });
    });
    app.post('/opret', (req, res, next) => {
        let image = 'no-image.png';
        let sql = 'INSERT INTO arrangementer(navn, Pris, Dato, Sal_fk, beskrivelse, billede) VALUES (?, ?, FORMAT(dato, "yyyy-MM-ddTHH:mm:ss"), ?, ?, ?)';

        let productImage = req.body.productImage;
        console.log(req.body.dato);
        if (req.body.navn != '' && req.body.beskrivelse != '') {
            database.query(`INSERT INTO arrangementer(navn, Pris, Dato, Sal_fk, beskrivelse, billede) VALUES ('${req.body.navn}', ${req.body.pris}, '${req.body.dato}', '${req.body.sal_id}', '${req.body.beskrivelse}', '${req.body.productImage}')`, function (err, data) {
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
    var Storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, "/public/images");
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        }
    });

    var upload = multer({
        storage: Storage
    }).single("imgUploader");

    app.post('/updatetime', function (req, res, next) {
        console.log(req.body);
        req.session.cookie.expires = new Date(Date.now() + req.body.minute * 60 * 1000);
        req.session.cookie.maxAge = req.body.minute * 60 * 1000
        console.log(req);
        res.redirect('/admin')
    })
    app.post('/admin/retprodukt/:id', function (req, res, next) { // selve routet som har put metoden. Opdatering af produkter.
        if (req.body.navn != '' && req.body.beskrivelse != '' && !isNaN(req.body.pris)) {
            upload(req, res, function (err) {
                if (err) {
                    return res.end("Something went wrong!");
                }
                console.log(req);
                return res.end("File uploaded sucessfully!.");
            });

            // database.query(`UPDATE produkter SET navn= '${req.body.navn}', pris = ${req.body.pris} ,beskrivelse = '${req.body.beskrivelse}', billede = '${req.body.productImage}' WHERE id = ${req.params.id}`, function (err, data) {

            //     if (err) {
            //         console.log(err);
            //     } else {
            //         res.redirect('/admin/produkter')
            //     }
            // })
            // håndter billedet, hvis der er sendt et billede 

        };
    });



};