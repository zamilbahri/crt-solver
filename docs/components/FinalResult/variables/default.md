[**crt-solver v0.0.0**](../../../README.md)

***

[crt-solver](../../../modules.md) / [components/FinalResult](../README.md) / default

# Variable: default

> `const` **default**: `React.FC`\<[`FinalResultProps`](../interfaces/FinalResultProps.md)\>

Defined in: [components/FinalResult.tsx:28](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/components/FinalResult.tsx#L28)

FinalResult component displays the solution to the Chinese Remainder Theorem problem.

Shows the final value x and its congruence relationship, as well as the general solution formula.
Displays a placeholder message when no solution is available.

## Param

The component props

## Param

The computed CRT solution or null

## Example

```ts
const solution = { x: 23n, modulus: 70n, steps: [...], sum: 123n };
return <FinalResult solution={solution} />
```

## Returns

The final result section element
