const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            date,
            user: user_id,
            spot: spot_id
        });

        await booking
            .populate('user')
            .populate('spot')
            .execPopulate();

        const ownerSocker = req.connectedUsers[booking.spot.user];
        if (ownerSocker) {
            req.io.to(ownerSocker).emit('booking_request', booking);
        }

        return res.json(booking);
    }
};