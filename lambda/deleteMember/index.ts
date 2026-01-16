import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";

const db = new DynamoDBClient({});

export const handler = async (event: any) => {
  const id = event.pathParameters.id;

  await db.send(
    new DeleteItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: { memberId: { S: id } },
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Deleted" }),
  };
};
