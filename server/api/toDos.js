const router = require('express').Router();
const { ToDo, UserLogin } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const UserLoginId = req.UserLogin.id;
    const toDo = await ToDo.findAll({
      where: {
        UserLoginId: UserLoginId,
      },
    });
    res.json(toDo);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const UserLoginId = req.UserLogin.id;
    const currentUserLogin = await UserLogin.findOne({
      where: {
        id: UserLoginId,
      },
    });
    const newItem = await ToDo.create({
      description: req.body.description,
    });
    await newItem.setUserLogin(currentUserLogin);
    res.json(newItem);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const currentItemId = req.body.id;
    const updatedItem = await ToDo.findByPk(currentItemId);
    await updatedItem.update(req.body.completed);
    res.sendStatus(204).end();
  } catch (err) {
    next(err);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const currentItemId = req.body.id;
    await ToDo.destroy({
      where: {
        id: currentItemId,
      },
    });
    res.sendStatus(204).end();
  } catch (err) {
    next(err);
  }
});
