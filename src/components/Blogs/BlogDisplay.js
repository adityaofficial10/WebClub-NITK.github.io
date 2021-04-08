import React, { Component } from 'react'
import "../../styles/blog.css";
import 'react-quill/dist/quill.snow.css';
import Nav from "../Nav/Nav";
import Helmet from "react-helmet";
import BlogApi from "../../_services/BlogApi";
import queryString from 'query-string';
import Loader from "react-loader-spinner";
import { Link, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faArrowLeft
  } from "@fortawesome/free-solid-svg-icons";
import {
    FacebookShareButton,
    // LinkedinShareButton,
    // TwitterShareButton,
    WhatsappShareButton
} from "react-share";
import {
    FacebookIcon,                      //not working  
    // LinkedinIcon,
    // TwitterIcon,
    WhatsappIcon
} from "react-share";

class BlogDisplay extends Component {
    constructor(props) {
        super(props)
        this.htmlContent = React.createRef()
        this.htmlHeading = React.createRef()
        this.htmlSampleText = React.createRef()
        this.editblogdiv = React.createRef()
        this.state = {
            content: '',
            loaderStatus: true,
            blogId: null,
            tagList_: [],
            editBlogStatus: false,
            pagenotfound:false,
            redirectstatus:false
        }
    }
    async componentDidMount() {
        let blogid = queryString.parse(this.props.location.search).id
        if(blogid===undefined){
            this.setState({pagenotfound:true})
            return ;
        }
        let res = await BlogApi.loadBlogWithId(blogid)
        if (res === 0) {
            this.setState({pagenotfound:true})
        } else {
            this.setState({ blogId: blogid })
            let temp = <div className="container-fluid bg-light pb-5 ql-snow " style={{ paddingTop: '60px', minHeight: '500px' }}>
                <div style={{ maxWidth: '1000px' }} className="mx-auto ql-editor">
                    <p className="blog-heading pt-5" ref={this.htmlHeading}></p>
                    <Button variant="outline-primary" style = {{float:"right", textDecoration:"none"}} href = "/#/blog"><FontAwesomeIcon icon={faArrowLeft} /> Back</Button>
                    <p className="posted-on">Posted on: {res.date} by-<span>{res.writer}</span></p>
                    <p className="pb-2"><b>Introduction</b></p>
                    <p ref={this.htmlSampleText}></p>
                    <p className="blog-content  text-justify" ref={this.htmlContent}></p>
                </div>
            </div>
            let tag_list = []
            let counter = 0;
            for (let i = 0; i < res.tag_list.length; i++) {
                tag_list.push(<li className="list-inline-item" key={counter++} style={{ background: '#1490e4', padding: '5px 10px', borderRadius: '4px',color:'white' }} >{res.tag_list[i]}</li>)
            }
            this.setState({
                content: temp,
                loaderStatus: false,
                tagList_: tag_list
            })
            this.htmlContent.current.innerHTML = res.content
            this.htmlHeading.current.innerHTML = res.heading
            this.htmlSampleText.current.innerHTML = res.sample_text
            this.editblogdiv.current.style.display = "block"
            let user_email= await localStorage.getItem('user_email')
            if(user_email=== res.user_email){
                this.setState({editBlogStatus:true})
            }
        }

    }
    deleteBlog= async()=>{
        let blogid=this.state.blogId;
        if(window.confirm("Delete Blog ?")){
            let res= await BlogApi.deleteBlog(blogid);
            if(res===true){
                this.setState({redirectstatus:true})
            }
        }
    }
    render() {
        let loaderContent = null;
        if (this.state.loaderStatus) {
            loaderContent = <div className="pt-5 text-center mt-5"><Loader type="TailSpin" color="#00BFFF" height={100} width={100} /></div>
        } else {
            loaderContent = null;
        }
        return (
            <>
                {this.state.pagenotfound && <Redirect to={"/pagenotfound"}/>}
                {this.state.redirectstatus && <Redirect to={"/blog"}/>}
                <Helmet>
                    <title>Blog</title>
                </Helmet>
                <Nav sticky="false" transp="false" />
                <div className="position-fixed  share-icon" >
                    {/* facebook sharring is giving error  */}
                    {/* <img src="https://img.icons8.com/metro/26/000000/share.png" alt="" className="d-block pb-2"/> */}
                    <FacebookShareButton url={window.location.href}>
                        <FacebookIcon size={32} round={true}></FacebookIcon>
                    </FacebookShareButton>
                    <br></br>
                    <WhatsappShareButton url={window.location.href} >
                        <WhatsappIcon size={32} round={true}></WhatsappIcon>
                    </WhatsappShareButton>
                </div>
                {loaderContent}
                {this.state.content}
                <div className="bg-light" style={{ display: 'none' }} ref={this.editblogdiv}>
                    <div style={{ maxWidth: '1000px' }} className="mx-auto py-3">
                        <ul className="tags list-inline">
                            {this.state.tagList_}
                        </ul>
                        {/* this button are visible only to the writer of this blog */}
                        {this.state.editBlogStatus && [<Link to={`/blog/editor/editblog?id=` + this.state.blogId} key="1" className='btn btn-outline-secondary mr-3'><i className="fa fa-pencil-square-o" aria-hidden="true"></i>Edit</Link>,<span onClick={this.deleteBlog} className='btn btn-outline-secondary' key="2"><i className="fa fa-trash" aria-hidden="true"></i>Delete</span>] }
                    </div>
                </div>
            </>
        )
    }
}

export default BlogDisplay
