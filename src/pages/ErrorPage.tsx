
import './ErrorPage.css'
import React from 'react';
import { useParams } from 'react-router-dom';

const ErrorPage: React.FC = () => {
    const { code } = useParams<{ code: string }>();
    const errorMessage = code === '404' ? 'Page Not Found' : 'An unexpected error occurred';

    return (
        <div>
            <h1>Error {code}</h1>
            <p>Sorry! An unexpected error occurred {errorMessage}</p>
        </div>
    );
};

export default ErrorPage;