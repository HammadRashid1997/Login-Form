var express = require('express');
var router = express.Router();

const credential = {
    email: "admin@gmail.com",
    password: "admin123"
}

// login
router.post('/login', (req, res) => {
    if(req.body.email == credential.email && req.body.password == credential.password) {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
    }
    else {
        res.end("Invalid credentials are being used to login.")
    }
})

router.get('/dashboard', (req, res) => {
    if(req.session.user) {
        res.render('dashboard', {user:req.session.user});
    }
    else {
        res.send("Unauthorised user");
    }
})

// Logout
router.get('/logout', (req, res) => {
    if (req.session.destroy(function(err) {
        if(err) {
            console.log(err);
            res.send("Error");
        }
        else {
            res.render('base', {title: "Express", logout: "Logout Successfull"});
        }
    }));
})

module.exports = router;