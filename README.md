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

- [] Панель запитів
- [] Панель часових фільтрів
- [] Змінити кольори графіку
- [] Додати стрілочки на stack
- [] Нижня панель для фільтру ліній
- [] Блок створення запитів (потім розписати)
```

`layout
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
`
