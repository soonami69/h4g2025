const { createMeeting, deleteMeeting, updateMeeting, getMeetingById, getAllMeetings, getAllUserMeetings } = require('../controllers/MeetingController');
const router = require("express").Router();

router.post('/', createMeeting);
router.delete('/:id', deleteMeeting);
router.put('/:id', updateMeeting);
router.get('/:id', getMeetingById);
router.get('/', getAllMeetings);
router.get('/users/:id', getAllUserMeetings);

module.exports = router;