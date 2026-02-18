[**crt-solver v0.0.0**](../../../README.md)

***

[crt-solver](../../../modules.md) / [utils/crt](../README.md) / extendedGCD

# Function: extendedGCD()

> **extendedGCD**(`valueA`, `valueB`): `object`

Defined in: [utils/crt.ts:79](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/utils/crt.ts#L79)

Computes the extended Euclidean algorithm result for two bigint values.

Returns coefficients x and y such that a*x + b*y = gcd(a, b), plus the gcd itself.
Uses an iterative approach to avoid recursion depth issues with very large numbers.

## Parameters

### valueA

`bigint`

The first value

### valueB

`bigint`

The second value

## Returns

`object`

An object containing:
  - g: The GCD of valueA and valueB
  - x: Coefficient such that a*x + b*y = gcd(a, b)
  - y: Coefficient such that a*x + b*y = gcd(a, b)

### g

> **g**: `bigint`

### x

> **x**: `bigint`

### y

> **y**: `bigint`

## Example

```ts
const result = extendedGCD(35n, 15n);
// Returns { g: 5n, x: 1n, y: -2n }
// Verification: 35 * 1 + 15 * (-2) = 35 - 30 = 5
```
