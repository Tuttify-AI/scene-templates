import React from 'react';

import styles from './styles.module.css';

type TemplateProps = {
    children: React.ReactNode
};

const Template: React.FC<TemplateProps> = ({ children }) => {
    return (
        <div className={styles.template}>
            {children}
        </div>
    );
};

export default Template;
