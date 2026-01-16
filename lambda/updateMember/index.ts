import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const db = new DynamoDBClient({});

export const handler = async (event: any) => {
  const id = event.pathParameters.id;
  const body = JSON.parse(event.body);

  const updateExpression = [];
  const expressionValues: any = {};

  if (body.firstName) {
    updateExpression.push("firstName = :fn");
    expressionValues[":fn"] = { S: body.firstName };
  }

  if (body.lastName) {
    updateExpression.push("lastName = :ln");
    expressionValues[":ln"] = { S: body.lastName };
  }

  if (body.dateOfBirth) {
    updateExpression.push("dateOfBirth = :dob");
    expressionValues[":dob"] = { S: body.dateOfBirth };
  }

  if (body.dateOfDeath) {
    updateExpression.push("dateOfDeath = :dod");
    expressionValues[":dod"] = { S: body.dateOfDeath };
  }

  if (body.photoKey) {
  updateExpression.push("photoKey = :pk");
  expressionValues[":pk"] = { S: body.photoKey };
}

if (body.fatherId) {
  updateExpression.push("fatherId = :fid");
  expressionValues[":fid"] = { S: body.fatherId };
}

if (body.motherId) {
  updateExpression.push("motherId = :mid");
  expressionValues[":mid"] = { S: body.motherId };
}

if (body.spouseId) {
  updateExpression.push("spouseId = :sid");
  expressionValues[":sid"] = { S: body.spouseId };
}

if (body.gender) {
  updateExpression.push("gender = :g");
  expressionValues[":g"] = { S: body.gender };
}

if (body.generationLevel) {
  updateExpression.push("generationLevel = :gl");
  expressionValues[":gl"] = { N: String(body.generationLevel) };
}

if (body.childrenIds) {
  updateExpression.push("childrenIds = :cids");
  expressionValues[":cids"] = {
    L: body.childrenIds.map((id: string) => ({ S: id })),
  };
}


  await db.send(
    new UpdateItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: { memberId: { S: id } },
      UpdateExpression: `SET ${updateExpression.join(", ")}`,
      ExpressionAttributeValues: expressionValues,
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Updated" }),
  };
};
