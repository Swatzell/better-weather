import './ServerErrorPage.css'

import React from 'react';

const ServerErrorPage: React.FC = () => {
    return (
        <div>
            <h1>500 - Server Error</h1>
            <p>Sorry, something went wrong on our end. Please try again later.</p>
        </div>
    );
};

export default ServerErrorPage;