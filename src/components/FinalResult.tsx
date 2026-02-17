import type { CRTSolution } from '../types';
import MathText from './MathText';

/**
 * Props for the FinalResult component
 * @interface FinalResultProps
 * @property {CRTSolution | null} solution - The computed CRT solution, or null if not yet available
 */
export interface FinalResultProps {
  solution: CRTSolution | null;
}

/**
 * FinalResult component displays the solution to the Chinese Remainder Theorem problem.
 *
 * Shows the final value x and its congruence relationship, as well as the general solution formula.
 * Displays a placeholder message when no solution is available.
 *
 * @param {FinalResultProps} props - The component props
 * @param {CRTSolution | null} props.solution - The computed CRT solution or null
 *
 * @example
 * const solution = { x: 23n, modulus: 70n, steps: [...], sum: 123n };
 * return <FinalResult solution={solution} />
 *
 * @returns {React.ReactElement} The final result section element
 */
const FinalResult: React.FC<FinalResultProps> = ({
  solution,
}: FinalResultProps): React.ReactElement => {
  return (
    <section className="rounded-xl p-6 shadow-2xl mb-8 border border-purple-600 bg-linear-to-r from-purple-600/50 to-purple-800/50">
      <h2 className="text-xl text-center font-semibold text-purple-200 mb-4">
        Final Result
      </h2>

      {!solution ? (
        <p className="text-purple-100/80">
          Provide valid inputs to compute the solution.
        </p>
      ) : (
        <div className="text-center">
          <div className="text-3xl font-bold text-white">
            <MathText block>
              {String.raw`x \equiv ${solution.x.toString()} \pmod{${solution.modulus.toString()}}`}
            </MathText>
          </div>

          <div className="mt-3 text-purple-100/80">
            <MathText className="text-purple-100/90">
              {String.raw`\text{All solutions: } x = ${solution.x.toString()} + ${solution.modulus.toString()}\cdot k,\ k \in \mathbb{Z}`}
            </MathText>
          </div>
        </div>
      )}
    </section>
  );
};

export default FinalResult;
