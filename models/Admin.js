const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const AdminSchema = mongoose.Schema({
  
    notifications: [{ //these can be marked "Resolved" by any one admin, which will prevent them from cluttering the inbox of other admins
        text: String,
        dateCreated: Date,
        isRead: {
          type: Boolean,
          default: false,
        }
      }],
    
    registrationRequests: [{
        name: String,
        email: String,
    }]
  
});

//BuildSchema.plugin(AutoIncrement, { inc_field: "" }); //do we need increment numbers for these?

module.exports = mongoose.model('adminList', AdminSchema);
