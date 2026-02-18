[**crt-solver v0.0.0**](../../README.md)

***

[crt-solver](../../modules.md) / [types](../README.md) / CRTTermStep

# Interface: CRTTermStep

Defined in: [types/index.ts:57](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L57)

Represents a single computational step in the CRT algorithm for one equation.

Contains all intermediate values computed for the equation x ≡ a_i (mod m_i),
including the original input, normalization, partial products, and extended GCD coefficients
used to derive the modular inverse.

 CRTTermStep

## Properties

### ai

> **ai**: `bigint`

Defined in: [types/index.ts:62](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L62)

The normalized remainder value a_i in range [0, m_i)

***

### aiInput

> **aiInput**: `bigint`

Defined in: [types/index.ts:61](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L61)

The original remainder input before normalization

***

### egcdG

> **egcdG**: `bigint`

Defined in: [types/index.ts:71](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L71)

The GCD value from extendedGCD(MiMod, mi) operation (should be 1)

***

### egcdX

> **egcdX**: `bigint`

Defined in: [types/index.ts:72](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L72)

Coefficient x such that MiMod*x + mi*y = gcd(MiMod, mi)

***

### egcdY

> **egcdY**: `bigint`

Defined in: [types/index.ts:73](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L73)

Coefficient y such that MiMod*x + mi*y = gcd(MiMod, mi)

***

### index

> **index**: `number`

Defined in: [types/index.ts:58](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L58)

Zero-based index of this equation (0-based, displayed as 1-based in UI)

***

### inverse

> **inverse**: `bigint`

Defined in: [types/index.ts:75](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L75)

The modular inverse y_i ≡ egcdX (mod m_i), such that M_i * y_i ≡ 1 (mod m_i)

***

### mi

> **mi**: `bigint`

Defined in: [types/index.ts:64](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L64)

The modulus value (m_i)

***

### Mi

> **Mi**: `bigint`

Defined in: [types/index.ts:67](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L67)

The partial product M / m_i (product of all moduli except m_i)

***

### MiMod

> **MiMod**: `bigint`

Defined in: [types/index.ts:70](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L70)

The result of M_i mod m_i, used as input to extended GCD

***

### term

> **term**: `bigint`

Defined in: [types/index.ts:76](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/types/index.ts#L76)

The contribution a_i * M_i * y_i to the final sum before reduction
