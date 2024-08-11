import express from "express";
import { filterImageFromURL, deleteLocalFiles } from "../util/util.js";

export const router = express.Router();

router.get("/filteredimage", async (req, res) => {
  const image_url = req.query.image_url;

  // validate the image_url query
  if (!image_url) {
    return res.status(400).send("Image URL is required");
  }

  try {
    // call filterImageFromURL(image_url) to filter the image
    const filteredPath = await filterImageFromURL(image_url);

    // send the resulting file in the response
    res.status(200).sendFile(filteredPath, function (err) {
      if (err) {
        console.error("Error sending file:", err);
        return res.status(500).send("Error sending file");
      }
      // delete the file after sending it
      deleteLocalFiles([filteredPath]);
    });
  } catch (error) {
    console.error("Error filtering image:", error);
    res.status(500).send("Error filtering image");
  }
});
