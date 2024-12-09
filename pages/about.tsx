import Link from 'next/link';
import Layout from '../components/Layout'; // Import your Layout component
import '../styles/globals.css';

const About = () => {
  return (
    <Layout>
      <div className="bg-purple-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-purple-700 mb-4">About Us</h2>
        <p className="text-lg text-purple-600">
          Welcome to the Recipe Sharing Platform! Our mission is to bring food lovers together by
          sharing recipes and culinary experiences. Whether you’re a professional chef or a home cook,
          you can find inspiration, share your favorite recipes, and learn from others. Join us in exploring
          the world of delicious food!
        </p>
        <p className="mt-4 text-lg text-purple-600">
          Our platform is designed to be a community where everyone can contribute their knowledge,
          learn new skills, and discover amazing recipes. We hope to inspire creativity in the kitchen and
          foster a love for cooking in every household.
        </p>
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

export default About;
