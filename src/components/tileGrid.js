import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Tile from "../components/tile";

class TileGrid extends React.Component {
    constructor(props) {
        super(props)
        this.defaultRepo = "/incubator."
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        language: ""
    }

    handleSubmit () {
        var ele = document.getElementsByName('language'); 
        ele.forEach(i => {
            if(i.checked && !language.includes(i.value)) {
                    language.push(i.value);
                    this.setState({
                        [language]: i.value,
                    })                
            } else if (!i.checked && language.indexOf(i.value) > -1) {
                language.splice(language.indexOf(i.value), 1);
                this.setState({
                    [language]: "",
                })
            }
        });
        this.rerenderTiles();
      }

      rerenderTiles() {
        if (language.length !== 0) {
            this.tiles = this.props.stacks.map(stack => {
                for (var i = 0; i < language.length; i++) {          
                    if (stack !== null && (stack.id).includes(language[i])) {
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
                }
            });
        } else {
            this.tiles = this.props.stacks.map(stack => {
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
            });
        }
      }

    defaultRepo = "/incubator."

    tiles = this.props.stacks.map(stack => {
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
      
    });
    render() {
        return (
            <>
                <aside id="sidebar" className="sidebar">s
                    <label className="stacks-functions">
                        Language
                        <ul className="doc-sidebar-hidden-list">
                            <li><input onClick={this.handleSubmit} type="checkbox" name="language" value="java"/> Java</li>
                            <li><input onClick={this.handleSubmit} type="checkbox" name="language" value="node"/>  Node </li>
                            <li><input onClick={this.handleSubmit} type="checkbox" name="language" value="swift"/> Swift</li>
                        </ul>
                    </label> 
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

var language = [];

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
