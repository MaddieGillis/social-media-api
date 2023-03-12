const router = require('express').Router();

const {
    createThought,
    getAllThought,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// /api/thought
router.route('/').get(getAllThought);

// /api/thought/:id
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

// /api/thought/:userId
router.route('/:userId').post(createThought);

// /api/thought/:thoughtId/reaction
router.route('/:thoughtId/reaction').post(addReaction);

// /api/thought/:thoughtId/:reactionId
router.route('/:thoughtId/:reactionId').delete(deleteReaction);



module.exports = router;