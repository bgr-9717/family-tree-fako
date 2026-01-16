
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PersonTable } from './storage/dynamodb';
import {PhotosBucket } from './storage/photos-bucket';
import { AuthCognito } from './auth/cognito';
import { LambdaFunctions } from './lambda/lambda-functions';
import {  HttpLambdaIntegration,} from "aws-cdk-lib/aws-apigatewayv2-integrations";
import {
  HttpApi,
  HttpMethod,
  CorsHttpMethod,
} from 'aws-cdk-lib/aws-apigatewayv2';

import {
  HttpUserPoolAuthorizer,
} from 'aws-cdk-lib/aws-apigatewayv2-authorizers';







//import {PersonTable} from './storage/dynamodb';  
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class FamilyTreeFakoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //DynamoDB


    const personTable = new PersonTable(this, 'PersonTableConstruct');
    //Photos s3 Bucket
    const photosBucket = new PhotosBucket (this, 'PhotosBucketConstruct')

     // Cognito Authentication
    const auth = new AuthCognito(this, 'AuthConstruct');

  const lambdas = new LambdaFunctions(this, 'LambdaConstruct', {
  tableName: personTable.table.tableName,
   bucketName: photosBucket.bucket.bucketName, 
   });

   const api = new HttpApi(this, 'FamilyTreeApi', {
  apiName: 'family-tree-api',
  corsPreflight: {
    allowHeaders: ['Authorization', 'Content-Type'],
    allowMethods: [
      CorsHttpMethod.GET,
      CorsHttpMethod.POST,
      CorsHttpMethod.PUT,
      CorsHttpMethod.DELETE,
    ],
    allowOrigins: ['*'], // For development
  },
});




const getMemberIntegration = new HttpLambdaIntegration(
  'GetMemberIntegration',
  lambdas.getMember
);

const listMembersIntegration = new HttpLambdaIntegration(
  'ListMembersIntegration',
  lambdas.listMembers
);

const updateMemberIntegration = new HttpLambdaIntegration(
  'UpdateMemberIntegration',
  lambdas.updateMember
);

const deleteMemberIntegration = new HttpLambdaIntegration(
  'DeleteMemberIntegration',
  lambdas.deleteMember
);

const uploadUrlIntegration = new HttpLambdaIntegration(
  'UploadUrlIntegration',
  lambdas.generateUploadUrl
);

/*const frontendHosting = new FrontendHosting(this, 'FrontendHosting', '../frontend/build');

new cdk.CfnOutput(this, 'FrontendURL', {
  value: frontendHosting.distribution.distributionDomainName,
});*/




const authorizer = new HttpUserPoolAuthorizer(
  'CognitoAuthorizer',
  auth.userPool,
  {
    userPoolClients: [auth.userPoolClient],
  }
);




api.addRoutes({
  path: '/members',
  methods: [HttpMethod.POST],
  integration: new HttpLambdaIntegration(
    'CreateMemberIntegration',
    lambdas.createMember
  ),
  authorizer, // 🔐 PROTECTED
});



// Get a single member
api.addRoutes({
  path: '/members/{id}',
  methods: [HttpMethod.GET],
  integration: getMemberIntegration,
});

// List all members
api.addRoutes({
  path: '/members',
  methods: [HttpMethod.GET],
  integration: listMembersIntegration,
});

// Update a member
api.addRoutes({
  path: '/members/{id}',
  methods: [HttpMethod.PUT],
  integration: updateMemberIntegration,
});

// Delete a member
api.addRoutes({
  path: '/members/{id}',
  methods: [HttpMethod.DELETE],
  integration: deleteMemberIntegration,
});

// Request S3 upload URL
api.addRoutes({
  path: '/upload-url',
  methods: [HttpMethod.POST],
  integration: uploadUrlIntegration,
});

api.addRoutes({
  path: '/tree',
  methods: [HttpMethod.GET],
  integration: new HttpLambdaIntegration(
    'GetFamilyTreeIntegration',
    lambdas.getFamilyTree
  ),
});


 



  personTable.table.grantReadData(lambdas.getMember);
  personTable.table.grantReadData(lambdas.listMembers);
  personTable.table.grantReadWriteData(lambdas.updateMember);
  personTable.table.grantReadWriteData(lambdas.deleteMember);


// IAM permission for Lambda → DynamoDB
personTable.table.grantReadWriteData(lambdas.createMember);

photosBucket.bucket.grantPut(lambdas.generateUploadUrl);


    
   

new cdk.CfnOutput(this, 'ApiUrl', {
  value: api.apiEndpoint,
});

    
  }
}
