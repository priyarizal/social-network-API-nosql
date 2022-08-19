const { Thought, User } = require('../models');


module.exports = {
    // gets all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    //gets single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Could not find thought with this ID!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // creates---posts a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'Comment was created, but no user found with the ID'
                    })
                    : res.json('Your comment has now been posted')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //updates an existing thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No comment found with this ID' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //deleted an existing thought by id
    deleteThought(req, res) {
        Thought.findOneAndRemove(
            { _id: req.params.thoughtId },
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No comment found with the ID' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Your comment was created, but we could not find a user with this ID!' })
                    : res.json({ message: 'comment was successfully deleted' })
            )
            .catch((err) => res.status(500).json(err));
    },

    // /api/thoughts/:thoughtId/reactions

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Oh no, the thought with this ID was not found!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },


    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Sorry, I did not find said reaction' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};