const { createTask, deleteTask, updateTask, getTaskById } = require('../controllers/TaskController');
const router = require("express").Router();

router.post('/', createTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);
router.get('/:id', getTaskById);

module.exports = router;