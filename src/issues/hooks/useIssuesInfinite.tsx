import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api/githubApi"
import { sleep } from "../helpers"
import { State, Issue } from "../interface"
import { useState } from 'react';


interface Props{
    state?:State
    labels:Array<string>
    page?:number
}
interface QueryProps{
    pageParam?:number
    queryKey:(string|Props)[]

}

const getIssues=async({queryKey,pageParam=1}:QueryProps):Promise<Array<Issue>>=>{
  
    const [,,args]=queryKey
    const {state,labels}=args as Props
    const params=new URLSearchParams()
    if(state)params.append("state",state)
    if(labels.length>0){
        const labelString=labels.join(",")
        params.append("labels",labelString)
    }
    params.append("page",pageParam.toString())
    params.append("per_page","5")
    const {data}=await githubApi.get<Array<Issue>>("/issues",{params})
    
    return data
}
export const useIssuesInfinite=({state,labels}:Props)=>{

    const queryInfinite=useInfiniteQuery(
        ["issues","infinite",{page:1,state,labels}],
        (data)=>getIssues(data),
        {
            getNextPageParam:(lastPage,pages)=>{
                if(lastPage.length===0)return
                return pages.length +1
            }
        }
    )
        return {queryInfinite}
}