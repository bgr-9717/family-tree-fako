import { Construct } from 'constructs';
import { Bucket, BucketAccessControl, BlockPublicAccess, HttpMethods } from 'aws-cdk-lib/aws-s3';

export class PhotosBucket extends Construct {
    public readonly bucket: Bucket;

    constructor(scope: Construct, id: string){
        super(scope, id);

        this.bucket = new Bucket(this, 'FamilyPhotosBucket',{
            bucketName: 'family-tree-photos-bucket',

            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,

            accessControl: BucketAccessControl.PRIVATE,

            cors: [
                {
                    allowedMethods: [
                        HttpMethods.GET,
                        HttpMethods.PUT

                    ],
                    allowedOrigins: ['*'],
                    allowedHeaders: ['*'],
                },
            ],
        });

    }
}
