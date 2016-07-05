## js-criteria api

#### Criteria 

```javascript
    import Criteria from "js-criteria/lib/api/Criteria" 
```

##### init criteria : create new criteria with init list of records

```javascript
    const dataList = [...]
    const criteria = new Criteria(dataList);
```

##### firstResult : ensure start of dataList which is result dataList of the criteria.

* getFirstResult(): number -> get the first result to be retrieved.

```javascript
     criteria.getFirstResult(); // default value is 0
```   

* setFirstResult(number): void -> Set the first result to be retrieved.   
```javascript
     criteria.setFirstResult(1);
```   
 
##### maxResult : a limit upon the number of objects to be retrieved.

* getMaxResult(): number -> get a limit upon the number of objects to be retrieved.

```javascript
     criteria.getMaxResult(); // default value is dataList.lenght
```   

* setMaxResult(number): void -> set a limit upon the number of objects to be retrieved.

```javascript
     criteria.setMaxResult(5);
```   

##### Restrictions : Resrictions to constrain the results to be retrieved.

* getRestrictions : get Resrictions to constrain the results to be retrieved.

```javascript
     criteria.getRestrictions(); // default empty array []
```   

* add : get Resriction to constrain the results to be retrieved.   

```javascript
     criteria.add(Restrictions.like("name","a%"));
```   
 
##### Order : An ordering to the result set..
 
* addOrder : get Resrictions to constrain the results to be retrieved.

```javascript
     criteria.addOrder(Order.asc("name")); // default empty array []
```   


##### list : returns the results.

```javascript
     const resultArray = criteria.list();
```   



#### Restrictions

```javascript
    import Restrictions from "js-criteria/lib/api/Restrictions" 
```
 
##### gt() : Greater Then

```javascript
     criteria.add(Restrictions.gt("id",3));
``` 

##### lt() Less Then
```javascript
     criteria.add(Restrictions.lt("id",3));
``` 

##### like - case sensitive

* equal 

```javascript
     criteria.add(Restrictions.like("name","a"));
```  

* startsWith

```javascript
     criteria.add(Restrictions.like("name","a%"));
```  

* endsWith

```javascript
     criteria.add(Restrictions.like("name","%a"));
```  
 
* contains 
 
```javascript
     criteria.add(Restrictions.like("name","%a%"));
```  

##### ilike - non-case sensitive

* equal 

```javascript
     criteria.add(Restrictions.ilike("name","A"));
```  

* startsWith

```javascript
     criteria.add(Restrictions.ilike("name","A%"));
```  

* endsWith

```javascript
     criteria.add(Restrictions.ilike("name","%A"));
```  
 
* contains
 
```javascript
     criteria.add(Restrictions.ilike("name","%A%"));
```  
 
##### between
 
```javascript
     criteria.add(Restrictions.between("id", 1 ,5));
```

##### isNull
 
```javascript
     criteria.add(Restrictions.isNull("id"));
``` 

##### isNotNull
 
```javascript
     criteria.add(Restrictions.isNotNull("id"));
``` 

##### isEmpty
 
```javascript
     criteria.add(Restrictions.isNull("id"));
``` 

##### isNotEmpty
 
```javascript
     criteria.add(Restrictions.isNull("id"));
``` 

##### or 

```javascript
     let orRestrictions = Restrictions.or(Restrictions.isNotNull("id"), Restrictions.ilike("name","%a%");
     criteria.add(orRestrictions);
``` 

##### and

```javascript
     let andRestrictions = Restrictions.and(Restrictions.isNotNull("id"), Restrictions.ilike("name","%a%");
     criteria.add(andRestrictions);
``` 


##### custom restriction

```javascript
     const customRestriction = (data: Map): boolean => {
          let isOk;
          ...
          return isOk;
     };
     criteria.add(customRestriction);
``` 


#### Order

```javascript
    import Order from "js-criteria/lib/api/Order" 
```

##### asc

```javascript
     criteria.addOrder(Order.asc("name"));
```

##### desc 

```javascript
     criteria.addOrder(Order.desc("name"));
``` 


##### custom order

```javascript
     const customOrder = (dataList: Array<Map>): Array<Map> => {
           ...
          return dataList;
         };
     criteria.addOrder(customOrder);
``` 

