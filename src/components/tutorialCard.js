import React from "react";
import { Link } from "gatsby";
import TimeIcon from "../images/time.svg"

const TutorialCard = ({title, subtext, length, slug}) => (

    <Link className="blog-link" to={slug}>
    <div className="tutorial-container">
        <h2 className="blog-title">{title}</h2>
        <p className="tutorial-subtext">{subtext}</p>
        <p className="tutorial-length"><img className="tutorial-length-icon" src={TimeIcon} alt="time-icon"/> ~ {length}</p>
    </div>
    </Link>
)

export default TutorialCard;