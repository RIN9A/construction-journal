# СтройКонтроль — Журнал работ

Внутренний инструмент для учёта выполненных работ на строительном объекте. Прораб ведёт ежедневный журнал: фиксирует вид работ, объём и исполнителя.

https://github.com/user-attachments/assets/61a6bfbc-8dcd-4f12-9534-6cf4e7838bff


## Стек

| Слой | Технология |
|---|---|
| Frontend | Next.js 15, React 19, TypeScript |
| Стиль | Tailwind CSS v4, CSS переменные |
| Данные (клиент) | TanStack Query, Axios |
| Формы | React Hook Form, Zod |
| Backend | NestJS, TypeScript |
| ORM | Prisma |
| БД | MySQL 8 |
| Инфра | Docker, Docker Compose |

## Функциональность

- Список записей журнала с сортировкой и фильтрацией по дате
- Добавление записи с валидацией всех полей
- Редактирование существующей записи
- Удаление записи с подтверждением
- Справочник видов работ (отдельная таблица в БД)
- Статистика: количество записей, исполнителей, видов работ
- Seed с тестовыми данными для демонстрации

## Запуск

**Требования:** Docker и Docker Compose.
```bash
git clone <repo-url>
cd construction-journal
docker-compose up --build
```

Открыть: [http://localhost:3000](http://localhost:3000)

Миграции и тестовые данные применяются автоматически при первом запуске.

## Структура проекта
```
construction-journal/
├── backend/                  # NestJS API
│   ├── src/
│   │   ├── entries/          # Модуль записей журнала
│   │   ├── work-types/       # Модуль справочника видов работ
│   │   ├── prisma/           # Prisma сервис
│   │   └── main.ts
│   └── prisma/
│       ├── schema.prisma     # Схема БД
│       ├── seed.ts           # Тестовые данные
│       └── migrations/
│
├── frontend/                 # Next.js приложение
│   ├── app/                  # App Router
│   ├── components/
│   │   ├── ui/               # Переиспользуемые компоненты
│   │   └── entries/          # Feature-компоненты журнала
│   ├── hooks/                # TanStack Query хуки
│   └── lib/                  # API клиент, утилиты
│
└── docker-compose.yml
```

## API

| Метод | Путь | Описание |
|---|---|---|
| GET | `/api/entries` | Список записей (фильтры: dateFrom, dateTo, sort) |
| POST | `/api/entries` | Создать запись |
| PATCH | `/api/entries/:id` | Обновить запись |
| DELETE | `/api/entries/:id` | Удалить запись |
| GET | `/api/work-types` | Список видов работ |

## Локальная разработка без Docker
```bash
# Запустить только БД
docker run -d \
  --name construction-db \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=construction_journal \
  -p 3306:3306 \
  mysql:8.0

# Backend
cd backend
cp .env.example .env
npm install --legacy-peer-deps
npx prisma migrate dev
npx prisma db seed
npm run start:dev

# Frontend
cd frontend
npm install
npm run dev
```

Переменные окружения backend (`.env`):
```
DATABASE_URL="mysql://root:password@localhost:3306/construction_journal"
PORT=3001
```

Переменные окружения frontend (`.env.local`):
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
API_URL=http://localhost:3001/api
```
