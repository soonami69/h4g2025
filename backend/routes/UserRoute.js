const { createUser, getAllUsers, getUserById, getUserByEmail, updateUser } = require('../controllers/UserController');
const router = require("express").Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/email/:email', getUserByEmail);
router.put('/:id', updateUser)

module.exports = router;