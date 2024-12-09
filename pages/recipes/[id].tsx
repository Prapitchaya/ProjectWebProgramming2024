import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // To get the recipe ID from the URL
import Layout from '../../components/Layout'; // Import Layout component

interface Recipe {
  id: number;
  title: string;
  description: string;
  author: {
    name: string;
  };
}

export default function RecipeDetail() {
  const router = useRouter();
  const { id } = router.query; // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If the ID is not yet available, wait until it's fetched
    if (!id) return;

    const fetchRecipe = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/recipes/${id}`);
        const data = await res.json();

        if (data) {
          setRecipe(data);
        } else {
          setError('Recipe not found');
        }
      } catch (error) {
        setError('Error fetching recipe details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (isLoading) {
    return <p className="text-center">Loading recipe...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!recipe) {
    return <p className="text-center">Recipe not found.</p>;
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-4">{recipe.title}</h2>
        <p className="text-center text-gray-500 mb-4">By {recipe.author.name}</p>
        <div className="p-4 bg-gray-100 rounded-md shadow-md">
          <p className="text-lg">{recipe.description}</p>
        </div>
        <div className="mt-6 text-center">
          <a
            href="/recipes"
            className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700"
          >
            Back to Recipes
          </a>
        </div>
      </div>
    </Layout>
  );
}
