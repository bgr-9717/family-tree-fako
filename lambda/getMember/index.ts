import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const db = new DynamoDBClient({});



export const handler = async (event: any) => {
  const id = event.pathParameters?.id;

  const response = await db.send(
    new GetItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: { memberId: { S: id } },
    })
  );

  if (!response.Item) {
    return { statusCode: 404, body: JSON.stringify({ message: "Not found" }) };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      memberId: response.Item.memberId.S,
      firstName: response.Item.firstName?.S,
      lastName: response.Item.lastName?.S,
      dateOfBirth: response.Item.dateOfBirth?.S,
      dateOfDeath: response.Item.dateOfDeath?.S ?? null,
      photoKey: response.Item.photoKey?.S ?? null,
      
      fatherId: response.Item.fatherId?.S ?? null,
      motherId: response.Item.motherId?.S ?? null,
      spouseId: response.Item.spouseId?.S ?? null,
      gender: response.Item.gender?.S ?? null,
      generationLevel: response.Item.generationLevel?.N
      ? Number(response.Item.generationLevel.N)
      : null,      childrenIds: response.Item.childrenIds?.L?.map(c => c.S) ?? [],

      

    }),
  };
};
