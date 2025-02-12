const express = require("express");
const router = express.Router();
const studentConroller = require("../controller/studentController");

router.route("/student-stats").get(studentConroller.getStudentStats);

router
  .route("/top5-student")
  .get(studentConroller.topStudent, studentConroller.getAllUser);

router
  .route("/")
  .get(studentConroller.getAllUser)
  .post(studentConroller.createUser);
router
  .route("/:id")
  .get(studentConroller.getUser)
  .patch(studentConroller.updateUser)
  .delete(studentConroller.deleteUser);

module.exports = router;
