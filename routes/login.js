var db = require('../config/mysql').connect();
const session = require('express-session');

module.exports = function (app) {


    app.get('/login', function (req, res) {
        res.render('pages/admin/login');
    });


    // ================================================================


    app.post('/login', function (req, res) {

        var message = '';

        var post = req.body;
        var name = post.user_name;
        var pass = post.password;

        var sql = `
			SELECT
				id,
				first_name,
				last_name,
				user_name
			FROM users
			WHERE
				user_name = ? AND password = ?
		`;

        db.query(sql, [name, pass], function (err, results) {
            if (results.length) {
                req.session.userId = results[0].id;
                req.session.user = results[0];
                // console.log(results[0].id);
                res.redirect('/admin');

            }
            else {
                message = 'Wrong credentials.';
                res.render('pages/admin/login', { message: message });
            }
        });
    });


    // ================================================================


    app.get('/logout', function (req, res) {
        req.session.destroy(function (err) {
            res.redirect("/");
        });
    });


    // ================================================================


    app.get('/signup', function (req, res) {
        res.render('pages/admin/signup');
    });


    // ================================================================


    app.post('/signup', function (req, res) {
        var message = '';
        var post = req.body;
        var name = post.user_name;
        var pass = post.password;
        var fname = post.first_name;
        var lname = post.last_name;
        var mob = post.mob_no;

        // TODO: Tilføj validering af resten af de indtastede oplysninger!

        if (name != "" && pass != "") {

            var sql = `
				INSERT INTO users
				SET
					first_name = ?,
					last_name = ?,
					mob_no = ?,
					user_name = ?,
					password = ?
				`;

            db.query(sql, [fname, lname, mob, name, pass], function (err, result) {
                if (err) {
                    console.log("signup error: " + err);
                }
                else {
                    message = "Succesfully! Your account has been created.";
                    res.render('pages/admin/signup', {
                        message: message,
                        messageType: "alert-success",
                        showForm: false
                    });
                }

            });
        }
        else {
            message = "Username and password are required!";
            res.render('pages/admin/signup', {
                message: message,
                messageType: "alert-danger"
            });
        }
    });


    // ================================================================


    app.get('/admin', function (req, res) {


        if (req.session.userId == null) {
            res.redirect("/login");
            return;
        }

        var sql = "SELECT * FROM users WHERE id = ?";

        db.query(sql, [req.session.userId], function (err, results) {
            res.render('pages/admin/dashboard', { user: req.session.user });
        });
    });


    // ================================================================


    app.get('/profile', function (req, res) {

        if (req.session.userId == null) {
            res.redirect("/login");
            return;
        }

        var sql = "SELECT * FROM users WHERE id = ?";
        db.query(sql, [req.session.userId], function (err, result) {
            res.render('pages/admin/profile', { data: result });
        });
    });


    // ================================================================


} // End of: module.exports
