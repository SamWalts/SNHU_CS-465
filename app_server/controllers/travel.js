// var fs = require('fs');
// var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

/* GET travel view. */
const travel = async function(req, res, next) {
    console.log('Fetching trips from API...');
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            let message = null;

            if (!(json instanceof Array)) {
                console.log('API lookup error');
                message = 'API lookup error';
                json = [];
            } else if (!json.length) {
                    console.log('No trips exist in our database!');
                    message = 'No trips exist in our database!';
                }
            
            res.render('travel', { title: 'Travlr Getaways', trips: json, message});
        })
        .catch(err =>  res.status(500).send(err.message));
};



module.exports = {
    travel
};
