import CreateTodoButton from "./CreateTodoButton.js";
import Modal from "./Modal.js";
import Todo from "./Todo.js";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
    this.createTodo = this.createTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  showModal(props = null, children = null) {
    ReactDOM.unmountComponentAtNode(document.getElementById("modal-root"));
    ReactDOM.render(
      React.createElement(Modal, props, children),
      document.getElementById("modal-root"),
      () => setTimeout(halfmoon.toggleModal, 10, props.modalId)
    );
  }

  hideModal(modalId) {
    document.getElementById(modalId).classList.remove("show");
  }

  async createTodo(createTodoFormId) {
    let response = await fetch("/api/todos", {
      method: "POST",
      credentials: "same-origin",
      body: new FormData(document.getElementById(createTodoFormId)),
    });
    let json = await response.json();

    if (json.status == "Success") {
      this.setState({ todos: await this.fetchTodos() });
      halfmoon.initStickyAlert({
        title: "To-do created",
        content: "To-do created successfully.",
        alertType: "alert-success",
        timeShown: 5000,
      });
    } else {
      halfmoon.initStickyAlert({
        title: "Error while creating to-do",
        content: "There was an error while creating the to-do.",
        alertType: "alert-danger",
        timeShown: 5000,
      });
    }
  }

  async editTodo(editTodoFormId, todoId) {
    let formData = new FormData(document.getElementById(editTodoFormId));
    formData.append("todoId", todoId);
    let response = await fetch("/api/todos", {
      method: "PUT",
      credentials: "same-origin",
      body: formData,
    });
    let json = await response.json();

    if (json.status == "Success") {
      this.setState({ todos: await this.fetchTodos() });
      halfmoon.initStickyAlert({
        title: "To-do edited",
        content: "To-do edited successfully.",
        alertType: "alert-success",
        timeShown: 5000,
      });
    } else {
      halfmoon.initStickyAlert({
        title: "Error while editing to-do",
        content: "There was an error while editing the to-do.",
        alertType: "alert-danger",
        timeShown: 5000,
      });
    }
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

    if (json.status == "Success") {
      this.setState({ todos: await this.fetchTodos() });
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
          showModal: this.showModal,
          hideModal: this.hideModal,
          editTodo: this.editTodo,
          deleteTodo: this.deleteTodo,
        },
        null
      )
    );
  }

  async componentDidMount() {
    this.setState({ todos: await this.fetchTodos() });
  }

  render() {
    return [
      React.createElement(
        CreateTodoButton,
        {
          showModal: this.showModal,
          hideModal: this.hideModal,
          createTodo: this.createTodo,
        },
        null
      ),
      this.state.todos.length != 0
        ? this.state.todos
        : React.createElement(
          "p",
          { class: "text-muted text-center font-italic" },
          "No To-dos yet"
        ),
    ];
  }
}

export default TodoList;
