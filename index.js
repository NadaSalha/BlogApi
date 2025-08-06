const { user_lst, blog_lst, User, Blog } = require('./data');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log(
    `Server is listening on port ${port} . Ready to accept requests! `
  );
});
