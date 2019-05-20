import React from 'react'
import './App.css'
import dayjs from 'dayjs'

class CommentsInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  handleClick(e) {
    const message = this.state.value
    if (!message) { return }
    this.props.add({
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      message
    })
    this.setState({ value: '' })
  }

  render() {
    return (
      <div>
        <input value={this.state.value} type={"text"} onChange={this.handleChange.bind(this)}/>
        <button onClick={this.handleClick.bind(this)}>Submit</button>
      </div>
    )
  }
}

class CommentsDisplay extends React.Component {
  render() {
    return (
      <div className={'CommentsDisplay'}>
        <h4>Comments</h4>
        <hr/>
        <ul>
          { this.props.children.map((item, index) => (
            <li key={`comment-${index}`}>
              <span>{ item.time }</span>
              <br/>
              {item.message}
              <hr/>
            </li>)
          ) }
        </ul>
      </div>
    )
  }
}

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      commentList: []
    }
  }

  addComment(content) {
    this.setState((prevState) => {
      prevState.commentList.unshift(content)
      return prevState
    })
  }

  render() {
    return (
      <div className={"App"}>
        <header className="App-header">
          Comments Board
        </header>
        <div className={"App-body"}>
          <CommentsInput add={this.addComment.bind(this)}/>
          <CommentsDisplay>
            {this.state.commentList}
          </CommentsDisplay>
        </div>
      </div>)
  }
}

export default App;
