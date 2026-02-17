/**
 * Footer component for the CRT Solver application.
 *
 * Displays a small footer text with a link to related projects.
 *
 * @example
 * return <Footer />
 *
 * @returns {React.ReactElement} The footer section element
 */
const Footer: React.FC = (): React.ReactElement => {
  return (
    <footer className="mt-8 text-center">
      <p className="text-sm text-gray-500">
        Check out my{' '}
        <a
          href="https://zamilbahri.github.io/fast-exponentiation"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-300 hover:text-purple-200 transition-colors underline"
        >
          Fast Exponentiation calculator
        </a>
        !
      </p>
    </footer>
  );
};

export default Footer;
