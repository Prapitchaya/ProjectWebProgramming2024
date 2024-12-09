import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const EXTERNAL_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { searchQuery } = req.body; // Allow search query input

      // Construct the full API URL with the search query
      const url = `${EXTERNAL_API_URL}${searchQuery || ''}`;

      // Fetch data from the external API
      const response = await fetch(url);
      const data = await response.json();

      // Check if meals are found
      if (!data.meals) {
        return res.status(400).json({ message: 'No recipes found' });
      }

      // Map and store recipes in the database
      const recipes = data.meals.map((meal: any) => ({
        title: meal.strMeal,
        description: meal.strInstructions,
        content: meal.strCategory || 'No content', // Optional fallback for category
      }));

      // Use Prisma to create multiple records
      await prisma.recipe.createMany({ data: recipes });

      // Respond with success
      res.status(200).json({ message: 'Recipes imported successfully' });
    } catch (error) {
      console.error('Error occurred during recipe import:', error);

      // Detailed error response for debugging
      res.status(500).json({
        message: 'Failed to fetch and import recipes',
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : null,
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
