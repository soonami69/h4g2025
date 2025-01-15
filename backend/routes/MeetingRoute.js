const { createMeeting, deleteMeeting, updateMeeting, getMeetingById } = require('../controllers/MeetingController');
const router = require("express").Router();

router.post('/', createMeeting);
router.delete('/:id', deleteMeeting);
router.put('/:id', updateMeeting);
router.get('/:id', getMeetingById);

module.exports = router;