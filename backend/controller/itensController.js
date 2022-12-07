const User = require('../models/Users');
const axios = require('axios');



module.exports = class Analyzes{
    static analises(req, res) {
        let mlb = req.params.id; //Para uso de testes 'MLB1830777149''MLB1830777149'
        
        // if(!mlb.startsWith('MLB')) mlb = 'MLB'+ mlb;
        
       axios.get(`https://api.mercadolibre.com/items/${mlb}/variations`).then((response) => {
                let data = response.data;

                data.forEach(element => {
                    const ele = element;
                    let elementAtributes = element.attribute_combinations;
                    elementAtributes.forEach(atributes => {
                        const atrb = atributes;
                })
            })
            res.json({message: data}).status(200).end();
        }).catch((error) => res.status(400).json({ message: error }));
    }
    
}