const { createTask, deleteTask, updateTask, getTaskById, getAllTasks } = require('../controllers/TaskController');
const router = require("express").Router();

router.post('/', createTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);
router.get('/:id', getTaskById);
router.get('/', getAllTasks);

module.exports = router;