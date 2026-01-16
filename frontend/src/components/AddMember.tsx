import { addMember } from "../api/members";

async function handleSubmit(memberData: any) {
  await addMember(memberData);
}
