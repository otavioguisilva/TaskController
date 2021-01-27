import React from 'react';
import Menu from '../menu/menu';


const PageDefault = ({children}) => {
    return(
        <div className="PageDefault">
        <Menu/>
        {children}
 
        </div>
    )
}

export default PageDefault