import EditTodoForm from "./EditTodoForm.js";

class EditTodoButton extends React.Component {
  render() {
    return React.createElement(
      "a",
      {
        class: "btn btn-primary",
        onClick: () =>
          this.props.showModal(
            {
              modalId: "edit-todo-modal",
              modalTitle: "Edit to-do",
              onOkHandler: (e) =>
                document.getElementById("edit-todo-form").requestSubmit(),
            },
            React.createElement(
              EditTodoForm,
              {
                modalId: "edit-todo-modal",
                formId: `edit-todo-form`,
                todoId: this.props.id,
                todoTitle: this.props.title,
                todoContents: this.props.contents,
                hideModal: this.props.hideModal,
                editTodo: this.props.editTodo,
              },
              null
            )
          ),
      },
      "Edit"
    );
  }
}

export default EditTodoButton;
