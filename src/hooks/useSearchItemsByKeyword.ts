import { LastPage, Search } from "@mui/icons-material"
import { useInfiniteQuery } from "@tanstack/react-query"
import { searchItemsByKeyword } from "../apis/searchApi"
import { SearchRequestParams } from "../models/search"
import useClientCredentialToken from "./useClientCredentialToken"

const useSearchItemsByKeyword = (params:SearchRequestParams) => {
    const clientCredentialToken = useClientCredentialToken();

  return (
    return useInfiniteQuery({
        queryKey: ["search", q, type], // 파타미터 값
        queryFn:({pageParam = 0}) => {
            if(!clientCredentialToken) throw new Error("no token available")
            return searchItemsByKeyword(clientCredentialToken, params)
        },
        initialPageParam :0,
        getNextPageParam:(lastPage)=>{

        }
    })

}

export default useSearchItemsByKeyword

// // 검색 결과 무한 스크롤
