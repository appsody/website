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
                        <h1>Stacks</h1>
                        <p >Explanation about category name goes here</p>
                        <TileGrid apple="java"/>
                    </div>
                </section>
            </Layout>
        );
    }
  }