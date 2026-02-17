import MathText from './MathText';

/**
 * Header component for the CRT Solver application.
 *
 * Displays the application title and provides a visual introduction to the
 * Chinese Remainder Theorem problem that the solver addresses.
 *
 
 * @example
 * return <Header />
 *
 * @returns {React.ReactElement} The header section element
 */
const Header: React.FC = (): React.ReactElement => {
  return (
    <header className="mb-12 text-center">
      <h1 className="text-4xl font-bold bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
        Chinese Remainder Theorem Solver
      </h1>

      <p className="mt-3 text-gray-300">
        Solve a system of modular equations of the form{' '}
        <MathText className="text-gray-200">{String.raw`x \equiv a_i \pmod{m_i}`}</MathText>{' '}
        using CRT with a step-by-step breakdown.
      </p>

      <div className="mt-4 text-gray-400">
        <MathText block className="text-gray-200">
          {String.raw`\text{Find } x \text{ such that } \begin{cases}
x \equiv a_1 \pmod{m_1} \\
x \equiv a_2 \pmod{m_2} \\
x \equiv a_3 \pmod{m_3} \\
\vdots
\end{cases}`}
        </MathText>
      </div>
    </header>
  );
};

export default Header;
