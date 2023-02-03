import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Issue } from '../interface';
import { sleep } from '../helpers/sleep';
export const getIssue=async(issueNumber:number):Promise<Issue>=>{
  
    const {data}=await githubApi.get<Issue>(`/issues/${issueNumber}`)
    console.log(data)
    return data
}
export const getIssueComments=async(issueNumber:number):Promise<Array<Issue>>=>{
 
    const {data}=await githubApi.get<Array<Issue>>(`/issues/${issueNumber}/comments`)
    console.log(data)
    return data
}


export const useIssue=(issueNumber:number)=>{
const queryIssue=useQuery(
    ["issue",issueNumber],
    ()=>getIssue(issueNumber)

)
const queryIssueComments=useQuery(
    ["issue",issueNumber,"comments"],
    ()=>getIssueComments(queryIssue.data!.number),
    {
        enabled:queryIssue.data !==undefined
    }

)
return {queryIssue,queryIssueComments}
}