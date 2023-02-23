const { Schema, Types } = require('mongoose');


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
    lastAccessed: { type: Date, default: Date.now },
},
username: {
    type: String,
    required: true,
},
reactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Reaction'
}
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

thoughtSchema.virtural('reactionCount')
.get(function(){
    return `${this.reactions.length}`;
});

const Thought = model('Thought', thoughtSchema)

model.exports = Thought;