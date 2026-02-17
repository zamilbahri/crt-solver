/**
 * Type representing the fields of an equation that can be edited
 * @typedef {string} EquationField - Either 'a' (remainder) or 'm' (modulus)
 */
export type EquationField = 'a' | 'm';

/**
 * Represents a single equation draft for the CRT system.
 *
 * Stores the remainder and modulus as strings to support text input and localStorage serialization.
 *
 * @interface EquationDraft
 * @property {string} a - The remainder value (kept as string for inputs and storage)
 * @property {string} m - The modulus value (kept as string for inputs and storage)
 */
export interface EquationDraft {
  a: string; // keep as string for inputs + localStorage
  m: string;
}

/**
 * Represents a pair of moduli that are not pairwise coprime.
 *
 * Used to identify and report violations of the CRT requirement that all moduli be mutually coprime.
 *
 * @interface PairwiseConflict
 * @property {number} i - Zero-based index of the first conflicting modulus
 * @property {number} j - Zero-based index of the second conflicting modulus
 * @property {bigint} gcd - The greatest common divisor of moduli[i] and moduli[j] (> 1)
 */
export interface PairwiseConflict {
  i: number; // 0-based
  j: number;
  gcd: bigint;
}

/**
 * Represents a single computational step in the CRT algorithm for one equation.
 *
 * Contains all intermediate values computed for the equation x ≡ a_i (mod m_i),
 * including the original input, normalization, partial products, and extended GCD coefficients
 * used to derive the modular inverse.
 *
 * @interface CRTTermStep
 * @property {number} index - Zero-based index of this equation (0-based, displayed as 1-based in UI)
 * @property {bigint} aiInput - The original remainder input before normalization
 * @property {bigint} ai - The normalized remainder value a_i in range [0, m_i)
 * @property {bigint} mi - The modulus value (m_i)
 * @property {bigint} Mi - The partial product M / m_i (product of all moduli except m_i)
 * @property {bigint} MiMod - The result of M_i mod m_i, used as input to extended GCD
 * @property {bigint} egcdG - The GCD value from extendedGCD(MiMod, mi) operation (should be 1)
 * @property {bigint} egcdX - Coefficient x such that MiMod*x + mi*y = gcd(MiMod, mi)
 * @property {bigint} egcdY - Coefficient y such that MiMod*x + mi*y = gcd(MiMod, mi)
 * @property {bigint} inverse - The modular inverse y_i ≡ egcdX (mod m_i), such that M_i * y_i ≡ 1 (mod m_i)
 * @property {bigint} term - The contribution a_i * M_i * y_i to the final sum before reduction
 */
export interface CRTTermStep {
  index: number;

  // input + normalized remainder
  aiInput: bigint;
  ai: bigint;

  mi: bigint;

  // M = Π m_i; Mi = M/mi
  Mi: bigint;

  // convenience values for inverse derivation
  MiMod: bigint; // Mi mod mi
  egcdG: bigint; // gcd(MiMod, mi) (should be 1)
  egcdX: bigint; // coefficient x in MiMod*x + mi*y = g
  egcdY: bigint; // coefficient y in MiMod*x + mi*y = g

  inverse: bigint; // yi = egcdX mod mi
  term: bigint; // ai * Mi * inverse
}

/**
 * Represents the complete solution to a system of CRT equations.
 *
 * Contains the solution value and all computational steps for transparency and verification.
 *
 * @interface CRTSolution
 * @property {bigint} modulus - The total modulus M (product of all individual moduli)
 * @property {CRTTermStep[]} steps - Array of computation steps, one per equation
 * @property {bigint} sum - The intermediate sum before modular reduction
 * @property {bigint} x - The final solution (sum mod M)
 */
export interface CRTSolution {
  modulus: bigint; // M
  steps: CRTTermStep[];
  sum: bigint;
  x: bigint; // sum mod M
}

/**
 * Error codes that can result from CRT computation.
 *
 * @typedef {string} CRTErrorCode - One of the following:
 *  - 'INVALID_INPUT': Mismatched or empty arrays
 *  - 'NON_POSITIVE_MODULUS': A modulus is less than or equal to 1
 *  - 'NOT_COPRIME': Moduli are not pairwise coprime
 *  - 'NO_INVERSE': A modular inverse could not be computed
 */
export type CRTErrorCode =
  | 'INVALID_INPUT'
  | 'NON_POSITIVE_MODULUS'
  | 'NOT_COPRIME'
  | 'NO_INVERSE';

/**
 * Structured error information resulting from a failed CRT computation.
 *
 * @interface CRTError
 * @property {CRTErrorCode} code - The error code identifying the error type
 * @property {string} message - A human-readable error message
 * @property {PairwiseConflict[]} [conflicts] - For NOT_COPRIME errors, pairs of moduli that violate coprimality
 * @property {string[]} [fieldErrors] - For INVALID_INPUT errors, per-field validation messages
 */
export interface CRTError {
  code: CRTErrorCode;
  message: string;
  conflicts?: PairwiseConflict[];
  fieldErrors?: string[];
}

export type SolveResult =
  | { ok: true; value: CRTSolution }
  | { ok: false; error: CRTError };

/**
 * Discriminated union representing the result of a CRT computation.
 *
 * Use the `ok` property to discriminate between success and failure branches.
 *
 * @typedef {Object} SolveResult
 * @property {Object} - Success case with computed solution
 * @property {true} ok - Always true for success
 * @property {CRTSolution} value - The computed solution
 * @property {Object} - Failure case with error details
 * @property {false} ok - Always false for failure
 * @property {CRTError} error - Detailed error information
 *
 * @example
 * const result = solveCRT([1n, 4n], [3n, 5n]);
 * if (result.ok) {
 *   console.log('Solution:', result.value.x);
 * } else {
 *   console.error('Error:', result.error.message);
 * }
 */
