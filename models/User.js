const { Schema, model } = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String, 
            required: true, 
            unique: true, 
            trim: true ,

        },
        
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i]
        },

        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],

       friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
       }] 
    }
)