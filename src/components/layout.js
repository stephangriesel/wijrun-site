import React from 'react';
import "../css/layout.css";

const layout = ({ children }) => {
    return (
        <div>
            <main>
                {children}
            </main>
        </div>
    )
}

export default layout;
