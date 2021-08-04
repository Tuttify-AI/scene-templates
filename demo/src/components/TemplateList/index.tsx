import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../../routes';

const TemplateList = () => (
    <div>
        <h1>Scene Templates:</h1>
        <ul>
            {routes.map((route, index) => (
                <li key={index}>
                    <Link to={route.path}>
                        {route.name}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

export default TemplateList;
