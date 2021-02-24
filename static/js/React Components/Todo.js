import DeleteTodoButton from "./DeleteTodoButton.js";
import EditTodoButton from "./EditTodoButton.js";

class Todo extends React.Component {
  render() {
    return React.createElement(
      "div",
      { class: "col-12 col-md-6 col-xl-4" },
      React.createElement(
        "div",
        { class: "card m-15" },
        React.createElement("h2", { class: "card-title" }, this.props.title),
        this.props.contents
          ? React.createElement(
            "p",
            { class: "text-truncate" },
            this.props.contents
          )
          : React.createElement(
            "p",
            { class: "text-muted font-italic" },
            "Content not provided"
          ),
        React.createElement(
          EditTodoButton,
          {
            id: this.props.id,
            title: this.props.title,
            contents: this.props.contents,
            showModal: this.props.showModal,
            hideModal: this.props.hideModal,
            editTodo: this.props.editTodo,
          },
          null
        ),
        React.createElement(
          DeleteTodoButton,
          {
            id: this.props.id,
            showModal: this.props.showModal,
            hideModal: this.props.hideModal,
            deleteTodo: this.props.deleteTodo,
          },
          null
        )
      )
    );
  }
}

export default Todo;
