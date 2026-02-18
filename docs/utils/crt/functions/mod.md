[**crt-solver v0.0.0**](../../../README.md)

***

[crt-solver](../../../modules.md) / [utils/crt](../README.md) / mod

# Function: mod()

> **mod**(`dividend`, `divisor`): `bigint`

Defined in: [utils/crt.ts:31](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/utils/crt.ts#L31)

Computes the modular remainder with positive normalization.

Ensures the result is in the range [0, divisor).

## Parameters

### dividend

`bigint`

The dividend

### divisor

`bigint`

The divisor (the modulus)

## Returns

`bigint`

The remainder in the range [0, divisor)

## Throws

If divisor is 0

## Example

```ts
mod(15n, 7n); // Returns 1n
mod(-5n, 7n); // Returns 2n (normalized)
```
