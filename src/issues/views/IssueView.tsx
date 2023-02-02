import { Link, Navigate, useParams } from 'react-router-dom';
import { Loading } from '../../shared/components/Loading';
import { IssueComment } from '../components/IssueComment';
import { useIssue } from '../hooks';
import { useState } from 'react';



export const IssueView = () => {

  const {id="0"}=useParams();
  const {queryIssue,queryIssueComments}=useIssue(+id)

  if(queryIssue.isLoading)return(<Loading/>)
  if(!queryIssue.data)return(<Navigate to="./issues/list"/>)

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to='./issues/list'>Go Back</Link>
      </div>
      <>
      <IssueComment issue={ queryIssue.data } />
      {/* Primer comentario */}
      
      {queryIssueComments.data?.map(comment=>{
        return<IssueComment key={comment.id} issue={ comment } />
      })}
      </>

      

    </div>
  )
}
