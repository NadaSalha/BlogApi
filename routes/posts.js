const express = require('express');
const router = express.Router();
const { blog_lst, user_lst } = require('../data/data');
const Blog = require('../models/Blog');

router.post('/', (req, res) => {
  try {
    const { userId, title, content } = req.body;
    res.set('Content-Type', 'application/json');
    if (!userId || !title || !content) {
      return res.status(404).json({ message: 'you missing required feilds' });
    }

    const userExists = user_lst.some((u) => u.id == userId);
    if (!userExists) {
      return res.status(404).json({ message: 'The userId is not exists' });
    }
    const NewBlog = new Blog(userId, title, content);
    blog_lst.push(NewBlog);
    return res
      .status(200)
      .json({ message: 'the blog is added successfully', blog: NewBlog });
  } catch (er) {
    return res.status(404).json(`${er.message}`);
  }
});

router.get('/', (req, res) => {
  try {
    if (blog_lst.length === 0)
      return res.status(200).json({
        message:
          'the response is access but we cant have any blogs , the count 0',
      });

    return res
      .status(200)
      .json({ message: 'these is the all blogs ', blogs: blog_lst });
  } catch (er) {
    return res.status(404).json(`${er.message}`);
  }
});

router.get('/user/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const postsUser = blog_lst.filter((b) => b.userId == userId);

    if (postsUser.length == 0)
      return res.status(200).json({
        message:
          'the response is access but this user cant have any blogs , the count 0',
      });
    res.status(200).json({
      message: `these is the all blogs for this user ${userId} `,
      blogs: postsUser,
    });
  } catch (er) {
    return res.status(404).json(`${er.message}`);
  }
});

module.exports = router;
