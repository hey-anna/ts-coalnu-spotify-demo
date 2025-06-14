# spotify-demo

이 프로젝트는 React 19.1 및 최신 웹 기술을 활용하여 Spotify의 핵심 기능을 재현하는 데 초점을 맞춘 미니 클론 앱입니다.  
React Router v7.6.1, Tailwind CSS, Webpack 등을 활용하여 모던한 웹 애플리케이션 개발 경험을 제공합니다.

---

## 📆 Version Info

- First created on: **2025.06**
- React 19.1 및 React Router 7.6.1 기반의 학습용 프로젝트입니다.
- Webpack, Babel, Tailwind CSS 등의 기본 설정이 완료된 상태입니다.

---

## ⚙️ 프로젝트 초기화 및 설정

이 프로젝트는 Create React App(CRA)을 기반으로 TypeScript 환경을 구축한 후, Webpack과 Babel 설정을 커스터마이징하여 개발 환경을 구성하였습니다.

### 🔧 초기 설정 내역

- CRA를 사용하여 TypeScript 기반 프로젝트 생성
- `webpack.config.js` 및 `.babelrc` 파일 추가
- CSS 및 Babel 로더(`css-loader`, `babel-loader` 등) 설치 및 설정
- Webpack을 통한 번들링 및 Babel을 통한 트랜스파일링 환경 구성

---

## 📌 기술 스택

### ⚙️ 개발 환경

- **프레임워크**: React 19.1
- **라우팅**: React Router v7.6.1
- **스타일링**: Tailwind CSS 4.1.8, MUI (Material UI)
- **번들러**: Webpack 5.99.9
- **패키지 매니저**: Yarn
- **프로그래밍 언어**: TypeScript

### 🛠️ 개발 도구 및 설정

#### 📦 주요 라이브러리

| 라이브러리                    | 설명                                                                                          |
| ----------------------------- | --------------------------------------------------------------------------------------------- |
| `react-router-dom`            | React 애플리케이션을 위한 선언적 라우팅 라이브러리입니다. v7.6.1 기준 최신 기능을 제공합니다. |
| `tailwindcss`                 | 유틸리티 퍼스트 CSS 프레임워크로, 빠른 UI 개발을 지원합니다.                                  |
| `webpack`                     | 모듈 번들러로, 프로젝트의 자바스크립트, CSS 등을 효율적으로 관리합니다.                       |
| `babel`                       | 최신 자바스크립트 문법을 구형 브라우저에서도 사용할 수 있도록 트랜스파일링합니다.             |
| `eslint` / `prettier`         | 코드 품질 및 일관성을 유지하기 위한 린팅 및 포매팅 도구입니다.                                |
| `@testing-library/react`      | React 컴포넌트의 테스트를 위한 도구로, 사용자 중심의 테스트를 지원합니다.                     |
| `react-spinners`              | 로딩 상태를 시각적으로 표현하기 위한 스피너 컴포넌트 라이브러리입니다.                        |
| `@mui/material`               | 구글의 Material Design을 기반으로 한 UI 컴포넌트 라이브러리입니다.                            |
| `@mui/icons-material`         | Material Design 아이콘 컴포넌트 라이브러리입니다.                                             |
| `@emotion/react`              | MUI 스타일링 시스템을 위한 Emotion의 core 패키지입니다.                                       |
| `@emotion/styled`             | Emotion의 styled API로, MUI 컴포넌트와 함께 사용됩니다.                                       |
| `@tanstack/react-query`       | 서버 상태를 효과적으로 관리할 수 있는 React Query 라이브러리입니다.                           |
| `axios`                       | HTTP 요청을 처리하기 위한 경량화된 비동기 통신 라이브러리입니다.                              |
| `react-intersection-observer` | 뷰포트와의 교차 상태를 감지하여 무한 스크롤 등 인터랙션을 구현할 수 있는 라이브러리입니다.    |
| `zustand`                     | 가볍고 직관적인 전역 상태 관리 라이브러리로, Redux보다 간단하게 상태를 관리할 수 있습니다.    |

---

## 📜 설치 및 실행 명령어

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn start

# 프로덕션 빌드
yarn build

# Tailwind CSS 초기화
yarn tailwind:init

# 테스트 실행
yarn test
```

---

## 📦 추가 설치 명령어

```bash
# React Router 설치
yarn add react-router-dom

# Tailwind CSS 및 관련 플러그인 설치
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Webpack 및 Babel 관련 패키지 설치
yarn add -D webpack webpack-cli webpack-dev-server html-webpack-plugin dotenv-webpack clean-webpack-plugin
yarn add -D babel-loader style-loader css-loader file-loader @svgr/webpack
yarn add -D @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-transform-runtime

# ESLint 및 Prettier 설치(eslint prettier 충돌 방지)
yarn add -D eslint eslint-config-prettier eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser

# 테스트 라이브러리 설치
yarn add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event

# 기타 유틸리티 패키지 설치
yarn add react-spinners

# MUI(Material UI) 관련 패키지 설치
yarn add @mui/material @mui/icons-material @emotion/react @emotion/styled

# TanStack Query (React Query)
yarn add @tanstack/react-query

# Axios (API 호출용)
yarn add axios

# 무한 스크롤 기능을 위한 인터섹션 옵저버 라이브러리
yarn add react-intersection-observer

# Zustand (전역 상태 관리)
yarn add zustand

```

---

## 🔗 참고 문서

- [React 공식 문서](https://react.dev/)
- [React 19.1 릴리즈 노트](https://react.dev/blog/2024/12/05/react-19)
- [React Router v7 업그레이드 가이드](https://reactrouter.com/upgrading/v6)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [Webpack 공식 문서](https://webpack.js.org/)
