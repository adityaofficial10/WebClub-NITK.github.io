import axios from 'axios';
import jssoup from 'jssoup';
import mynoty from '../components/mynoty'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";// these two lines are of no use but me be used when we try to send csrf_token with post requset
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";//csrf_token

class BlogApi {
  async postBlog(url, data, blog_id) {
    let soup = new jssoup(data)
    let heading = soup.find('h1')
    if (heading === undefined) {
      heading = soup.find('h2')
      if (heading === undefined) {
        mynoty.show("Please enclose heading in h1 or h2 tag", 2) // is the line good in terms of english...
        return;
      }
    }
    let sample_text = soup.find('p')
    if (sample_text === undefined) {
      mynoty.show("Could not find sample text first paragraph will be taken as sample text", 2)  //check english of this  line
      return;
    }
    await sample_text.extract()
    await heading.extract();
    data = soup.prettify()
    // console.log(data)
    sample_text = sample_text.text
    // console.log(sample_text)
    heading = heading.text
    // console.log(heading)
    let tag_list = []
    data = data.replace(/#[a-zA-Z_-]+/g, function (x) {
      tag_list.push(x.substr(1));
      return '';
    })
    // console.log(tag_list)
    if (tag_list.length === 0) {
      mynoty.show("Please include some topic tag i.e #Programming #ML #DSA", 2) //instead of creating new instance of Noty every time i have created different components in components/mynoty.js 
      return;
    }
    let token = await localStorage.getItem('token');
    let data_to_send = {
      content: data,
      heading: heading,
      sample_text: sample_text,
      tag_list: tag_list,
      blogId: blog_id, //blog id will be -1 if we are wrtting blog and will have a valid id in case if we are editing a blog.
      token: token
    }
    let res_ = undefined;
    mynoty.show("Wait while your blog get posted", 1)
    if (data_to_send.blogId === -1) {
      await axios.post(url, data_to_send)
        .then(response => {
          if (response.status === 200) {
            console.log(response)
            mynoty.show(response.data.msg, 1)
            res_ = {
              id: response.data.id,
              heading: heading
            }
          }

        })
        .catch(error => {
          if (error.response !== undefined && error.response.status === 401) { // if backend is offline or user token send expired/invalid
            // console.log(error.response);
            mynoty.show(error.response.data, 2)
          } else if (error.response !== undefined && error.response.status === 403) { //token send  is balid but user in not a club member
            // console.log(error.response)
            mynoty.show(error.response.data, 2)
          } else {
            mynoty.show("Oops Something Went Wrong", 2) //if  some other error occure at backend
          }
        })
    }else{
      await axios.put(url, data_to_send)
      .then(response => {
        if (response.status === 200) {
          console.log(response)
          mynoty.show(response.data.msg, 1)
          res_={
            id:response.data.id,
            heading:heading
          }
        }

      })
      .catch(error => {
        if (error.response!==undefined && error.response.status === 401) { // if backend is offline or user token send expired/invalid
          // console.log(error.response);
          mynoty.show(error.response.data, 2)
        } else if (error.response!==undefined && error.response.status === 403) { //token send  is balid but user in not a club member
          // console.log(error.response)
          mynoty.show(error.response.data, 2)
        } else {
          mynoty.show("Oops Something Went Wrong", 2) //if  some other error occure at backend
        }
      })
    }
    return res_;
  }
  async loadBlogWithId(blogid) { //loading specific blog
    let res = await fetch(process.env.REACT_APP_BACKEND_URL + '/getblogs/' + blogid)
    res = await res.json()
    return res
  }
  async loadBlogs() {
    let res = await fetch(process.env.REACT_APP_BACKEND_URL + '/getblogs'); //loading all blog with headding and sample text(main content of blog is not loaded here)
    res = await res.json()
    return res;
  }
  async deleteBlog(id) {
    let res_status = false;
    await axios.delete(process.env.REACT_APP_BACKEND_URL + '/deleteblog',{ data: { id:id,token:await localStorage.getItem('token') }})
      .then((res) => {
        if (res.status === 200) {
          mynoty.show(res.data, 1);
          res_status = true;
        }
      })
      .catch((error) => {
        console.log(error)
        if (error.response !== undefined && (error.response.status === 403 || error.response.status === 401)) { //if backend is offline or invalid/expired token or if someone is deleting the blog which is not written by him.
          mynoty.show(error.response.data, 2)
        } else {
          mynoty.show("Oops Something Went Wrong", 2) //any other internal error at server
        }
        res_status = true;
      })
    return res_status;
  }
}

var instance = new BlogApi();
export default instance;
