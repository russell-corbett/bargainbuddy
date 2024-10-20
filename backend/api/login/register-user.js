// pages/api/register-user.js
import { admin } from '../../firebaseAdmin.js';

//import prisma from '../../lib/prismaClient';
const prisma = new prismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      // Verify Firebase token
      const decodedToken = await admin.auth().verifyIdToken(token);
      const userEmail = decodedToken.email;

      // Check if user already exists in the database
      const existingUser = await prisma.user.findUnique({
        where: { email: userEmail },
      });

      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      // Create a new user in the database
      const newUser = await prisma.user.create({
        data: { email: userEmail },
      });

      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
