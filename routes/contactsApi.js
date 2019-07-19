const { Router } = require('express');
const mongoose = require('mongoose');
const Contact = require('../model/contact');

const router = Router();

router.get('/', (req, res) => {
  mongoose.connect('mongodb://localhost/contacts');
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'error in connection'));
  db.once('open', async function() {
    const result = await Contact.find().sort({ name: 1 });
    res.json(result);
    db.close();
  });
});



module.exports = router;
