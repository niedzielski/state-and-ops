# [State and Its Operators in TypeScript](https://github.com/niedzielski/state-and-ops)

Programs are composed of many blobs of state. Many of these blobs are patterned
from a common mould,

## Table of Contents

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Table of Contents](#table-of-contents)
- [Problem](#problem)
- [Data vs State](#data-vs-state)
- [Approaches](#approaches)
  - [Data Object / State Bundle](#data-object-state-bundle)
    - [Pros](#pros)
    - [Cons](#cons)
  - [Tagged Union Data Object](#tagged-unionhttpsenwikipediaorgwikitagged_union-data-object)
  - [Branded (Another Article) Data Object](#brandedhttpsspinatomicobjectcom20181105using-an-int-type-in-typescript-another-articlehttpsevertpotcomopaque-ts-types-data-object)
  - [Class Encapsulation](#class-encapsulation)
    - [Pros](#pros-1)
    - [Cons](#cons-1)
  - [Closure Encapsulation](#closure-encapsulation)
    - [Pros](#pros-2)
    - [Cons](#cons-2)
    - [Verdict](#verdict)
- [Conclusion](#conclusion)
- [License](#license)
  - [GPL-3.0-only](#gpl-30-only)

<!-- /code_chunk_output -->

An object is data, stateful or stateless.

Classes protect, keep it coherent.

Renames are tough to deal with since a single refactor of the root doesn’t cut
it: import {make as makeTableau} from './pile/Tableau'

Bare objects have an imperative syntax. Line of distinction is blurred a little
for constructor functions not using the new keyword

and often plural. Data is often plural and the states of that data either
individually or collectively often natively support invalid configurations. That
is, the data exposed has some wanted invariants for coherence WRT the rest of
it. Functions are needed to operate on that data.

and functions that operate upon it. TypeScript can represent objects in several
ways, each with their own tradeoffs.

Consider the following implementations of IntXY, integral cartesian coordinates
with the following operators:

Constructor: construction of integral x and y-coordinate state from parameters
using truncation. Getters and setters: access and mutation of x and y-coordinate
state. add: (immutable operation) constructs a new IntXY by adding the state and
the x and y-coordinate parameters. addTo: (mutable operation) adds the x and
y-coordinate parameters to the state.

In all example approaches, IntXY uses JavaScript’s number primitives that allow
invalid fractional states. An underlying type that allows invalid states was
chosen deliberately to illustrate the value of encapsulation. An alternative
implementation might use a TypedArray or BitInt to limit the domain but
primitive types often allow invalid and out-of-sync values for a given object.

## Problem

somewhat simplified . could be an object. overlap with bigint which has proper
static and runtime type checking.

crux of the issue is classes and closures provide encapsulation but obscure the
benefits of first-class readability: declarative data.

## Data vs State

Data and state are interchangeable but state is usually stateful, not immutable.
When state is immutable, encapsulation seems less important as no coherence
needs to be maintained, just the accessibility API.

## Approaches

integer.truncate with saturation

### Data Object / State Bundle

#### Pros

- Data is entirely separate from operation. Consumers can easily create, access,
  mutate, and persist state (de/serialize) with or without the IntXY operators.
  Mutations can be (universally) limited with `readonly` (e.g.,
  `{x: number; readonly y: number}`).
- Flexible. Any conforming state can be operated upon, not just the anticipated
  IntXY type, when tagging and branding are omitted.
- Less code spent.
- First class data. Declarative objective construction using plain idiomatic
  JSON.

#### Cons

- Although tagged unions and branding conventions can help limit creation,
  there’s no encapsulation or immutability. Whether it’s wanted or not, a larger
  API is exposed. Private state can be implied by naming conventions but
  mutating to invalid states unintentionally is trivial. For example:

```ts
const xy = newIntXY(1, 2)
const offset = 123.4
// ... Lots of code ...
xy.x += offset // IntXY is no longer integral.
```

Additionally, it’s usually unclear to a consumer what direct operations on the
data are acceptable to do directly and what would invalidate invariants. In OO,
you can’t even access encapsulated data without a getter. You _must_ define the
full API.

- For branded objects, consumers are tempted to cast away type safety. This is
  confusing to read 1) because how does a consumer know when casting is safe? 2)
  the visual noise of casting loses some of the data-first readability.
- Full object state is still implied for each function if the bundle is always
  consistently passed. If the bundle is not consistently passed, the functions
  have less cohesion with the state bundle.
- No support for custom `toString()` representation. This hurts debugger
  readability.
- No “`.method()`” syntax. This often leads to more verbose invocations
  involving the module name like `IntXY.add({x: 1, y: 2}, {x: 3, y: 4})` instead
  of `({x: 1, y: 2}).add({x: 3, y: 4})`.
- Import options aren’t ideal. Three options:
  - [Declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html).
    Adds an extra indent to implementation but gives the best consumer
    experience and IDE refactors can handle renames correctly:

```ts
// Implementation in IntXY.ts
export type IntXY = {x: number; y: number}

export namespace IntXY {
  // …
  export function add(left: IntXY, right: IntXY): IntXY {
    return {x: left.x + right.x, y: left.y + right.y}
  }
  // …
}

// Usage elsewhere in Example.ts
import {IntXY} from './IntXY'
IntXY.add({x: 1, y: 2}, {x: 3, y: 4})
```

- Wildcard with redundant “type.type” syntax (might hurt bundler dead code
  stripping?):

```ts
import * as IntXY from './IntXY'
const xy: IntXY.IntXY = {x: 1, y: 2}
```

- Rename functions on import to clarify state context and prevent collision:

```ts
import {IntXY, addTo as intXYAddTo} from './IntXY'
intXYAddTo({x: 1, y: 2}, {x: 3, y: 4})
```

### [Tagged Union](https://en.wikipedia.org/wiki/Tagged_union) Data Object

Limits creation and
[structural typing](https://en.wikipedia.org/wiki/Structural_type_system),
affects object spreads, and allows runtime distinction.

### [Branded](https://spin.atomicobject.com/2018/11/05/using-an-int-type-in-typescript/) ([Another Article](https://evertpot.com/opaque-ts-types/)) Data Object

Like a tagged union but with no runtime typing.

### Class Encapsulation

#### Pros

- Encapsulation. Invalid state is not permitted.
  [Class invariants](https://en.wikipedia.org/wiki/Class_invariant) can be
  enforced.
- State is succinctly implied and shared.
- Good language syntax for operations (dot off of type) and class definition.
  Static functions are explicit.
- Native `instanceof` support.
- Easier to conceptualize the whole. All functions operate on a subset of the
  same state. Instead of operations and data being completely disjoint, they’re
  as tightly coupled as possible. This consistency gives a strong coherence and
  cohesiveness to the object as a whole indivisible entity.

#### Cons

- No native support for object construction like `{x: 1, y: 2}`. Everything has
  to be wrapped in imperative function calls like `new IntXY(1, 2)`. This con
  compounds with large composed objects. It's no longer reads as plain data.
- Inheritance is as easy as possible.
- Harder to conceptualize the parts. Implicit state is available to every method
  whether it is needed or not. The larger the class, the worse it is.
- State and functions live together.
- Less flexible. Hard to operate upon arbitrary state unless it conforms to the
  class. For example, it’s impossible to reuse on a floating point version of
  `IntXY`.
- It's no longer plain data.

### Closure Encapsulation

#### Pros

- Inheritance is forbidden. Only benefit over classes?
- Encapsulation. Private state is opaque just as in classes.
- Dot syntax.

#### Cons

- Methods are dynamically recreated for every instance?
- Clumsy definition requires giant outer function and redundant type.
  Declaration of type, including methods, and implementation necessary if you
  want to operate on it. Otherwise recursive type.
  `ReturnType<typeof ClojureThing>` is possible if you don’t need it in the
  implementation

#### Verdict

- No reason to use clojure approach over class-based approach except to
  discourage inheritance.
- Class approach has the best syntax for everything but construction.
- State bundle has the most declarative object construction.
- State bundle approach is smaller and may be better when all data is public and
  has no invariants.

## Conclusion

- No reason to use clojure approach over class-based approach except to
  discourage inheritance.
- Class approach has the best syntax for everything but construction.
- State bundle has the most declarative object construction.
- State bundle approach is smaller and may be better when all data is public and
  has no invariants.

## License

© Stephen Niedzielski.

### GPL-3.0-only

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, version 3.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program. If not, see <https://www.gnu.org/licenses/>.
