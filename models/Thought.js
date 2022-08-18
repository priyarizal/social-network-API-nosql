const mongoose = require("mongoose");


const thoughtsSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            getter: true, 
        },
        username: { type: String },

        reactions: [reactionSchema],

        toJSON: {
            virtuals: true,
        },
        id: false
    }

)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.friends.length;
});
