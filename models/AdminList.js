const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const AdminListSchema = mongoose.Schema({
  
    adminList: [{
        type: mongoose.Schema.Types.ObjectId,
      }],
  
});

BuildSchema.plugin(AutoIncrement, { inc_field: "build_number" });

module.exports = mongoose.model('adminList', AdminListSchema);
