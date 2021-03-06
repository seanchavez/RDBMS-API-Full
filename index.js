const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('up and running...');
});

//===========Users===========

server.post('/users', (req, res) => {
  const user = req.body;
  db.insert(user).into('users')
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get('/users', (req, res) => {
  db('users')
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
})

server.get('/users/:id', (req, res) => {
  const id = req.params.id;
  db('users').where('id', id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
});

server.get('/users/:id/posts', (req, res) => {
  const id = req.params.id;
  db('posts').where('userId', id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  db('users').where('id', id)
    .update({ 'name': name })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err)
    });
});

server.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  db('users').where('id', id).del()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err)
    });
});

//============Posts=============

server.post('/posts', (req, res) => {
  const post = req.body;
  db.insert(post).into('posts')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get('/posts', (req,res) => {
  db('posts')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get('/posts/:id', (req, res) => {
  const id = req.params.id
  db('posts').where('id', id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.put('/posts/:id', (req,res) => {
  const id = req.params.id;
  const post = req.body;
  db('posts').where('id', id).update(post)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete('/posts/:id', (req, res) => {
  const id = req.params.id;
  db('posts').where('id', id).del()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });  
});

//============Tags=============

server.post('/tags', (req, res) => {
  const tag = req.body;
  db.insert('tags').into('tags')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });  
});

server.get('/tags', (req, res) => {
  db('tags')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });  
});

server.get('/tags:id', (req, res) => {
  const id = req.params.id;
  db('tags').where('id', id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});