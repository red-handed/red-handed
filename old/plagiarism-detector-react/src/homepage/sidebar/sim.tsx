import React from 'react'

interface ISim{
    name: string,
    loc: []
}


export const Sim: React.StatelessComponent<ISim> = ({ name, loc}) => {
    return (
             <li className="list-group-item">
                 <input type="checkbox"/>   {name} {loc}
             </li>
        
    )
   }


    
