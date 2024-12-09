/* eslint-disable react/no-unescaped-entities */
import "../styles/globals.css";
import Layout from "../components/Layout"; // Import your Layout component
import Link from "next/link";

const Contact = () => {
  return (
    <Layout>
      <div className="bg-purple-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-purple-700 mb-4">
          Contact Us
        </h2>

        <p className="text-lg text-purple-600 mb-6">
          Feel free to reach out to me through any of the following platforms.
          I'd love to connect with you!
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-semibold text-purple-700">Facebook</h3>
            <p className="text-lg text-purple-600">
              <a
                href="https://www.facebook.com/dear.darkroze/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline"
              >
                Prapitchaya Tantivit
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-purple-700">Discord</h3>
            <p className="text-lg text-purple-600">diavoletta</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-purple-700">Line</h3>
            <p className="text-lg text-purple-600">@prapitchaya</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-purple-700">Email</h3>
            <p className="text-lg text-purple-600">
              <a
                href="mailto:nadiatantiwit@gmail.com"
                className="text-purple-600 hover:underline"
              >
                nadiatantiwit@gmail.com
              </a>{" "}
              or{" "}
              <a
                href="mailto:s6530613019@phuket.psu.ac.th"
                className="text-purple-600 hover:underline"
              >
                s6530613019@phuket.psu.ac.th
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-purple-700">Github</h3>
            <p className="text-lg text-purple-600">
              <a
                href="https://github.com/Prapitchaya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline"
              >
                Prapitchaya
              </a>
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

export default Contact;
