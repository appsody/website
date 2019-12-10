import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Tile from "../components/tile";

class TileGrid extends React.Component {
    constructor(props){
        super(props)
        this.defaultRepo = "/incubator."
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    state = {
        language: ""
    }

    handleSubmit (event) {
       
        var ele = document.getElementsByName('gender'); 
        ele.forEach(i => {
            if(i.checked) {
                language= i.value;
                this.setState({
                    [language]: i.value,
                  })
            }
        });
        this.rerenderTiles();
      }

      rerenderTiles() {
        this.tiles = this.props.stacks.map(stack => {
            console.log("Before if State Language = " + this.state.language)
            console.log("Before if Language = " + language)
            if (stack !== null && (stack.id).includes(language)) {
                if (stack == null) return null;
                const templateURL = stack.templates[0].url;
                const repo = templateURL.split("/").reverse()[0].split(".")[0];
                const githubURL = `https://github.com/appsody/stacks/tree/master/${repo}/${stack.id}`;
    
                if (!stack.templates[0].url.includes(this.defaultRepo)) {
                    return <Tile id={stack.id} heading={stack.name} desc={stack.description} cmd={"appsody init " + repo+"/"+stack.id} github={githubURL}/>
                }
                else {
                    return <Tile id={stack.id} heading={stack.name} desc={stack.description} cmd={"appsody init " + stack.id} github={githubURL}/>
                }
            }
        });
      }

    defaultRepo = "/incubator."

    tiles = this.props.stacks.map(stack => {
        if (stack !== null && (stack.id).includes(this.state.language)) {
            if (stack == null) return null;
            const templateURL = stack.templates[0].url;
            const repo = templateURL.split("/").reverse()[0].split(".")[0];
            const githubURL = `https://github.com/appsody/stacks/tree/master/${repo}/${stack.id}`;

            if (!stack.templates[0].url.includes(this.defaultRepo)) {
                return <Tile id={stack.id} heading={stack.name} desc={stack.description} cmd={"appsody init " + repo+"/"+stack.id} github={githubURL}/>
            }
            else {
                return <Tile id={stack.id} heading={stack.name} desc={stack.description} cmd={"appsody init " + stack.id} github={githubURL}/>
            }
        }
    });
    render() {
        return (
            <>
                <aside id="sidebar" className="sidebar">s
                    <form className="stacks-sidebar-text">
                    
                    <label className="stacks-functions">
                        Language
                        <input onClick={this.handleSubmit} type="radio" name="gender" value="java"/>Java 
                        <input onClick={this.handleSubmit} type="radio" name="gender" value="node"/>Node 
                        <input onClick={this.handleSubmit} type="radio" name="gender" value="swift"/>Swift
                        </label>
                    <button type="submit">Submit</button>
                </form>
                </aside>
    
                <div className="container">
                    <div id="application-stacks" className="row mx-auto">
                        {this.tiles}
                    </div>
                </div>
            </>
        )
    }

}

  var language ="";

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
             <TileGrid stacks={stacks}/>
        );
      }}
    />
  )
