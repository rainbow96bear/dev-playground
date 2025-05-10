# Architecture

## 1. Routing (파일 기반 라우팅)

| 경로 (Path) | 파일 (File)               | 설명 (Description) |
| :---------- | :------------------------ | :----------------- |
| `/`         | `src/routes/+page.svelte` | 메인 페이지        |

---

## 2. Layout 구조

- `src/routes/+layout.svelte`: 전체 공통 레이아웃 (헤더, 푸터 포함)
- `src/routes/(auth)/+layout.svelte`: 로그인 이후에만 적용되는 레이아웃
- 중첩 레이아웃 구조 설명

---

## 3. Load 함수 / 데이터 흐름

- `+page.ts` 또는 `+page.server.ts` 에서 데이터 로딩
- fetch vs 직접 db query 차이 설명

---

## 4. Form Actions

- `+page.server.ts` 파일 안에서 form action 처리
- ex) 로그인 폼 `POST` 처리

---

## 5. API 호출/구성

- 외부 API 호출 방식 (`fetch`, `POST`, `PUT` 등)
- error 핸들링 통일 규칙

## Component

# Code Convention

## Page (Route)

## Component

## style

# API

## Hook
