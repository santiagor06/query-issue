import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api/githubApi"
import { Issue } from "../interface"

const getIssues=async():Promise<Array<Issue>>=>{
    const {data}=await githubApi.get<Array<Issue>>("/issues")
    console.log(data)
    return data
}

export const  useIssues=()=>{
    const queryIssue=useQuery(
        ["issue"],
        getIssues,
        {staleTime:1000*60*60}
    )
return queryIssue
}