import { Issue } from '../interface';
import { IssueItem } from './IssueItem';
import { FC } from 'react';
interface Props{
    issuesList:Array<Issue>
}
export const IssueList:FC<Props> = ({issuesList})=> {
    return (
        <div className="card border-white">
            <div className="card-header bg-dark">
                <ul className="nav nav-pills card-header-pills">
                    <li className="nav-item">
                        <a className="nav-link active">All</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">Open</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">Closed</a>
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
