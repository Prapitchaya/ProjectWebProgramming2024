import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Recipe ID is required' });
  }

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: Number(id) },
      include: {
        author: true, // Include the author information
      },
    });

    if (recipe) {
      return res.status(200).json(recipe);
    } else {
      return res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
