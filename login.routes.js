const express = require('express');

let router = express.Router({caseSensitive: false});

router.use(express.json());

router.get('/', (req, res) => {
  res.status(200).render('login.ejs');
})

// router.get('/verify', (req,res))
// router.post('/', (req,res) => {
  
// })

module.exports = router;

