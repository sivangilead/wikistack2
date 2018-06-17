const express = require('express');
const router = express.Router();
module.exports = router;
const models = require('../models');
const User = models.User;
const Page = models.Page;
const addPage = require('../views/addPage');
const wikiPage = require('../views/wikipage');
const main= require('../views/main');
const {userList,userPages}=require('../views')

router.get('/', async (req, res, next) => {
    try {
      const users= await User.findAll()
      res.send(userList(users));
    } catch (error) {
      next(error);
    }
});

router.get('/:userid', async (req, res, next) => {
    try {
      const user = await User.findById(req.params.userid)
      const pages= await Page.findAll({
        where:{
          authorId: req.params.userid
        }
      })
      res.send(userPages(user,pages));
    } catch (error) {
      next(error);
    }
});
