import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Tile from "../components/tile";

class TileGrid extends React.Component {
    constructor(props) {
        super(props)
        this.defaultRepo = "/incubator."
        this.filterByLanguage = this.filterByLanguage.bind(this);
        this.filterByLevel = this.filterByLevel.bind(this);
    }

    state = {
        language: "",
        level: ""
    }

    defaultRepo = "/incubator."
    experimentalRepo ="/experimental"

    filterByLevel () {
        var ele = document.getElementsByName('level'); 
        ele.forEach(i => {
            if(i.checked && !level.includes(i.value)) {
                    level.push(i.value);
                    this.setState({
                        [level]: i.value,
                    })                
            } else if (!i.checked && level.indexOf(i.value) > -1) {
                level.splice(level.indexOf(i.value), 1);
                this.setState({
                    [level]: "",
                })
            }
        });
        this.rerenderLevelTiles();
      }

      rerenderLevelTiles() {
        if (level.length === 1 && level.includes("incubator") || (level.length === 2 && level.includes("stable") && level.includes("incubator"))) {
            this.tiles = this.props.stacks.map(stack => {                
                for (var i = 0; i < level.length; i++) {        
                    if (stack !== null && (stack.templates[0].url.includes(this.defaultRepo))) {
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
        } else if (level.length === 1 && level.includes("experimental") || (level.length === 2 && level.includes("stable") && level.includes("experimental"))) {
            this.tiles = this.props.stacks.map(stack => {                
                for (var i = 0; i < level.length; i++) {        
                    if (stack !== null && (stack.templates[0].url.includes(this.experimentalRepo))) {
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
        } else if (level.length === 0 || !((level.length === 1 && level.includes("stable")))) {
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
        } else if((level.length === 1 && level.includes("stable"))) {
            this.tiles = []
        }
      }

    filterByLanguage () {
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
        this.rerenderLanguageTiles();
      }

      rerenderLanguageTiles() {
        if (language.length !== 0) {
            this.tiles = this.props.stacks.map(stack => {                
                for (var i = 0; i < language.length; i++) {          
                    if (stack !== null && (stack.language).includes(language[i])) {
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

    // languages = this.props.stacks.map(stack => {
    //     if (stack == null) return null;
    //     if (stack !== null) {
    //         return stack.language;
    //     }
    // });

    render() {
        return (
            <>
                <aside id="sidebar" className="sidebar">
                    <label className="stacks-functions">Language</label> 
                        <table className="language-checkboxes-with-text">
                            <tbody>
                            <tr>
                                <td><input onClick={this.filterByLanguage} type="checkbox" name="language" value="java"/></td>
                                <td>Java</td>
                            </tr>
                            <tr>
                                <td><input onClick={this.filterByLanguage} type="checkbox" name="language" value="node"/></td>
                                <td>Node</td>
                            </tr>
                            <tr>
                                <td><input onClick={this.filterByLanguage} type="checkbox" name="language" value="swift"/></td>
                                <td>Swift</td>
                            </tr>
                            <tr>
                                <td><input onClick={this.filterByLanguage} type="checkbox" name="language" value="python"/></td>
                                <td>Python</td>
                            </tr>
                            <tr>
                                <td><input onClick={this.filterByLanguage} type="checkbox" name="language" value="bash"/></td>
                                <td>Bash</td>
                            </tr>
                            <tr>
                                <td><input onClick={this.filterByLanguage} type="checkbox" name="language" value="rust"/></td>
                                <td>Rust</td>
                            </tr>
                            </tbody>
                        </table>


                        <label className="stacks-level">Stack Level</label> 
                        <table className="level-checkboxes-with-text">
                            <tbody>
                            <tr>
                                <td><input onClick={this.filterByLevel} type="checkbox" name="level" value="experimental"/></td>
                                <td>Experimental</td>
                            </tr>
                            <tr>
                                <td><input onClick={this.filterByLevel} type="checkbox" name="level" value="incubator"/></td>
                                <td>Incubator</td>
                            </tr>
                            <tr>
                                <td><input onClick={this.filterByLevel} type="checkbox" name="level" value="stable"/></td>
                                <td>Stable</td>
                            </tr>
                            </tbody>
                        </table>
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
var level = [];

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
                  language
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
