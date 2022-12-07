const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const PORT = 3000;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());

// app.use(cors({credentials: false, origin: 'http://localhost:3000'}));

app.use(express.static('public'));

const userRoute = require('./routes/userRoute');
const itemRoute = require('./routes/itemRoute');

app.get('/', (req,res) => {
    res.json({message: 'Hello World'})
})
app.use('/users', userRoute);
app.use('/itens', itemRoute);

app.listen(PORT, () => console.log(`Conected in PORT: ${PORT}`))