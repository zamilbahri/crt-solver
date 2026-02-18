[**crt-solver v0.0.0**](../../../README.md)

***

[crt-solver](../../../modules.md) / [utils/crt](../README.md) / gcd

# Function: gcd()

> **gcd**(`valueA`, `valueB`): `bigint`

Defined in: [utils/crt.ts:50](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/utils/crt.ts#L50)

Computes the greatest common divisor using the Euclidean algorithm.

Handles negative inputs by computing with their absolute values.

## Parameters

### valueA

`bigint`

The first value

### valueB

`bigint`

The second value

## Returns

`bigint`

The GCD of valueA and valueB (always non-negative)

## Example

```ts
gcd(12n, 8n); // Returns 4n
gcd(17n, 19n); // Returns 1n (coprime)
gcd(-12n, 8n); // Returns 4n
```
