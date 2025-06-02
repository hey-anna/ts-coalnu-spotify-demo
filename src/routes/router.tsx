import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/AppLayout";

// 페이지 컴포넌트
import HomePage from "../views/HomePage/HomePage";
import SearchPage from "../views/SearchPage/SearchPage";
// import SearchWithKeywordPage from "../views/SearchWithKeywordPage";
// import PlaylistDetailPage from "../views/PlaylistDetailPage";
// import PlaylistPage from "../views/PlaylistPage";
// import ErrorPage from "../views/errors/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // 선생님 AppLayout 역할
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      //   {
      //     path: "search/:keyword",
      //     element: <SearchWithKeywordPage />,
      //   },
      //   {
      //     path: "playlist/:id",
      //     element: <PlaylistDetailPage />,
      //   },
      //   {
      //     path: "playlist",
      //     element: <PlaylistPage />,
      //   }, // 모바일
    ],
  },
]);
