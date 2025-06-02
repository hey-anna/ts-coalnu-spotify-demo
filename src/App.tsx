import "./App.css";
import AppLayout from "./layout/AppLayout";

// 페이지 몇개 필요한지 생각하기
// 0. 사이드바 (플레이리스트, 메뉴)
// 1. 홈페이지(랜딩페이지)
// 2. 검색 페이지
// 3. 검색 결과 페이지
// 로그인 하고나서(로그인 페이지는 만들지 않겠다, spotify에서 제공해준다)
// 4. (플레이리스트(사이드바) - 하나 클릭) > 플레이리스트 디테일 페이지
// 5. (모바일 버전) 플레이리스트 보여주는 페이지 - 깍두기

// 홈 /
// 검색 /search
// 검색 결과 페이지 /search/:keyword
// 플레이 리스트 디테일 페이지 /playlist/:id
// (모바일) 플레이 리스트 /playlist

// 사이드바 고정, 컨텐츠만 변경해주면 됨

function App() {
  return <AppLayout />;
}

export default App;
