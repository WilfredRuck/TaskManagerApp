class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: this.props.task.completed,
    }
  }

  updateUI() {
    this.setState({ 
      completed: !this.state.completed
    })
  }

  updateTask(task) {
    let body = JSON.stringify({task: {name: task.name, completed: !task.completed} })
    fetch(`/api/projects/${this.props.projectId}/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    })
    .then(() => {
      this.updateUI();
    })
  }

  render() {
    return(
      <li className="task"> 
        <input 
            onChange={() => this.updateTask(this.props.task)} 
            type='checkbox'
            checked={this.state.completed}
        />
        <p>{this.props.task.name}</p> 
      </li>
    )
  }

  
}