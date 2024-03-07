import admin from "@/app/lib/firebase/firebase";

export default async function handler(req, res) {
  try {
    const { email, password } = req.body;

    // Validate form data
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const userRecord = await admin.auth().getUserByEmail(email);

    res.status(200).json({
      message: "User signed in successfully",
      user: userRecord.toJSON(),
    });
  } catch (error) {
    // Handle errors
    console.error("Error signing in user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while signing in the user" });
  }
}
