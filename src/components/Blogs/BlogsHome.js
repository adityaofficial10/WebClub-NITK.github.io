import React from "react";
import "../../styles/home.css";
import "../../styles/blog.css";
import imageUrl from "../../assets/images/blog_img.png";
import googlelogo from "../../assets/images/google-logo.svg";
import Nav from "../Nav/Nav";
import Loader from "react-loader-spinner";
import BlogCard from './BlogCard'
import Helmet from "react-helmet";
import BlogApi from "../../_services/BlogApi";
// import urlApi from "../../_services/urlApi";
import GoogleLogin from 'react-google-login'
import ReactPaginate from 'react-paginate';
import AuthApi from '../../_services/AuthApi'
import { Redirect } from 'react-router'
// import {
//     membersWorkSheetId,
//     // profileImagesRepositoryURL,
// } from "./../../environment";
// import SpreadSheetApi from "../../_services/spreadSheetApi";
// import Axios from "axios";
class BlogHome extends React.Component {
    constructor(props) {
        super(props);
        this.searchResultContainer = React.createRef()
        this.searchForm = React.createRef()
        this.searchInput = React.createRef()
        this.activePageLink = React.createRef()
        this.state = {
            allBlogs: [],
            searchResult: [],
            loaderStatus: true,
            blogsPerPage: 10,
            currentPage: 1,
            redirectToEditor: 0
        };
        this.searchBlogs = this.searchBlogs.bind(this)
    }
    async componentDidMount() {
        let counter = 0;
        let color_arr = ['#6b0504', '#a3320b', '#2e5339', '#e55381', '#1c5d99', '#3f4045', '#9a4c95', '#26532b', '#51344d', '#58641d']; //different color for each card
        let Response = await BlogApi.loadBlogs()
        var blogsList = Response.blogs;
        var temp = blogsList.map(element => {
            let tags = element.tags
            element = element.blog
            // console.log(element);
            return <BlogCard key={element.id} color={color_arr[(counter++) % 10]} blogsid={element.id} tagList={tags} heading={element.heading} date={element.date} writer={element.user_name} sample_text={element.sample_text} />
        });
        this.setState({ allBlogs: temp, loaderStatus: false })
    }
    showSearchContainer = () => { // animation of the blog search by tag div  onclick
        this.searchResultContainer.current.style.display = "block"; //changeing style of blogs search when focus
        this.searchForm.current.style.borderRadius = '10px 10px 0 0';
    }
    hideSearchContainer = () => {
        this.searchResultContainer.current.style.display = "none";//changeing style of blogs search when focus-out
        this.searchForm.current.style.borderRadius = '24px';
    }
    async searchBlogs(event) { //sorting blogs on key press  based on tags linear iterations and swaping
        event.preventDefault();
        let inputValue = this.searchInput.current.value;
        let temp = this.state.allBlogs
        // console.log(temp)
        let k = 0;
        let inputLen = inputValue.length;
        for (let i = 0; i < temp.length; i++) {
            let tag_list = temp[i].props.tagList
            let flag = 0;
            for (let j = 0; j < tag_list.length; j++) {
                if (tag_list[j].substr(0, inputLen) === inputValue) {
                    flag = 1;
                    break;
                }
            }
            if (flag === 1) {
                let swap_temp = temp[k];
                temp[k] = temp[i];
                temp[i] = swap_temp;
                k++;
            }
        }

        this.setState({ allBlogs: temp }, () => {
            // console.log(this.state.allBlogs)
        })


    }
    responseGoogle = async (response) => {
        
        var data = {
            token: response.tokenId
        }
        // console.log(response.tokenId);
        let res = await AuthApi.login(data);
        // console.log(res)
        if (res === true) {
            this.props.login();
            this.setState({
                redirectToEditor: true
            })
        }else{
            this.props.logout();
        }
    }
    handlePageClick = (k) => {
        // console.log(k.selected)
        this.setState({
            currentPage: k.selected + 1
        })
    }
    // addAllUser=async()=>{
    //     var res = await SpreadSheetApi.getWorkSheetData(membersWorkSheetId);
    //     console.log(res);
    //     let userdata=[];
    //     res.forEach(val=>{
    //         console.log(val);
    //         userdata.push({
    //             name:val.name,
    //             username:val.id,
    //             email:val.email
    //         })
    //     })
    //     console.log(userdata)
    //     Axios.post(urlApi.backendDomain()+'/create_club_member_data',userdata);
    // }
    render() {
        const { blogsPerPage, loaderStatus, allBlogs, currentPage, redirectToEditor } = this.state
        let loaderContent = null;
        if (loaderStatus) {
            loaderContent = <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
        } else {
            loaderContent = null;
        }
        let blogsEnd = currentPage * blogsPerPage
        let blogsStart = blogsEnd - blogsPerPage;
        let blogstoshow = allBlogs.slice(blogsStart, blogsEnd)
        let noOfPages = allBlogs.length / blogsPerPage;
        return (
            <div>
                <Helmet>
                    <title>Blogs</title>
                </Helmet>
                <div>
                    {redirectToEditor && <Redirect to={"/blog/editor"} />}
                    <div>
                        <Nav sticky="false" transp="false" />
                        <div className="main-image center-flex" style={{ background: 'white' }}>
                            <div className="title-container px-4" style={{width:'100%'}} >
                                <h1 className="main-title-blogs">
                                    Write an
                                <br />
                                Inspiring
                                <br />
                                Blog
                                </h1>
                                <GoogleLogin
                                    clientId="450857265760-h4n07vma47ofqrna2ktclm5rvgg3f24l.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                    render={renderProps => (
                                        <button className="my-btn d-flex flex-row" onClick={renderProps.onClick} disabled={renderProps.disabled}><img style={{width:'30px'}} alt="google logo" src={googlelogo}/><span style={{paddingTop:'4px'}}>Write Blog</span></button>
                                    )}
                                    cookiePolicy={'single_host_origin'}
                                />
                                {/* <button onClick={this.addAllUser}>tempbutton</button> */}
                            </div>
                            <img className="bg-image" width="700" src={imageUrl} alt='background' />
                        </div>
                        <div className="container" >
                            <div className="row">
                                <div className="col-12 p-0 m-0">
                                    <form action="#" id="subject_search_form" ref={this.searchForm}>
                                        <input type="search" name="search" ref={this.searchInput} autoComplete="off" id="subject_search_input" placeholder="Search topic tag" onFocus={this.showSearchContainer} onBlur={this.hideSearchContainer} onKeyUp={this.searchBlogs} />
                                        <button type="submit" onClick={this.searchBlogs} className="pl-3"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search_icon" ><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></button>
                                        <div className="search_result_container" ref={this.searchResultContainer}>{this.state.searchResult}</div>
                                    </form>
                                </div>
                                <div className="col-12 text-center" >
                                    {loaderContent}
                                </div>
                                {blogstoshow}
                                <div className="col-12 pt-2 d-flex justify-content-center ">
                                    <ReactPaginate pageCount={noOfPages}
                                        onPageChange={this.handlePageClick}
                                        breakClassName={'page-item'}
                                        pageRangeDisplayed={5}
                                        marginPagesDisplayed={5}
                                        breakLinkClassName={'page-link'}
                                        containerClassName={'pagination'}
                                        pageClassName={'page-item'}
                                        pageLinkClassName={'page-link'}
                                        previousClassName={'page-item'}
                                        previousLinkClassName={'page-link'}
                                        nextClassName={'page-item'}
                                        nextLinkClassName={'page-link'}
                                        activeClassName={'active'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default BlogHome;
