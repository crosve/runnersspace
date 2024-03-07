import admin from "@/app/lib/firebase/firebase";
import { db } from "@/app/lib/firebase/firebase";

export default async function handler(req, res) {
  try {
    const { username, password, email } = req.body;
    // email = email.trim();

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: username, // Set the displayName to the username
    });

    await db.collection("users").doc(userRecord.uid).set({
      email: userRecord.email,
      username: userRecord.displayName,
    });

    // Send a success response with the created user data
    res.status(200).json({
      message: "User created successfully",
      user: userRecord.toJSON(),
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
}
