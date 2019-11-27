import React, { Component } from "react"
import { StaticQuery,Link } from "gatsby"
import * as JsSearch from "js-search"

class Search extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.closeDropdown = this.closeDropdown.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
  }
  state = {
    pageList: [],
    search: [],
    searchResults: [],
    isLoading: true,
    isError: false,
    searchQuery: "",
    isOpen: false
  }
  /**
   * React lifecycle method to fetch the data
   */
  componentDidMount() {
    this.setState({ pageList: this.props.items }, () => {
      this.rebuildIndex()
    });
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
    this.setState({
      isOpen: false
    });
  }

  openDropdown() {
    this.setState({
      isOpen: true
    });
  }

  render() {
    const { searchResults, searchQuery } = this.state
    const queryResults = searchResults
    if (this.state.isOpen) {
      return (
        <div className="dropdown">
          <form className="form-inline" onSubmit={this.handleSubmit}>
              <input id="search-input" onClick={this.openDropdown} className="form-control form-control-sm mt-2 mr-2" type="text" placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={this.searchData}
              />
              <i className="fa fa-search ml-2 mt-1 mr-3"></i>
          </form>
          <div id="search-dropdown" className="dropdown-content">
            <table>
            {queryResults.map(item => {
                return (
                <tbody key={`row_${item.frontmatter.title}`}>
                  <tr>
                    <td>
                      <Link onClick={this.closeDropdown} to={item.fields.slug}>{item.frontmatter.title}</Link>
                    </td>
                  </tr>
                </tbody>
              )
            })}
            </table>
          </div>
        </div>
      )
    } else {
      return (
        <div className="dropdown">
          <form className="form-inline" onSubmit={this.handleSubmit}>
              <input id="search-input" onClick={this.openDropdown} className="form-control form-control-sm mt-2 mr-2" type="text" placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={this.searchData}
              />
              <i className="fa fa-search ml-2 mt-1 mr-3"></i>
          </form>
          <div id="search-dropdown" className="dropdown-content hide">
            <table>
            {queryResults.map(item => {
                return (
                <tbody key={`row_${item.frontmatter.title}`}>
                  <tr>
                    <td>
                      <Link onClick={this.closeDropdown} to={item.fields.slug}>{item.frontmatter.title}</Link>
                    </td>
                  </tr>
                </tbody>
              )
            })}
            </table>
          </div>
        </div>
      )
    }
  }
}

export default () => (
    <StaticQuery
      query={graphql`
        query {
          allMdx {
            edges {
              node {
                body
                frontmatter {
                  title
                }
                fields {
              		slug
            		}
              }
            }
          }
        }
      `}
      render={data => {
        let items = [];
        data.mdx.edges.forEach(node => {
            items = items.concat(node.node);
        });

        return <Search items={items}/>
      }}
    />
  )
