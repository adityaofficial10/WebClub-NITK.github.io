import React, { Component } from 'react'
import { Route, Switch, matchPath } from 'react-router-dom'
import BlogHome from './BlogsHome'
import AuthApi from './../../_services/AuthApi'
import BlogDisplay from './BlogDisplay'
import pagenotfound from '../pagenotfound'
import Editor from './editor'

// import pagenotfound from './../pagenotfound'
class BlogApp extends Component {
    constructor(props) {
        super(props)
        this.path = matchPath()
        this.state = {
            logedIn: false,
        }
    }
    componentDidMount = async () => {
        let loged_in = await AuthApi.validateToken();
        if (loged_in === true) {
            this.setState({
                logedIn: true
            })
        }
    }
    login = () => {
        this.setState({
            logedIn: true
        })
    }
    logout = () => {
        this.setState({
            logedIn: false
        })
    }


    render() {
        return (


            <Switch>
                <Route exact path={`/blog`}>
                    <BlogHome isLogedIn={this.state.logedIn} login={this.login} logout={this.logout} {...this.props} />
                </Route>
                {this.state.logedIn && <Route exact path="/blog/editor" >
                    <Editor isLogedIn={this.state.logedIn} login={this.login} logout={this.logout} {...this.props} />
                </Route>}
                {this.state.logedIn && <Route exact path="/blog/editor/editblog" >
                    <Editor isLogedIn={this.state.logedIn} login={this.login} logout={this.logout} {...this.props} />
                </Route>}
                <Route exact path={`/blog/:slug`} component={BlogDisplay} />
                <Route component={pagenotfound} />
            </Switch>
        )
    }
}

export default BlogApp
