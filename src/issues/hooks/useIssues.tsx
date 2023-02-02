import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api/githubApi"
import { sleep } from "../helpers/sleep"
import { Issue, Label, State } from "../interface"

interface Props{
    state?:State
    selectedLabels:Array<string>
}

const getIssues=async(label:string[]=[],state?:State):Promise<Array<Issue>>=>{
    sleep(2)
    const params=new URLSearchParams()
    if(state)params.append("state",state)
    if(label.length>0){
        const labelString=label.join(",")
        params.append("labels",labelString)
    }
    params.append("page","1")
    params.append("per_page","5")
    const {data}=await githubApi.get<Array<Issue>>("/issues",{params})
    
    return data
}

export const  useIssues=({state,selectedLabels}:Props)=>{
    const queryIssue=useQuery(
        ["issues",{state,selectedLabels}],
        ()=>getIssues(selectedLabels,state),
        {staleTime:1000*60*60}
    )
return queryIssue
}