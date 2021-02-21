import { Todo } from "./appComponents.js";

export class TodoListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  async deleteTodo(todoId) {
    let formData = new FormData();
    formData.append("todoId", todoId);
    let response = await fetch("/api/todos", {
      method: "DELETE",
      credentials: "same-origin",
      body: formData,
    });
    let json = await response.json();
    halfmoon.toggleModal("delete-todo-modal");

    if (json.status == "Success") {
      this.setState({
        todos: this.state.todos.filter((todo) => todo.props.id != todoId),
      });
      halfmoon.initStickyAlert({
        title: "To-do deleted",
        content: "To-do deleted successfully.",
        alertType: "alert-success",
        timeShown: 5000,
      });
    } else {
      halfmoon.initStickyAlert({
        title: "Error while deleting to-do",
        content: "There was an error while deleting the to-do.",
        alertType: "alert-danger",
        timeShown: 5000,
      });
    }
  }

  async fetchTodos() {
    let response = await fetch("/api/todos", {
      method: "GET",
      credentials: "same-origin",
    });
    let json = await response.json();
    return json.map((todo) =>
      React.createElement(
        Todo,
        {
          id: todo.id,
          title: todo.title,
          contents: todo.contents,
          deleteTodo: this.deleteTodo,
          showConfirmationModal: this.props.showConfirmationModal,
          updateView: this.props.updateView,
        },
        null
      )
    );
  }

  async componentDidMount() {
    this.setState({ todos: await this.fetchTodos() });
  }

  render() {
    return this.state.todos.length != 0
      ? this.state.todos
      : React.createElement(
        "p",
        { class: "text-muted text-center font-italic" },
        "No To-dos yet"
      );
  }
}

export class CreateTodoView extends React.Component {
  render() {
    return React.createElement("p", null, "Create");
  }
}

export class EditTodoView extends React.Component {
  render() {
    return React.createElement("p", null, "Edit");
  }
}
