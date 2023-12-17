const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

function createS3UploaduseCase(req,res) {

  const s3Client = new S3Client({
    accesskey: "AKIAY4YMHWOQNHNR6CWP",
    secretkey:"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",
    region: 'AWS_S3_REGION'
  });

  async function execute(fileName, req.file) {
    const uniqueKey = (await generateRandomString(16)) + fileName;

    const response = await s3Client.send(
      new PutObjectCommand({
        Bucket: 'crm-s3bucket',
        Key: uniqueKey,
        Body: file,
      }),
    );

    const URL = (await configService.getOrThrow('AWS_CLOUD_FRONT')) + uniqueKey;
    return URL;
  }

  async function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  return { execute, generateRandomString };
}

module.exports = createS3UploaduseCase;
