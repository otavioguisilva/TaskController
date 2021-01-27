import React from 'react';
import Menu from '../menu/menu';


const PageDefault:React.FC = ({children}) => {
    return(
        <div className="PageDefault">
        <Menu/>
        {children}
 
        </div>
    )
}

export default PageDefault