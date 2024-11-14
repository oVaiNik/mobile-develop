# Лабораторные работы

## Автор: Никифоров Арсен

### Группа: ФИИТ-21

---

## Lab1: Игра с пузырьками

### Описание:

Реализована простая игра, в которой пользователь должен перетаскивать пузырьки на экране. Основные особенности игры:

- Анимация и перетаскивание пузырьков с помощью **Animated** и **PanResponder**.
- Ведение счёта и отображение таймера окончания игры с использованием хуков **useState** и **useEffect**.
- Интерфейс с динамически обновляемыми элементами.
- Игра завершается, когда время на таймере истекает, и выводится итоговый счёт.

---

## Lab2: NASA APOD API

### Описание:

Приложение для работы с NASA Astronomy Picture of the Day (APOD) API. Основные возможности:

- Загрузка случайных изображений с описанием с помощью NASA APOD API.
- Использование хуков **useReducer**, **useContext**, **useCallback** и **useMemo** для оптимизации управления состоянием и загрузки данных.
- Возможность сохранения изображений в избранное с помощью кнопки "Сохранить в избранное", где изображение сохраняется в глобальное состояние.
- Реализован просмотр сохранённых изображений через экран галереи, где отображаются данные о сохранённых изображениях (заголовок, дата, описание).
- Интерфейс с элементами навигации и адаптивной версткой.

---

## Lab3: Космический калькулятор

### Описание:

Игра, в которой пользователь решает математические задачи для спасения галактики. Основные особенности:

- Генерация математических задач с возрастающей сложностью.
- Игрок продвигается по уровням, правильно отвечая на вопросы.
- Игра завершается победой при достижении 10 уровня.
- Игра завершается поражением при совершении 3 ошибок.

### Технологии:

- Использование хуков **useState**, **useMemo**, **useCallback** для управления состоянием и оптимизации.
- Тактильная отдача и анимации для улучшения пользовательского опыта.

### Интерфейс:

- Космическая тематика с использованием фоновых изображений и градиентов.
- Интерактивный интерфейс с виртуальной клавиатурой для ввода ответов.

---

## Навигация и стилизация

- Приложение использует библиотеку **@react-navigation/native** для навигации между экранами.
- Применены стили и фоновые изображения для улучшения интерфейса.

---