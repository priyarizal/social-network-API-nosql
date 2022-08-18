const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
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
            thoughts: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Thought',
                }
            ],
            friends: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                }
            ]

        },
        toJSON: {
            virtuals: true,
        },
        id: false
    }
)

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

module.exports = User;