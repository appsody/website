import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Tile from "../components/tile";

const TileGrid = (props) => {
    
    const tiles = props.stacks.map(stack => {
        return <Tile id={stack.id} heading={stack.name} desc={stack.description} cmd={"appsody init " + stack.id} github="google.com"/>
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