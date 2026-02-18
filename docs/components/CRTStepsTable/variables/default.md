[**crt-solver v0.0.0**](../../../README.md)

***

[crt-solver](../../../modules.md) / [components/CRTStepsTable](../README.md) / default

# Variable: default

> `const` **default**: `React.FC`\<[`CRTStepsTableProps`](../interfaces/CRTStepsTableProps.md)\>

Defined in: [components/CRTStepsTable.tsx:204](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/components/CRTStepsTable.tsx#L204)

CRTStepsTable component displays a detailed breakdown of all calculation steps in the CRT algorithm.

Shows a formatted table with columns for each computation: remainders, moduli, intermediate values,
modular inverses, and terms. Also displays the final sum and solution.

## Param

The component props

## Param

The computed CRT solution or null

## Example

```ts
const solution = { x: 23n, modulus: 70n, steps: [...], sum: 123n };
return <CRTStepsTable solution={solution} />
```

## Returns

The steps table section element
