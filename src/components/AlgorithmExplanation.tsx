import MathText from './MathText';

/**
 * AlgorithmExplanation component provides an educational overview of the Chinese Remainder Theorem.
 *
 * Explains the three main steps of the CRT algorithm: constructing base terms,
 * finding modular inverses, and summing/reducing the result.
 *
 
 * @example
 * return <AlgorithmExplanation />
 *
 * @returns {React.ReactElement} The algorithm explanation section element
 */
const AlgorithmExplanation: React.FC = (): React.ReactElement => {
  return (
    <section>
      <h2 className="text-xl font-semibold text-purple-300 mb-4">
        Algorithm Explanation
      </h2>

      <ol className="list-decimal pl-6 space-y-4 text-gray-300">
        <li>
          <div className="font-semibold text-purple-300 mb-1">
            Construct base terms
          </div>
          <div className="text-gray-400">
            Compute the total product{' '}
            <MathText className="text-gray-200">{String.raw`M = \prod_i m_i`}</MathText>
            . For each equation, compute{' '}
            <MathText className="text-gray-200">{String.raw`M_i = M / m_i`}</MathText>
            (the product of all other moduli).
          </div>
        </li>

        <li>
          <div className="font-semibold text-purple-300 mb-1">
            Find modular inverses and scale
          </div>
          <div className="text-gray-400">
            For each{' '}
            <MathText className="text-gray-200">{String.raw`M_i`}</MathText>,
            find{' '}
            <MathText className="text-gray-200">{String.raw`y_i`}</MathText>{' '}
            such that{' '}
            <MathText className="text-gray-200">{String.raw`M_i y_i \equiv 1 \pmod{m_i}`}</MathText>
            . Then form the term{' '}
            <MathText className="text-gray-200">{String.raw`a_i M_i y_i`}</MathText>
            . Inverses are computed with the extended Euclidean algorithm.
          </div>
        </li>

        <li>
          <div className="font-semibold text-purple-300 mb-1">
            Sum and reduce
          </div>
          <div className="text-gray-400">
            Add all terms and reduce modulo{' '}
            <MathText className="text-gray-200">{String.raw`M`}</MathText>:
            <div className="mt-2">
              <MathText block className="text-gray-200">
                {String.raw`x = \left(\sum_i a_i M_i y_i\right) \bmod M`}
              </MathText>
            </div>
          </div>
        </li>
      </ol>

      <div className="mt-6 text-gray-400 text-sm">
        CRT requires moduli to be pairwise coprime so that each{' '}
        <MathText>{String.raw`M_i`}</MathText> has an inverse modulo{' '}
        <MathText>{String.raw`m_i`}</MathText>.
      </div>
    </section>
  );
};

export default AlgorithmExplanation;
