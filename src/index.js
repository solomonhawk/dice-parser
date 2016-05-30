//@flow
type NestedArray<T> = Array<T|NestedArray<T>>
type NestedStringArray = Array<string|Array<string>>

type DiceRoll = {
  count: number,
  range: number,
  result?: number
}

type CompositeDiceRoll = {
  rolls: DiceRoll[],
  total: number
}

// Utilities

/**
 * Flattens nested arrays
 **/
function flatten<T>(xs: NestedArray<T>): Array<T> {
  let result = []

  for (let x of xs) {
    if (Array.isArray(x)) {
      result.push(...flatten(x))
    } else {
      result.push(x)
    }
  }

  return result
}

/**
 * Composes functions, creating a processing pipeline where computed
 * values get chained through each of the provided functions.
 **/
const compose = (...fns) => fns.reduceRight((f, g) => (...args) => f(g(...args)))

// Main

/**
 * Computation pipeline for converting string and string[] inputs
 * into actual computable results.
 **/
let compute = compose(flatten, prepare, parse, toComposite)

/**
 * Takes a string or array of strings and returns a CompositeDiceRoll
 * computed by rolling the specified dice.
 **/
export function roll(inputs: string | NestedStringArray): CompositeDiceRoll {
  if (typeof inputs == 'string') inputs = [inputs]
  return compute(inputs)
}

/**
 * Takes an array of mixed strings (singular or comma-delimited)
 * and returns a flattened array of strings by calling `#rollsReducer`.
 **/
function prepare(rolls: Array<string>): Array<string> {
  let reduced: Array<string> = rolls.reduce(rollsReducer, [])
  return flatten(reduced)
}

/**
 * Reducing function. Takes a result array and a string then normalizes
 * values by trimming outside spaces, condensing consecutive spaces into
 * a single space, and then splitting on a variety of delimiters(\s | ,).
 **/
function rollsReducer(result: Array<string>, roll: string): Array<string> {
  let trimmed: Array<string> = roll.replace(/\s+/g, ' ').split(/[\s|,]/)
  return result.concat(trimmed)
}

/**
 * Parses an array of string rolls into DiceRoll objects by
 * delegating the string parsing to `#reifyRoll`.
 **/
function parse(rolls: Array<string>): DiceRoll[] {
  return rolls.map((roll: string) => reifyRoll(roll))
}

/**
 * Takes an individual string roll (e.g. '2d6') and turns it into a
 * DiceRoll object with numeric count (2) and range (6) properties.
 **/
function reifyRoll(roll: string): DiceRoll {
  let [count, range]: Array<string> = roll.split('d')
  return { count: Number(count), range: Number(range) }
}

/**
 * Takes an array of DiceRolls and returns a CompositeDiceRoll
 * object which contains the DiceRolls and their computed sum.
 **/
function toComposite(rolls: DiceRoll[]): CompositeDiceRoll {
  rolls = rolls.map(applyRoll)
  return { rolls, total: sumRolls(rolls) }
}

/**
 * Takes an array of DiceRolls and computes the sum of the `result` attributes
 **/
function sumRolls(rolls: Array<DiceRoll>): number {
  return rolls.reduce((result: number, roll: DiceRoll) => result + roll.result, 0)
}

/**
 * Applies a given DiceRoll by generating a numer of random rolls, within
 * the correct range, equal to the number of dice rolled.
 **/
function applyRoll(roll: DiceRoll): DiceRoll {
  let target: number = roll.count
  roll.result = 0

  while (target--) {
    roll.result += 1 + Math.floor(Math.random() * roll.range)
  }

  return roll
}
