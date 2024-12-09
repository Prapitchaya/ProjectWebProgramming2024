import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        // Fetch the recipes with the associated author's name
        const recipes = await prisma.recipe.findMany({
          include: {
            author: { // Assuming 'author' is the relation to the User model
              select: {
                name: true,  // Get the name of the user (author)
              },
            },
          },
        });
        res.status(200).json(recipes);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recipes' });
      }
      break;

    case 'POST':
      try {
        // Assuming that 'userId' is passed from the frontend (e.g., from session or auth)
        const { title, description, content, userId } = req.body;

        // Check if the userId is provided and valid
        if (!userId) {
          return res.status(400).json({ error: 'User ID is required' });
        }

        // Create the new recipe and associate it with the author (user)
        const newRecipe = await prisma.recipe.create({
          data: {
            title,
            description,
            content,
            author: { connect: { id: userId } }, // Associate the user with the recipe
          },
        });

        res.status(201).json(newRecipe);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create recipe' });
      }
      break;

    case 'PUT':
      try {
        const { id, title, description, content } = req.body;
        const updatedRecipe = await prisma.recipe.update({
          where: { id: Number(id) },
          data: { title, description, content },
        });
        res.status(200).json(updatedRecipe);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update recipe' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        await prisma.recipe.delete({ where: { id: Number(id) } });
        res.status(200).json({ message: 'Recipe deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete recipe' });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}
