const cloudinaryV2 = require('cloudinary').v2;
const md5 = require('md5');
const DatauriParser = require('datauri/parser');
const path = require('path');

const FileStorageServices = require('../interfaces/file-storage-services');
const FileStorageServicesResponse = require('../../../application/payloads/file-storage-services-response');

function parseFileToDataUriContent(file) {
  const dataUri = new DatauriParser().format(
    path.extname(file.originalname).toString(),
    file.buffer
  );
  return dataUri.content;
}

module.exports = class CloudinaryStorageServices extends FileStorageServices {
  static ROOT_FOLDER = 'evalup';

  configCloudinary() {
    cloudinaryV2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async isFileCorrectlyUploaded(uploadedFile, responseEtag) {
    const uploadedFileEtag = md5(uploadedFile.buffer);
    return uploadedFileEtag === responseEtag;
  }

  async saveFile(file, folder) {
    this.configCloudinary();

    const response = await cloudinaryV2.uploader.upload(
      parseFileToDataUriContent(file),
      {
        folder: `${CloudinaryStorageServices.ROOT_FOLDER}/${folder}`,
      }
    );
    const fileCorrectlyUploaded = await this.isFileCorrectlyUploaded(
      file,
      response.etag
    );
    if (!fileCorrectlyUploaded) {
      this.deleteFile(response.public_id);
      throw new Error('Unable to upload file');
    }

    return new FileStorageServicesResponse({
      url: response.secure_url,
      remoteId: response.public_id,
    });
  }

  async deleteFile(remoteId) {
    this.configCloudinary();

    await cloudinaryV2.uploader.destroy(remoteId);
    console.log(`File ${remoteId} successfully deleted`);
  }
};
