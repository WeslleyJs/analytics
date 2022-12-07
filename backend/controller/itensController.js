const User = require('../models/Users');
const axios = require('axios');



module.exports = class Analyzes{
    static async analises(req, res) {
        let mlb = req.params.id; //Para uso de testes 'MLB1830777149''MLB1830777149'
        
        // if(!mlb.startsWith('MLB')) mlb = 'MLB'+ mlb;
       axios.get(`https://api.mercadolibre.com/items/${mlb}`).then((response) =>{
           const data = response.data 
           res.json(data).end();
            // res.json(data.sale_terms.id);
        }).catch(err => console.log(err));   
    }
    
}