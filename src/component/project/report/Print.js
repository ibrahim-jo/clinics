import React,{useRef} from 'react';
import {useReactToPrint} from 'react-to-print'
import {Toreport} from './Toreport'
 const Print = (props) => {
    const  {id}=props.match.params
    const {project}=props.location.state
  const componentRef= useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
    return (
        <div>
           
            <Toreport ref={componentRef}  project={project} />
            <button onClick={handlePrint}>Print this out!</button>
            
        </div>
    );
}


 
 
export default Print;