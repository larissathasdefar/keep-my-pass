const mongoose = require('mongoose')

const PassSchema = new mongoose.Schema(
  {
    website: { type: String, required: true },
    password: { type: String, required: true },
    user: { type: 'ObjectId', required: true, ref: 'User' }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Pass', PassSchema)
