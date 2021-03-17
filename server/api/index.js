const router = require('express').Router();
const companyRouter = require('./companies');
const jobRouter = require('./jobs');

// NOTE: Any routes that you put here are ALREADY mounted on `/api`
// error-handling endware!

router.use('/companies', companyRouter);
router.use('/jobs', jobRouter);

router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;
