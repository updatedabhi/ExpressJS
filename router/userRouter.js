const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");

userRouter.route("/student-stats").get(userController.getStudentStats);

userRouter
  .route("/top5-student")
  .get(userController.topStudent, userController.getAllUser);

userRouter
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createUser);
userRouter
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
