const { createMeeting, deleteMeeting, updateMeeting, getMeetingById, getAllMeetings } = require('../controllers/MeetingController');
const router = require("express").Router();

router.post('/', createMeeting);
router.delete('/:id', deleteMeeting);
router.put('/:id', updateMeeting);
router.get('/:id', getMeetingById);
router.get('/', getAllMeetings);

module.exports = router;