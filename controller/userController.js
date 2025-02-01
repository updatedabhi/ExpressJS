const Student = require("../model/studentModel");
const APIfeatures = require("./../utils/apiFeatures");

const topStudent = async (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-cgpa";
  req.query.fields = "name, cgpa";
  next();
};

const getAllUser = async (req, res) => {
  try {
    const features = new APIfeatures(Student.find(), req.query)
      .filter()
      .sort()
      .limitField()
      .paginate();
    const students = await features.query;
    res.status(200).json({
      result: students.length,
      message: "Success",
      data: students,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).json({
      staus: "Success",
      student,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        student: newStudent,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        student,
      },
    });
  } catch (err) {
    res.status(404).json({
      staus: "fail",
      message: err,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: null,
    });
  } catch (err) {
    res.status(404).json({
      staus: "fial",
      message: err,
    });
  }
};

const getStudentStats = async (req, res) => {
  try {
    const stats = await Student.aggregate([
      {
        $match: { age: { $lte: 30 } },
      },
      {
        $group: {
          _id: "$cgpa",
          numStudent: { $sum: 1 },
          avgCgpa: { $avg: "$cgpa" },
          avgAge: { $avg: "$age" },
          minCga: { $min: "$cgpa" },
          maxCgpa: { $max: "$cgpa" },
        },
      },
      {
        $sort: { numStudent: -1 },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

module.exports = {
  getAllUser,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  topStudent,
  getStudentStats,
};
