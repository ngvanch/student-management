const asyncHandler = require('express-async-handler');
const Student = require('../models/student.model');

/**
 * @desc Get all student
 * @route  /api/v1/students/
 * @method GET
 * @access private
 * @requires TOKEN
 */
exports.getAll = asyncHandler(async (req, res) => {
  // TODO: query requests
  // let query = req.query;

  const students = await Student.find({});
  if (!students) {
    res.status(404);
    throw new Error('Student not found');
  }

  res
    .status(201)
    .json({ success: true, count: students.length, data: students });
});

/**
 * @desc Get single student
 * @route /api/v1/students/:id
 * @method GET
 * @access private
 * @requires TOKEN
 */
exports.getStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  res.status(201).json({ success: true, data: student });
});

/**
 * @desc Add student
 * @route /api/v1/students
 * @method POST
 * @access private
 * @requires TOKEN(Admin)
 */
exports.addStudent = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401);
    throw new Error(
      'User not authorized, administrator permission required'
    );
  }

  const student = await Student.create(req.body);

  res.status(201).json({ success: true, data: student });
});

/**
 * @desc Update student
 * @route /api/v1/students/:id
 * @method PUT
 * @access private
 * @requires TOKEN
 */
exports.updateStudent = asyncHandler(async (req, res) => {
  let student = await Student.findById(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  student = await student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({ success: true, data: student });
});

/**
 * @desc Delete student
 * @route /api/v1/students/:id
 * @method DELETE
 * @access private
 * @requires TOKEN(Admin)
 */
exports.deleteStudent = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401);
    throw new Error(
      'User not authorized, administrator permission required'
    );
  }

  let student = await Student.findById(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  await student.delete();

  res.status(201).json({ success: true, data: {} });
});
