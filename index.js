const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const userRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/posts', postsRouter);

app.listen(port, () => {
  console.log(
    `Server is listening on port ${port} . Ready to accept requests! `
  );
});
