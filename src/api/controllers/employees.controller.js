const httpStatus = require('http-status');
const { omit } = require('lodash');
const Employees = require('../models/employees.model');
const { insertEmployees, listEmployees } = require('../helpers/esHelper');

/**
 * Create new employees
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const employees = new Employees(req.body);
    const savedEmployees = await employees.save();
    await insertEmployees(savedEmployees);
    res.status(httpStatus.CREATED);
    res.json(savedEmployees.transform());
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Update existing employees
 * @public
 */
exports.update = (req, res, next) => {
  const ommitRole = req.locals.employees.role !== 'admin' ? 'role' : '';
  const updatedUser = omit(req.body, ommitRole);
  const employees = Object.assign(req.locals.employees, updatedUser);

  employees.save()
    .then(savedUser => res.json(savedUser.transform()))
    .catch(e => next(Employees.checkDuplicateEmail(e)));
};

exports.list = async (req, res, next) => {
  try {
    const { count, data } = await listEmployees(req.body);
    res.json({ count, data });
  } catch (error) {
    next(error);
  }
};
