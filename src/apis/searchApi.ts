import { SearchRequestParams, SearchResponse } from "../models/search";
import clientApiInstance from "../utils/api/clientApiInstance";

export const searchItemsByKeyword = async (
  token: string,
  params: SearchRequestParams,
): Promise<SearchResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append("q", params.q);
    searchParams.append("type", params.type.join(","));
    // type array라서 - 배열을 통째 추가할 수 없다, 모든게 스트링으로 되어 있어야해서, 바꿔주기 위해 join 사용

    if (params.market) searchParams.append("market", params.market);
    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.offset) searchParams.append("offset", params.offset.toString());
    if (params.include_external)
      searchParams.append("include_external", params.include_external);

    const response = await clientApiInstance.get(
      `/search?${searchParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer  ${token}`,
          "Content-Type": "application/json",
        },
      },
    ); // ? 쿼리스트링 들어갈 예장
    return response.data;
  } catch (error) {
    throw new Error("fail to search by keyaord");
  }
};

// 로그인 안해도 검색 가능
// 뉴릴리즈 앞전 수업때 - 프리덴셜 토큰가져와서 로그인 업이 데이터 확인 - 서치도 동일하게 구현
// Authorization이 따로 필요없다.. ??

// authApiInstance.ts 이거는 로그인을 하고 얻은 토큰임
// (clientApiInstance.ts 그래서 이거로 하면 됨)

// 스포티파이 보면 > 시나리오대로라면 로그인해야 플레이리스트가 보이고
// > 플레이리스트 안에 들어가서 검색할 수 있는 것 처럼 말하지만

// 사이드바는 로그인 안해도 서치가능

// 서치 api 하나가지고 여러가지를 커버해야댐

// case
// 로그인 한 상태 서치
// 로그인 안 한 상태 서치

// 그래서 authApiInstance.ts 이거를 못씀
