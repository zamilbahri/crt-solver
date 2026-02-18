[**crt-solver v0.0.0**](../../../README.md)

***

[crt-solver](../../../modules.md) / [utils/crt](../README.md) / solveCRT

# Function: solveCRT()

> **solveCRT**(`remainders`, `moduli`): [`SolveResult`](../../../types/type-aliases/SolveResult.md)

Defined in: [utils/crt.ts:147](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/utils/crt.ts#L147)

Solves a system of Chinese Remainder Theorem equations.

Given arrays of remainders and moduli, computes the unique solution x (mod M)
where M is the product of all moduli and x satisfies all congruences.
Returns detailed computation steps including extended GCD coefficients for full transparency.

## Parameters

### remainders

`bigint`[]

Array of remainder values (a_i)

### moduli

`bigint`[]

Array of modulus values (m_i), all must be pairwise coprime and ≥ 2

## Returns

[`SolveResult`](../../../types/type-aliases/SolveResult.md)

Discriminated union:
  - On success: { ok: true, value: CRTSolution } with solution and detailed computation steps
  - On failure: { ok: false, error: CRTError } with error details and conflicts if applicable

## Example

```ts
const result = solveCRT([1n, 4n], [3n, 5n]);
if (result.ok) {
  console.log('Solution:', result.value.x); // 4n
  console.log('General form: x =', result.value.x, '+ k *', result.value.modulus);
}
```
