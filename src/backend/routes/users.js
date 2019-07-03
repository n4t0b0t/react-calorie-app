const express = require("express");
const router = express.Router();
const {
  findUser,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUser,
  updateMealLog
} = require("../controllers/user.controller");

// CHECK THAT USERNAME EXISTS, ELSE GIVE ERROR
router.param("username", async (req, res, next, username) => {
  const foundUser = await findUser(username);
  if (foundUser) {
    req.user = foundUser;
    next();
  } else {
    const err = new Error(`cannot find user with username: ${username}`);
    err.statusCode = 400;
    next(err);
  }
});

// router.param("date", async (req, res, next, date) => {
// WILL BE REWRITTEN TO CHECK QUERY DATE FORMATS/INPUTS
// });

// CHECK THAT FOODLOG EXISTS (should be created by default in createNewUser()), ELSE GIVE ERROR
router.use("/:username/foodlog", (req, res, next) => {
  if (req.user.foodLog) {
    next();
  } else {
    const err = new Error(
      `cannot find food log for user: ${req.user.username}`
    );
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const output = await getAllUsers();
    res.status(200).json(output);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const output = await createNewUser(req.body);
    res.status(201).json(output);
  } catch (err) {
    next(err);
  }
});

router.delete("/:username", async (req, res, next) => {
  try {
    const output = await deleteUser(req.params.username);
    res.status(200).json(output);
  } catch (err) {
    next(err);
  }
});

router.put("/:username", async (req, res, next) => {
  try {
    // NEED TO ADD VALIDATION FOR UPDATE FIELDS
    const output = await updateUser(req.params.username, req.body);
    res.status(200).json(output);
  } catch (err) {
    next(err);
  }
});

router.get("/:username/foodlog", (req, res, next) => {
  res.status(200).json(req.user.foodLog);
});

router.get("/:username/foodlog/:date", (req, res, next) => {
  const queryDate = new Date(req.params.date);
  const foundDate = req.user.foodLog.find(
    log => log.date.getTime() === queryDate.getTime()
  );
  if (foundDate) {
    const output = foundDate.meals
      .filter(obj => (req.query.meal ? obj.meal === req.query.meal : true))
      .filter(obj => (req.query.item ? obj.item === req.query.item : true));
    res.status(200).json(output);
  } else {
    const err = new Error(`no meal log for date: ${req.params.date}`);
    err.statusCode = 400;
    next(err);
  }
});

router.post("/:username/foodlog/:date", async (req, res, next) => {
  const queryDate = new Date(req.params.date);
  const foundDate = req.user.foodLog.find(
    log => log.date.getTime() === queryDate.getTime()
  );
  if (!foundDate) {
    const newDateLog = {
      date: queryDate,
      meals: [req.body]
    };
    req.user.foodLog.push(newDateLog);
    try {
      const output = await updateMealLog(req.user);
      res.status(201).json(output);
    } catch (err) {
      next(err);
    }
  } else {
    req.user.foodLog
      .find(log => log.date.getTime() === queryDate.getTime())
      .meals.push(req.body);
    try {
      const output = await updateMealLog(req.user);
      res.status(201).json(output);
    } catch (err) {
      next(err);
    }
  }
});

router.put("/:username/foodlog/:date/:id", async (req, res, next) => {});

router.delete("/:username/foodlog/:date/:id", async (req, res, next) => {});

// ERROR HANDLER:
router.use((err, req, res, next) => {
  console.log("error", err);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).json({ message: err.message });
});

module.exports = router;
