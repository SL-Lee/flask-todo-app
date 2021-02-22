import EditTodoForm from "./EditTodoForm.js";
import Modal from "./Modal.js";

class EditTodoButton extends React.Component {
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
        "Edit"
      ),
      React.createElement(
        Modal,
        {
          show: this.state.showModal,
          modalId: `edit-todo-${this.props.id}-modal`,
          modalTitle: "Edit to-do",
          onCancelHandler: this.hideModal,
          onOkHandler: (e) =>
            document
              .getElementById(`edit-todo-${this.props.id}-form`)
              .requestSubmit(),
        },
        React.createElement(
          EditTodoForm,
          {
            formId: `edit-todo-${this.props.id}-form`,
            todoId: this.props.id,
            todoTitle: this.props.title,
            todoContents: this.props.contents,
            hideModal: this.hideModal,
            editTodo: this.props.editTodo,
          },
          null
        )
      ),
    ];
  }
}

export default EditTodoButton;
