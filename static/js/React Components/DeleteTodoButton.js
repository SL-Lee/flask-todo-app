class DeleteTodoButton extends React.Component {
  render() {
    return React.createElement(
      "a",
      {
        class: "ml-10 btn btn-danger",
        onClick: () =>
          this.props.showModal(
            {
              modalId: "delete-todo-modal",
              modalTitle: "Delete to-do?",
              onOkHandler: (e) => {
                this.props.deleteTodo(this.props.id);
                this.props.hideModal("delete-todo-modal");
              },
            },
            React.createElement(
              "p",
              null,
              "Are you sure you want to delete this to-do?"
            )
          ),
      },
      "Delete"
    );
  }
}

export default DeleteTodoButton;
