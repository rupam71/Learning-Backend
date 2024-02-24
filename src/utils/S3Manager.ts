import AWS from "aws-sdk";

class S3Manager {
  private s3: AWS.S3;

  constructor() {
    AWS.config.update({ region: "ap-south-1" });
    this.s3 = new AWS.S3({
      apiVersion: "2006-03-01",
    });
  }

  public async uploadFile(bucketName: string, key: string, file: Buffer) {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucketName,
      Key: key,
      Body: file,
      ContentType: "image/png",
    };

    console.log({ params });

    // return this.s3.upload(params, function (err, data) {
    //   if (err) {
    //     console.log("Error", err);
    //     return ''
    //   }
    //   if (data) {
    //     return data.Location
    //   }
    // });

    const rrr = await this.s3.upload(params).promise();
    return rrr.Location;
  }

  public async getFileUrl(bucketName: string, key: string): Promise<string> {
    const params: AWS.S3.GetObjectRequest = {
      Bucket: bucketName,
      Key: key,
    };

    return this.s3.getSignedUrlPromise("getObject", params);
  }

  public async deleteFile(bucketName: string, key: string): Promise<void> {
    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: bucketName,
      Key: key,
    };

    await this.s3.deleteObject(params).promise();
  }
}

export default S3Manager;
