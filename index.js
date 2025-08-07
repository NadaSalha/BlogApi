
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const userRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/posts', postsRouter);

app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(port, () => {
  console.log(
    `Server is listening on port ${port} . Ready to accept requests! `
  );
});
