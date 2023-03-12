const {Thought, User} = require('../models');

const thoughtController = {

    //Create Thought
    createThought({params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate({_id: params.userId}, {$push: {thought: _id}}, {new: true});
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: "Error User Not Found"});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },

    //GET all Thought

    getAllThought(req, res) {
        Thought.find({})
        .populate({path: 'reaction', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    },

    //GET one Thought

    getThoughtById({params}, res) {
        Thought.findOne({ _id: params.id })
        .populate({path: 'reaction', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'Error No Thought Found'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(errr => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //PUT one Thought

    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reaction', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'Error No Thought Found'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(404).json(err));
    },

    //DELETE one thought

    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'Error No Thought Found'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    //Add new Reaction

    addReaction({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({path: 'reaction', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'Error No Thought Found'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(404).json(err));
    },

    //Delete a Reaction

    deleteReaction({params}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reaction: {reactionId: params.reactionId}}}, {new: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'Error No Thought Found'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(404).json(err));
    }

};

module.exports = thoughtController;