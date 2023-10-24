const express = require('express');
const router = express.Router();

const {
  createSong,
  getAllSongs,
  getSingleSong,
  updateSong,
  deleteSong,
  // uploadImage,
} = require("../controllers/songController");


router.route("/").
post(createSong).
get(getAllSongs);

// router
//   .route('/uploadImage')
//   .post( uploadImage);

router.route("/:id").
get(getSingleSong).
patch(updateSong).
delete(deleteSong);



module.exports = router;
