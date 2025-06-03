import { lazy, Suspense } from "react";
import type { LazyExoticComponent, ComponentType } from "react";
import { createBrowserRouter } from "react-router-dom";
import Spinner from "../components/Spinner";
// import ErrorPage from "../views/errors/ErrorPage";

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

// Suspense로 감싸는 helper
const withSuspense = (Component: LazyExoticComponent<ComponentType<any>>) => (
  <Suspense fallback={<Spinner />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(AppLayout),
    // errorElement: <ErrorPage />,
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
        element: withSuspense(PlaylistDetailPage),
      },
      {
        path: "playlist",
        element: withSuspense(PlaylistPage),
      }, // 모바일
    ],
  },
]);
