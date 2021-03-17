const router = require('express').Router();
const Job = require('../db/job');
const Company = require('../db/company');

router.get('/', async (req, res, next) => {
  try {
    const jobs = await Job.findAll({ include: [Company] });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: [Company],
    });
    res.json(job);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newJob = await Job.create(req.body);
    res.json(newJob);
  } catch (error) {
    next(error);
  }
});

router.put(`/:id`, async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: [Company],
    });
    const updatedJob = await job.update(req.body);
    res.json(updatedJob);
  } catch (error) {
    next(error);
  }
});

router.delete(`/:id`, async (req, res, next) => {
  try {
    await Job.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(204).end();
  } catch (error) {
    next(error);
  }
});

router.delete('/unassignCompany/:id/:companyId', async (req, res, next) => {
  try {
    const { id, companyId } = req.params;
    const job = await Job.findOne({
      where: { id: id },
    });
    await job.removeCompany([companyId]);
    res.sendStatus(204).end();
  } catch (error) {
    next(error);
  }
});
module.exports = router;
