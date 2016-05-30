Dice Parser
=============

A simple dice parser.

### Exports

`roll : (String | Array<String | Array<String>>) -> CompositeDiceRoll`

Parseable strings are of two forms: either a single positive integer (e.g. `5`) indicating to roll 1 5-sided die _or_ `AdB` where `A` and `B` are any positive integer indicating that the computation should result from rolling a `B`-sided dice `A` number of times. Dice Parser tries to parse a variety of inputs. It will split strings by `,` which allows inputs such as `"1d6,2d4,3d9"`.

### Types

```js
type DiceRoll = {
  count: number,
  range: number,
  result?: number
}

type CompositeDiceRoll = {
  rolls: DiceRoll[],
  total: number
}
```

### Examples
```js
roll('1d20')
// { 
//     rolls: [ { count: 1, range: 20, result: 12 } ], 
//     total: 12
// }

roll(['2d6', '4d4'])
// {
//   rolls: [
//       { count: 2, range: 6, result: 5 },
//       { count: 4, range: 4, result: 13 }
//   ],
//   total: 18
// }
```
