import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuid } from "uuid";

const db = new DynamoDBClient({});

export const handler = async (event: any) => {
  try {
    const body = JSON.parse(event.body);
    const memberId = uuid();

    await db.send(
      new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
          memberId: { S: memberId },
          firstName: { S: body.firstName },
          lastName: { S: body.lastName },
          dateOfBirth: { S: body.dateOfBirth },
        },
      })
    );

    return {
      statusCode: 201,
      body: JSON.stringify({ memberId }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
