const { createUser, getUsers, getUserById, getUserByEmail } = require('../controllers/UserController');
const router = require("express").Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/email/:email', getUserByEmail);

module.exports = router;