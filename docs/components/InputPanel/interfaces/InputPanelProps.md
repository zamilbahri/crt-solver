[**crt-solver v0.0.0**](../../../README.md)

***

[crt-solver](../../../modules.md) / [components/InputPanel](../README.md) / InputPanelProps

# Interface: InputPanelProps

Defined in: [components/InputPanel.tsx:17](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/components/InputPanel.tsx#L17)

Props for the InputPanel component

 InputPanelProps

## Properties

### equations

> **equations**: [`EquationDraft`](../../../types/interfaces/EquationDraft.md)[]

Defined in: [components/InputPanel.tsx:18](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/components/InputPanel.tsx#L18)

Array of equation drafts with remainder (a) and modulus (m) values

***

### errors

> **errors**: `string`[]

Defined in: [components/InputPanel.tsx:24](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/components/InputPanel.tsx#L24)

Array of validation error messages to display

***

### isCoprime

> **isCoprime**: `boolean` \| `null`

Defined in: [components/InputPanel.tsx:25](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/components/InputPanel.tsx#L25)

Whether moduli are pairwise coprime; null if not yet determined

***

### onAdd()

> **onAdd**: () => `void`

Defined in: [components/InputPanel.tsx:20](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/components/InputPanel.tsx#L20)

Callback fired when the add equation button is clicked

#### Returns

`void`

***

### onChange()

> **onChange**: (`index`, `field`, `value`) => `void`

Defined in: [components/InputPanel.tsx:19](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/components/InputPanel.tsx#L19)

Callback fired when an input field changes

#### Parameters

##### index

`number`

##### field

`"a"` | `"m"`

##### value

`string`

#### Returns

`void`

***

### onClear()

> **onClear**: () => `void`

Defined in: [components/InputPanel.tsx:23](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/components/InputPanel.tsx#L23)

Callback fired when the clear button is clicked

#### Returns

`void`

***

### onRemove()

> **onRemove**: () => `void`

Defined in: [components/InputPanel.tsx:21](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/components/InputPanel.tsx#L21)

Callback fired when the remove equation button is clicked

#### Returns

`void`

***

### onResetExample()

> **onResetExample**: () => `void`

Defined in: [components/InputPanel.tsx:22](https://github.com/zamilbahri/crt-solver/blob/7dfbd8427e4e8b445bf356e5f82abfe8742c26d9/src/components/InputPanel.tsx#L22)

Callback fired when the load example button is clicked

#### Returns

`void`
