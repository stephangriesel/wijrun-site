import React, { useState, useRef } from 'react';
import Chevron from './Chevron';

function Accordion(props) {
    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");

    const content = useRef(null);

    function toggleAccordion() {
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`);
        // Test scrollheight
        console.log("<<scrollHeight>>");
        console.log(content.current.scrollHeight);
    }
    return (
        <div className="accordion__section">
            <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
                <p className="accordion__title">{props.title}</p>
                <Chevron width={10} fill={"#888"} />
            </button>
            <div ref={content} style={{ maxHeight: `${setHeight}` }} className="accordion__content">
                <div className="accordion__text"
                    dangerouslySetInnerHTML={{ __html: props.content }} />
            </div>
        </div>
    );
}

export default Accordion;