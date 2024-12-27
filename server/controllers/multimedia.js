const User = require("../models/users");
const Sequelize = require("sequelize");
const AWS = require("aws-sdk");
require("dotenv").config();

const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

exports.sendFile = async (req, res, next) => {
  try {
    const file = req.file;
    const fileUrl = await uploadFileToS3(file.originalname, file.buffer);

    res.status(200).json({ success: true, fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};

uploadFileToS3 = async (fileName, fileContent) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
};
