const API_URL = "https://YOUR_API_ID.execute-api.REGION.amazonaws.com";

export async function addMember(memberData: any) {
  const accessToken = sessionStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(`${API_URL}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(memberData),
  });

  if (!response.ok) {
    throw new Error("Failed to add member");
  }

  return response.json();
}
