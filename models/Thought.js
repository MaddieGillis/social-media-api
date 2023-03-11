const { Schema, model, Types } = require('mongoose');

const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId();
        },

        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },

        username: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

//Sets timestamps for reactionSchema
reactionSchema.set('toObject', { getters: true }); 
reactionSchema.set('toJSON', { getters: true }); 

reactionSchema.path('createdAt').get(function(value) {
  return value.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
});

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
        }.

        reactions: [reactionScheama]

    }
);


//Sets timesstamps for thoughtSchema
thoughtSchema.set('toObject', { getters: true });
thoughtSchema.set('toJSON', { getters: true });

thoughtSchema.path('createdAt').getfunction(value) {
    return value.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;