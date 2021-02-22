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
      React.createElement("i", { class: "fas fa-plus mr-5" }, null),
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
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleModalCancel = this.handleModalCancel.bind(this);
  }

  handleClick() {
    this.setState({ showModal: true });
  }

  handleModalCancel() {
    this.setState({ showModal: false });
  }

  render() {
    return [
      React.createElement(
        "a",
        {
          class: "ml-10 btn btn-danger",
          onClick: this.handleClick,
        },
        "Delete"
      ),
      React.createElement(
        Modal,
        {
          modalId: "delete-todo-modal",
          modalTitle: "Delete todo?",
          onCancelHandler: this.handleModalCancel,
          onOkHandler: (e) => this.props.deleteTodo(this.props.id),
          show: this.state.showModal,
        },
        React.createElement(
          "p",
          null,
          "Are you sure you want to delete this to-do?"
        )
      ),
    ];
  }
}

export class Modal extends React.Component {
  render() {
    return ReactDOM.createPortal(
      React.createElement(
        "div",
        {
          class: `modal${this.props.show ? " show" : ""}`,
          id: this.props.modalId,
          role: "dialog",
        },
        React.createElement(
          "div",
          { class: "modal-dialog", role: "document" },
          React.createElement(
            "div",
            { class: "modal-content" },
            React.createElement(
              "a",
              { class: "close", role: "button", "data-dismiss": "modal" },
              "×"
            ),
            React.createElement(
              "h5",
              { class: "modal-title" },
              this.props.modalTitle
            ),
            this.props.children,
            React.createElement(
              "div",
              { class: "text-right mt-20" },
              React.createElement(
                "a",
                {
                  class: "btn mr-5",
                  role: "button",
                  "data-dismiss": "modal",
                  onClick: this.props.onCancelHandler,
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
      ),
      document.getElementById("modal-root")
    );
  }
}
