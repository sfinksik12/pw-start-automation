# gapix — анализ тестовых пробелов

[gapix](https://github.com/artshllk/gapix) — AI-powered анализатор тестовых пробелов для TypeScript. Оценивает **качество** тестов: слабые матчеры, отсутствие assertions, недостающие edge cases. Поддерживает Playwright.

## Запуск

```bash
npm run gapix
```

Анализирует `src/` и `tests/*.spec.ts`, строит coverage mapping, оценивает качество assertions. Интерактивный HTML-отчёт открывается в браузере.

```bash
npm run gapix:tests
```

Только `src/ui/` + `tests/` — без fixtures, mocks, expects. Минимальный scope.

> **Ограничение:** gapix не умеет анализировать только папку `tests/`. Ему нужны исходники (non-spec `.ts`) для coverage mapping. В `tests/` только `*.spec.ts` — gapix считает их тестами, не source.

## E2E и coverage mapping

gapix сопоставляет coverage по **импортам**: какие идентификаторы импортированы в тесте и используются. Для E2E с POM (mainPage из fixture) нужно добавить явные type-импорты:

```ts
import { test, expect } from '../index';
import type { MainPage } from '../src/ui/pages/mainPage';
import type { HeaderFragment } from '../src/ui/fragments/header.fragment';

test('...', async ({ mainPage }: { mainPage: MainPage }) => {
  const headerFragment: HeaderFragment = mainPage.headerFragment;
  // ...
});
```

Без этого gapix не видит связь теста с POM и показывает 0% coverage.

## Форматы вывода

```bash
# HTML (интерактивный дашборд)
npm run gapix

# JSON (CI, кастомные инструменты)
npx gapix analyze . -o json

# Markdown (PR, wiki)
npx gapix analyze . -o markdown
```

## AI-режим (опционально)

Для контекстных suggestions с примерами кода:

```bash
# OpenAI
npx gapix set-provider openai
npx gapix set-key YOUR_OPENAI_API_KEY

# Ollama (локально)
ollama pull llama3
npx gapix set-provider ollama

# Проверить конфиг
npx gapix show-config
```

Без AI gapix использует rule-based анализ — всё равно полезно.

## Примечание

При первом запуске без настроенного AI (OpenAI/Ollama) в консоли могут появляться ошибки `Ollama API error: ECONNREFUSED` — это нормально. gapix автоматически переключается на rule-based режим и генерирует отчёт. Чтобы отключить попытки подключения к AI (чистый вывод в консоль):

```bash
npm run gapix:no-ai
```
