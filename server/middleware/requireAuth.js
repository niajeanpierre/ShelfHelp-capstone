import jwt from 'jsonwebtoken'
import key from '../../config/app.config'
import { User } from '../models'

module.exports = async (req, res, next) => {
  const authorization = req.get('authorization')
  // add header to requests called ^, nd the token through it
  if (!authorization) {
    return res.status(401).json({ error: 'you must be logged in' })
  }
  const token = authorization.replace('Bearer ', '')
  jwt.verify(token, key.jwt.secret, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: 'you must be logged in' })
    }
    const { id } = payload
    User.findById(id).then((userdata) => {
      req.user = userdata
      next()
    })
  })
}