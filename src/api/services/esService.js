const elasticsearch = require('elasticsearch');
const { esConfig } = require('../../config/vars');

const elasticClient = new elasticsearch.Client({
  host: process.env.ES_HOST,
  log: process.env.NODE_ENV === 'development' ? 'trace' : 'debug',
});

const docType = '_doc';

/** Check the ES connection status */
exports.checkConnection = async () => {
  try {
    const health = await elasticClient.cluster.health({});
    return health;
  } catch (err) {
    return err;
  }
};

exports.indexExists = async (indexName) => {
  try {
    return elasticClient.indices.exists({
      index: indexName,
    });
  } catch (error) {
    return error;
  }
};

exports.initIndexWithMapping = async (indexName, payload) => {
  try {
    return elasticClient.indices.create({
      index: indexName,
      body: payload,
    });
  } catch (error) {
    return error;
  }
};

exports.indexDocument = async (query) => {
  try {
    return elasticClient.index({
      index: query.indexName,
      id: query.id,
      type: docType,
      body: query.body,
    });
  } catch (error) {
    return error;
  }
};

exports.search = async (query) => {
  try {
    return elasticClient.search({
      index: query.indexName,
      type: docType,
      body: query.body,
      // scroll: '1m',
    });
  } catch (error) {
    return error;
  }
};

exports.updateDocument = async (query) => {
  try {
    return elasticClient.update({
      index: query.indexName,
      type: docType,
      id: query.id,
      body: {
        doc: query.body,
      },
    });
  } catch (error) {
    return error;
  }
};

exports.deleteDocument = async (query) => {
  try {
    return elasticClient.delete({
      index: query.indexName,
      type: docType,
      id: query.id,
    });
  } catch (error) {
    return error;
  }
};

exports.BulkIndex = async (body) => {
  try {
    return elasticClient.bulk({
      index: esConfig.indexName,
      type: docType,
      body,
    });
  } catch (error) {
    return error;
  }
};

exports.countDocuments = async (query) => {
  try {
    return elasticClient.count({
      index: esConfig.indexName,
      type: docType,
      body: query,
    });
  } catch (error) {
    return error;
  }
};
