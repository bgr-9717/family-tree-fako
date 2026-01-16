import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({});

export const handler = async (event: any) => {
  const { memberId, fileType } = JSON.parse(event.body);

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: `photos/${memberId}.jpg`,    // Could also use fileType
    ContentType: fileType,
  });

  const url = await getSignedUrl(client, command, { expiresIn: 300 }); // 5 minutes

  return {
    statusCode: 200,
    body: JSON.stringify({
      uploadUrl: url,
      objectKey: `photos/${memberId}.jpg`,
    }),
  };
};
