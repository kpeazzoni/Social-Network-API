const { Schema, Types, model } = require('mongoose');
const format_date = require('../utils/helper')
const ReactionSchema = require('./Reaction');
const ThoughtSchema = require('./Thought');

const thoughtSchema = new Schema(
    {
thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
},
createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
    get:timestamp=>format_date(timestamp)
},
username: {
    type: String,
    required: true,
},
reactions: [
    ReactionSchema
],
},
{
    toJSON: {
        virturals: true,
    },
    id: false
}
);

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.

thoughtSchema
.virtual('reactionCount')
.get(function () {
return `${this.reactions.length}`;
});

// initialize our thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;