const { createMeeting, deleteMeeting, updateMeeting, getMeetingById, getAllMeetings, getAllMeetingUsers } = require('../controllers/MeetingController');
const router = require("express").Router();

router.post('/', createMeeting);
router.delete('/:id', deleteMeeting);
router.put('/:id', updateMeeting);
router.get('/:id', getMeetingById);
router.get('/', getAllMeetings);
router.get('/users/:id', getAllMeetingUsers);

module.exports = router;