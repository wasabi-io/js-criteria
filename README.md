# js-criteria

#### A criteria library on json , javascript map object.  

[![Build Status](https://travis-ci.org/kbukum/js-criteria.svg?branch=master)](https://travis-ci.org/kbukum/js-criteria)
[![codecov](https://codecov.io/gh/kbukum/js-criteria/branch/master/graph/badge.svg)](https://codecov.io/gh/kbukum/js-criteria)

##### Docs
* [Docs](https://kbukum.github.io/js-criteria) documentation.


##### Motivation

Aims to be a complete solution for query on json and javascript map objects. All coded with ES6 syntax.

##### What's inside

* [Typescript](https://www.typescriptlang.org/) for all development.
* [Karma](https://karma-runner.github.io/0.13/index.html) for running tests.
* [Karma-Type-Script](https://www.npmjs.com/package/karma-typescript) for running tests and code coverage
* [Chai](http://chaijs.com/) for asserting test errors.

#### Library Types

* CommonJs - You can use this library with webpack it is default.
  
  `import Criteria from "js-criteria/lib/criteria/Criteria";`
  
* AMD - if you want to import files as lazy then you can use ./amd
    - more information about AMD : http://requirejs.org/docs/whyamd.html
* UMD - if you want to import files as lazy then you can use ./umd
    - more information about UMD : https://github.com/umdjs/umd

### Quick Start

#### Install and Usage
Go to your project folder
```shell
npm install js-criteria --save
```
You can import this project in 2 ways.

1. Partial import. For ex. `import Criteria from "js-criteria/lib/criteria/Criteria";`
2. All-in-one, minified, optimized single js. For ex. **TODO: example coming soon.**
    
* [see api detail for usage](./manual/api.md)
* Example Data 

```javascript    
    [
        {
            id: "1",
            name: "Luffy",
            surname: "Monkey D."
        },
        {
            id: "2",
            name: "Zoro",
            surname: "Roronoa"
        },
        {
            id: "3",
            name: "Nami",
            surname: ""
        },
    ];
```
     

* Create Criteria to query on list of data
   
```javascript
    const criteria = new Criteria(dataList);  
```


* add Restrictions 

```javascript
  criteria.add(Restrictions.like("name", "%a%"));
  criteria.add(Restrictions.gt("id", 1));
```  
 
* setFirstResult 

```javascript
    criteria.setMaxResults(3); 
``` 
 
* setMaxResults

```javascript
    criteria.setMaxResults(3); 
``` 
 
* add Order (sorting)  
```javascript
    criteria.addOrder(Order.asc("name")); 
```       
      
* get result list
 
```javascript
    const list = criteria.list();
```    

    
#### How to contribute
Clone and run `npm install`. This will install both run-time project dependencies and developer tools listed
in [package.json](./package.json) file.

#### How to Build for Production

If you need just to build the app (without running a dev server), simply run:

```shell
$ npm run build
```
or

```shell
$ yarn build
```
 
####  How to run Unit Tests.

```shell
$ npm test
```
or

```shell
$ yarn test
```
 