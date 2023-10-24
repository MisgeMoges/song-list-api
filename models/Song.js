const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide title"],
      maxlength: [100, "Title can not be more than 100 characters"],
    },
    artist: {
      type: String,
      required: [true, "Please provide artist name"],
      maxlength: [100, "Title can not be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide song description"],
      maxlength: [1000, "Description can not be more than 1000 characters"],
    },
    image: {
      type: Object,
      default: "/uploads/example.jpeg",
    },
    category: {
      type: String,
      required: [true, "Please provide song category"],
      enum: ["Rapping", "Electronic", "Religious"],
    },
    
      duration:{
        type:String,
        default:null

      }
   
   
  },
  { timestamps: true }
);


module.exports = mongoose.model('Song', SongSchema);
