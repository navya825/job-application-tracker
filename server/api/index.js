const router = require('express').Router();
const companyRouter = require('./companies');
const jobRouter = require('./jobs');
const toDoRouter = require('./toDos');

router.use('/companies', companyRouter);
router.use('/jobs', jobRouter);
router.use('/toDos', toDoRouter);

router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;
