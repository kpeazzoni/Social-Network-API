const { Schema, Types } = require('mongoose');
const format_date = require('../utils/helper')


const reactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        ldefault: Date.now(),
        get:timestamp=>format_date(timestamp)
    },
    }
);