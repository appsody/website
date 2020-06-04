import React, { Component } from "react";
import { StaticQuery, graphql } from "gatsby";
import Tile from "./tile";

class TopDownloadedTileGrid extends Component {
 
    state = { pulls: [], biggestNumbers: [], topStacks: [], isLoading: false }

    componentDidMount() {
        this.setState({ isLoading: true });

        fetch(`https://cors-anywhere.herokuapp.com/https://hub.docker.com/v2/repositories/appsody/?page=1&page_size=100`)
            .then(response => response.json())
            .then(data => this.setState({ pulls: data.results, isLoading: false }))
            .then(() => {
                this.getBiggestNumbers()
            });
    }

    getBiggestNumbers() {
        var pullCounts = [];

        let nonDeprecatedStacks = this.props.stacks.filter(stack =>  stack !== null && stack.deprecated === null);

        this.state.pulls.forEach((item) => {
            nonDeprecatedStacks.forEach((stack) => {
                if (stack.id === item.name) {
                    pullCounts.push(item.pull_count);
                }
            });  
        });

        pullCounts = pullCounts.sort(function(a, b){return b-a}).slice(0, 4);

        this.setState({ biggestNumbers: pullCounts });
        this.numbersToStacks();
    }

    numbersToStacks() {
        var stackNames = [];

        this.state.pulls.forEach((item) => {
            if(this.state.biggestNumbers.includes(item.pull_count)) {
                stackNames.push({
                    name : item.name,
                    pulls: item.pull_count
                });
            }
        });
        
        this.setState({ topStacks: stackNames });
    }

    sortOutTiles() {

        const defaultRepo = "/incubator."

        var allStacks = this.props.stacks;
        var finalStacks = [];

        allStacks.forEach((item) => {
            if(item !== null) {
                if(this.state.topStacks.some(e => e.name === item.id)) {
                    item['count'] = this.state.topStacks.find(e => e.name === item.id).pulls;
                    finalStacks.push(item);
                }
            }
        });

        finalStacks = finalStacks.sort((a, b) => b.count - a.count);

        const tiles = finalStacks.map(stack => {
        if (stack == null) return null;

        const templateURL = stack.templates[0].url;
        const repo = templateURL.split("/").reverse()[0].split(".")[0];
        const githubURL = `https://github.com/appsody/stacks/tree/master/${repo}/${stack.id}`;

        if (!stack.templates[0].url.includes(defaultRepo)) {
            return <Tile id={stack.id} heading={stack.name} desc={stack.description} cmd={"appsody init " + repo+"/"+stack.id} github={githubURL} count={stack.count} />
        }
        else {
            return <Tile id={stack.id} heading={stack.name} desc={stack.description} cmd={"appsody init " + stack.id} github={githubURL} count={stack.count}/>
        }
    });

    return tiles;

    }

    render() {
        if(this.state.isLoading) {
            return (
            <>
                <h4 className="application-stack-info text-center loading-text">Just getting the most downloaded Stacks...</h4>
            </>
            );
        }

        return (
            <div className="container">
                <div id="application-stacks" className="row mx-auto">
                    {this.sortOutTiles()}
                </div>
            </div>
        );
    }

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
                        deprecated
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

        stacks.forEach(stack => {
            if(stack !== null) {
                stack.count = 0;
            }
    
        });

        return <TopDownloadedTileGrid stacks={stacks}/>
      }}
    />
  )