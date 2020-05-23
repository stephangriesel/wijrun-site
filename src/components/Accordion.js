import React, { useState, useRef } from 'react';
import Chevron from './Chevron';

function Accordion(props) {
    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("accordion__icon");

    const content = useRef(null);

    // const authLink = "https://www.strava.com/oauth/token";
    // var clientId = process.env.client_id;
    // var clientSecret = process.env.client_secret;
    // var refreshToken = process.env.refresh_token;

    function toggleAccordion() {
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`);
        setRotateState(setActive === "active" ? "accordion__icon" : "accordion__icon rotate")
        // Test scrollheight
        console.log("<<scrollHeight>>");
        console.log(content.current.scrollHeight);
    }

    // function getStravaActivities(res) {
    //     console.log(res.access_token)
    //     const activitiesLink = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
    //     fetch(activitiesLink)
    //         .then((res) => console.log(res.json()))
    // }

    // function reAuthorize() {
    //     fetch(authLink, {
    //         method: 'post',
    //         headers: {
    //             'Accept': 'application/json, text/plain, */*',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             client_id: clientId,
    //             client_secret: clientSecret,
    //             refresh_token: refreshToken,
    //             grant_type: 'refresh_token'
    //         })
    //     }).then(res => res.json())
    //         .then(res => getStravaActivities(res))
    // }

    // reAuthorize();


    return (
        <div className="accordion__section">
            <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
                <p className="accordion__title">{props.title}</p>
                <Chevron className={`${setRotate}`} width={10} fill={"#888"} />
            </button>
            <div ref={content} style={{ maxHeight: `${setHeight}` }} className="accordion__content">
                <div className="accordion__text"
                    dangerouslySetInnerHTML={{ __html: props.content }} />
            </div>
        </div>
    );
}

export default Accordion;