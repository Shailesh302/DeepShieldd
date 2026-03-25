const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, enum: ['image', 'video', 'audio', 'pdf'], required: true },
  fileUrl: { type: String },
  status: { type: String, enum: ['REAL', 'FAKE', 'SUSPICIOUS'] },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', fileSchema);
