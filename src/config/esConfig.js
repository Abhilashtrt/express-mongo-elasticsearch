const esService = require('../api/services/esService');
const { logger } = require('./logger');
const { esConfig } = require('./vars');

// Create indexes if not exists for first time
exports.createESIndexes = async () => {
  try {
    if (!(await esService.indexExists(esConfig.indexName))) {
      await esService.initIndexWithMapping(
        esConfig.indexName,
        esConfig.employeesMappings,
      );
    }
    return;
  } catch (error) {
    logger.error(':::::error: catch block error:::::', error);
  }
};
