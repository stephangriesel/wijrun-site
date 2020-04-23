import React from 'react';
import "../css/layout.css";
import Layout from '../components/layout';

const layout = ({ children }) => {
    return (
        <Layout>
            <main>
                {children}
            </main>
        </Layout>
    )
}

export default layout;
