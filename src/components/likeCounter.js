import React, { useState } from 'react'

const LikeCounter = () => {
    const [count, setCount] = useState(0);
    return (
        <div className="counter">
            <h5>{count}</h5>
            <button onClick={() => setCount(count + 1)}>Like</button>
        </div>
    )
}

export default LikeCounter;
