export class Todo extends React.Component {
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
        { updateView: this.props.updateView },
        null
      ),
      React.createElement(
        DeleteTodoButton,
        {
          id: this.props.id,
          deleteTodo: this.props.deleteTodo,
          showConfirmationModal: this.props.showConfirmationModal,
        },
        null
      )
    );
  }
}

export class CreateTodoButton extends React.Component {
  render() {
    return React.createElement(
      "a",
      {
        class: "btn btn-primary",
        onClick: (e) => this.props.updateView("CreateTodoView"),
      },
      React.createElement(
        "i",
        { class: "fas fa-plus mr-5" },
        null
      ),
      "Create"
    );
  }
}

export class EditTodoButton extends React.Component {
  render() {
    return React.createElement(
      "a",
      {
        class: "btn btn-primary",
        onClick: (e) => this.props.updateView("EditTodoView"),
      },
      "Edit"
    );
  }
}

export class DeleteTodoButton extends React.Component {
  render() {
    return React.createElement(
      "a",
      {
        class: "ml-10 btn btn-danger",
        onClick: (e) =>
          this.props.showConfirmationModal(
            "delete-todo-modal",
            "Delete todo?",
            "Are you sure you want to delete this to-do?",
            (e) => this.props.deleteTodo(this.props.id)
          ),
      },
      "Delete"
    );
  }
}

export class ConfirmationModal extends React.Component {
  render() {
    return React.createElement(
      "div",
      { class: "modal", id: this.props.modalId, role: "dialog" },
      React.createElement(
        "div",
        { class: "modal-dialog", role: "document" },
        React.createElement(
          "div",
          { class: "modal-content" },
          React.createElement(
            "a",
            { class: "close", role: "button", "data-dismiss": "modal" },
            React.createElement("span", null, "×")
          ),
          React.createElement(
            "h5",
            { class: "modal-title" },
            this.props.modalTitle
          ),
          React.createElement("p", null, this.props.modalBody),
          React.createElement(
            "div",
            { class: "text-right mt-20" },
            React.createElement(
              "a",
              {
                class: "btn mr-5",
                role: "button",
                "data-dismiss": "modal",
              },
              "Cancel"
            ),
            React.createElement(
              "a",
              {
                class: "btn btn-primary",
                role: "button",
                onClick: this.props.onOkHandler,
              },
              "OK"
            )
          )
        )
      )
    );
  }
}
