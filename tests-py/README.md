# py-jupyternb-testing Використання Jupyter notebook  для unit тестування

**Розглянуто:**
- Написання тестових кейсів з використаннях спеціально призначних для цього інструментів Python
- Викорстання "спеціальної мови тестувальнка" для автоматичного тестування
- Робота з БД ORALCE (з врахування роботою  з BLOBS  та з типом oracle.data)
- Виконання http  запитів


Для  розгортання репозиторія на банківській станції потрібно зробити наступні кроки:

1. Встановити pyhthon на банківськфй робочій станціх по інструкції: [Розгортання інструментів python на банківських віртуалках](http://pages.pravex.ua/wiki/pvxdevelopment/python/) 
2. Склонувати репзиторій командою

```bash
git clone http://int-ifc-mb10-as.pravex.ua/ZZ000C/py-jupyternb-testing.git
```
3. Запустити workspace Visual Studio Code **py-lab.code-workspace**
4. В терміналі Visual Studio Code створити python virtual environment

```bash
py -m venv env
```
5. В терміналі Visual Studio Code активувати python virtual environment

```bash
.\env\Scripts\activate.ps1
```

6. Встановити птрібні пакети python, що перелічені в  файлі **requirements.txt**


```bash
python.exe -m pip install --upgrade pip
py -m pip install -r requirements.txt
```

7. Запустити Jupyter notebook

```bash
jupyter notebook
```
jupyter notebook запуститься сама, потім відкриє браузер за замовчуванням з пропозицією відкрити notebook


8. Вибрати та відкрити одну з існуючих notebooks: test-oradb.ipynb , diia_signature.ipynb  та почати рооту з ними


P.S.  Більш детально про створення virtual environment  читати за лінком: [Python - flask start](https://pavlo-shcherbukha.github.io/posts/2022-09-02/python-flask-1/)