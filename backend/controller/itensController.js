const User = require('../models/Users');
const axios = require('axios');



module.exports = class Analyzes {
    static async analises(req, res) {
        let mlb = req.params.id; //Para uso de testes 'MLB1830777149''MLB1830777149'


        if (!mlb.startsWith('MLB')) mlb = 'MLB' + mlb;
        axios.get(`https://api.mercadolibre.com/items/${mlb}`).then((response) => {
            const data = response.data
            res.json(data).end();
        }).catch((err) => {
            const error = err.message
            res.redirect('/')
        });
    }
    static async shipping(req, res) {
        let mlb = req.params.id;

        if(!mlb.startsWith('MLB')) mlb = 'MLB'+mlb
        await axios.get(`https://api.mercadolibre.com/items/shipping_options/free?ids=${mlb}`).then((response) => {
            const data = response.data;

            Object.keys(data).map(function(key){
               const result = data[key].coverage.all_country
                res.json(result);
            })
        }).catch(err => console.log(err));
    }
}