import React from 'react';


const Notification = ({message, classNameProp}) => {

    if (message === null) return null;

    return ( 
        <div className={classNameProp}>
            {message}
        </div>
    );
}

export default Notification;