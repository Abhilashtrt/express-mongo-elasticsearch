const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/employees.controller');
const {
  createEmployees,
  updateEmployees,
  listEmployees,
} = require('../../validations/employees.validation');

const router = express.Router();

router
  .route('/')
  /**
   * @api {post} v1/employees Create Employees
   * @apiDescription Create a new user
   * @apiVersion 1.0.0
   * @apiName CreateUser
   * @apiGroup Employees
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Employees's access token
   *
   * @apiParam  {String}             email     Employees's email
   * @apiParam  {String{6..128}}     password  Employees's password
   * @apiParam  {String{..128}}      [name]    Employees's name
   * @apiParam  {String=user,admin}  [role]    Employees's role
   *
   * @apiSuccess (Created 201) {String}  id         Employees's id
   * @apiSuccess (Created 201) {String}  name       Employees's name
   * @apiSuccess (Created 201) {String}  email      Employees's email
   * @apiSuccess (Created 201) {String}  role       Employees's role
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated employees can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(validate(createEmployees), controller.create);

router
  .route('/:id')
  /**
   * @api {patch} v1/employees/:id Update Employees
   * @apiDescription Update some fields of a user document
   * @apiVersion 1.0.0
   * @apiName UpdateUser
   * @apiGroup Employees
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Employees's access token
   *
   * @apiParam  {String}             email     Employees's email
   * @apiParam  {String{6..128}}     password  Employees's password
   * @apiParam  {String{..128}}      [name]    Employees's name
   * @apiParam  {String=user,admin}  [role]    Employees's role
   * (You must be an admin to change the user's role)
   *
   * @apiSuccess {String}  id         Employees's id
   * @apiSuccess {String}  name       Employees's name
   * @apiSuccess {String}  email      Employees's email
   * @apiSuccess {String}  role       Employees's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated employees can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Employees does not exist
   */
  .patch(validate(updateEmployees), controller.update);

router
  .route('/list')
  /**
   * @api {post} v1/digital_document/list Sorted and Filtered Data
   * @apiDescription Get list of sorted and filtered data
   * @apiVersion 1.0.0
   * @apiName List
   * @apiGroup List
   * @apiPermission admin, user
   *
   * @apiHeader {String} Authorization   Admin's or User's access token
   *
   * @apiParam  {String}      term            searching term
   * @apiParam  {String}      fieldToSort     name of field which is to be sorted
   * @apiParam  {String}      order           order ( can be asc or desc )
   * @apiParam  [String]      fieldsToFilter     name of fields from which term will be searched
   * @apiParam  {String}      collectionId       To search in specific collection id
   * @apiParam  {Bool}        inCollection       Set  true/false to filter from collection
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  digital document per page
   *
   * @apiSuccess (Created 201) {object}   sorted data object
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(validate(listEmployees), controller.list);


module.exports = router;
