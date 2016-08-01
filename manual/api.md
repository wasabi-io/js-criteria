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
 
##### op() : Operator Evaluation

```javascript
     criteria.add(Restrictions.op("<", "age", "35"));
```  

##### eq() : Equal

```javascript
     criteria.add(Restrictions.eq("name", "Kamil"));
     criteria.add(Restrictions.eq("name", "Kamil", true));
```  

##### lt() : Less then

```javascript
     criteria.add(Restrictions.lt("age",32));
```  

##### lte() : Less then or Equal

```javascript
     criteria.add(Restrictions.lte("age",32));
```  

##### gt() : Greater then

```javascript
     criteria.add(Restrictions.gt("age",32));
```  

##### gte() : Greater then or Equal

```javascript
     criteria.add(Restrictions.gte("age",32));
```  

##### between() : Between startValue and endValue

```javascript
     criteria.add(Restrictions.between("age", 29 , 32));
```  

##### startsWith() : Starts with value

```javascript
     criteria.add(Restrictions.startsWith("name","Ka"));
     criteria.add(Restrictions.startsWith("name","ka", true));
```  

##### endsWith() : Ends with value

```javascript
     criteria.add(Restrictions.endsWith("name","il"));
     criteria.add(Restrictions.startsWith("name","IL", true));
```  

##### contains() : contains value

```javascript
     criteria.add(Restrictions.contains("name","mi"));
     criteria.add(Restrictions.contains("name","MI", true));
```  



##### like contains with percent charachter like sql LIKE 

```javascript
     criteria.add(Restrictions.like("name","%il"));
     criteria.add(Restrictions.like("name", "%aka%", true));
```  


##### in

```javascript
     criteria.add(Restrictions.in("age", [30,31]);
     criteria.add(Restrictions.in("name", ["Kamil"]);
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

