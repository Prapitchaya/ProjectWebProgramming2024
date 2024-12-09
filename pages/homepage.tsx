import { useState, useEffect } from 'react';
import Layout from '../components/Layout'; // Import the Layout component
import { RecipeCard } from '../components/RecipeCard';
import { z } from 'zod'; // Import Zod for validation

interface Recipe {
  id: number;
  title: string;
  description: string;
  author: {
    id: number; // Make sure author has an id field
    name: string;
  };
}

// Define Zod schema for validating form inputs
const recipeSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description is too long"),
});

export default function Homepage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [newRecipeTitle, setNewRecipeTitle] = useState<string>('');
  const [newRecipeDescription, setNewRecipeDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string>('VISITOR'); // Default to VISITOR
  const [userId, setUserId] = useState<number | null>(null); // Store the userId

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem('userId');
    console.log("User ID from localStorage:", userIdFromLocalStorage);

    if (userIdFromLocalStorage) {
      const userIdParsed = parseInt(userIdFromLocalStorage);
      setUserId(userIdParsed);

      // Fetch the role from the backend (via an API call)
      const fetchUserRole = async () => {
        try {
          const res = await fetch(`/api/getUserRole?userId=${userIdParsed}`);
          const data = await res.json();

          if (data.role) {
            setRole(data.role);
          } else {
            setRole('VISITOR'); // Fallback to 'VISITOR' if no role found
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
          setRole('VISITOR'); // Fallback in case of an error
        }
      };

      fetchUserRole();
    } else {
      setRole('VISITOR'); // If no userId is found, set role to 'VISITOR'
    }

    // Fetch recipes
    const fetchRecipes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/recipes');
        const data = await res.json();

        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          setError('Failed to load recipes');
        }
      } catch (error) {
        setError('Error fetching recipes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleAddRecipe = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data using Zod schema
    const result = recipeSchema.safeParse({
      title: newRecipeTitle,
      description: newRecipeDescription,
    });

    if (!result.success) {
      // Display validation errors
      alert(`Error: ${result.error.errors.map(e => e.message).join(", ")}`);
      return;
    }

    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newRecipeTitle,
          description: newRecipeDescription,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setRecipes((prevRecipes) => [...prevRecipes, data]);
        setNewRecipeTitle('');
        setNewRecipeDescription('');
      } else {
        alert('Failed to add recipe');
      }
    } catch (error) {
      alert('An error occurred while adding the recipe.');
    }
  };

  const handleDeleteRecipe = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        const res = await fetch(`/api/recipes/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setRecipes(recipes.filter((recipe) => recipe.id !== id));
        } else {
          alert('Failed to delete recipe');
        }
      } catch (error) {
        alert('An error occurred while deleting the recipe.');
      }
    }
  };

  return (
    <Layout>
      <h2 className="text-3xl font-bold text-center mb-6">Post a New Recipe</h2>

      {role === 'VISITOR' && (
        <p className="text-center">You are a visitor. You can only view posts.</p>
      )}

      {role !== 'VISITOR' && (
        <div className="mb-6">
          <form onSubmit={handleAddRecipe}>
            <input
              type="text"
              placeholder="Recipe Title"
              value={newRecipeTitle}
              onChange={(e) => setNewRecipeTitle(e.target.value)}
              className="w-full p-3 mb-4 border-2 border-purple-500 rounded-md"
            />
            <textarea
              placeholder="Recipe Description"
              value={newRecipeDescription}
              onChange={(e) => setNewRecipeDescription(e.target.value)}
              className="w-full p-3 mb-4 border-2 border-purple-500 rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
            >
              Post
            </button>
          </form>
        </div>
      )}

      {isLoading ? (
        <p className="text-center">Loading recipes...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recipes.length === 0 ? (
            <p className="text-center">No recipes found.</p>
          ) : (
            recipes.map((recipe) => (
              <div key={recipe.id} className="border p-4 rounded shadow-lg bg-white relative">
                <RecipeCard recipe={recipe} />
                {role === 'ADMIN' && (
                  <button
                    onClick={() => handleDeleteRecipe(recipe.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white py-1 px-3 rounded-lg"
                  >
                    Delete
                  </button>
                )}
                {role === 'AUTHOR' && userId === recipe.author.id && (
                  <button
                    onClick={() => handleDeleteRecipe(recipe.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white py-1 px-3 rounded-lg"
                  >
                    Delete Your Post
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </Layout>
  );
}
