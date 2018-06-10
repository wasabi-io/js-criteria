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
console.log(criteria.list().total);
console.log(criteria.list().data);

criteria.add(Restrictions.eq("age", 16));
console.log(criteria.list().total);
console.log(criteria.list().data);

criteria.add(Restrictions.eq("age", 16));
console.log(criteria.list().total);
console.log(criteria.list().data);
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
console.log(criteria.list().total);
console.log(criteria.list().data);
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
criteria.addQuery({
    value: "o",
});
console.log(criteria.list().total);
console.log(criteria.list().data);

const data2: any = [
    {id: 1, name: "John", surname: "Doe"},
    {name: "Jane", surname: "Roe", id: 2},
];

criteria2 = new Criteria(data2);
criteria2.addQuery({
    value: "J",
});
console.log(criteria2.list().total);
console.log(criteria2.list().data);
```


   


