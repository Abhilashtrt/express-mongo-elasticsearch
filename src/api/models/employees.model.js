const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../utils/APIError');

mongoose.set('useCreateIndex', true);

/**
* User Roles
*/
const roles = ['user', 'admin'];

/**
 * User Schema
 * @private
 */
const employeesSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxlength: 128,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 128,
  },
  designation: {
    type: String,
    index: true,
    trim: true,
  },
  salary: {
    type: String,
    index: true,
    trim: true,
  },
  dateOfJoining: {
    type: String,
    index: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  age: {
    type: String,
    trim: true,
  },
  maritalStatus: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
employeesSchema.pre('save', async (next) => {
  try {
    // Do some thing hese
    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Methods
 */
employeesSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'firstName', 'lastName', 'age', 'gender', 'maritalStatus', 'createdAt', 'dateOfJoining', 'salary', 'designation'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

/**
 * Statics
 */
employeesSchema.statics = {

  roles,

  /**
   * Get employees
   *
   * @param {ObjectId} id - The objectId of employees.
   * @returns {Promise<employees, APIError>}
   */
  async get(id) {
    try {
      let employees;

      if (mongoose.Types.ObjectId.isValid(id)) {
        employees = await this.findById(id).exec();
      }
      if (employees) {
        return employees;
      }

      throw new APIError({
        message: 'employees does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List employees in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of employees to be skipped.
   * @param {number} limit - Limit number of employees to be returned.
   * @returns {Promise<User[]>}
   */
  list({
    page = 1, perPage = 30, name, email, role,
  }) {
    const options = omitBy({ name, email, role }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

  /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
  checkDuplicate(error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return new APIError({
        message: 'Validation Error',
        errors: [{
          field: 'firstName',
          location: 'body',
          messages: ['"FirstName" already exists'],
        }],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack,
      });
    }
    return error;
  },
};
/**
 * @typedef Employees
 */
module.exports = mongoose.model('Employees', employeesSchema);
