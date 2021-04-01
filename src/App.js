import React, {Suspense, lazy } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home";
import Members from "./components/members/member";
import Footer from "./components/footer";
import Events from "./components/Events/Event";
import pagenotfound from './components/pagenotfound'
import Loader from "react-loader-spinner";
import Nav from './components/Nav/Nav'
const BlogApp = lazy(() => import('./components/Blogs/BlogApp'));
// import Timeline from "./components/Timeline/timeline";
class App extends React.Component {
  render() {
    return (
      <>
        <div id="wrapper" className="d-flex flex-column">
          <main className="flex-fill">
            <Router>
              <Suspense fallback={<div className="d-flex justify-content-center pt-5"><Nav sticky="false" transp="false" /><Loader type="TailSpin" className="pt-5" color="#00BFFF" height={100} width={100} /></div>}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/members" component={Members} />
                <Route exact path="/events" component={Events} />
                {/* <Route exact path="/timeline" component={Timeline} /> */}
                <Route path="/blog" component={BlogApp} />
                <Route component={pagenotfound} />
              </Switch>
              </Suspense>
            </Router>
          </main>
        <Footer />
      </div>
      </>
    );
  }
}

export default App;
