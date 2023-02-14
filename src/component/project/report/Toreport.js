import React from 'react'

export const Toreport=React.forwardRef (({project},ref) => {
    
    return (
        <div ref={ref}> 
        
        {project.name}
        </div>
    )
})

//export default  Toreport
