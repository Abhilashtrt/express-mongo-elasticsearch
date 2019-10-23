const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

const defaultESMapping = {
  type: 'text',
};

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri: process.env.NODE_ENV === 'test'
      ? process.env.MONGO_URI_TESTS
      : process.env.MONGO_URI,
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  esConfig: {
    indexName: 'employees',
    employeesMappings: {
      mappings: {
        properties: {
          firstName: defaultESMapping,
          lastName: defaultESMapping,
          designation: defaultESMapping,
          salary: defaultESMapping,
          dateOfJoining: defaultESMapping,
          address: defaultESMapping,
          gender: defaultESMapping,
          age: defaultESMapping,
          maritalStatus: defaultESMapping,
        },
      },
    },
  },
};
