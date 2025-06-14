import { lazy, Suspense, useEffect } from "react";
import type { LazyExoticComponent, ComponentType } from "react";
import { createBrowserRouter } from "react-router-dom";
import CommonSpinner from "../components/spinner/CommonSpinner";
import ErrorPage from "../views/ErrorPage/ErrorPage";
import AuthGuard from "../guards/AuthGuard";

// 레이지 로딩 컴포넌트들
const AppLayout = lazy(() => import("../layout/AppLayout"));
const HomePage = lazy(() => import("../views/HomePage/HomePage"));
const SearchPage = lazy(() => import("../views/SearchPage/SearchPage"));
const SearchWithKeywordPage = lazy(
  () => import("../views/SearchWithKeywordPage/SearchWithKeywordPage"),
);
const PlaylistDetailPage = lazy(
  () => import("../views/PlaylistDetailPage/PlaylistDetailPage"),
);
const PlaylistPage = lazy(() => import("../views/PlaylistPage/PlaylistPage"));

const CallbackPage = lazy(() => import("../views/CallbackPage/CallbackPage"));

const LoginRequiredPage = lazy(
  () => import("../views/LoginRequiredPage/LoginRequiredPage"),
);

// Suspense로 감싸는 helper
const withSuspense = (Component: LazyExoticComponent<ComponentType<any>>) => (
  <Suspense fallback={<CommonSpinner />}>
    <Component />
  </Suspense>
);

const withAuthGuard = (Component: LazyExoticComponent<ComponentType<any>>) => (
  <Suspense fallback={<CommonSpinner />}>
    <AuthGuard>
      <Component />
    </AuthGuard>
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(AppLayout),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: withSuspense(HomePage),
      },
      {
        path: "search",
        element: withSuspense(SearchPage),
      },
      {
        path: "search/:keyword",
        element: withSuspense(SearchWithKeywordPage),
      },
      {
        path: "playlist/:id",
        element: withAuthGuard(PlaylistDetailPage),
      },
      {
        path: "playlist",
        element: withAuthGuard(PlaylistPage),
      }, // 모바일
      {
        path: "callback",
        element: withSuspense(CallbackPage),
      },
    ],
  },
  // 로그인 요구 페이지 (AppLayout 미적용: AppLayout 없이 보여야 하니까 밖에!)
  {
    path: "/login-required",
    element: withSuspense(LoginRequiredPage), // 반드시 lazy import 되어 있어야 함
  },
]);
