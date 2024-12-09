import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Ensure prisma client is instantiated once per process

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed'); // Return 405 for non-POST requests
  }

  const { email, password } = req.body;
  

  // Find the user in the database
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' }); // If user doesn't exist
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials' }); // If password doesn't match
  }

  // If login is successful, return user data (including ID)
  return res.status(200).json({
    message: 'Login successful',
    user: { id: user.id, email: user.email }, // Send user ID and email
  });
  
}
