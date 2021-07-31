const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

// Routes for api, home and dashboard
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
// Error redirection for all other routes
router.use((req, res) => {
    res.status(404).end();
});
module.exports = router;
