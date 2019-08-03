import React, { Component } from "react"
import { StaticQuery,Link } from "gatsby"
import * as JsSearch from "js-search"
import MyVerticallyCenteredModal from './modal';


class Search extends Component {

  state = {
    titleList: [],
    search: [],
    searchResults: [],
    isLoading: true,
    isError: false,
    searchQuery: "",
  }
  /**
   * React lifecycle method to fetch the data
   */
  componentDidMount() {
    this.state.titleList= this.props.items;
    // this.setState({titleList: [{title: "Overview"}]})
    console.log(this.props.items);
    console.log(this.state.titleList);
    this.rebuildIndex()
  }

  /**
   * rebuilds the overall index based on the options
   */
  rebuildIndex = () => {
    const { titleList } = this.state
    const dataToSearch = new JsSearch.Search("title")
    /**
     *  defines a indexing strategy for the data
     * more more about it in here https://github.com/bvaughn/js-search#configuring-the-index-strategy
     */
    dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()
    /**
     * defines the sanitizer for the search
     * to prevent some of the words from being excluded
     *
     */
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()
    /**
     * defines the search index
     * read more in here https://github.com/bvaughn/js-search#configuring-the-search-index
     */
    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("title")

    dataToSearch.addIndex("title") // sets the index attribute for the data

    // console.log(titleList);
    dataToSearch.addDocuments(titleList) // adds the data to be searched

    this.setState({ search: dataToSearch, isLoading: false })
  }

  /**
   * handles the input change and perform a search with js-search
   * in which the results will be added to the state
   */
  searchData = e => {
    const { search } = this.state
    const queryResult = search.search(e.target.value)
    // console.log(search);
    // console.log(queryResult);
    // console.log('===');
    this.setState({ searchQuery: e.target.value, searchResults: queryResult })
  }
  handleSubmit = e => {
    e.preventDefault()
  }

  render() {
    const { titleList, searchResults, searchQuery } = this.state
    // const queryResults = searchQuery === "" ? titleList : searchResults
    const queryResults = searchResults
    console.log("Title List: " + titleList)
    console.log("Search Results: " + searchResults)
    return (
      <div>
        <form class="form-inline" onSubmit={this.handleSubmit}>
            <input className="form-control form-control-sm ml-3 w-75 mt-2" type="text" placeholder="Search"
              aria-label="Search"
              id="Search"
              value={searchQuery}
              onChange={this.searchData}
            />
            <i class="fas fa-search ml-2 mt-2" aria-hidden="true"></i>
        </form>

        <table>
        {queryResults.map(item => {
            return (
            <tr key={`row_${item.title}`}>
              <td
                style={{
                  fontSize: "14px",
                  border: "1px solid #d3d3d3",
                }}
              >

                <Link to={item.path}>{item.title}</Link>
              </td>

            </tr>
          )
        })}
        </table>

      </div>
    )
  }
}

export default () => (
    <StaticQuery
      query={graphql`
        query {
          allSidebarYaml {
             nodes {
               items {
                 path
                 title
               }
             }
          }
        }
      `}
      render={data => {
        let items = [];
        data.allSidebarYaml.nodes.forEach(node => {
            items = items.concat(node.items);
        });

        return <Search items={items}/>
      }}
    />
  )
