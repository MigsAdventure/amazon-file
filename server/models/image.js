const uuid = require('uuid');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const path = require('path');

const BUCKET_NAME = 'amaz-bucket';
const AWS_URL_BASE = 'https://s3-us-west-1.amazonaws.com';

const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  key: { type: String, required: true },
});

imageSchema.statics.upload = function(fileObj, cb) {
  const { originalname, buffer } = fileObj;
  const ext = path.extname(originalname);
  const key = uuid() + ext;
  const params = {
    Bucket: BUCKET_NAME,
    key: key,
    ACL: 'public-read',
    Body: buffer,
  };

  // save data to mongodb
  s3.putObject(params, (err, result) => {
    if (err) return cb(err);
    const url = `${AWS_URL_BASE}/${BUCKET_NAME}/${key}`;
    this.create({ name: originalname, url, key }, cb);
  });
};

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
