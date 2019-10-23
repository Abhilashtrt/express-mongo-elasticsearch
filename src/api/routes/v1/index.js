const express = require('express');
const mongoose = require('mongoose');
const employeesRoutes = require('./employees.route');
const esService = require('../../services/esService');

const router = express.Router();
/**
 * GET v1/status
 */
router.get('/status', async (req, res) => {
  const esStatus = await esService.checkConnection();
  res.send({
    mongo: mongoose.connection.readyState === 1 ? 'Connected to server.' : 'Not connected to server.',
    elastic: esStatus.cluster_name ? 'Connected to server.' : 'Not connected to server',
    version: process.env.VERSION,
  });
});

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/employees', employeesRoutes);

module.exports = router;
