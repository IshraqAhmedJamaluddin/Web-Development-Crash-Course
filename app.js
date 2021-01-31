const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const City = require('./models/city');
const port = 3000;

const app = express();

// connect to mongoDB using mongooose
mongoose.connect('mongodb://localhost:27017/eats', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// check the database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('Database connected') });

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(express.static(__dirname));

// to parse req.body
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index')
});

app.post('/search', async (req, res) => {
    const city = req.body.city;
    const found = await City.findOne({ name: city });
    if (!found) {
        return res.redirect('/');
    }
    res.redirect(`/search/${found.id}`)
});

app.get('/search/:id', async (req, res) => {
    const id = req.params.id;
    const city = await City.findById(id);
    res.render('results', { city });
});

app.listen(port, () => {
    console.log(`LISTENING TO http://localhost:${port}`);
});