import Modal from "./Modal.js";

class DeleteTodoButton extends React.Component {
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

export default DeleteTodoButton;
