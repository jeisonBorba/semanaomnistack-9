const { Router } = require('express');
const multer = require('multer');

const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/sessions', SessionController.index);
routes.post('/sessions', SessionController.store);
routes.delete('/sessions/:email', SessionController.destroy);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.get('/dashboard', DashboardController.show);

module.exports = routes;