import type { EquationDraft } from '../types';
import MathText from './MathText';

/**
 * Props for the InputPanel component
 *
 * @interface InputPanelProps
 * @property {EquationDraft[]} equations - Array of equation drafts with remainder (a) and modulus (m) values
 * @property {(index: number, field: 'a' | 'm', value: string) => void} onChange - Callback fired when an input field changes
 * @property {() => void} onAdd - Callback fired when the add equation button is clicked
 * @property {() => void} onRemove - Callback fired when the remove equation button is clicked
 * @property {() => void} onResetExample - Callback fired when the load example button is clicked
 * @property {() => void} onClear - Callback fired when the clear button is clicked
 * @property {string[]} errors - Array of validation error messages to display
 * @property {boolean | null} isCoprime - Whether moduli are pairwise coprime; null if not yet determined
 */
export interface InputPanelProps {
  equations: EquationDraft[];
  onChange: (index: number, field: 'a' | 'm', value: string) => void;
  onAdd: () => void;
  onRemove: () => void;
  onResetExample: () => void;
  onClear: () => void;
  errors: string[];
  isCoprime: boolean | null; // null if inputs not ready to check
}

/**
 * Generates the Tailwind CSS class string for input fields.
 *
 * @returns {string} The class string for styling input fields
 */
const getInputFieldClassName = (): string => {
  return [
    'w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3',
    'text-2xl text-white placeholder:text-gray-400',
    'focus:outline-none focus:ring-2 focus:ring-purple-500',
  ].join(' ');
};

const InputPanel: React.FC<InputPanelProps> = ({
  equations,
  onChange,
  onAdd,
  onRemove,
  onResetExample,
  onClear,
  errors,
  isCoprime,
}) => {
  const MAX_EQUATIONS = 10;
  const canAdd = equations.length < MAX_EQUATIONS;
  /**
   * Creates an input change handler that only accepts non-negative integer values.
   *
   * Filters out non-numeric characters and prevents invalid input.
   *
   * @param {(value: string) => void} setter - The state setter function to call with the validated value
   * @returns {(e: React.ChangeEvent<HTMLInputElement>) => void} The input change event handler
   */
  const handleNumericInputChange =
    (
      setter: (value: string) => void,
    ): ((e: React.ChangeEvent<HTMLInputElement>) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      if (inputValue === '' || /^\d+$/.test(inputValue)) {
        setter(inputValue);
      }
    };

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-purple-300">Inputs</h2>

        <div className="flex flex-wrap items-center gap-3">
          {!canAdd && (
            <span className="italic text-sm text-gray-300 self-center mr-2">
              Equation limit reached
            </span>
          )}
          <button
            type="button"
            onClick={() => canAdd && onAdd()}
            disabled={!canAdd}
            className={
              'rounded-lg border px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ' +
              (canAdd
                ? 'border-purple-600 bg-purple-700 hover:bg-purple-600'
                : 'border-gray-600 bg-gray-700 disabled:opacity-60 cursor-not-allowed')
            }
            title={
              canAdd
                ? 'Add equation'
                : `Maximum ${MAX_EQUATIONS} equations reached`
            }
          >
            + Add equation
          </button>

          <button
            type="button"
            onClick={onRemove}
            disabled={equations.length <= 1}
            className="rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-gray-200 hover:bg-gray-600 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            − Remove
          </button>

          <button
            type="button"
            onClick={onResetExample}
            className="rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Load example
          </button>

          <button
            type="button"
            onClick={onClear}
            className="rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="mb-4">
        {isCoprime === true && (
          <div className="inline-flex items-center gap-2 rounded-lg border border-purple-600 bg-gray-800 px-3 py-2 text-sm text-purple-200">
            <span className="font-semibold">✓</span> Moduli are pairwise coprime
          </div>
        )}
        {isCoprime === false && (
          <div className="inline-flex items-center gap-2 rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-200">
            <span className="font-semibold">!</span> Moduli are not pairwise
            coprime
          </div>
        )}
      </div>

      {/* Grid = rows (equations) × 2 columns (a_i, m_i) */}
      <div className="grid grid-cols-2 gap-6">
        {equations.map((eq, i) => (
          <div key={`a-${i}`} className="contents">
            <div>
              <label className="block text-sm text-purple-300 mb-2">
                <MathText>{String.raw`a_{${i + 1}}`}</MathText> (remainder)
              </label>
              <input
                className={getInputFieldClassName()}
                value={eq.a}
                onChange={handleNumericInputChange((v) => onChange(i, 'a', v))}
                inputMode="numeric"
                placeholder="e.g. 1"
                aria-label={`a_${i + 1}`}
              />
            </div>

            <div>
              <label className="block text-sm text-purple-300 mb-2">
                <MathText>{String.raw`m_{${i + 1}}`}</MathText> (modulus)
              </label>
              <input
                className={getInputFieldClassName()}
                value={eq.m}
                onChange={handleNumericInputChange((v) => onChange(i, 'm', v))}
                inputMode="numeric"
                placeholder="e.g. 7"
                aria-label={`m_${i + 1}`}
              />
            </div>
          </div>
        ))}
        {equations.length >= MAX_EQUATIONS && (
          <div className="col-span-2 italic text-sm text-gray-300">
            Equation limit reached
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div className="mt-4 bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
          {errors[0]}
        </div>
      )}
    </section>
  );
};

export default InputPanel;
