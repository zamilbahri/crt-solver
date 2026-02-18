[**crt-solver v0.0.0**](../../README.md)

***

[crt-solver](../../modules.md) / [types](../README.md) / CRTSolution

# Interface: CRTSolution

Defined in: [types/index.ts:90](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L90)

Represents the complete solution to a system of CRT equations.

Contains the solution value and all computational steps for transparency and verification.

 CRTSolution

## Properties

### modulus

> **modulus**: `bigint`

Defined in: [types/index.ts:91](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L91)

The total modulus M (product of all individual moduli)

***

### steps

> **steps**: [`CRTTermStep`](CRTTermStep.md)[]

Defined in: [types/index.ts:92](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L92)

Array of computation steps, one per equation

***

### sum

> **sum**: `bigint`

Defined in: [types/index.ts:93](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L93)

The intermediate sum before modular reduction

***

### x

> **x**: `bigint`

Defined in: [types/index.ts:94](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L94)

The final solution (sum mod M)
