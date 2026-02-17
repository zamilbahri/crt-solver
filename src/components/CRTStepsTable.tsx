import { useMemo, useState } from 'react';
import type { CRTSolution, CRTTermStep } from '../types';
import MathText from './MathText';

/**
 * Props for the CRTStepsTable component
 * @interface CRTStepsTableProps
 * @property {CRTSolution | null} solution - The computed CRT solution with calculation steps
 */
export interface CRTStepsTableProps {
  solution: CRTSolution | null;
}

/**
 * Generates the Tailwind CSS class string for table data cells.
 *
 * @returns {string} The class string for styling table data cells
 */
const getTableDataCellClassName = (): string => {
  return 'border-t border-gray-700 px-4 py-3 align-top text-gray-200 text-center';
};

/**
 * Generates the Tailwind CSS class string for table header cells.
 *
 * @returns {string} The class string for styling table header cells
 */
const getTableHeaderCellClassName = (): string => {
  return 'px-4 py-3 text-center text-sm font-semibold text-purple-300';
};

/**
 * Generates the Tailwind CSS class string for left-justified summary/data cells.
 */
const getTableSummaryCellClassName = (): string => {
  return 'border-t border-gray-700 px-4 py-3 align-top text-gray-200 text-left';
};

/**
 * ExpandButton component for toggling row detail visibility.
 *
 * Displays a clickable button with a toggling arrow indicator (▸/▾) to expand/collapse
 * detailed information for a CRT step row. Handles accessibility with proper ARIA attributes.
 *
 
 * @param {Object} props - The component props
 * @param {boolean} props.expanded - Whether the detail row is currently expanded
 * @param {() => void} props.onClick - Callback fired when the button is clicked
 * @param {string} props.label - Accessible label describing the button action (used for aria-label)
 *
 * @example
 * <ExpandButton
 *   expanded={isExpanded}
 *   onClick={() => setIsExpanded(!isExpanded)}
 *   label="Toggle details for term 1"
 * />
 *
 * @returns {React.ReactElement} A styled button element
 */
function ExpandButton({
  expanded,
  onClick,
  label,
}: {
  expanded: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={expanded}
      aria-label={label}
      className="inline-flex items-center justify-center rounded-md border border-gray-600 bg-gray-700 px-2 py-1 text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      <span className="text-sm">{expanded ? '▾' : '▸'}</span>
    </button>
  );
}

/**
 * RowDetails component displays comprehensive information about a single CRT computation step.
 *
 * Shows the original congruence, normalized remainder, partial product calculation,
 * extended GCD coefficients, modular inverse derivation, and the contribution to the final sum.
 * Uses mathematical notation via MathText for clarity.
 *
 * @component
 * @param {Object} props - The component props
 * @param {CRTTermStep} props.step - The computation step data containing all intermediate values
 * @param {bigint} props.modulusM - The total modulus M (product of all m_i), used for display
 *
 * @example
 * const step = {
 *   index: 0,
 *   aiInput: 1n,
 *   ai: 1n,
 *   mi: 2n,
 *   Mi: 35n,
 *   MiMod: 1n,
 *   egcdG: 1n,
 *   egcdX: 1n,
 *   egcdY: 0n,
 *   inverse: 1n,
 *   term: 35n
 * };
 * <RowDetails step={step} modulusM={70n} />
 *
 * @returns {React.ReactElement} A formatted details container with multiple information sections
 */
function RowDetails({
  step,
  modulusM,
}: {
  step: CRTTermStep;
  modulusM: bigint;
}) {
  const i = step.index + 1;
  const aiIn = step.aiInput.toString();
  const ai = step.ai.toString();
  const mi = step.mi.toString();
  const Mi = step.Mi.toString();
  const MiMod = step.MiMod.toString();
  const xCoeff = step.egcdX.toString();
  const yCoeff = step.egcdY.toString();
  const inv = step.inverse.toString();
  const term = step.term.toString();
  const M = modulusM.toString();

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-900/30 p-4">
      <div className="text-sm text-purple-300 font-semibold mb-3">
        Term {i} details
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
        <div className="space-y-2">
          <div className="text-gray-400">Congruence</div>
          <MathText block className="text-gray-200">
            {String.raw`x \equiv ${aiIn} \pmod{${mi}}`}
          </MathText>
          {aiIn !== ai && (
            <div className="text-gray-400">
              Normalized remainder:{' '}
              <MathText className="text-gray-200">{String.raw`a_${i} = ${aiIn} \bmod ${mi} = ${ai}`}</MathText>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="text-gray-400">Base term</div>
          <MathText block className="text-gray-200">
            {String.raw`M = \prod_k m_k = ${M},\quad M_${i} = \frac{M}{m_${i}} = ${Mi}`}
          </MathText>
          <MathText className="text-gray-200">
            {String.raw`M_${i} \bmod m_${i} = ${MiMod}`}
          </MathText>
        </div>

        <div className="space-y-2">
          <div className="text-gray-400">Extended Euclidean step</div>
          <MathText block className="text-gray-200">
            {String.raw`\operatorname{egcd}(${MiMod}, ${mi}) \Rightarrow ${MiMod}\cdot(${xCoeff}) + ${mi}\cdot(${yCoeff}) = 1`}
          </MathText>
          <div className="text-gray-400">
            So the inverse is{' '}
            <MathText className="text-gray-200">{String.raw`y_${i} \equiv ${xCoeff} \pmod{${mi}}`}</MathText>
            {', hence '}
            <MathText className="text-gray-200">{String.raw`y_${i} = ${inv}`}</MathText>
            .
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-gray-400">Scaled term contribution</div>
          <MathText block className="text-gray-200">
            {String.raw`a_${i}\,M_${i}\,y_${i} = ${ai}\cdot ${Mi}\cdot ${inv} = ${term}`}
          </MathText>
          <MathText className="text-gray-200">
            {String.raw`\text{(added into the sum, then reduced mod } M \text{)} `}
          </MathText>
        </div>
      </div>
    </div>
  );
}

/**
 * CRTStepsTable component displays a detailed breakdown of all calculation steps in the CRT algorithm.
 *
 * Shows a formatted table with columns for each computation: remainders, moduli, intermediate values,
 * modular inverses, and terms. Also displays the final sum and solution.
 *
 * @param props - The component props
 * @param props.solution - The computed CRT solution or null
 *
 * @example
 * const solution = { x: 23n, modulus: 70n, steps: [...], sum: 123n };
 * return <CRTStepsTable solution={solution} />
 *
 * @returns {React.ReactElement} The steps table section element
 */
const CRTStepsTable: React.FC<CRTStepsTableProps> = ({
  solution,
}: CRTStepsTableProps): React.ReactElement => {
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set());

  const expandedArray = useMemo(
    () => Array.from(expanded.values()),
    [expanded],
  );

  return (
    <section>
      <h2 className="text-xl font-semibold text-purple-300 mb-4">Steps</h2>

      {!solution ? (
        <p className="text-gray-400">
          Enter valid integers with pairwise coprime moduli to see the CRT
          steps.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-gray-700">
            <table className="min-w-full bg-gray-800">
              <thead className="bg-gray-900/40">
                <tr>
                  <th className={getTableHeaderCellClassName()}></th>
                  <th className={getTableHeaderCellClassName()}>
                    <MathText>{String.raw`i`}</MathText>
                  </th>
                  <th className={getTableHeaderCellClassName()}>
                    <MathText>{String.raw`a_i`}</MathText>
                  </th>
                  <th className={getTableHeaderCellClassName()}>
                    <MathText>{String.raw`m_i`}</MathText>
                  </th>
                  <th className={getTableHeaderCellClassName()}>
                    <MathText>{String.raw`M_i = \frac{M}{m_i}`}</MathText>
                  </th>
                  <th className={getTableHeaderCellClassName()}>
                    <MathText>{String.raw`M_i \bmod m_i`}</MathText>
                  </th>
                  <th className={getTableHeaderCellClassName()}>
                    <MathText>{String.raw`y_i = (M_i)^{-1} \bmod m_i`}</MathText>
                  </th>
                  <th className={getTableHeaderCellClassName()}>
                    <MathText>{String.raw`a_i M_i y_i`}</MathText>
                  </th>
                </tr>
              </thead>

              <tbody>
                {solution.steps.map((s) => {
                  const isOpen = expanded.has(s.index);
                  return (
                    <>
                      <tr
                        key={`row-${s.index}`}
                        className="hover:bg-gray-900/20"
                      >
                        <td className={getTableDataCellClassName()}>
                          <ExpandButton
                            expanded={isOpen}
                            label={`Toggle details for term ${s.index + 1}`}
                            onClick={() => {
                              setExpanded((prev) => {
                                const next = new Set(prev);
                                if (next.has(s.index)) next.delete(s.index);
                                else next.add(s.index);
                                return next;
                              });
                            }}
                          />
                        </td>
                        <td className={getTableDataCellClassName()}>
                          <MathText>{String.raw`${s.index + 1}`}</MathText>
                        </td>
                        <td className={getTableDataCellClassName()}>
                          <MathText>{String.raw`${s.ai}`}</MathText>
                        </td>
                        <td className={getTableDataCellClassName()}>
                          <MathText>{String.raw`${s.mi}`}</MathText>
                        </td>
                        <td className={getTableDataCellClassName()}>
                          <MathText>{String.raw`${s.Mi}`}</MathText>
                        </td>
                        <td className={getTableDataCellClassName()}>
                          <MathText>{String.raw`${s.MiMod}`}</MathText>
                        </td>
                        <td className={getTableDataCellClassName()}>
                          <MathText>{String.raw`${s.inverse}`}</MathText>
                        </td>
                        <td className={getTableDataCellClassName()}>
                          <MathText>{String.raw`${s.term}`}</MathText>
                        </td>
                      </tr>

                      {isOpen && (
                        <tr key={`detail-${s.index}`}>
                          <td
                            className={getTableDataCellClassName()}
                            colSpan={8}
                          >
                            <RowDetails step={s} modulusM={solution.modulus} />
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}

                <tr className="bg-gray-900/30">
                  <td className={getTableSummaryCellClassName()} colSpan={7}>
                    <span className="text-gray-300">
                      <MathText>{String.raw`\sum_i a_i M_i y_i`}</MathText>
                    </span>
                  </td>
                  <td className={getTableDataCellClassName()}>
                    <MathText>{String.raw`${solution.sum}`}</MathText>
                  </td>
                </tr>

                <tr className="bg-gray-900/30">
                  <td className={getTableSummaryCellClassName()} colSpan={7}>
                    <span className="text-gray-300">
                      <MathText>{String.raw`M = \prod_i m_i`}</MathText>
                    </span>
                  </td>
                  <td className={getTableDataCellClassName()}>
                    <MathText>{String.raw`${solution.modulus}`}</MathText>
                  </td>
                </tr>

                <tr className="bg-gray-900/30">
                  <td className={getTableSummaryCellClassName()} colSpan={7}>
                    <span className="text-gray-300">
                      <MathText>{String.raw`x = \left(\sum_i a_i M_i y_i\right) \bmod M`}</MathText>
                    </span>
                  </td>
                  <td className={getTableDataCellClassName()}>
                    <MathText>{String.raw`${solution.x}`}</MathText>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-gray-400 text-sm">
            Tip: expand a row to see the exact{' '}
            <MathText>{String.raw`\operatorname{egcd}`}</MathText> coefficients
            and how <MathText>{String.raw`y_i`}</MathText> is derived.
            {expandedArray.length > 0 && (
              <span className="ml-2 text-gray-500">
                (Expanded: {expandedArray.map((i) => i + 1).join(', ')})
              </span>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default CRTStepsTable;
