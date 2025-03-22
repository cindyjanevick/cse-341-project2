const router = require('express').Router();

// router.get('/', (req, res)=> {res.send('Hello World')});

router.use('/students', require('./students'));

module.exports = router;