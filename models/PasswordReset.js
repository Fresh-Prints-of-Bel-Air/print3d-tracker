const mongoose = require('mongoose');

const PasswordResetSchema = mongoose.Schema({ //should create an entry automatically for a user upon account creation
    email: { 
        type: String,
        required: true,
        unique: true,
    },
    passwordResetRequest: {
        type: Number, //randomly generated, possibly a uuid?
    },
    createdAt: { 
        type: Date, 
        expires: '2d', 
        default: Date.now,
    }
});

module.exports = mongoose.model('PasswordReset', PasswordResetSchema);
