import React, { Component } from "react";
import { StaticQuery, graphql } from "gatsby";
import Tile from "../components/tile";

class RecentlyUpdatedTileGrid extends Component {
 
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

        this.state.pulls.forEach((item) => {
            if(item.name === 'application-operator' || item.name === 'appsody-buildah' || item.name === 'appsody-docker' || item.name === 'init-controller' || item.name === 'appsody-index' || item.name === 'debian-builder' || item.name === 'appsody-k8s' || item.name === 'appsody-controller') {
                // Don't want to show these stacks as they are internal Appsody ones.
            } else {
                pullCounts.push((new Date(item.last_updated)).getTime());
            }
        });

        pullCounts = pullCounts.sort(function(a, b){return b-a}).slice(0, 4);

        this.setState({ biggestNumbers: pullCounts });
        this.numbersToStacks();
    }

    numbersToStacks() {
        var stackNames = [];

        this.state.pulls.forEach((item) => {
            if(this.state.biggestNumbers.includes((new Date(item.last_updated)).getTime())) {
                stackNames.push({
                    name : item.name,
                    updated : (new Date(item.last_updated)).getTime()
                });
            }
        });

        console.log("saving topstacks : " + JSON.stringify(stackNames));
        this.setState({ topStacks: stackNames });
    }

    sortOutTiles() {

        const defaultRepo = "/incubator."

        var allStacks = this.props.stacks;
        var finalStacks = [];

        allStacks.forEach((item) => {
            if(item !== null) {
                if(this.state.topStacks.some(e => e.name === item.id)) {
                    item['updated'] = this.state.topStacks.find(e => e.name === item.id).updated;
                    finalStacks.push(item);
                }
            }
        });

        finalStacks = finalStacks.sort((a, b) => b.updated - a.updated);

        console.log("state " + this.state.topStacks);
        console.log("finalstacks " + JSON.stringify(finalStacks));

        const tiles = finalStacks.map(stack => {
        if (stack == null) return null;

        const templateURL = stack.templates[0].url;
        const repo = templateURL.split("/").reverse()[0].split(".")[0];
        const githubURL = `https://github.com/appsody/stacks/tree/master/${repo}/${stack.id}`;

        if (!stack.templates[0].url.includes(defaultRepo)) {
            return <Tile id={stack.id} heading={stack.name} desc={stack.description} cmd={"appsody init " + repo+"/"+stack.id} github={githubURL} updated={stack.updated}/>
        }
        else {
            return <Tile id={stack.id} heading={stack.name} desc={stack.description} cmd={"appsody init " + stack.id} github={githubURL} updated={stack.updated}/>
        }
    });

    return tiles;

    }

    render() {
        if(this.state.isLoading) {
            return (
            <>
                <h4 className="application-stack-info text-center loading-text">Just getting the most recently updated Stacks...</h4>
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
                stack.updated = 0;
            }
    
        });

        return <RecentlyUpdatedTileGrid stacks={stacks}/>
      }}
    />
  )