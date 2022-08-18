const { ObjectId } = require("bson");
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

);

const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new ObjectId,
           
        },
        reactionBody: {
            type: String,
            required: true, 
            max: 280,
        },
        username: { type: String, required: true },

        reactions: [reactionSchema],

        createdAt: {
            type: Date,
            default: Date.now,
            getter: true, 
        },
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);


thoughtSchema.virtual('reactionCount').get(function () {
    return this.friends.length;
});
