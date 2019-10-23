const mongoose = require('mongoose');
require('dotenv').config();
const _ = require('lodash');

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO_URI, {
  reconnectTries: 60, // retry to connect for 60 times
  reconnectInterval: 1000, // wait 1 second before retrying
  useNewUrlParser: true,
});

const Employees = require('../employees.model');
const employeesData = require('../jsonData/employees.json');
const esService = require('../../services/esService');

async function prepareObject(employees) {
  const string = '';
  const esObject = employees.map((emp) => {
    const bodyObject = _.pick(emp, [
      'firstName',
      'lastName',
      'designation',
      'salary',
      'dateOfJoining',
      'address',
      'age',
      'maritalStatus',
    ]);
    console.log('bodyObject) ', bodyObject);
    const indexObject = {
      index: {
        _id: emp._id,
      },
    };
    return (
      `${string}${JSON.stringify(indexObject)}\n${JSON.stringify(bodyObject)}\n`
    );
  });
  return esObject;
}

async function bulkInsertInEs(esData) {
  try {
    const esObject = await prepareObject(esData);
    await esService.BulkIndex(esObject);
    mongoose.disconnect();
  } catch (error) {
    console.log(error);
    console.error(':::::error: catch block error:::::');
  }
}

async function insertEmployees() {
  const data = await Employees.insertMany(employeesData);
  await bulkInsertInEs(data);
}

insertEmployees();
