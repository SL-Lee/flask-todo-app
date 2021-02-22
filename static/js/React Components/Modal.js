class Modal extends React.Component {
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

export default Modal;
