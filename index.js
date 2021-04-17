// npm init -y
// npm i express
// npm i -D nodemon
// "start": "node index",
// "dev": "nodemon index"
// npm run dev
// npm i moment
// put in router/api/members.js
// npm i uuid
// npm i express-handlebars

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');

const app = express();

// app.get('/', (req, res) => {
//   res.send('<h1>Hello World!!!!</h1>');
// });

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// gets all members
// put in router/api folder
// app.get('/api/members', (req, res) => res.json(members));

// gets single member
// put in router/api folder
// app.get('/api/members/:id', (req, res) => {
//   const found = members.some((member) => member.id === parseInt(req.params.id));
//   if (found) {
//     res.json(members.filter((member) => member.id === parseInt(req.params.id)));
//   } else {
//     res.status(400).json({ msg: 'Member not found!' });
//   }
// });

// init middleware
app.use(logger);

// handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//homepage route
app.get('/', (req, res) => res.render('index'));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// members api routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
