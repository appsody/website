import React from "react";

const TutorialLink = (props) => (
    <li>
        <a href={props.link}>

            <h2>{props.title}</h2>
            { (props.time) ? <p className="mb-2"><i class="far fa-clock"></i> {props.time} read</p> : null}
            <p>{props.abstract}</p>
            <div className="link-footer">
                {(props.author) ? <span>by {props.author}</span> : null}
                <span className="float-right">{props.date}</span>
            </div>
        </a>
    </li>
)

export default TutorialLink;