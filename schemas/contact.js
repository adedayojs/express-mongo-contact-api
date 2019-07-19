const { Schema } = require('mongoose');

const contact = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  blocked: Boolean
});

module.exports = { contactSchema: contact };
