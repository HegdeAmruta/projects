const express = require('express')

const User = require('../schema/userSchema')

const router = express.Router()

//get all signedup user
router.get('/', async (req, res) => {
  try {
    let users = await User.find().sort('name')
    res.status(200).send(users)
  } catch (error) {
    console.log(error)
  }
})

//create new user
router.post('/', async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username })
    if (user) throw 'user aready exists'
    user = new User({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      address: req.body.address,
      contact: req.body.contact
    })

    user = await user.save()

    res.send({ _id: user._id, name: user.name, username: user.username})
  } catch (err) {
    console.log(err)
    res.status(400).send('something went wrong')
  }
})

//to delete the user
router.delete('/:id', async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id)
    res.send(user)
  } catch (error) {
    console.log('error occured while deleting a user', error)
  }
})

//route to update the user details
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      address: req.body.address,
      contact: req.body.contact
      },
      { new: true }
    )

    res.send(updatedUser)
  } catch (ex) {
    res.status(404).send('data not found')
  }
})

module.exports = router
