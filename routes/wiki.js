const express = require('express');
const router = express.Router();
module.exports = router;
const models = require('../models');
const Page = models.Page;
const User = models.User;
const addPage = require('../views/addPage');
const wikiPage = require('../views/wikipage');
const main= require('../views/main');



router.get("/add", (req, res) => {

  res.send(addPage());

});



router.post('/', async (req, res, next) => {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
const reqtitle=req.body.title
const reqautor=req.body.author
const reqcontent=req.body.content
const reqemail=req.body.email
  const page= new Page({
    title: reqtitle,
    content: reqcontent
  });
const [user,created] =await User.findOrCreate({where: {name: reqautor,
email: reqemail
}
})

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
  page.setAuthor(user);


res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
});


router.get('/:slug', async (req, res, next) => {
    try {
      const page = await Page.findOne({
        where: {
          slug: req.params.slug
        }
      });
      const user=await page.getAuthor()
      console.log(`user = ${JSON.stringify(user)}`);
      console.log(`page = ${JSON.stringify(page)}`);
      res.send(wikiPage(page,user));
    } catch (error) {
      next(error);
    }
});


router.get('/', async (req, res, next) => {
    try {
      const pages= await Page.findAll()
      res.send(main(pages));
    } catch (error) {
      next(error);
    }
});
