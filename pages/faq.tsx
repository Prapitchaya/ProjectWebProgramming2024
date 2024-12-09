import Link from 'next/link';
import Layout from '../components/Layout'; // Import your Layout component
import '../styles/globals.css';

const FAQ = () => {
  return (
    <Layout>
      <div className="bg-purple-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-purple-700 mb-4">Frequently Asked Questions</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-semibold text-purple-700">1. How do I post a recipe?</h3>
            <p className="text-lg text-purple-600">
              To submit a recipe, you must first sign up for an account. Once you’re logged in, you can
              navigate to the “Post” section and fill out the form with your recipe details.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-purple-700">2. Can I edit my submitted recipe?</h3>
            <p className="text-lg text-purple-600">
              Yes! After submitting a recipe, you can always edit it by going to your profile and selecting the
              recipe you’d like to modify.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-purple-700">3. How can I search for recipes?</h3>
            <p className="text-lg text-purple-600">
              You can search for recipes by using the search bar at the top of the page. Simply enter a keyword or
              ingredient, and we will show you matching recipes from our platform.
            </p>
          </div>
        </div>
      </div>
      <div>
        <Link
          href="/homepage"
          className="bg-purple-600 text-white p-2 rounded-lg shadow-md hover:bg-purple-700 mb-4 top-4 "
        >
          Back to Home
        </Link>
      </div>
    </Layout>
  );
};

export default FAQ;
