const express = require('express');

let router = express.Router({caseSensitive: false});

router.get('/', (req, res) => {
  res.status(200).render('game.ejs');
})

router.post('/', (req,res)=>{
  res.status(200).render('game.ejs');
})
module.exports = router;

