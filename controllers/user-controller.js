const {User} = require('../models')

const userController = {

    //create user
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    
    //GET all users
    getAllUser(req, res) {
        User.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select("-__v")
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    
    //GET one user
    getUserById({params}, res) {
        User.findOne({_id: params.id })
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select("-__v")
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: "Error User Not Found"});
                return;
            }
        
        res.json(dbUserData)
    })
    
    .catch(err => {
        console.log(err);
        res.status(400).json(err)
    })
},

//PUT one user

updateUser({params, body}, res) {
    User.findOneAndUpdate({_id: params.id}), body, {new: true, runValidators: true}
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: "Error User Not Found"});
            return;
        }
        
        res.json(dbUserData);
    })
    .catch(err => res.json(err))
},

//DELETE one user

deleteUser({params}, res) {
    User.findOneAndDelete({_id: params.id})
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: "Error User Not Found"});
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => res.json(err));
},

//Add friend

addFriend({params}, res) {
    User.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
    .populate({path: 'friends', select: '-__v'})
    .select('-__v')
    then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: "Error User Not Found"});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},

//Delete friend

deleteFriend({ params }, res) {
    User.findOneAndUpdate({_id: params}, {$pull: { friends: params.friendId}}, {new: true})
    .populate({path: 'friends', select: '-__v'})
    .select('-__v')
    .then(dbUserData =>{
        if(!dbUserData) {
            res.status(404).json({message: "Error User Not Found"});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
}

};

module.exports = userController;