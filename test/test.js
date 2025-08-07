const request=require('supertest');
const app = require('../index')
test('POST /users should create a new user and return 201', (done) => {
    request(app)
  .post('/users')
  .expect('content-type',/json/)
  .expect(201)
  .send({ firstname: 'nada', secondname: 'salha', password: 'NadaSalha123' })
  .end((err,res)=>{
        if(err) return done(err);
        done();
  })
});


test('POST /posts should create a new post and return 200', (done) => {
  request(app)
  .post('/posts')
  .expect('content-type',/json/)
  .send({"userId": "1", "title": "My First Post3", "content": "This is the content of my very first post. Hello world!"})
  .expect(200)
  .end((err,res)=>{
        if(err) return done(err);
        done();
  })
});

test('GET /posts should return all posts with status 200', (done) => {
  request(app)
  .get('/posts')
  .expect('content-type',/json/)
  .expect(200)
  .end((err,res)=>{
        if(err) return done(err);
        done();
  })
});

test('GET /posts/:userId should return posts for a specific user', (done) => {
  request(app)
  .get('/posts/user/1')
  .expect('content-type',/json/)
  .expect(200)
  .end((err,res)=>{
        if(err) return done(err);
        done();
  })
});



