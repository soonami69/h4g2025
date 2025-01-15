const { createMeeting, deleteMeeting } = require('../controllers/MeetingController');
const router = require("express").Router();

// create activity
router.post('/', createMeeting);
router.delete('/:id', deleteMeeting);

module.exports = router;