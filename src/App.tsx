import { useEffect, useMemo, useState } from 'react';

import Header from './components/Header';
import InputPanel from './components/InputPanel';
import CRTStepsTable from './components/CRTStepsTable';
import FinalResult from './components/FinalResult';
import AlgorithmExplanation from './components/AlgorithmExplanation';
import Footer from './components/Footer';

import type { EquationDraft, SolveResult } from './types';
import { pairwiseCoprimeConflicts, solveCRT } from './utils/crt';

/**
 * LocalStorage key for persisting application state
 * @const
 */
const STORAGE_KEY = 'crt_solver_state';

/**
 * Validates if a string represents a valid integer (including negative integers).
 *
 * @param {string} stringValue - The string to validate
 * @returns {boolean} True if the string matches the integer pattern, false otherwise
 *
 * @example
 * isIntegerString('42'); // true
 * isIntegerString('-5'); // true
 * isIntegerString('abc'); // false
 */
const isIntegerString = (stringValue: string): boolean => {
  const trimmedValue = stringValue.trim();
  return /^-?\d+$/.test(trimmedValue);
};

/**
 * Parses a string to a bigint with strict validation.
 *
 * Returns null if the string is empty, not a valid integer, or cannot be converted to BigInt.
 *
 * @param {string} stringValue - The string to parse
 * @returns {bigint | null} The parsed bigint, or null if parsing fails
 *
 * @example
 * parseBigIntStrict('123'); // 123n
 * parseBigIntStrict(''); // null
 * parseBigIntStrict('not-a-number'); // null
 */
const parseBigIntStrict = (stringValue: string): bigint | null => {
  const trimmedValue = stringValue.trim();
  if (trimmedValue.length === 0) return null;
  if (!isIntegerString(trimmedValue)) return null;
  try {
    return BigInt(trimmedValue);
  } catch {
    return null;
  }
};

/**
 * Provides a default example system of CRT equations.
 *
 * Returns: x ≡ 1 (mod 2), x ≡ 4 (mod 5), x ≡ 1 (mod 7)
 *
 * @returns {EquationDraft[]} An array containing the default example equations
 */
const defaultExample = (): EquationDraft[] => {
  // Example: x ≡ 1 (mod 2), x ≡ 4 (mod 5), x ≡ 1 (mod 7)
  return [
    { a: '1', m: '2' },
    { a: '4', m: '5' },
    { a: '1', m: '7' },
  ];
};

/**
 * Loads equation drafts from localStorage.
 *
 * Returns the saved draft if valid, otherwise returns the default example.
 * Safely handles parsing errors and invalid data formats.
 *
 * @returns {EquationDraft[]} The loaded or default equations
 */
const loadDraft = (): EquationDraft[] => {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) return defaultExample();
    const parsedData: unknown = JSON.parse(rawData);

    if (!Array.isArray(parsedData)) return defaultExample();
    const equationItems = parsedData
      .filter((item) => typeof item === 'object' && item !== null)
      .map((item) => {
        const itemObject = item as Record<string, unknown>;
        return {
          a: typeof itemObject.a === 'string' ? itemObject.a : '',
          m: typeof itemObject.m === 'string' ? itemObject.m : '',
        } satisfies EquationDraft;
      });

    return equationItems.length > 0 ? equationItems : defaultExample();
  } catch {
    return defaultExample();
  }
};

/**
 * Saves equation drafts to localStorage.
 *
 * Persists the current state so it survives page reloads.
 *
 * @param {EquationDraft[]} draftData - The equations to save
 */
const saveDraft = (draftData: EquationDraft[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(draftData));
};

/**
 * Main App component for the CRT Solver application.
 *
 * Manages the application state including equation inputs, validation, and solution computation.
 * Persists state to localStorage and provides a complete UI for solving systems of CRT equations.
 *
 
 * @returns {React.ReactElement} The main application layout
 *
 * @example
 * export default App;
 */
const App: React.FC = () => {
  const [equations, setEquations] = useState<EquationDraft[]>(() =>
    loadDraft(),
  );

  useEffect(() => {
    saveDraft(equations);
  }, [equations]);

  const { errors, result, isCoprime } = useMemo(() => {
    const errors: string[] = [];

    // Parse inputs
    const remainders: bigint[] = [];
    const moduli: bigint[] = [];
    let hasInvalidInputs = false;

    equations.forEach((eq) => {
      const ai = parseBigIntStrict(eq.a);
      const mi = parseBigIntStrict(eq.m);

      if (ai === null || mi === null) {
        hasInvalidInputs = true;
      }

      if (ai !== null) remainders.push(ai);
      if (mi !== null) moduli.push(mi);
    });

    // Check for invalid inputs (empty or non-integer)
    if (hasInvalidInputs) {
      errors.push('Inputs must be valid integers.');
    }

    // If inputs are invalid, skip deeper checks
    if (
      hasInvalidInputs ||
      remainders.length !== equations.length ||
      moduli.length !== equations.length
    ) {
      return {
        errors,
        result: null as SolveResult | null,
        isCoprime: null as boolean | null,
      };
    }

    // Check if all moduli are >= 2
    const invalidModuli = moduli.filter((m) => m < 2n);
    if (invalidModuli.length > 0) {
      errors.push('Modulus must be ≥ 2.');
    }

    // If moduli are invalid, skip solve
    if (invalidModuli.length > 0) {
      return {
        errors,
        result: null as SolveResult | null,
        isCoprime: null as boolean | null,
      };
    }

    // Coprime check display (even before full solve)
    const conflicts = pairwiseCoprimeConflicts(moduli);
    const coprime = conflicts.length === 0;

    // Full solve
    const solved = solveCRT(remainders, moduli);

    if (!solved.ok) {
      errors.push(solved.error.message);
    }

    return { errors, result: solved, isCoprime: coprime };
  }, [equations]);

  const solution = result && result.ok ? result.value : null;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-5xl mx-auto p-8">
        <Header />

        <div className="rounded-xl p-6 shadow-2xl mb-8 border border-gray-700 bg-gray-800">
          <InputPanel
            equations={equations}
            onChange={(index, field, value) => {
              setEquations((prev) =>
                prev.map((eq, i) =>
                  i === index ? { ...eq, [field]: value } : eq,
                ),
              );
            }}
            onAdd={() => {
              setEquations((prev) => [...prev, { a: '', m: '' }]);
            }}
            onRemove={() => {
              setEquations((prev) =>
                prev.length > 1 ? prev.slice(0, -1) : prev,
              );
            }}
            onResetExample={() => setEquations(defaultExample())}
            onClear={() =>
              setEquations([
                { a: '', m: '' },
                { a: '', m: '' },
                { a: '', m: '' },
              ])
            }
            errors={errors}
            isCoprime={isCoprime}
          />
        </div>

        <div className="rounded-xl p-6 shadow-2xl mb-8 border border-gray-700 bg-gray-800">
          <CRTStepsTable solution={solution} />
        </div>

        <FinalResult solution={solution} />

        <div className="rounded-xl p-6 shadow-2xl mb-8 border border-gray-700 bg-gray-800">
          <AlgorithmExplanation />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default App;
