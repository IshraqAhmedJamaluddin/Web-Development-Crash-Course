const express = require('express');
const port = 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(port, () => {
    console.log(`LISTENING TO http://localhost:${port}`);
}) 