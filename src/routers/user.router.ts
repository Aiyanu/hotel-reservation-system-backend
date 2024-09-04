import express from "express";

const router = express.Router();
// const userService = new UserService(new UserRespository());
// const userController = new UserController(userService);

const createUserRoute = () => {
  router.post("/login");
  router.post("/register");
  router.get("/:id");
  router.patch("/:id");
  router.delete("/:id");
  router.post("/forgot-password");
  router.post("/reset-password");
  return router;
};

export default createUserRoute();
