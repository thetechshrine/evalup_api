const cloudinaryV2 = require('cloudinary').v2;
const md5 = require('md5');
const DatauriParser = require('datauri/parser');
const path = require('path');

const logger = require('../../logger');
const FileStorageServices = require('../interfaces/file-storage-services');
const FileStorageServicesResponse = require('../../../application/payloads/file-storage-services-response');
const { BadRequestError } = require('../../../application/helpers/errors');

function parseFileToDataUriContent(file) {
  const dataUri = new DatauriParser().format(path.extname(file.originalname).toString(), file.buffer);
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

  async saveFileResource(fileResource) {
    const { file, folder } = fileResource.toJSON();

    this.configCloudinary();

    const response = await cloudinaryV2.uploader.upload(parseFileToDataUriContent(file), {
      folder: `${CloudinaryStorageServices.ROOT_FOLDER}/${folder}`,
    });
    const fileCorrectlyUploaded = await this.isFileCorrectlyUploaded(file, response.etag);
    if (!fileCorrectlyUploaded) {
      this.deleteFile(response.public_id);
      throw new BadRequestError(`Unable to upload file ${JSON.parse(file)} to folder ${folder}`);
    }

    return new FileStorageServicesResponse({
      url: response.secure_url,
      remoteId: response.public_id,
    });
  }

  async deleteFileResource(remoteId) {
    this.configCloudinary();

    await cloudinaryV2.uploader.destroy(remoteId);
    logger.info(`cloudinary file ${remoteId} successfully deleted`);
  }
};
