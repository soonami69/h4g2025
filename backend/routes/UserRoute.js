const { createUser, getAllUsers, getUserById, getUserByEmail, updateUser, getNameByEmail } = require('../controllers/UserController');
const router = require("express").Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/emailName/:email', getNameByEmail)
router.get('/email/:email', getUserByEmail);
router.put('/:id', updateUser)

module.exports = router;