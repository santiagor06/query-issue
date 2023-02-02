import { useQuery } from "@tanstack/react-query"
import { useState ,useEffect} from "react"
import { githubApi } from "../../api/githubApi"
import { sleep } from "../helpers/sleep"
import { Issue, Label, State } from "../interface"

interface Props{
    state?:State
    labels:Array<string>
    page?:number
}

const getIssues=async({labels,state,page=1}:Props):Promise<Array<Issue>>=>{
    sleep(2)
    const params=new URLSearchParams()
    if(state)params.append("state",state)
    if(labels.length>0){
        const labelString=labels.join(",")
        params.append("labels",labelString)
    }
    params.append("page",page.toString())
    params.append("per_page","5")
    const {data}=await githubApi.get<Array<Issue>>("/issues",{params})
    
    return data
}

export const  useIssues=({state,labels}:Props)=>{
    const [page,setPage]=useState<number>(1)
    useEffect(()=>{
        setPage(1)
    },[state,labels])
    const queryIssue=useQuery(
        ["issues",{state,labels,page}],
        ()=>getIssues({labels,state,page}),
        {staleTime:1000*60*60}
    )
    const nextPage=()=>{
        if(queryIssue.data?.length===0)return
        setPage(page+1)
    }
    const previousPage=()=>{
        if(page>1)setPage(page-1)
        
    }
return {queryIssue,page:queryIssue.isFetching?"Loading..":page,nextPage,previousPage}
}