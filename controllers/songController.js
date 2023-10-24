const Song = require("../models/Song");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");
const cloudinary = require("../utils/cloudinary");

const createSong = async (req, res) => {
  const { title, artist, description, category, duration, image } = req.body;

  try {
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "songList",
      });

      if (uploadedResponse) {
        const song = new Song({
          title,
          artist,
          description,
          category,
          duration,
          image: uploadedResponse,
        });

        const savedSong = await song.save();
        res.status(200).send(savedSong);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
  // req.body.user = req.user.userId;
  // const song = await Song.create(req.body);
  // res.status(StatusCodes.CREATED).json({ song });
};
const getAllSongs = async (req, res) => {
  const songs = await Song.find({});

  res.status(StatusCodes.OK).json({ songs, count: songs.length });
};
const getSingleSong = async (req, res) => {
  const { id: songId } = req.params;

  const song = await Song.findOne({ _id: songId });

  if (!song) {
    throw new CustomError.NotFoundError(`No song with id : ${songId}`);
  }

  res.status(StatusCodes.OK).json({ song });
};
const updateSong = async (req, res) => {
  const { id: songId } = req.params;

  try {
    const song = await Song.findOne({ _id: songId });

    if (!song) {
      throw new CustomError.NotFoundError(`No song with id: ${songId}`);
    }

    // // Check if an image URL is provided in the request body
    // if (req.body.image) {
    //   const uploadedResponse = await cloudinary.uploader.upload(
    //     req.body.image,
    //     {
    //       upload_preset: "songList",
    //       file: { resource_type: "image", type: "fetch", url: req.body.image }, // Use URL as the source
    //     }
    //   );

    //   if (uploadedResponse) {
    //     req.body.image = uploadedResponse.url; 
    //   }
    // }

    // Update the song with the new data
    const updatedSong = await Song.findOneAndUpdate({ _id: songId }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(StatusCodes.OK).json({ song: updatedSong });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};


const deleteSong = async (req, res) => {
  const { id: songId } = req.params;

  const song = await Song.findOne({ _id: songId });

  if (!song) {
    throw new CustomError.NotFoundError(`No song with id : ${songId}`);
  }

  await song.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Song removed." });
};

// const uploadImage = async (req, res) => {
//   if (!req.files) {
//     throw new CustomError.BadRequestError("No File Uploaded");
//   }
//   const productImage = req.files.image;

//   if (!productImage.mimetype.startsWith("image")) {
//     throw new CustomError.BadRequestError("Please Upload Image");
//   }

//   const maxSize = 1024 * 1024;

//   if (productImage.size > maxSize) {
//     throw new CustomError.BadRequestError(
//       "Please upload image smaller than 1MB"
//     );
//   }

//   const imagePath = path.join(
//     __dirname,
//     "../public/uploads/" + `${productImage.name}`
//   );
//   await productImage.mv(imagePath);
//   res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
// };

module.exports = {
  createSong,
  getAllSongs,
  getSingleSong,
  updateSong,
  deleteSong,
  // uploadImage,
};
