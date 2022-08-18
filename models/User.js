const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (email) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);
                },
                message: `Please enter a valid email address`
            },
        },
        thoughts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ]

    },
{
    toJSON: {
        virtuals: true,
        },
    id: false
}
)

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

//initializes our user model
const User = model('User', userSchema);



module.exports = User;