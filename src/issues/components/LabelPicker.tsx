
import { Loading } from '../../shared/components/Loading';
import { useLabel } from '../hooks';

interface Props{
  selectLabel:Array<string>
  onChange:(labelName:string)=>void
}
export const LabelPicker = ({selectLabel,onChange}:Props) => {


const query=useLabel()
if(query.isLoading)return(<Loading/>)
  return (
    <div>
      {query.data?.map(label=>(       
         <span 
            key={label.id}
            className={`badge rounded-pill m-1 label-picker ${selectLabel.includes(label.name)?"label-active":""}`}
            style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
            onClick={()=>onChange(label.name)}
        >
            {label.name}
        </span>))}

        
    </div>
  )
}
