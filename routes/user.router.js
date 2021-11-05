const express = require('express');
const router = express.Router();

router.post('/new', async(req, res) => {
  res.send('alumnos router');
});

router.post('/login', async(req, res) => {
  res.send('alumnos router');
});

router.patch('/:id', async(req, res) => {
  res.send('alumnos router');
});

router.get('/transactions/:id', async(req, res) => {
  res.send('Transacciones');
})

module.exports = router;
