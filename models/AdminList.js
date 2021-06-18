const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const AdminListSchema = mongoose.Schema({
  
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
      }],
  
});


module.exports = mongoose.model('adminList', AdminListSchema);
