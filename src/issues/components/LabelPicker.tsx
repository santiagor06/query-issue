
import { Loading } from '../../shared/components/Loading';
import { useLabel } from '../hooks/useLabel';


export const LabelPicker = () => {

const query=useLabel()
if(query.isLoading)return(<Loading/>)
  return (
    <div>
      {query.data?.map(label=>(       
         <span 
            key={label.id}
            className="badge rounded-pill m-1 label-picker"
            style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
        >
            {label.name}
        </span>))}

        
    </div>
  )
}
