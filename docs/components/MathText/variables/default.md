[**crt-solver v0.0.0**](../../../README.md)

***

[crt-solver](../../../modules.md) / [components/MathText](../README.md) / default

# Variable: default

> `const` **default**: `React.FC`\<[`MathProps`](../interfaces/MathProps.md)\>

Defined in: [components/MathText.tsx:46](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/components/MathText.tsx#L46)

Renders a LaTeX math expression using KaTeX.

Converts LaTeX math strings to rendered HTML using the KaTeX library,
with support for both inline and display (block) rendering modes.
Errors in LaTeX expressions are gracefully handled.

## Param

The component props

## Examples

```ts
// Inline math expression
<MathText>a^n \\bmod m</MathText>
```

```ts
// Display mode (centered block)
<MathText block>a^n \\equiv {result} \\pmod{m}</MathText>
```

```ts
// With custom styling
<MathText className="text-lg text-purple-400">2^{23}</MathText>
```
