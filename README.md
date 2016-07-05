# js-criteria

#### A complete json , javascript map object criteria library.  

##### Motivation
Aims to be a complete solution for query on json and javascript map objects. All coded with ES6 syntax.
##### What's inside
* [Webpack](https://webpack.github.io/) for all development (server,hotload etc.) and build (package, optimize, etc.) needs.
* [Babel](https://babeljs.io/flow) for writing codes with ES6 syntax and transpiling them browser compatible codes. 
* [ESLint](http://eslint.org/) for protecting our nice formatted codes.
* [Flow](http://flowtype.org/) for type checking.
* [Karma](https://karma-runner.github.io/0.13/index.html) for running tests.
* [Chai](http://chaijs.com/) for asserting test errors.
* [Isparta](https://github.com/douglasduteil/isparta) for ES6 code coverage.
* [Istanbul](https://github.com/gotwarlost/istanbul) for code coveragereporting.

### Quick Start
#### Install and Usage
Go to your project folder
```shell
npm install js-criteria --save
```
You can import this project in 2 ways.

1. Partial import. For ex. `import Criteria from "js-criteria/lib/api/Criteria";`
2. All-in-one, minified, optimized single js. For ex. **TODO: example coming soon.**


* Example Data 

```javascript    
    [
                {
                    id: "2",
                    name: "ewrewr",
                    surname: "fdvdfg"
                },
                {
                    id: "3",
                    name: "dsfdsf",
                    surname: "xcvvxcv"
                },
                {
                    id: "4",
                    name: "dfdsf",
                    surname: "dsfsdf"
                }
    ];
```
     
     
* Create Criteria 
   
```javascript
    const criteria = new Criteria(data);  
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
$ npm run-script build
```
 
####  How to run Unit Tests.

```shell
$ npm test
```
