/* GET travel view. */
const travel = (req, res) => {
    res.render('travel', { title: 'Travelr Getaways' });
};

module.exports = {
    travel
};