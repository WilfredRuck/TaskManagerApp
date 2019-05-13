class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      name: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    fetch(`/api/projects/${this.props.project.id}/tasks`)
      .then((response) => {return response.json()})
      .then((data) => {
        this.setState({ tasks: data }) })
  }

  updateField(field) {
    return e => this.setState({
      [field]: e.currentTarget.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let body = JSON.stringify({task: {name: this.state.name} })
    fetch(`/api/projects/${this.props.project.id}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => {
      return response.json()})
    .then((task)=>{
      return (
      this.setState({ tasks: this.state.tasks.concat(task), name: ''})
      )
    })
  }

  render() {
    const all_tasks = this.state.tasks.map((task, idx) => {
      return( 
        <TaskItem key={idx} task={task} projectId={this.props.project.id}/>
      )
    })
    return (
      <div>
        <h1>{this.props.project.name}</h1>
        <ul className="tasks">

          {all_tasks}
          
          <form onSubmit={this.handleSubmit}>
          
          <label>Name:
            <input 
              type="text" 
              placeholder="Enter task name"
              value={this.state.name}
              onChange={this.updateField('name')}
            />
          </label>

          <input 
            type="submit"
            value="Add Task"
          />

          </form>
        </ul>
      </div>
    )
  }
}