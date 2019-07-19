const { model } = require('mongoose');
const { contactSchema } = require('../schemas/contact');

const Contact = model('Contacts', contactSchema);

module.exports = Contact;
