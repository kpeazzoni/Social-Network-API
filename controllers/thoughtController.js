const { Thought, Reaction, User } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
//find all thoughts
getThought(req, res) {
    Thought.find()
    .then((thought)=> res.json(thought))
    .catch((err)=> res.status(400).json(err))
},
// find a single thought by id
getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .select('-__v')
    .then((thought)=>
    !thought
    ? res.status(404).json({ message: 'No thought'})
    : res.json(thought)
    )    
},
// create a new thought
createThought(req, res) {
    Thought.create(req.body)
  .then((thought)=> res.json(thought))
  .catch((err)=> res.status(400).json(err))
},
// update a thought by id
updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {$set: req.body}, 
        { new: true, runValidators: true })
  .then((thought)=>
  !thought
  ? res.status(404).json({ message: 'No thought found with this id'})
    : res.json(thought)
    )
  .catch((err)=> res.status(400).json(err))
},
// delete a thought
deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thought) =>
    !thought
  ? res.status(404).json({ message: 'No thought found with this id'})
  : User.findOneAndUpdate(
    {thoughts: req.params.thoughtId},
    {$pull: {thoughts: req.params.thoughtId}},
    {new: true}
  )
    )
  },

  // add reaction to thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {$addToSet: {reactions: req.body}}, 
        { new: true, runValidators: true })
 .then((reaction)=>
 !thought
 ? res.status(404).json({ message: 'No thought found with this id'})
 : res.json(reaction)
 )
 .catch((err)=> res.status(400).json(err))
    },
};
