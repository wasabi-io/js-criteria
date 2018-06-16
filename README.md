## js-criteria

[![npm package](https://badge.fury.io/gh/wasabi-io%2Fjs-criteria.svg)](https://badge.fury.io/gh/wasabi-io%2Fjs-criteria.svg)
[![Build Status](https://travis-ci.org/wasabi-io/js-criteria.svg?branch=master)](https://travis-ci.org/wasabi-io/js-criteria)
[![codecov](https://codecov.io/gh/wasabi-io/js-criteria/branch/master/graph/badge.svg)](https://codecov.io/gh/wasabi-io/js-criteria)

#### Motivation

Aims to be a complete solution for query on json and javascript map objects.

#### [Type Docs](https://wasabi-io.github.io/js-criteria)

#### Installation

```bash
npm install --save js-criteria
```

#### Usage

  - [Criteria](https://wasabi-io.github.io/js-criteria/modules/_api_criteria_.criteria.html) :
     Provides to create criteria on json.
  - [CriteriaResult](https://wasabi-io.github.io/js-criteria/modules/_api_criteriaresult_.criteriaresult.html) :
     Holds criteria result.
  - [Order](https://wasabi-io.github.io/js-criteria/modules/_api_order_.order.html) :
     Provides to ordering on `Criteria`.
  - [Property](https://wasabi-io.github.io/js-criteria/modules/_api_property_.property.html) :
     Provides to select property on `Criteria`.
  - [Restrictions](https://wasabi-io.github.io/js-criteria/modules/_api_restrictions_.restrictions.html) :
     Provides to filter on `Criteria`.

* import
```typescript
import {Criteria, Order, Restrictions} from "js-criteria";
```


* operate on Criteria

```typescript
        const result = criteria
            .setLimit(10)
            .setOffset(0)
            .sort("age", OrderType.asc)
            .asc("name")
            .desc("surname")
            .isTrue("enabled")
            .isFalse("deleted")
            .isNull("name")
            .isNotNull("name")
            .eq("name", "sample")
            .neq("name", "sample")
            .gt("age", 18)
            .gte("age", 18)
            .lt("age", 18)
            .lte("age", 18)
            .between("age", 18, 24)
            .like("name", "sample")
            .likeIn("name", ["sample"])
            .in("name", ["sample"])
            .startsWith("name", "sample")
            .endsWith("name", "sample")
            .query("sample")
            .list();
        console.log(result.total);
        console.log(result.data);
```

* add restriction

```typescript

const data = [
    {
        name: "Nami",
        age: 16,
    },
    {
        name: "Monkey D. Luffy",
        age: 16,
    },
    {
        name: "Gol D. Roger",
        age: 32,
    },
    {
        name: "Chopper",
        age: 16,
    }
];

const criteria = new Criteria(data);
criteria.add(Restrictions.eq("name", "Gol D. Roger"));
let result = criteria.list();
console.log(result.total);
console.log(result.data);

criteria.clear();
criteria.add(Restrictions.eq("age", 16));
result = criteria.list();
console.log(result.total);
console.log(result.data);

criteria.clear();
criteria.add(Restrictions.eq("age", 16));
result = criteria.list();
console.log(result.total);
console.log(result.data);
```

* add order

```typescript
const data = [
    {
        name: "Nami",
        age: 16,
    },
    {
        name: "Monkey D. Luffy",
        age: 16,
    },
    {
        name: "Gol D. Roger",
        age: 32,
    },
    {
        name: "Chopper",
        age: 16,
    },
];

const criteria = new Criteria(data);
criteria.addOrder(Order.asc("name"));
let result = criteria.list();
console.log(result.total);
console.log(result.data);

```


* add query

```typescript
const data: any = [
    {
        name: "Nami",
        age: 16,
    },
    {
        name: "Monkey D. Luffy",
        age: 16,
    },
    {
        name: "Gol D. Roger",
        age: 32,
    },
    {
        name: "Chopper",
        age: 16,
    },
];

let criteria = new Criteria(data);
criteria.add(Restrictions.query("o"));
let result = criteria.list();
console.log(result.total);
console.log(result.data);

const data2: any = [
    {id: 1, name: "John", surname: "Doe"},
    {name: "Jane", surname: "Roe", id: 2},
];

criteria2 = new Criteria(data2);
criteria2.addQuery(Restrictions.query("J"));
let result2 = criteria.list();
console.log(result2.total);
console.log(result2.data);
```


* reset criteria as initial state.

```typescript

const criteria = new Criteria(data);

criteria.add(Restrictions.eq("name", "Gol D. Roger"));
criteria.addOrder(Order.asc("name"));

let result = criteria.list();

console.log(result.total);
console.log(result.data);

// reset criteria
criteria.clear();

result = criteria.list();

console.log(result.total);
console.log(result.data);  // show all data.

```


* All methods defined on Criteria

    - `public get offset()`
    - `public setOffset(firstResult: number): Criteria<E>`
    - `public get limit()`
    - `public setLimit(limit: number): Criteria<E>`
    - `public sort(name: string, orderType: OrderType): Criteria<E>`
    - `public asc(name: string): Criteria<E>`
    - `public desc(name: string): Criteria<E>`
    - `public isTrue(name: string): Criteria<E>`
    - `public isFalse(name: string): Criteria<E>`
    - `public isNull(name: string): Criteria<E>`
    - `public isNotNull(name: string): Criteria<E>`
    - `public eq(name: string, value: any, caseSensitive?: boolean): Criteria<E>`
    - `public neq(name: string, value: any, caseSensitive?: boolean): Criteria<E>`
    - `public gt(name: string, value: any): Criteria<E>`
    - `public gte(name: string, value: any): Criteria<E>`
    - `public lt(name: string, value: any): Criteria<E>`
    - `public lte(name: string, value: any): Criteria<E>`
    - `public between(name: string, leftValue: any, rightValue: any): Criteria<E>`
    - `public like(name: string, value: any, caseSensitive?: boolean): Criteria<E>`
    - `public likeIn(name: string, values: any[], caseSensitive?: boolean): Criteria<E>`
    - `public in(name: string, values: any[], caseSensitive?: boolean): Criteria<E>`
    - `public startsWith(name: string, value: any, caseSensitive?: boolean): Criteria<E>`
    - `public endsWith(name: string, value: any, caseSensitive?: boolean): Criteria<E>`
    - `public query(value: any, ignoreList?: string[]): Criteria<E>`
    - `public addOrder(orderItem: OrderItem<E>): Criteria<E>`
    - `public removeOrder(key: string): Criteria<E>`
    - `public clearOrder(): Criteria<E>`
    - `public get total(): number`
    - `public add(restriction: RestrictionItem): Criteria<E>`
    - `public removeRestrictionByKey(key: string): Criteria<E>`
    - `public removeRestriction(key: string, op: string): Criteria<E>`
    - `public clearRestriction(): Criteria<E>`
    - `public list(): CriteriaResult<E>`
    - `public clear(): Criteria<E>`


#### LICENSE

The MIT License (MIT)

Copyright (c) 2016 Robe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.