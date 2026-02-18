[**crt-solver v0.0.0**](../../README.md)

***

[crt-solver](../../modules.md) / [types](../README.md) / EquationDraft

# Interface: EquationDraft

Defined in: [types/index.ts:16](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L16)

Represents a single equation draft for the CRT system.

Stores the remainder and modulus as strings to support text input and localStorage serialization.

 EquationDraft

## Properties

### a

> **a**: `string`

Defined in: [types/index.ts:17](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L17)

The remainder value (kept as string for inputs and storage)

***

### m

> **m**: `string`

Defined in: [types/index.ts:18](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L18)

The modulus value (kept as string for inputs and storage)
