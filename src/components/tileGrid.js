import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Tile from "../components/tile";

const TileGrid = (props) => {

    const defaultRepo = "/incubator."
        console.log(props.id)

    const tiles = props.stacks.map(stack => {
        console.log(language)
        if (stack !== null && (stack.id).includes(language)) {
            if (stack == null) return null;

        const templateURL = stack.templates[0].url;
        const repo = templateURL.split("/").reverse()[0].split(".")[0];
        const githubURL = `https://github.com/appsody/stacks/tree/master/${repo}/${stack.id}`;

        if (!stack.templates[0].url.includes(defaultRepo)) {
            return <Tile id={stack.id} heading={stack.name} desc={stack.description} cmd={"appsody init " + repo+"/"+stack.id} github={githubURL}/>
        }
        else {
            return <Tile id={stack.id} heading={stack.name} desc={stack.description} cmd={"appsody init " + stack.id} github={githubURL}/>
        }
        }
    

      
     
    });

    return (
        <div className="container">
            <div id="application-stacks" className="row mx-auto">
                {tiles}
            </div>
        </div>
    )
}

  var language ="java";
  function handleSubmit (event) {
       
    var ele = document.getElementsByName('gender'); 
    ele.forEach(i => {
        if(i.checked) {
            language= i.value;
            console.log(language)
            alert("Gender: "+i.value); 
            
        }
        
    });
  }

export default () => (
    <StaticQuery
      query={graphql`
        query {
            allIndexesYaml {
                nodes {
                    stacks {
                        id
                        name
                        description
                        templates {
                            url
                        }
                    }
                }
            }
        }
      `}
      render={data => {
        let stacks = [];
        data.allIndexesYaml.nodes.forEach(node => {
            stacks = stacks.concat(node.stacks);
        });
        return(
            <>
            <aside id="sidebar" className="sidebar">s
                    <form className="stacks-sidebar-text">
                   
                    <label className="stacks-functions">
                        Language
                        <input onClick={handleSubmit} type="radio" name="gender" value="Java"/>Java 
                        <input onClick={handleSubmit} type="radio" name="gender" value="Node"/>Node 
                        <input onClick={handleSubmit} type="radio" name="gender" value="Swift"/>Swift
                        </label>
                    <button type="submit">Submit</button>
                </form>
            </aside>
             <TileGrid id={language} stacks={stacks}/>
             </>
        );
      }}
    />
  )
