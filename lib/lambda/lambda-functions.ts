import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';



export interface LambdaProps {
  tableName: string;
  bucketName: string;  
}


export class LambdaFunctions extends Construct {
  public readonly createMember: NodejsFunction;
  public readonly getMember: NodejsFunction;
  public readonly listMembers: NodejsFunction;
  public readonly updateMember: NodejsFunction;
  public readonly deleteMember: NodejsFunction;
  public readonly generateUploadUrl: NodejsFunction;
  public readonly getFamilyTree: NodejsFunction;


  constructor(scope: Construct, id: string, props: LambdaProps) {
    super(scope, id);

    this.createMember = new NodejsFunction(this, 'CreateMemberFn', {
      runtime: Runtime.NODEJS_18_X,
      entry: join(__dirname, '../../lambda/createMember/index.ts'),
      environment: {
        TABLE_NAME: props.tableName,
      },
    });

    this.getMember = new NodejsFunction(this, 'GetMemberFn', {
  runtime: Runtime.NODEJS_18_X,
  entry: join(__dirname, '../../lambda/getMember/index.ts'),
  environment: { TABLE_NAME: props.tableName },
});

this.listMembers = new NodejsFunction(this, 'ListMembersFn', {
  runtime: Runtime.NODEJS_18_X,
  entry: join(__dirname, '../../lambda/listMembers/index.ts'),
  environment: { TABLE_NAME: props.tableName },
});

this.updateMember = new NodejsFunction(this, 'UpdateMemberFn', {
  runtime: Runtime.NODEJS_18_X,
  entry: join(__dirname, '../../lambda/updateMember/index.ts'),
  environment: { TABLE_NAME: props.tableName },
});

this.deleteMember = new NodejsFunction(this, 'DeleteMemberFn', {
  runtime: Runtime.NODEJS_18_X,
  entry: join(__dirname, '../../lambda/deleteMember/index.ts'),
  environment: { TABLE_NAME: props.tableName },
});

this.generateUploadUrl = new NodejsFunction(this, 'GenerateUploadUrlFn', {
  runtime: Runtime.NODEJS_18_X,
  entry: join(__dirname, '../../lambda/generateUploadUrl/index.ts'),
  environment: {
    BUCKET_NAME: props.bucketName,
  },
});

this.getFamilyTree = new NodejsFunction(this, 'GetFamilyTreeFn', {
  runtime: Runtime.NODEJS_18_X,
  entry: join(__dirname, '../../lambda/getFamilyTree/index.ts'),
  environment: {
    TABLE_NAME: props.tableName,
  },
});




  }
}
