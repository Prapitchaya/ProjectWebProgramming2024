// RecipeCard.tsx
import '../styles/globals.css';

// RecipeCard.tsx
interface RecipeProps {
  recipe: {
    id: number;
    title: string;
    description: string;
    author?: {
      name: string;
    }; // Optional author field
  };
}

export const RecipeCard = ({ recipe }: RecipeProps) => {
  return (
    <div className="bg-white p-4 border rounded shadow-sm hover:shadow-md">
      <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
      <p className="text-gray-700 mb-2">{recipe.description}</p>
      <p className="text-gray-500 text-sm">
        By {recipe.author ? recipe.author.name : 'Unknown'} {/* Fallback to "Unknown" */}
      </p>
    </div>
  );
};
