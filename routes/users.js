const express = require('express');
const router = express.Router();
const { user_lst } = require('../data/data');
const User = require('../models/User');

router.post('/', (req, res) => {
  //  console.log('i am in post endpoint');
  try {
    const { firstname, secondname, password } = req.body;

    if (!firstname || !secondname || !password) {
      return res.status(404).json({ message: 'you missing required feilds' });
    }
    let NewUser = new User(firstname, secondname, password);
    user_lst.push(NewUser);
    return res
      .status(201)
      .json({ message: 'user is added successfully', user: NewUser });
  } catch (er) {
    return res.status(404).json(`${er.message}`);
  }
});

module.exports = router;
