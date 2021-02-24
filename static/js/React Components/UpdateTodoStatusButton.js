class UpdateTodoStatusButton extends React.Component {
  render() {
    return React.createElement(
      "a",
      {
        class: "btn btn-success",
        onClick: () =>
          this.props.updateTodoStatus(this.props.id, !this.props.completed),
      },
      `Mark ${this.props.completed ? "Incomplete" : "Complete"}`
    );
  }
}

export default UpdateTodoStatusButton;
