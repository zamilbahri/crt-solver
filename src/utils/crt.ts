import type {
  CRTSolution,
  CRTTermStep,
  PairwiseConflict,
  SolveResult,
} from '../types';

/**
 * Computes the absolute value of a bigint.
 *
 * @param {bigint} numberValue - The input value
 * @returns {bigint} The absolute value
 */
const getAbsoluteValue = (numberValue: bigint): bigint =>
  numberValue < 0n ? -numberValue : numberValue;

/**
 * Computes the modular remainder with positive normalization.
 *
 * Ensures the result is in the range [0, divisor).
 *
 * @param {bigint} dividend - The dividend
 * @param {bigint} divisor - The divisor (the modulus)
 * @returns {bigint} The remainder in the range [0, divisor)
 * @throws {SyntaxError} If divisor is 0
 *
 * @example
 * mod(15n, 7n); // Returns 1n
 * mod(-5n, 7n); // Returns 2n (normalized)
 */
export const mod = (dividend: bigint, divisor: bigint): bigint => {
  const remainder = dividend % divisor;
  return remainder < 0n ? remainder + divisor : remainder;
};

/**
 * Computes the greatest common divisor using the Euclidean algorithm.
 *
 * Handles negative inputs by computing with their absolute values.
 *
 * @param {bigint} valueA - The first value
 * @param {bigint} valueB - The second value
 * @returns {bigint} The GCD of valueA and valueB (always non-negative)
 *
 * @example
 * gcd(12n, 8n); // Returns 4n
 * gcd(17n, 19n); // Returns 1n (coprime)
 * gcd(-12n, 8n); // Returns 4n
 */
export const gcd = (valueA: bigint, valueB: bigint): bigint => {
  let remainderX = getAbsoluteValue(valueA);
  let remainderY = getAbsoluteValue(valueB);
  while (remainderY !== 0n) {
    const temporaryValue = remainderX % remainderY;
    remainderX = remainderY;
    remainderY = temporaryValue;
  }
  return remainderX;
};

/**
 * Computes the extended Euclidean algorithm result for two bigint values.
 *
 * Returns coefficients x and y such that a*x + b*y = gcd(a, b), plus the gcd itself.
 * Uses an iterative approach to avoid recursion depth issues with very large numbers.
 *
 * @param {bigint} valueA - The first value
 * @param {bigint} valueB - The second value
 * @returns {{ g: bigint; x: bigint; y: bigint }} An object containing:
 *   - g: The GCD of valueA and valueB
 *   - x: Coefficient such that a*x + b*y = gcd(a, b)
 *   - y: Coefficient such that a*x + b*y = gcd(a, b)
 *
 * @example
 * const result = extendedGCD(35n, 15n);
 * // Returns { g: 5n, x: 1n, y: -2n }
 * // Verification: 35 * 1 + 15 * (-2) = 35 - 30 = 5
 */
export const extendedGCD = (
  valueA: bigint,
  valueB: bigint,
): { g: bigint; x: bigint; y: bigint } => {
  // Iterative extended Euclid
  let oldR = valueA;
  let r = valueB;
  let oldS = 1n;
  let s = 0n;
  let oldT = 0n;
  let t = 1n;

  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
    [oldT, t] = [t, oldT - q * t];
  }

  return { g: oldR, x: oldS, y: oldT };
};

/**
 * Identifies all pairs of moduli that are not pairwise coprime.
 *
 * The Chinese Remainder Theorem requires all moduli to be pairwise coprime.
 * This function finds all violations of that requirement.
 *
 * @param {bigint[]} moduli - Array of moduli to check for coprimality
 * @returns {PairwiseConflict[]} Array of pairs (i, j) where gcd(moduli[i], moduli[j]) > 1
 *
 * @example
 * pairwiseCoprimeConflicts([3n, 6n, 5n]); // Returns [{ i: 0, j: 1, gcd: 3n }]
 * pairwiseCoprimeConflicts([3n, 5n, 7n]); // Returns []
 */
export const pairwiseCoprimeConflicts = (
  moduli: bigint[],
): PairwiseConflict[] => {
  const conflictsList: PairwiseConflict[] = [];
  for (let i = 0; i < moduli.length; i++) {
    for (let j = i + 1; j < moduli.length; j++) {
      const gcdValue = gcd(moduli[i], moduli[j]);
      if (gcdValue !== 1n) conflictsList.push({ i, j, gcd: gcdValue });
    }
  }
  return conflictsList;
};

/**
 * Solves a system of Chinese Remainder Theorem equations.
 *
 * Given arrays of remainders and moduli, computes the unique solution x (mod M)
 * where M is the product of all moduli and x satisfies all congruences.
 * Returns detailed computation steps including extended GCD coefficients for full transparency.
 *
 * @param {bigint[]} remainders - Array of remainder values (a_i)
 * @param {bigint[]} moduli - Array of modulus values (m_i), all must be pairwise coprime and ≥ 2
 * @returns {SolveResult} Discriminated union:
 *   - On success: { ok: true, value: CRTSolution } with solution and detailed computation steps
 *   - On failure: { ok: false, error: CRTError } with error details and conflicts if applicable
 *
 * @example
 * const result = solveCRT([1n, 4n], [3n, 5n]);
 * if (result.ok) {
 *   console.log('Solution:', result.value.x); // 4n
 *   console.log('General form: x =', result.value.x, '+ k *', result.value.modulus);
 * }
 */
export const solveCRT = (
  remainders: bigint[],
  moduli: bigint[],
): SolveResult => {
  if (remainders.length !== moduli.length || remainders.length === 0) {
    return {
      ok: false,
      error: {
        code: 'INVALID_INPUT',
        message: 'Remainders and moduli must have the same non-zero length.',
      },
    };
  }

  for (let i = 0; i < moduli.length; i++) {
    if (moduli[i] <= 1n) {
      return {
        ok: false,
        error: {
          code: 'NON_POSITIVE_MODULUS',
          message: `Each modulus must be an integer ≥ 2. (m_${i + 1} is invalid)`,
        },
      };
    }
  }

  const conflicts = pairwiseCoprimeConflicts(moduli);
  if (conflicts.length > 0) {
    return {
      ok: false,
      error: {
        code: 'NOT_COPRIME',
        message:
          'Moduli must be pairwise coprime (gcd(m_i, m_j) = 1 for all i ≠ j).',
        conflicts,
      },
    };
  }

  const M = moduli.reduce((acc, mi) => acc * mi, 1n);

  const steps: CRTTermStep[] = [];
  let sum = 0n;

  for (let i = 0; i < moduli.length; i++) {
    const mi = moduli[i];

    const aiInput = remainders[i];
    const ai = mod(aiInput, mi); // normalize remainder to [0, mi)

    const Mi = M / mi;
    const MiMod = mod(Mi, mi);

    // Inverse: Mi * yi ≡ 1 (mod mi)
    // Use EGCD on (Mi mod mi, mi): MiMod*x + mi*y = g
    const eg = extendedGCD(MiMod, mi);
    const egcdG = eg.g < 0n ? -eg.g : eg.g;
    if (egcdG !== 1n) {
      return {
        ok: false,
        error: {
          code: 'NO_INVERSE',
          message: `No modular inverse exists for M_${i + 1} (mod m_${i + 1}). This usually means moduli are not coprime.`,
        },
      };
    }

    const inverse = mod(eg.x, mi);
    const term = ai * Mi * inverse;

    sum += term;

    steps.push({
      index: i,
      aiInput,
      ai,
      mi,
      Mi,
      MiMod,
      egcdG,
      egcdX: eg.x,
      egcdY: eg.y,
      inverse,
      term,
    });
  }

  const x = mod(sum, M);

  const solution: CRTSolution = {
    modulus: M,
    steps,
    sum,
    x,
  };

  return { ok: true, value: solution };
};
