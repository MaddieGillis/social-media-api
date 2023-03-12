const router = require('express').Router();

const {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/user-controller');

// /api/user
router.route('/').get(getAllUser).post(createUser);

// /api/user/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// /api/user/:userId/friends/:friendId
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
