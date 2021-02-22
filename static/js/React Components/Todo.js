import DeleteTodoButton from "./DeleteTodoButton.js";
import EditTodoButton from "./EditTodoButton.js";

class Todo extends React.Component {
  render() {
    return React.createElement(
      "div",
      { class: "card mx-0 my-30" },
      React.createElement("h2", { class: "card-title" }, this.props.title),
      this.props.contents
        ? React.createElement("p", null, this.props.contents)
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
          editTodo: this.props.editTodo,
        },
        null
      ),
      React.createElement(
        DeleteTodoButton,
        {
          id: this.props.id,
          deleteTodo: this.props.deleteTodo,
        },
        null
      )
    );
  }
}

export default Todo;
