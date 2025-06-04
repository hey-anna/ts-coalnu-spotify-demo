import { useQuery } from "@tanstack/react-query";
import { getNewReleases } from "../apis/albumApi";

const useGetNewReleases = () => {
  return useQuery({
    queryKey: ["new-releases"],
    queryFn: async () => {
      return getNewReleases();
    },
  });
};

export default useGetNewReleases;
// queryKey
// 내가 현재 만들 useQuery의 id값
// id값에 따라서 id를 가진 쿼리의 캐시가 업데이트 할 차례다.
// 먼가 expire 유통기간이 지났다 하면 다시 쿼리로 호출 해준다.

// queryFn
// 비동기 함수 멀 호출할거냐
// Function을 만들어줘야 한다

// 비동기 호출할 함수를 따로 만들어 주겠다 getNewReleases

// 훅이랑 api 역할 분리
// api 다른데서 가져다 쓸 수 있으니
