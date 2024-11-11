# payment-api короткий опис та приклади unit тестів
Цей API розроблено для того, щоб передати платіжну відомість в банк

## Методи API

**baseURL:** /payment-api/payment

### http-зге - Створення документу- плтіжнохї відомості

<details>
  <summary>Детально про метод</summary>

- обов'язкові http заголовки
```text
Content-Type: application/json
```
  
  
- запит

```json
    {
    
      
      "branchid": "BRANCH-123456", 
      "payment_type": "zp",
      "sep_payment_ref": "1234567",  
      "signature": "WERTYYY=" ,
      "rows":[

        {
            emp_id: "123456"
            emp_fio: "Абрамян К.В.",
            emp_card_acc: "2620123456789",
            tr_type: "20",
            tr_amount: 2300000,
            tr_currency: "UAH"
        },

        {
            emp_id: "123456"
            emp_fio: "Абрамян К.В.",
            emp_card_acc: "2620123456789",
            tr_type: "20",
            tr_amount: 2300000,
            tr_currency: "UAH"
        },
        {
            emp_id: "123456"
            emp_fio: "Абрамян К.В.",
            emp_card_acc: "2620123456789",
            tr_type: "20",
            tr_amount: 2300000,
            tr_currency: "UAH"
        }          
          
      ]  
    }
```

- відповідь

```json
 {"paymentid":"PAYMENT-d6d4d6b42e93963c596fff4a65caf148"}
```
  
</details>
    


### http-get - (з параметром id плвтежа отримати дані платежа-відомості

<details>
  <summary>Детально про метод</summary>

- обов'язкові http заголовки
```text
Content-Type: application/json
```
- запит

  В URL передається ідентифікатор платежу ( відомості), що отримано при створенні:  /payment-api/payment/:paymentid

  
  url: http://localhost:8080/payment-api/payment/PAYMENT-d6d4d6b42e93963c596fff4a65caf148
  

- відповідь

```json
{
  "_id": "PAYMENT-d6d4d6b42e93963c596fff4a65caf148",
  "_rev": "1-053b5e6057c660572d32c34fdea18da9",
  "type": "PAYMENT",
  "branchid": "BRANCH-93ff6628157b0afa26fbfb1463dbd136",
  "payment_type": "zp",
  "sep_payment_ref": 1234567,
  "signature": "WERTYYY=",
  "rows": [
    {
      "emp_id": "123456",
      "emp_fio": "Абрамян К.В.",
      "emp_card_acc": "2620123456789",
      "tr_type": "20",
      "tr_amount": 2300000,
      "tr_currency": "UAH"
    },
    {
      "emp_id": "123456",
      "emp_fio": "Абрамян К.В.",
      "emp_card_acc": "2620123456789",
      "tr_type": "20",
      "tr_amount": 2300000,
      "tr_currency": "UAH"
    },
    {
      "emp_id": "123456",
      "emp_fio": "Абрамян К.В.",
      "emp_card_acc": "2620123456789",
      "tr_type": "20",
      "tr_amount": 2300000,
      "tr_currency": "UAH"
    }
  ],
  "proc_status": "NEW"
}

```
  
</details>


### http-get - (з параметром status/id плвтежа: отримати статус обробки платежа-відомості

<details>
  <summary>Детально про метод</summary>

- обов'язкові http заголовки
```text
Content-Type: application/json
```
- запит

  В URL передається ідентифікатор платежу ( відомості), що отримано при створенні:  /payment-api/payment/status/:paymentid

  
  url: http://localhost:8080/payment-api/payment/status/PAYMENT-d6d4d6b42e93963c596fff4a65caf148
  

- відповідь

```json
{"status":"NEW"}
```
  
</details>



## Unit-тести

Для тестів створено стандартний тестовий клас: **TestPaymentAPI**, з наступними функціями

- test_createPayment - створити платіж-відомість на заразуваня зарплати
- test_getPaymentItem  - Прочитати дані платежу
- test_getPaymentStatus - Прочитати статус обробки платежу

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

class TestPaymentAPI(unittest.TestCase):
    baseurl="http://localhost:8080"
    requests={}
    #branches={}
    requests["branchid"]="BRANCH-93ff6628157b0afa26fbfb1463dbd136"
    requests["paymentid"]=None
    requests["createPayment"]={
                                    "branchid": "BRANCH-93ff6628157b0afa26fbfb1463dbd136",
                                    "payment_type": "zp",
                                    "sep_payment_ref": 1234567,
                                    "signature": "WERTYYY=",
                                    "rows": [
                                        {
                                            "emp_id": "123456",
                                            "emp_fio": "Абрамян К.В.",
                                            "emp_card_acc": "2620123456789",
                                            "tr_type": "20",
                                            "tr_amount": 2300000,
                                            "tr_currency": "UAH"
                                        },
                                        {
                                            "emp_id": "123456",
                                            "emp_fio": "Абрамян К.В.",
                                            "emp_card_acc": "2620123456789",
                                            "tr_type": "20",
                                            "tr_amount": 2300000,
                                            "tr_currency": "UAH"
                                        },
                                        {
                                            "emp_id": "123456",
                                            "emp_fio": "Абрамян К.В.",
                                            "emp_card_acc": "2620123456789",
                                            "tr_type": "20",
                                            "tr_amount": 2300000,
                                            "tr_currency": "UAH"
                                        }
                                    ]
                                }
                                

 
    

    
    def setUp(self):
        log=logging.getLogger('setUp')
        #log.info("1")


    def tearDown(self):
        log=logging.getLogger('tearDown')
        #log.info("2")


  
    def test_createPayment(self):
        """================ Створити зарплатну відомість для  branch  ================"""
        log=logging.getLogger('test_createPayment')
        log.info( f"Опис тесту: {self.shortDescription()}" )

        log.info( f"Отримую тестовий запит")
        req_obj = TestPaymentAPI.requests["createPayment"]
        req_url=TestPaymentAPI.baseurl + "/payment-api/payment"
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
        TestPaymentAPI.requests["paymentid"] = res_dict["paymentid"]

 
    def test_getPaymentItem(self):
        """================ Прочитати платіж-відомість оп id  ================"""
        log=logging.getLogger('getPaymentItem')
        log.info( f"Опис тесту: {self.shortDescription()}" )
        req_url=TestPaymentAPI.baseurl + f"/payment-api/payment/{TestPaymentAPI.requests['paymentid']}"
        log.info(f"Формую запит на url: {req_url}")
        log.info("Method: http-get")
        log.info("Виконю http запит")
        response = requests.get(req_url, headers={'Content-Type': 'application/json'} )    
        log.info(f"Response: {response.text}")
        log.info("Перевіря відповідь  statusCode=200")
        self.assertEqual(response.status_code, 200)
        res_dict=response.json()
                                
    def test_getPaymentStatus(self):
        """================ Прочитати статус платежа-відомості по id  ================"""
        log=logging.getLogger('getPaymentItem')
        log.info( f"Опис тесту: {self.shortDescription()}" )
        req_url=TestPaymentAPI.baseurl + f"/payment-api/payment/status/{TestPaymentAPI.requests['paymentid']}"
        log.info(f"Формую запит на url: {req_url}")
        log.info("Method: http-get")
        log.info("Виконю http запит")
        response = requests.get(req_url, headers={'Content-Type': 'application/json'} )    
        log.info(f"Response: {response.text}")
        log.info("Перевіря відповідь  statusCode=200")
        self.assertEqual(response.status_code, 200)
        res_dict=response.json()
   
def suite():
    suite = unittest.TestSuite()
    suite.addTest(TestPaymentAPI('test_createPayment'))
    suite.addTest(TestPaymentAPI('test_getPaymentStatus'))    
    suite.addTest(TestPaymentAPI('test_getPaymentItem'))   
    #suite.addTest(TestBranchAPI('test_deleteBranchItem'))   

    return suite

if __name__ == '__main__':
    runner = unittest.TextTestRunner()
    runner.run(suite())
```

    INFO:test_createPayment:Опис тесту: ================ Створити зарплатну відомість для  branch  ================
    INFO:test_createPayment:Отримую тестовий запит
    INFO:test_createPayment:Формую запит на url: http://localhost:8080/payment-api/payment
    INFO:test_createPayment:Method: http-PUT
    INFO:test_createPayment:Тіло запиту: {"branchid": "BRANCH-93ff6628157b0afa26fbfb1463dbd136", "payment_type": "zp", "sep_payment_ref": 1234567, "signature": "WERTYYY=", "rows": [{"emp_id": "123456", "emp_fio": "Абрамян К.В.", "emp_card_acc": "2620123456789", "tr_type": "20", "tr_amount": 2300000, "tr_currency": "UAH"}, {"emp_id": "123456", "emp_fio": "Абрамян К.В.", "emp_card_acc": "2620123456789", "tr_type": "20", "tr_amount": 2300000, "tr_currency": "UAH"}, {"emp_id": "123456", "emp_fio": "Абрамян К.В.", "emp_card_acc": "2620123456789", "tr_type": "20", "tr_amount": 2300000, "tr_currency": "UAH"}]}
    INFO:test_createPayment:Виконю http запит
    INFO:test_createPayment:Response: {"paymentid":"PAYMENT-d6d4d6b42e93963c596fff4a65caf148"}
    INFO:test_createPayment:Перевіря відповідь  statusCode=200


    .

    INFO:getPaymentItem:Опис тесту: ================ Прочитати статус платежа-відомості по id  ================
    INFO:getPaymentItem:Формую запит на url: http://localhost:8080/payment-api/payment/status/PAYMENT-d6d4d6b42e93963c596fff4a65caf148
    INFO:getPaymentItem:Method: http-get
    INFO:getPaymentItem:Виконю http запит
    INFO:getPaymentItem:Response: {"status":"NEW"}
    INFO:getPaymentItem:Перевіря відповідь  statusCode=200


    .

    INFO:getPaymentItem:Опис тесту: ================ Прочитати платіж-відомість оп id  ================
    INFO:getPaymentItem:Формую запит на url: http://localhost:8080/payment-api/payment/PAYMENT-d6d4d6b42e93963c596fff4a65caf148
    INFO:getPaymentItem:Method: http-get
    INFO:getPaymentItem:Виконю http запит
    INFO:getPaymentItem:Response: {"_id":"PAYMENT-d6d4d6b42e93963c596fff4a65caf148","_rev":"1-053b5e6057c660572d32c34fdea18da9","type":"PAYMENT","branchid":"BRANCH-93ff6628157b0afa26fbfb1463dbd136","payment_type":"zp","sep_payment_ref":1234567,"signature":"WERTYYY=","rows":[{"emp_id":"123456","emp_fio":"Абрамян К.В.","emp_card_acc":"2620123456789","tr_type":"20","tr_amount":2300000,"tr_currency":"UAH"},{"emp_id":"123456","emp_fio":"Абрамян К.В.","emp_card_acc":"2620123456789","tr_type":"20","tr_amount":2300000,"tr_currency":"UAH"},{"emp_id":"123456","emp_fio":"Абрамян К.В.","emp_card_acc":"2620123456789","tr_type":"20","tr_amount":2300000,"tr_currency":"UAH"}],"proc_status":"NEW"}
    INFO:getPaymentItem:Перевіря відповідь  statusCode=200


    .
    ----------------------------------------------------------------------
    Ran 3 tests in 1.282s
    
    OK





```python

```


```python

```
