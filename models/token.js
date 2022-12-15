const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    rquired: true,
    ref: "user",
    unique: true,
  },
    token: {
        type: String,
        rquired: true,
    },
      createdAt: {
          type: Date,
          default: Date.now(),
          expires: 3600 // 1 hour
    },

});

// const TourModel = mongoose.model('Tour', tourSchema);
// export default TourModel;

module.exports = mongoose.model("token", tokenSchema);
