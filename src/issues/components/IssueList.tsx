import { Issue, State } from '../interface';
import { IssueItem } from './IssueItem';
import { FC } from 'react';
interface Props{
    issuesList:Array<Issue>
    state?:State
    handleActive:(state?:State)=>void
}
export const IssueList:FC<Props> = ({issuesList,state,handleActive})=> {
    
    return (
        <div className="card border-white">
            <div className="card-header bg-dark">
                <ul className="nav nav-pills card-header-pills">
                    <li className="nav-item">
                        <a onClick={()=>handleActive()} className={`nav-link ${state?"":"active"}`}>All</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={()=>handleActive(State.Open)}  className={`nav-link ${state===State.Open?"active":""}`}>Open</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={()=>handleActive(State.Closed)} className={`nav-link ${state===State.Closed?"active":""}`}>Closed</a>
                    </li>
                </ul>
            </div>
            <div className="card-body text-dark">
                {
                    issuesList.map( issue => (
                        <IssueItem  issue={issue} key={issue.id} />
                    ))
                
                }                
            </div>
        </div>
    )
}
