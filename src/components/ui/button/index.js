import React from 'react';

export const StandardButton = props =>
    <button
        type="submit"
        onClick={props.onClick}
        id={props.id}
        className="button">
        {props.children}
    </button>;
