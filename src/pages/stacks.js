import React from "react"
import TileGrid from "../components/tileGrid";
import Layout from "../components/layout"

export default class IndexPage extends React.Component {
    state = {
        firstName: "",
        lastName: false,
      }



      filter() {
          return "java";
      }

    render() {
        return (
            <Layout>
                
                <section className="stacks-section">
                    <div className="stacks">
                        <h2>Application Stacks</h2>
                        <p className="px-5">Select the application stack to view further details on GitHub or copy the command to start using the stack with our CLI.</p>
                        <TileGrid apple="java"/>
                    </div>
                </section>
            </Layout>
        );
    }
  }