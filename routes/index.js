const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

//export router to other files
module.exports = router;
