import React from 'react';
import Menu from '../menu';


const PageDefault = ({children}) => {
    return(
        <div className="PageDefault">
        <Menu/>
        {children}
 
        </div>
    )
}

export default PageDefault