import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class PersonTable extends Construct {
  public readonly table: dynamodb.Table;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.table = new dynamodb.Table(this, 'FamilyTreeTable', {
      tableName: 'FakoFamilyTree',

      partitionKey: {
        name: 'PK',
        type: dynamodb.AttributeType.STRING,
      },

      sortKey: {
        name: 'SK',
        type: dynamodb.AttributeType.STRING,
      },

      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // demo only
    });
  }
}
