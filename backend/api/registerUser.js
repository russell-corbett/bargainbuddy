import admin from '../../firebaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token } = req.body;

  try {
    // Verify the ID token on the server side
    const decodedToken = await admin.auth().verifyIdToken(token);
    const mailAddress = decodedToken.email;
    const userHalf = email.split('@')[0];

    const response = await axios.post(
        "http://localhost:3001/createUser",
        {
            email: mailAddress,
            password: password,
            userName: userHalf,
            Token: token
        }
    )
    
    // If needed, create a user record in your database or perform other admin tasks
    console.log(`User ${decodedToken.uid} registered with email: ${email} and username: ${userName}`);
    
    // Return a success message or the user data
    return res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
