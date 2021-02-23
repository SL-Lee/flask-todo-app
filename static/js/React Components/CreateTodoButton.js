import CreateTodoForm from "./CreateTodoForm.js";

class CreateTodoButton extends React.Component {
  render() {
    return React.createElement(
      "a",
      {
        class: "btn btn-primary",
        onClick: () =>
          this.props.showModal(
            {
              modalId: "create-todo-modal",
              modalTitle: "Create new to-do",
              onOkHandler: (e) =>
                document.getElementById("create-todo-form").requestSubmit(),
            },
            React.createElement(
              CreateTodoForm,
              {
                modalId: "create-todo-modal",
                formId: "create-todo-form",
                hideModal: this.props.hideModal,
                createTodo: this.props.createTodo,
              },
              null
            )
          ),
      },
      React.createElement("i", { class: "fas fa-plus mr-5" }, null),
      "Create"
    );
  }
}

export default CreateTodoButton;
