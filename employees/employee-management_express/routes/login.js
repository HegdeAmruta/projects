const express = require('express')

const User = require('../schema/userSchema')

const router = express.Router()

//* validate user to login
router.post('/', async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username })
    if (!user) throw 'invalid email or password'

    const validPassword = req.body.password === user.password
    if (!validPassword) throw 'invalid email or password'

    res.send({ _id: user._id, name: user.name, username: user.username })
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
