const router = require('express').Router();
const Company = require('../db/company');
const Job = require('../db/job');

router.get('/', async (req, res, next) => {
  try {
    const companies = await Company.findAll({
      include: [Job],
    });
    res.json(companies);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id, {
      include: [Job],
    });
    res.json(company);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newCompany = await Company.create(req.body);
    res.json(newCompany);
  } catch (error) {
    next(error);
  }
});

router.put(`/:id`, async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id, {
      include: [Job],
    });
    const updatedCompany = await company.update(req.body);
    res.json(updatedCompany);
  } catch (error) {
    next(error);
  }
});

router.delete(`/:id`, async (req, res, next) => {
  try {
    await Company.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(204).end();
  } catch (error) {
    next(error);
  }
});

router.delete('/unassignJob/:id/:jobId', async (req, res, next) => {
  try {
    const { id, jobId } = req.params;
    const company = await Company.findOne({
      where: { id: id },
    });
    await company.removeJob([jobId]);
    res.sendStatus(204).end();
  } catch (error) {
    next(error);
  }
});
module.exports = router;
