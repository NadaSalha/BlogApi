let user = null;
let blogs = [];
 let user_Id =0;
const getElement = (elem) => document.querySelector(elem);

function registerUser() {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!firstName || !lastName || !password) {
    alert('Please fill all fields');
    return;
  }

  user = {
    firstname: firstName,
    secondname: lastName,
    password: password,
  };

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:5000/users', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;

    if (xhr.status === 201) {
      alert('User registered successfully');
      const data = JSON.parse(xhr.responseText);
       user_Id = data.user.id;
       localStorage.setItem('user_id',user_Id);
       alert(xhr.response);
      window.location.href = './home.html';
    }
  };

  xhr.send(JSON.stringify(user));
}

function goToRegister() {
  window.location.href = './home.html';
}


function showAddBlog() {
  document.getElementById('addBlogSection').classList.remove('hidden');
}


function addBlog() {
  const content = document.getElementById('blogContent').value.trim();
  const blogTitle = document.getElementById('blogTitle').value.trim();

  if (!content || !blogTitle) return alert('Please input fields');

  user_Id=localStorage.getItem('user_id');
  alert( localStorage.getItem('user_id'));
  const newBlog = {
    userId: user_Id,
    title: blogTitle,
    content: content,
  };

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:5000/posts', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;

    if (xhr.status === 200) {
      alert('Blog ADDED successfully');
      blogs.push(newBlog);

      localStorage.setItem('blogs', JSON.stringify(blogs));
      document.getElementById('blogContent').value = '';
      document.getElementById('blogTitle').value = '';

      renderUserBlogs();
      renderAllBlogs();
    }
  };

  xhr.send(JSON.stringify(newBlog));
}

function renderUserBlogs() {
  const container = document.getElementById('userBlogs');
  if (!container) return;

  container.innerHTML = '';

  const xhr = new XMLHttpRequest();
  xhr.open('GET', `http://localhost:5000/posts/user/${user_Id}`, true);

  xhr.send();

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) return;

    if (xhr.status === 200) {
      try {
        const user_blogs = JSON.parse(xhr.responseText);

        user_blogs.blogs.forEach((blog) => {
          const div = document.createElement('div');
          div.className = 'bg-white p-4 rounded shadow';
          div.textContent = blog.content;
          container.appendChild(div);
        });
      } catch (er) {
        console.error(er.message);
      }
    }
  };

}

function renderAllBlogs() {
  const container = document.getElementById('allBlogs');
  if (!container) return;
  container.innerHTML = '';

  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:5000/posts', true);

  xhr.send();

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) return;

    if (xhr.status === 200) {
      try {
        const all_blogs = JSON.parse(xhr.responseText);

        all_blogs.blogs.forEach((blog) => {
          const div = document.createElement('div');
          div.className = 'bg-gray-50 p-4 rounded shadow';
          div.innerHTML = `<strong>${blog.title}:</strong> ${blog.content}`;
          container.appendChild(div);
        });
      } catch (er) {
        console.error(er.message);
      }
    } else {
      console.log(' ');
    }
  };
}

// window.onload = loadUser;
