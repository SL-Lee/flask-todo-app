import CreateTodoForm from "./CreateTodoForm.js";
import Modal from "./Modal.js";

class CreateTodoButton extends React.Component {
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

export default CreateTodoButton;
