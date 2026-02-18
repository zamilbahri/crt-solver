[**crt-solver v0.0.0**](../../README.md)

***

[crt-solver](../../modules.md) / [types](../README.md) / CRTError

# Interface: CRTError

Defined in: [types/index.ts:121](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L121)

Structured error information resulting from a failed CRT computation.

 CRTError

## Properties

### code

> **code**: [`CRTErrorCode`](../type-aliases/CRTErrorCode.md)

Defined in: [types/index.ts:122](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L122)

The error code identifying the error type

***

### conflicts?

> `optional` **conflicts**: [`PairwiseConflict`](PairwiseConflict.md)[]

Defined in: [types/index.ts:124](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L124)

For NOT_COPRIME errors, pairs of moduli that violate coprimality

***

### fieldErrors?

> `optional` **fieldErrors**: `string`[]

Defined in: [types/index.ts:125](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L125)

For INVALID_INPUT errors, per-field validation messages

***

### message

> **message**: `string`

Defined in: [types/index.ts:123](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L123)

A human-readable error message
