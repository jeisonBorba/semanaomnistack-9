const User = require('../models/User');

// index => to retrieve all documents from a collection
// show => to retrieve a particular document from a collection
// store => to create a new documento into a collection
// update => to update a field in document
// destroy => to delete a documento from a collection

module.exports = {
    async index(req, res) {
        const sessions = await User.find();

        return res.json(sessions);
    },

    async store(req, res) {
        const { email } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ email });
        }

        return res.json(user);
    }

};