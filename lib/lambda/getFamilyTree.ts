import { DynamoDB } from 'aws-sdk';

const ddb = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME!; // e.g., FamilyTree

type MemberNode = {
  id: string;
  name: string;
  children: MemberNode[];
};

export const handler = async () => {
  try {
    // 1. Fetch all items from DynamoDB
    const data = await ddb.scan({ TableName: TABLE_NAME }).promise();
    const items = data.Items || [];

    // 2. Build a lookup map for nodes
    const nodesMap: Record<string, MemberNode> = {};
    items.forEach((item) => {
      if (item.PK.startsWith('MEMBER#') && item.SK === 'INFO') {
        nodesMap[item.PK] = { id: item.PK, name: item.Name, children: [] };
      }
    });

    // 3. Attach children to parents
    items.forEach((item) => {
      if (item.SK.startsWith('CHILD#') && nodesMap[item.PK]) {
        const childNode = nodesMap[`MEMBER#${item.SK.split('#')[1]}`];
        if (childNode) {
          nodesMap[item.PK].children.push(childNode);
        }
      }
    });

    // 4. Find root nodes (members with no parent)
    const roots = Object.values(nodesMap).filter((node) => {
      const hasParent = items.some(
        (item) => item.SK.startsWith('PARENT#') && node.id === `MEMBER#${item.SK.split('#')[1]}`
      );
      return !hasParent;
    });

    return {
      statusCode: 200,
      body: JSON.stringify(roots),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};
