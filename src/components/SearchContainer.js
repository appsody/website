import React, { Component } from "react"
import { StaticQuery,Link } from "gatsby"
import * as JsSearch from "js-search"
import MyVerticallyCenteredModal from './modal';


class Search extends Component {

  state = {
    pageList: [],
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
    this.state.pageList= this.props.items;
    this.rebuildIndex()
  }

  /**
   * rebuilds the overall index based on the options
   */
  rebuildIndex = () => {
    const { pageList } = this.state
    const dataToSearch = new JsSearch.Search("html")
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
    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("html")

    dataToSearch.addIndex("html") // sets the index attribute for the data

    // console.log(titleList);
    dataToSearch.addDocuments(pageList) // adds the data to be searched

    this.setState({ search: dataToSearch, isLoading: false })
  }

  /**
   * handles the input change and perform a search with js-search
   * in which the results will be added to the state
   */
  searchData = e => {
    const { search } = this.state
    const queryResult = search.search(e.target.value)

    this.setState({ searchQuery: e.target.value, searchResults: queryResult })
  }
  handleSubmit = e => {
    e.preventDefault()
  }

  closeDropdown() {
    document.getElementById("search-dropdown").classList.add('hide');
  }

  openDropdown() {
    document.getElementById("search-dropdown").classList.remove('hide');
  }

  render() {
    const { titleList, searchResults, searchQuery } = this.state
    const queryResults = searchResults
    return (
      <div className="dropdown">
        <form className="form-inline" onSubmit={this.handleSubmit}>
            <input id="search-input" onClick={this.openDropdown} className="form-control form-control-sm mt-2" type="text" placeholder="Search"
              aria-label="Search"
              id="Search"
              value={searchQuery}
              onChange={this.searchData}
            />
        </form>
        <div id="search-dropdown" className="dropdown-content hide">
          <table>
          {queryResults.map(item => {
              return (
              <tr key={`row_${item.title}`}>
                <td>
                  <Link onClick={this.closeDropdown} to={item.frontmatter.path}>{item.frontmatter.title}</Link>
                </td>

              </tr>
            )
          })}
          </table>
        </div>
      </div>
    )
  }
}

export default () => (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark {
            edges {
              node {
                html
                frontmatter {
                  path
                  title
                }
              }
            }
          }
        }
      `}
      render={data => {
        let items = [];
        data.allMarkdownRemark.edges.forEach(node => {
            items = items.concat(node.node);
        });

        return <Search items={items}/>
      }}
    />
  )
