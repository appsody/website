import React, { Component } from "react";
import { StaticQuery, graphql } from "gatsby";
import Tile from "../components/tile";

class FeaturedTileGrid extends Component {
 
    state = { pulls: [], biggestNumbers: [], topStacks: [], isLoading: false }

    componentDidMount() {
        this.setState({ isLoading: true });

        fetch(`https://cors-anywhere.herokuapp.com/https://hub.docker.com/v2/repositories/appsody/?page=1&page_count=100`)
            .then(response => response.json())
            .then(data => this.setState({ pulls: data.results, isLoading: false }))
            .then(() => {
                this.getBiggestNumbers()
            });
    }

    getBiggestNumbers() {
        var pullCounts = [];

        this.state.pulls.forEach((item) => {
            pullCounts.push(item.pull_count);
        });
        
        pullCounts = pullCounts.sort(function(a, b){return b-a}).slice(0, 6);

        this.setState({ biggestNumbers: pullCounts });
        this.numbersToStacks();
    }

    numbersToStacks() {
        var stackNames = [];

        this.state.pulls.forEach((item) => {
            if(this.state.biggestNumbers.includes(item.pull_count)) {
                stackNames.push(item.name);
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
                if(this.state.topStacks.includes(item.id)) {
                    finalStacks.push(item);
                }
            }
        });

        const tiles = finalStacks.map(stack => {
        if (stack == null) return null;

        const templateURL = stack.templates[0].url;
        const repo = templateURL.split("/").reverse()[0].split(".")[0];
        const githubURL = `https://github.com/appsody/stacks/tree/master/${repo}/${stack.id}`;

        if (!stack.templates[0].url.includes(defaultRepo)) {
            return <Tile id={stack.id} heading={stack.name} desc={stack.description} cmd={"appsody init " + repo+"/"+stack.id} github={githubURL} />
        }
        else {
            return <Tile id={stack.id} heading={stack.name} desc={stack.description} cmd={"appsody init " + stack.id} github={githubURL}/>
        }
    });

    return tiles;

    }

    render() {
        if(this.state.isLoading) {
            return (
            <>
                <h4 className="application-stack-info text-center loading-text">Just getting the top Stacks...</h4>
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

        return <FeaturedTileGrid stacks={stacks}/>
      }}
    />
  )
















// const TileGrid = (props) => {

//     const defaultRepo = "/incubator."
//     var numbers = [];


//     return fetch(`https://cors-anywhere.herokuapp.com/https://hub.docker.com/v2/repositories/appsody/`)
//     .then(
//         function(response) {
//         if (response.status !== 200) {
//             console.log('Looks like there was a problem. Status Code: ' +
//             response.status);
//             return;
//         }


//         response.json().then(function(data) {
//             data.results.forEach(function(item, index) {
//                 numbers.push(item.pull_count);
//                 console.log("Numbers: " + numbers);

//             });
//         });
//         }
//     )
//     .catch(function(err) {
//         console.log('Fetch Error :-S', err);
//     });

//     const tiles = props.stacks.slice(0, 4).map(stack => {
//         if (stack == null) return null;

//         const templateURL = stack.templates[0].url;
//         const repo = templateURL.split("/").reverse()[0].split(".")[0];
//         const githubURL = `https://github.com/appsody/stacks/tree/master/${repo}/${stack.id}`;

//         if (!stack.templates[0].url.includes(defaultRepo)) {
//             return <Tile id={stack.id} heading={stack.name} desc={stack.description} cmd={"appsody init " + repo+"/"+stack.id} github={githubURL}/>
//         }
//         else {
//             return <Tile id={stack.id} heading={stack.name} desc={stack.description} cmd={"appsody init " + stack.id} github={githubURL}/>
//         }
//     });

//     return (
//         <div className="container">
//             <div id="application-stacks" className="row mx-auto">
//                 {tiles}
//             </div>
//         </div>
// //     )
// }

// export default () => (
//     <StaticQuery
//       query={graphql`
//         query {
//             allIndexesYaml {
//                 nodes {
//                     stacks {
//                         id
//                         name
//                         description
//                         templates {
//                             url
//                         }
//                     }
//                 }
//             }
//         }
//       `}
//       render={data => {
//         let stacks = [];
//         data.allIndexesYaml.nodes.forEach(node => {
//             stacks = stacks.concat(node.stacks);
//         });

//         return <TileGrid stacks={stacks}/>
//       }}
//     />
//   )
