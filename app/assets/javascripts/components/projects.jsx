class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      name: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    fetch('/api/projects')
      .then((response) => {
        return response.json()})
      .then((data) => {
        this.setState({ projects: data }) });
  }

  updateField(field) {
    return e => this.setState({
      [field]: e.currentTarget.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let body = JSON.stringify({project: {name: this.state.name} })
    fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => {
      return response.json()})
    .then((project)=>{
      return (
      this.setState({ projects: this.state.projects.concat(project), name: ''})
      )

    })
  }

  render() {
    const all_projects = this.state.projects.map((project, idx) => {
      return( 
          <li key={idx} className="project"> 
            <Tasks project={project}/>
          </li>
      )
    })
    return (
      <ul className="projects">
        {all_projects}
        
        <form onSubmit={this.handleSubmit}>
        
        <label class="project-label">Name:
          <input 
            type="text" 
            placeholder="Enter project name"
            value={this.state.name}
            onChange={this.updateField('name')}
          />
        </label>

        <input 
          type="submit"
          value="Add Project"
        />

        </form>
      </ul>
    )
  }
}