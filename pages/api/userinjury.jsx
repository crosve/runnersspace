import { db } from "@/app/lib/firebase/firebase";

export default async function handler(req, res) {
  const { uid } = req.query;

  if (!uid) {
    return res.status(400).json({ message: "Missing UID parameter" });
  }

  const userDocRef = db.collection("users").doc(uid);
  const userDoc = await userDocRef.get();

  if (!userDoc.exists) {
    return res.status(404).json({ message: "User not found" });
  }

  const userData = userDoc.data();
  const injuryPlan = userData.injuryPlan;

  return res.status(200).json(injuryPlan);
}
