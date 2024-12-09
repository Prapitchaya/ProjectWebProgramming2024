/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import Layout from '../components/Layout'; // Import the Layout component
import { RecipeCard } from '../components/RecipeCard';

interface Recipe {
  id: number;
  title: string;
  description: string;
  author: {
    name: string;
  };
}

export default function Homepage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [newRecipeTitle, setNewRecipeTitle] = useState<string>('');
  const [newRecipeDescription, setNewRecipeDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string>('user');

  useEffect(() => {
    const userRole = localStorage.getItem('role') || 'user';
    setRole(userRole);

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
    if (!newRecipeTitle || !newRecipeDescription) {
      alert('Please fill in both the title and description.');
      return;
    }

    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newRecipeTitle, description: newRecipeDescription }),
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
              <div key={recipe.id} className="border p-4 rounded shadow-lg bg-white">
                <RecipeCard recipe={recipe} />
                {role === 'admin' && (
                  <button
                    onClick={() => handleDeleteRecipe(recipe.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white py-1 px-3 rounded-lg"
                  >
                    Delete
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
