import { APIGatewayProxyResultV2 } from "aws-lambda";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const db = new DynamoDBClient({});

export const handler = async (
  event: any
): Promise<APIGatewayProxyResultV2> => {
  const claims = event.requestContext?.authorizer?.jwt?.claims;

  if (!claims) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: "Forbidden" }),
    };
  }

  try {
    const result = await db.send(
      new ScanCommand({
        TableName: process.env.TABLE_NAME,
      })
    );

    const items =
      result.Items?.map((item) => ({
        memberId: item.memberId.S,
        firstName: item.firstName.S,
        lastName: item.lastName.S,
        dateOfBirth: item.dateOfBirth?.S ?? null,
        dateOfDeath: item.dateOfDeath?.S ?? null,
        photoKey: item.photoKey?.S ?? null,
        fatherId: item.fatherId?.S ?? null,
        motherId: item.motherId?.S ?? null,
        spouseId: item.spouseId?.S ?? null,
        gender: item.gender?.S ?? null,
        generationLevel: item.generationLevel?.N
          ? Number(item.generationLevel.N)
          : null,
        childrenIds: item.childrenIds?.L?.map((c) => c.S) ?? [],
      })) ?? [];

    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};




