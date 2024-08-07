# Логіка підрахунку постів

```javascript
let initDates = [];
let currentDate = startDate;
let i = binaryFoundIndex;

**Підрахунок існуючої властивості**
if (timestamp in initDates) {
    initDates[timestamp] = initDates[timestamp] + 1;
    i++;
} else {
    **Перевірка поточної дати, яка повинна бути. Починаючи з currentDate = startDate**
    if (timestamp === currentDate) {
        initDates[timestamp] = 1;
        currentDate += 1000;
        i++;
    } else {
        **Додати 0 count**
        initDates[currentDate] = 0;
        currentDate += 1000;
    }
}

currentDate = 20.07.2024 10:04:07
timestamp = 20.07.2024 10:04:07

## Input timestamps
20.07.2024 10:04:00
20.07.2024 10:04:01
...
20.07.2024 10:04:03
20.07.2024 10:04:03
20.07.2024 10:04:04
20.07.2024 10:04:05
20.07.2024 10:04:05
20.07.2024 10:04:05
20.07.2024 10:04:06

## Output data
{
    "20.07.2024 10:04:00": 1,
    "20.07.2024 10:04:01": 1,
    "20.07.2024 10:04:02": 0,
    "20.07.2024 10:04:03": 2,
    "20.07.2024 10:04:04": 1,
    "20.07.2024 10:04:05": 3,
    "20.07.2024 10:04:06": 1
}

##Todo:
- [x] Придумати логіку для підрахунку постів
- [x] Додати фільтр точності
- [x] Додати часовий діапазон
- [x] Додати пагінацію
- [x] Додати внизу джерела, з яких взято інфу
- [x] Додати фільтр по запитах
- [x] Додати фільтр по ключ. слову

##Todo layout:

- [x] Панель запитів
- [x] Панель часових фільтрів
- [x] Змінити кольори графіку
- [x] Додати стрілочки на stack
- [x] Нижня панель для фільтру ліній
- [] Додати нові лінії на графік
- [] Блок створення запитів
    Верстка

- [] Додати іконки в Sidebar, змінити іконку папки
- [] Додати фільтр по ключ слову
- [] Блок з джерелами
- [] Локалізація
```

```layout
container
    title (with margin-left)
    Layout
        Sidebar
        Main
            RequestsFilter
            TimeFilters
                TimeAccuracy
                TimeRange
            Chart
            Lines
```

```Requests-filter-add layout
    requests-panel
        isCreateRequests ?
        (DefaultLayout) : (CreateLayout)

        CreateLayout
            panel with 2 buttons
            requests-list block
                CreateRequestItem
                    it is a wrapper with delete button
                    and you can change names of group or request
                        using contenteditable

```

##Todo:
[] - додати обробку під-запитів
[] - створення запитів і груп
[] - змінити макет на grid сітку
[] - створення запитів всередині групи
