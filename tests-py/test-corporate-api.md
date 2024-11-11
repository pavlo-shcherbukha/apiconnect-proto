# corporate-api короткий опис та приклади unit тестів
Цей API розроблено для того, щоб завести корпорацію, що буде робити виплати на карти

## Методи API

**baseURL:** /corporate-api/corporate

### http-put - створити корпорацію

<details>
  <summary>Детально про метод</summary>

- обов'язкові http заголовки
```text
Content-Type: application/json
```
- запит

  ```json
{
  "name": "Університет Шевченка",
  "edrpou": "1234567",
  "contacts": "Вулиця Володимирська 60, буд 1, індекс 12323"
}
  ```

- відповідь

```json
{"corporateid":"CORP-681099c6c2b601b63fa1746c73edc789"}
```
  
</details>
    
### http-get - (без параметрів) отримати список всіх корпорацій

<details>
  <summary>Детально про метод</summary>

- обов'язкові http заголовки
```text
Content-Type: application/json
```


- відповідь

```json
    [
      {
        "_id": "CORP-681099c6c2b601b63fa1746c73edc789",
        "_rev": "1-e798abd7b55545c01c323c0aa7ad35ba",
        "type": "CORPORATE",
        "name": "Університет Шевченка",
        "contacts": "Вулиця Володимирська 60, буд 1, індекс 12323",
        "branches": []
      },
      {
        "_id": "CORP-68f6002dfa4e1d8d2711b8fc03bf8c94",
        "_rev": "1-e798abd7b55545c01c323c0aa7ad35ba",
        "type": "CORPORATE",
        "name": "Університет Шевченка",
        "contacts": "Вулиця Володимирська 60, буд 1, індекс 12323",
        "branches": []
      },
      {
        "_id": "CORP-821d5655a7dcd7f1017eaae1db60ffe6",
        "_rev": "1-e798abd7b55545c01c323c0aa7ad35ba",
        "type": "CORPORATE",
        "name": "Університет Шевченка",
        "contacts": "Вулиця Володимирська 60, буд 1, індекс 12323",
        "branches": []
      },
      {
        "_id": "CORP-b51d69eceee531cfd3a57d3a5bfc9de4",
        "_rev": "1-e798abd7b55545c01c323c0aa7ad35ba",
        "type": "CORPORATE",
        "name": "Університет Шевченка",
        "contacts": "Вулиця Володимирська 60, буд 1, індекс 12323",
        "branches": []
      },
      {
        "_id": "CORP-b6b02fee3ba9048bc0d057a250aff1ac",
        "_rev": "1-b015cf1c533bece692bd7c8a22d5676c",
        "type": "CORPORATE",
        "name": "Авто трейдінг легкових",
        "contacts": "Вул. Інституцька 27, буд 3, індекс 19222",
        "branches": []
      },
      {
        "_id": "CORP-b6b02fee3ba9048bc0d057a250b6e873",
        "_rev": "1-e798abd7b55545c01c323c0aa7ad35ba",
        "type": "CORPORATE",
        "name": "Університет Шевченка",
        "contacts": "Вулиця Володимирська 60, буд 1, індекс 12323",
        "branches": []
      },
      {
        "_id": "CORP-ebc6a35db0853c6cd0cedc11226a8d72",
        "_rev": "1-e798abd7b55545c01c323c0aa7ad35ba",
        "type": "CORPORATE",
        "name": "Університет Шевченка",
        "contacts": "Вулиця Володимирська 60, буд 1, індекс 12323",
        "branches": []
      }
    ]

```

  
</details>

### http-get - (з параметром id корпорації) отримати дані однієї корпорації

<details>
  <summary>Детально про метод</summary>

- обов'язкові http заголовки
```text
Content-Type: application/json
```
- запит

  В URL передається ідентифікатор корпорації:  /corporate-api/corporate/:corporateid

  
  url: http://localhost:8080/corporate-api/corporate/CORP-681099c6c2b601b63fa1746c73edc789
  

- відповідь

```json
{
  "_id": "CORP-681099c6c2b601b63fa1746c73edc789",
  "_rev": "1-e798abd7b55545c01c323c0aa7ad35ba",
  "type": "CORPORATE",
  "name": "Університет Шевченка",
  "contacts": "Вулиця Володимирська 60, буд 1, індекс 12323",
  "branches": []
}

```
  
</details>


### http-delete - (з параметром id корпорації) видалити дані однієї корпорації


<details>
  <summary>Детально про метод</summary>

- обов'язкові http заголовки
```text
Content-Type: application/json
```
- запит

  В URL передається ідентифікатор корпорації:  /corporate-api/corporate/:corporateid

   url: http://localhost:8080/corporate-api/corporate/CORP-681099c6c2b601b63fa1746c73edc789

- відповідь

```json
{"id":"CORP-681099c6c2b601b63fa1746c73edc789","rev":"2-34292cda93dd4d6b3fd334ac0ee45bb9","ok":true}

```

  
</details>


## Unit-тести

Для тестів створено стандартний тестовий клас: **TestCorporateAPI**, з наступними функціями

- test_createСorp - створити корпорацію
- test_getСorpList - отримати списко всіх копорацій   
- test_getСorpItem  - отримати реквізити  одної корпорації по id
- test_deleteСorpItem - видалити зі списку одну корпорацію по id

в тестах перевіряється тільки відповідність відповіді на http status code =200



```python
import requests
import unittest
import sys
import logging
import json
import datetime
import base64

logging.basicConfig(stream=sys.stdout, level=logging.INFO)

class TestCorporateAPI(unittest.TestCase):
    baseurl="http://localhost:8080"
    corporates={}
    requests={}
    
    
    requests["createCorpporate"]={
                                  "name": "Університет Шевченка",
                                  "edrpou": "1234567",
                                  "contacts": "Вулиця Володимирська 60, буд 1, індекс 12323"
    }

    """
    requests["createCorpporate"]={
                                  "name": "Авто трейдінг легкових",
                                  "edrpou": "1431120",
                                  "contacts": "Вул. Інституцька 27, буд 3, індекс 19222"
    }
    """

    
    def setUp(self):
        log=logging.getLogger('setUp')
        #log.info("1")


    def tearDown(self):
        log=logging.getLogger('tearDown')
        #log.info("2")


  
    def test_createСorp(self):
        """================ Створити корпорацію ================"""
        log=logging.getLogger('test_createСorp')
        log.info( f"Опис тесту: {self.shortDescription()}" )

        log.info( f"Отримую тестовий запит")
        req_obj = TestCorporateAPI.requests["createCorpporate"]
        req_url=TestCorporateAPI.baseurl + "/corporate-api/corporate"
        req_data=json.dumps(req_obj, ensure_ascii=False )
        log.info(f"Формую запит на url: {req_url}")
        log.info("Method: http-PUT")
        log.info(f"Тіло запиту: {req_data}")
        
        log.info("Виконю http запит")
        response = requests.put(req_url,  data=req_data , headers={'Content-Type': 'application/json'} )    
        log.info(f"Response: {response.text}")
        log.info("Перевіря відповідь  statusCode=200")
        self.assertEqual(response.status_code, 200)
        res_dict=response.json()

    def test_getСorpList(self):
            """================ Отримати список всіх корпорацій  ================"""
            log=logging.getLogger('test_getСorpList')
            log.info( f"Опис тесту: {self.shortDescription()}" )
            req_url=TestCorporateAPI.baseurl + "/corporate-api/corporate"
          
            log.info(f"Формую запит на url: {req_url}")
            log.info("Method: http-get")
            log.info("Виконю http запит")
            response = requests.get(req_url, headers={'Content-Type': 'application/json'} )    
            log.info(f"Response: {response.text}")
            log.info("Перевіря відповідь  statusCode=200")
            self.assertEqual(response.status_code, 200)
            res_dict=response.json()
            TestCorporateAPI.corporates["list"]=res_dict

    def test_getСorpItem(self):
            """================ Отримати одну корпорацію оп id  ================"""
            log=logging.getLogger('test_getСorpItem')
            log.info( f"Опис тесту: {self.shortDescription()}" )
            corporateList=TestCorporateAPI.corporates["list"]
            if len(corporateList) > 0:
                corporateid=corporateList[0]["_id"]
                req_url=TestCorporateAPI.baseurl + f"/corporate-api/corporate/{corporateid}"
                log.info(f"Формую запит на url: {req_url}")
                log.info("Method: http-get")
                log.info("Виконю http запит")
                response = requests.get(req_url, headers={'Content-Type': 'application/json'} )    
                log.info(f"Response: {response.text}")
                log.info("Перевіря відповідь  statusCode=200")
                self.assertEqual(response.status_code, 200)
                res_dict=response.json()
                
    def test_deleteСorpItem(self):
            """================ Видалити одну корпорацію оп id  ================"""
            log=logging.getLogger('test_deleteСorpItem')
            log.info( f"Опис тесту: {self.shortDescription()}" )
            corporateList=TestCorporateAPI.corporates["list"]
            if len(corporateList) > 0:
                corporateid=corporateList[0]["_id"]
                req_url=TestCorporateAPI.baseurl + f"/corporate-api/corporate/{corporateid}"
                log.info(f"Формую запит на url: {req_url}")
                log.info("Method: http-get")
                log.info("Виконю http запит")
                response = requests.delete(req_url, headers={'Content-Type': 'application/json'} )    
                log.info(f"Response: {response.text}")
                log.info("Перевіря відповідь  statusCode=200")
                self.assertEqual(response.status_code, 200)
                res_dict=response.json()
   
def suite():
    suite = unittest.TestSuite()
    suite.addTest(TestCorporateAPI('test_createСorp'))
    suite.addTest(TestCorporateAPI('test_getСorpList'))    
    suite.addTest(TestCorporateAPI('test_getСorpItem'))   
    suite.addTest(TestCorporateAPI('test_deleteСorpItem'))   

    return suite

if __name__ == '__main__':
    runner = unittest.TextTestRunner()
    runner.run(suite())
```

    INFO:test_createСorp:Опис тесту: ================ Створити корпорацію ================
    The history saving thread hit an unexpected error (OperationalError('attempt to write a readonly database')).History will not be written to the database.
    INFO:test_createСorp:Отримую тестовий запит
    INFO:test_createСorp:Формую запит на url: http://localhost:8080/corporate-api/corporate
    INFO:test_createСorp:Method: http-PUT
    INFO:test_createСorp:Тіло запиту: {"name": "Університет Шевченка", "edrpou": "1234567", "contacts": "Вулиця Володимирська 60, буд 1, індекс 12323"}
    INFO:test_createСorp:Виконю http запит
    INFO:test_createСorp:Response: {"corporateid":"CORP-681099c6c2b601b63fa1746c73edc789"}
    INFO:test_createСorp:Перевіря відповідь  statusCode=200


    .

    INFO:test_getСorpList:Опис тесту: ================ Отримати список всіх корпорацій  ================
    INFO:test_getСorpList:Формую запит на url: http://localhost:8080/corporate-api/corporate
    INFO:test_getСorpList:Method: http-get
    INFO:test_getСorpList:Виконю http запит
    INFO:test_getСorpList:Response: [{"_id":"CORP-681099c6c2b601b63fa1746c73edc789","_rev":"1-e798abd7b55545c01c323c0aa7ad35ba","type":"CORPORATE","name":"Університет Шевченка","contacts":"Вулиця Володимирська 60, буд 1, індекс 12323","branches":[]},{"_id":"CORP-68f6002dfa4e1d8d2711b8fc03bf8c94","_rev":"1-e798abd7b55545c01c323c0aa7ad35ba","type":"CORPORATE","name":"Університет Шевченка","contacts":"Вулиця Володимирська 60, буд 1, індекс 12323","branches":[]},{"_id":"CORP-821d5655a7dcd7f1017eaae1db60ffe6","_rev":"1-e798abd7b55545c01c323c0aa7ad35ba","type":"CORPORATE","name":"Університет Шевченка","contacts":"Вулиця Володимирська 60, буд 1, індекс 12323","branches":[]},{"_id":"CORP-b51d69eceee531cfd3a57d3a5bfc9de4","_rev":"1-e798abd7b55545c01c323c0aa7ad35ba","type":"CORPORATE","name":"Університет Шевченка","contacts":"Вулиця Володимирська 60, буд 1, індекс 12323","branches":[]},{"_id":"CORP-b6b02fee3ba9048bc0d057a250aff1ac","_rev":"1-b015cf1c533bece692bd7c8a22d5676c","type":"CORPORATE","name":"Авто трейдінг легкових","contacts":"Вул. Інституцька 27, буд 3, індекс 19222","branches":[]},{"_id":"CORP-b6b02fee3ba9048bc0d057a250b6e873","_rev":"1-e798abd7b55545c01c323c0aa7ad35ba","type":"CORPORATE","name":"Університет Шевченка","contacts":"Вулиця Володимирська 60, буд 1, індекс 12323","branches":[]},{"_id":"CORP-ebc6a35db0853c6cd0cedc11226a8d72","_rev":"1-e798abd7b55545c01c323c0aa7ad35ba","type":"CORPORATE","name":"Університет Шевченка","contacts":"Вулиця Володимирська 60, буд 1, індекс 12323","branches":[]}]
    INFO:test_getСorpList:Перевіря відповідь  statusCode=200


    .

    INFO:test_getСorpItem:Опис тесту: ================ Отримати одну корпорацію оп id  ================
    INFO:test_getСorpItem:Формую запит на url: http://localhost:8080/corporate-api/corporate/CORP-681099c6c2b601b63fa1746c73edc789
    INFO:test_getСorpItem:Method: http-get
    INFO:test_getСorpItem:Виконю http запит
    INFO:test_getСorpItem:Response: {"_id":"CORP-681099c6c2b601b63fa1746c73edc789","_rev":"1-e798abd7b55545c01c323c0aa7ad35ba","type":"CORPORATE","name":"Університет Шевченка","contacts":"Вулиця Володимирська 60, буд 1, індекс 12323","branches":[]}
    INFO:test_getСorpItem:Перевіря відповідь  statusCode=200


    .

    INFO:test_deleteСorpItem:Опис тесту: ================ Видалити одну корпорацію оп id  ================
    INFO:test_deleteСorpItem:Формую запит на url: http://localhost:8080/corporate-api/corporate/CORP-681099c6c2b601b63fa1746c73edc789
    INFO:test_deleteСorpItem:Method: http-get
    INFO:test_deleteСorpItem:Виконю http запит
    INFO:test_deleteСorpItem:Response: {"id":"CORP-681099c6c2b601b63fa1746c73edc789","rev":"2-34292cda93dd4d6b3fd334ac0ee45bb9","ok":true}
    INFO:test_deleteСorpItem:Перевіря відповідь  statusCode=200


    .
    ----------------------------------------------------------------------
    Ran 4 tests in 0.759s
    
    OK





```python

```


```python

```
