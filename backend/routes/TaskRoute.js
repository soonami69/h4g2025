const { createTask, deleteTask, updateTask, getTaskById, getAllTasks, getAllUserTasks } = require('../controllers/TaskController');
const router = require("express").Router();

router.post('/', createTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);
router.get('/:id', getTaskById);
router.get('/', getAllTasks);
router.get('/users/:id', getAllUserTasks);

module.exports = router;