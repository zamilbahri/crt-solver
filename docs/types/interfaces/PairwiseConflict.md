[**crt-solver v0.0.0**](../../README.md)

***

[crt-solver](../../modules.md) / [types](../README.md) / PairwiseConflict

# Interface: PairwiseConflict

Defined in: [types/index.ts:31](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L31)

Represents a pair of moduli that are not pairwise coprime.

Used to identify and report violations of the CRT requirement that all moduli be mutually coprime.

 PairwiseConflict

## Properties

### gcd

> **gcd**: `bigint`

Defined in: [types/index.ts:34](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L34)

The greatest common divisor of moduli[i] and moduli[j] (> 1)

***

### i

> **i**: `number`

Defined in: [types/index.ts:32](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L32)

Zero-based index of the first conflicting modulus

***

### j

> **j**: `number`

Defined in: [types/index.ts:33](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L33)

Zero-based index of the second conflicting modulus
