const express = require('express');
let users = [];
// const bcrypt = require('bcrypt');

let router = express.Router({caseSensitive: false});
router.use(express.urlencoded({extended: false}))

router.get('/', (req, res) => {
  res.status(200).render('register.ejs');
  res.redirect('/login')
})

router.post ('/', (req,res) => { 
  users.push(req.body.username);
  users.push(req.body.password);
  console.log(users)
  res.redirect('/login');
})

module.exports = router;

