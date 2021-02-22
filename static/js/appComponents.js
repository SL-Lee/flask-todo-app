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
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleClick = this.handleClick.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  handleClick(e) {
    this.setState({ showModal: true });
  }

  hideModal(e) {
    this.setState({ showModal: false });
  }

  render() {
    return [
      React.createElement(
        "a",
        {
          class: "btn btn-primary",
          onClick: this.handleClick,
        },
        React.createElement("i", { class: "fas fa-plus mr-5" }, null),
        "Create"
      ),
      React.createElement(
        Modal,
        {
          show: this.state.showModal,
          modalId: "create-todo-modal",
          modalTitle: "Create new to-do",
          onCancelHandler: this.hideModal,
          onOkHandler: (e) =>
            document.getElementById("create-todo-form").requestSubmit(),
        },
        React.createElement(
          CreateTodoForm,
          {
            formId: "create-todo-form",
            hideModal: this.hideModal,
            createTodo: this.props.createTodo,
          },
          null
        )
      ),
    ];
  }
}

export class CreateTodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { titleInput: "", contentsInput: "" };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentsChange = this.handleContentsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createTodo(
      this.props.formId,
      this.state.titleInput,
      this.state.contentsInput
    );
    this.props.hideModal();
  }

  handleTitleChange(e) {
    this.setState({ titleInput: e.target.value });
  }

  handleContentsChange(e) {
    this.setState({ contentsInput: e.target.value });
  }

  render() {
    return React.createElement(
      "form",
      { onSubmit: this.handleSubmit, id: this.props.formId },
      React.createElement(
        TodoTitleInput,
        {
          value: this.state.titleInput,
          handleTitleChange: this.handleTitleChange,
        },
        null
      ),
      React.createElement(
        TodoContentsInput,
        {
          value: this.state.contentsInput,
          handleContentsChange: this.handleContentsChange,
        },
        null
      ),
      React.createElement(
        "input",
        { type: "submit", style: { display: "none" } },
        null
      )
    );
  }
}

export class TodoTitleInput extends React.Component {
  render() {
    return React.createElement(
      "div",
      { class: "form-group" },
      React.createElement("label", { for: "todo-title-input" }, "To-do Title"),
      React.createElement(
        "input",
        {
          id: "todo-title-input",
          class: "form-control",
          type: "text",
          name: "todoTitle",
          value: this.props.value,
          placeholder: "To-do Title",
          required: "required",
          onChange: this.props.handleTitleChange,
        },
        null
      )
    );
  }
}

export class TodoContentsInput extends React.Component {
  render() {
    return React.createElement(
      "div",
      { class: "form-group" },
      React.createElement(
        "label",
        { for: "todo-title-input" },
        "To-do Contents"
      ),
      React.createElement(
        "textarea",
        {
          id: "todo-contents-input",
          class: "form-control",
          style: { resize: "none" },
          name: "todoContents",
          value: this.props.value,
          placeholder: "To-do Contents",
          onChange: this.props.handleContentsChange,
        },
        null
      )
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

  handleClick(e) {
    this.setState({ showModal: true });
  }

  handleModalCancel(e) {
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
          show: this.state.showModal,
          modalId: "delete-todo-modal",
          modalTitle: "Delete to-do?",
          onCancelHandler: this.handleModalCancel,
          onOkHandler: (e) => this.props.deleteTodo(this.props.id),
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
