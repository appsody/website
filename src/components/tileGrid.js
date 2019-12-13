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

    filterByLanguage () {
        var ele = document.getElementsByName('language'); 
        ele.forEach(i => {
            if(i.checked && !language.includes(i.value)) {
                    language.push(i.value);
                    this.setState({
                        language: i.value,
                    })                
            } else if (!i.checked && language.indexOf(i.value) > -1) {
                language.splice(language.indexOf(i.value), 1);
                this.setState({
                    language: "",
                })
            }
        });
        this.rerenderTiles();
    }

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
        this.rerenderTiles();
      }

      rerenderTiles() {
         
        if (level.length === 1 && level.includes("incubator") || (level.length === 2 && level.includes("stable") && level.includes("incubator"))) {
            if (language.length !== 0) {
                console.log("here")
                this.tiles = this.props.stacks.map(stack => {                
                    for (var i = 0; i < level.length+language.length; i++) {          
                        if (stack !== null && (stack.language).includes(language[i]) && (stack.templates[0].url.includes(this.defaultRepo))) {
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
            }
            
        } else if (level.length === 1 && level.includes("experimental") || (level.length === 2 && level.includes("stable") && level.includes("experimental"))) {
            if (language.length !== 0) {
                this.tiles = this.props.stacks.map(stack => {                
                    for (var i = 0; i < level.length+language.length; i++) {        
                        if (stack !== null && (stack.language).includes(language[i]) && (stack.templates[0].url.includes(this.experimentalRepo))) {
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
            }
            
        } else if((level.length === 1 && level.includes("stable"))) {
            this.tiles = []
        } else if (language.length !== 0) {
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

    moveSidebar() {
        document.getElementById("funnel-icon").classList.toggle('open');

        expanded = !expanded;

        if (expanded) {
        document.getElementById("sidebar").style.marginLeft= "0";      
        } else {
        document.getElementById("sidebar").style.marginLeft = "-100vw";
        }
    }

    render() {
        this.props.stacks.forEach(stack => {
            if (stack == null) return null;
            if (stack !== null) {
                if (!languageList.includes(stack.language)) {
                    languageList.push(stack.language)
                }
            }
        });

            const languages = languageList.map(lang => {
                return (
                    <li>
                        <input className="language checkbox-item" onClick={this.filterByLanguage} type="checkbox" name="language" value={lang}/>{lang}
                    </li>
                )
        });

        return (
            <>
                <aside id="sidebar" className="sidebar">
                <label className="stacks-level">Stack Level</label> 
                    <ul className="checkbox-list">
                        <li className="checkbox-item">
                            <input className="checkbox-item" onClick={this.filterByLevel} type="checkbox" name="level" value="experimental"/> Experimental
                        </li>
                        <li className="checkbox-item">
                            <input className="checkbox-item" onClick={this.filterByLevel} type="checkbox" name="level" value="incubator"/> Incubator
                        </li>
                        <li className="checkbox-item">
                            <input className="checkbox-item" onClick={this.filterByLevel} type="checkbox" name="level" value="stable"/> Stable
                        </li>
                    </ul>
                    
                    <label className="stacks-functions">Language</label> 
                    <ul className="checkbox-list">
                        {languages}
                    </ul>
                </aside>
    
                <div className="container">
                    <div id="application-stacks" className="row mx-auto">
                        {this.tiles}
                    </div>
                </div>

                <section onClick={() => this.moveSidebar()} className="funnel-icon" id="funnel-icon">
                    <i className="fas fa-filter"></i>
                </section>
            </>
        )
    }
}

var language = [];
var level = [];
var expanded = false;
var languageList = [];

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
