const { user_lst, blog_lst, User, Blog } = require('./data');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/users', (req, res) => {
  //  console.log('i am in post endpoint');
  const { firstname, secondname, password } = req.body;

  if (!firstname || !secondname || !password) {
    return res.status(404).json({ message: 'you missing required feilds' });
  }
  let NewUser = new User(firstname, secondname, password);
  user_lst.push(NewUser);
  return res
    .status(201)
    .json({ message: 'user is added successfully', user: NewUser });
});

app.post('/posts', (req, res) => {
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
});

app.get('/posts', (req, res) => {
  if (blog_lst.length === 0)
    return res
      .status(200)
      .json({
        message:
          'the response is access but we cant have any blogs , the count 0',
      });

  return res
    .status(200)
    .json({ message: 'these is the all blogs ', blogs: blog_lst });
});

app.get('/posts/user/:userId', (req, res) => {
  const { userId } = req.params;

  const postsUser = blog_lst.filter((b) => b.userId == userId);

  if (postsUser.length == 0)
    return res
      .status(200)
      .json({
        message:
          'the response is access but this user cant have any blogs , the count 0',
      });
      res.status(200).json({ message: `these is the all blogs for this user ${userId} `, blogs: postsUser });
});


app.listen(port, () => {
  console.log(
    `Server is listening on port ${port} . Ready to accept requests! `
  );
});
