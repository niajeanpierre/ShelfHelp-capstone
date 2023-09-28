import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: {
    type: String,
  },
  customBookInfo: [
    {
      type: ObjectId,
      ref: 'Book',
    },
  ],
})

const User = mongoose.model('User', userSchema)

export default User