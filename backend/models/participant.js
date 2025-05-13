const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  name: String,
  email: String
});

module.exports = mongoose.model('Participant', participantSchema);
