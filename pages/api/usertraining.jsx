import { db } from "@/app/lib/firebase/firebase";

export default async function handler(req, res) {
  const { uid } = req.query;
  const userDocRef = db.collection("users").doc(uid);
  const userDoc = await userDocRef.get();

  if (!userDoc.exists) {
    return res.status(404).json({ message: "User not found" });
  }

  const userData = userDoc.data();
  const trainingPlan = userData.trainingPlan;
  return res.status(200).json(trainingPlan);
}
