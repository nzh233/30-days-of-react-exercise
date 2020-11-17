import React, { useRef, Component } from 'react'
import ReactDOM from 'react-dom'

const TextArea = (props) => {
  return (
    <textarea
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  )
}

const getFormatedTime = () => {
  const dateObj = new Date();
  let year = dateObj.getFullYear(),
      month = dateObj.getMonth(),
      date = dateObj.getDate(),
      hours = dateObj.getHours(),
      minutes = dateObj.getMinutes(),
      seconds = dateObj.getSeconds();
  const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
  month = months[month];
  let hourPeriod = "am";
  if (hours >= 12) {
    hourPeriod = "pm";
  }
  [date, hours, minutes, seconds] = [date, hours, minutes, seconds].map(num => num < 10 ? "0" + num : num);

  return `${month} ${date}, ${year} ${hours}:${minutes} ${hourPeriod}`
}

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state ={
      text: "",
      userName: "Alpha",
      userId: "Beta",
    };
    this.MAX_POST_LEN = props.maxLength;
  }
  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    })
  }
  handlePost = (e) => {
    e.preventDefault();
    const state = this.state;
    this.props.addPost({
      text: state.text,
      userName: state.userName,
      userId: state.userId,
    })
  }
  render(){
    let letterCount = this.MAX_POST_LEN - this.state.text.length;
    let buttonStatus = letterCount < this.MAX_POST_LEN && letterCount > 0;
    let buttonClass = buttonStatus ? 'activeButton' : 'disabledButton';
    return (
      <form onSubmit={this.handlePost}>
        <div>
          <TextArea 
            onChange={this.handleChange}
            placeholder="Type something to post."
          />
          <p className={letterCount < 0 ? 'red-text' : 'other'}>{letterCount}</p>
        </div>
        <div>
          <button className={buttonClass} disabled={!buttonStatus}>Post</button>
        </div>
      </form>
    )
  }
}
const UserInfo = (props) => {
  const {
    iconLink,
    name,
    id
  } = props.userInfo;
  return (
    <div className="user-info">
      <img src={iconLink} alt=""></img>
      <p className="user-name">
        {name}
        <span className="user-id">@{id}</span>
      </p>
    </div>
  )
}

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    }
  }

  editPost = () => {
    this.setState({
      editing: true,
    })
  }
  cancelEdit = () => {
    this.setState({
      editing: false,
    })
  }
  saveEdit = () => {
    this.props.editPost()
  }
  deletePost = () => {
    this.props.onDelete(this.props.order)
  }
  renderEdit = () => {
    return (
      <div>
        Edit.
      </div>
    )
  }
  renderPost = () => {
    const {
      name,
      id,
      content,
      time,
    } = this.props.data;
    return (
      <div className="tweet-wrapper">
        <UserInfo
          userInfo={{
            iconLink: "",
            name,
            id,
          }}
        />
        <div className="post-text">
          <p>{content}</p>
        </div>
        <div 
          className="post-operation"
        >
          <div>
            <button
              onClick={this.deletePost}
            >Delete</button>
          </div>
          <div>
            <button
              onClick={this.editPost}
            >Edit</button>
          </div>
          <div>
            <span className="publish-time">{time}</span>
          </div>
        </div>
      </div>
    )
  }
  render() {
    return this.state.editing ? this.renderEdit() : this.renderPost();
  }
}

class Twitter extends Component {
  constructor() {
    super();
    this.state = {
      posts: [
        {
          name: "Alpha",
          id: "Beta",
          content: "Balabala",
          time: "Nov 17, 2020 14:45 pm",
        },
        {
          name: "Omega",
          id: "Pi",
          content: "Gualagualaguala",
          time: "Nov 17, 2020 14:50 pm",
        },
      ]
    }
  }

  addPost = ({
    text,
    userName,
    userId
  }) => {
    this.setState((state, props) => {
      return {
        posts: [
            ...state.posts,
            {
              name: userName,
              id: userId,
              content: text,
              time: getFormatedTime(),
            }
          ]
      }
    })
  }

  deletePost = (index) => {
    this.setState((state, props) => {
      state.posts.splice(index, 1);
      return {
        posts: [
          ...state.posts
        ]
      }
    })
  }

  editPost = () => {

  }

  renderPosts = () => {
    return this.state.posts.map((post, i) => 
    <Post 
      data={post}
      onDelete={this.deletePost}
      key={i}
      order={i}
    />
    )
  }

  render() {
    return (
      <div className="tweet-wrapper">
        <InputForm 
          maxLength={250}
          addPost={this.addPost}
        />
        {this.renderPosts()}
      </div>
    )
  }
  componentDidMount() {
    
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Twitter />, rootElement)