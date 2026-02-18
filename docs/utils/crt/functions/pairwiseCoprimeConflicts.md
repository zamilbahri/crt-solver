[**crt-solver v0.0.0**](../../../README.md)

***

[crt-solver](../../../modules.md) / [utils/crt](../README.md) / pairwiseCoprimeConflicts

# Function: pairwiseCoprimeConflicts()

> **pairwiseCoprimeConflicts**(`moduli`): [`PairwiseConflict`](../../../types/interfaces/PairwiseConflict.md)[]

Defined in: [utils/crt.ts:114](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/utils/crt.ts#L114)

Identifies all pairs of moduli that are not pairwise coprime.

The Chinese Remainder Theorem requires all moduli to be pairwise coprime.
This function finds all violations of that requirement.

## Parameters

### moduli

`bigint`[]

Array of moduli to check for coprimality

## Returns

[`PairwiseConflict`](../../../types/interfaces/PairwiseConflict.md)[]

Array of pairs (i, j) where gcd(moduli[i], moduli[j]) > 1

## Example

```ts
pairwiseCoprimeConflicts([3n, 6n, 5n]); // Returns [{ i: 0, j: 1, gcd: 3n }]
pairwiseCoprimeConflicts([3n, 5n, 7n]); // Returns []
```
