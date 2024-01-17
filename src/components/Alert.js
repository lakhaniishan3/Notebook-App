import React from 'react'

const Alert = (props) => {
    const capitalize = (word) => {
        if (word === "danger") {
            word = "error";
        }
        return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
    };

    return (
        <div style={{ height: '50px', margin: '10px auto', width: '800px' }}>
            {props.alert &&
                <div className={`alert alert-${props.alert.type} alert-dismissible fade show sticky-top`} role="alert">
                    <strong>{capitalize(props.alert.type)}</strong>: {props.alert.message}
                </div>}
        </div>
    );
}

export default Alert