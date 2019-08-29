import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Tile from "../components/tile";

const TileGrid = (props) => {

    const defaultRepo = "/incubator."
    const tiles = props.stacks.map(stack => {
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
    });

    return (
        <div className="container">
            <div id="application-stacks" className="row mx-auto">
                {tiles}
            </div>
        </div>
    )
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

        return <TileGrid stacks={stacks}/>
      }}
    />
  )
