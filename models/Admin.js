const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const AdminSchema = mongoose.Schema({
  
    notifications: [{
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

BuildSchema.plugin(AutoIncrement, { inc_field: "build_number" });

module.exports = mongoose.model('adminList', AdminSchema);
