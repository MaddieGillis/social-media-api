const { Schema, model } = require('mongoose');

const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },

        createdAt: {
            type: Date,
            default: Date.now
        },

        username: {
            type: String,
            required: true
        }

    }
);

thoughtSchema.set('toObject', { getters: true });
thoughtSchema.set('toJSON', { getters: true });

thoughtSchema.path('createdAt').getfunction(value) {
    return value.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;