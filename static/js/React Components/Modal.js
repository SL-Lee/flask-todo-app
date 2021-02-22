class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { observer: null };
  }

  componentDidMount() {
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type == "attributes" &&
          mutation.oldValue == "modal show"
        ) {
          this.props.onCancelHandler();
        }
      });
    });
    observer.observe(document.getElementById(this.props.modalId), {
      attributes: true,
      attributeFilter: ["class"],
      attributeOldValue: true,
    });
    this.setState({ observer: observer });
  }

  componentWillUnmount() {
    this.state.observer.disconnect();
    this.setState({ observer: null });
  }

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
