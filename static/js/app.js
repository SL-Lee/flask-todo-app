class Todo extends React.Component {
  render() {
    return React.createElement(
      "div",
      { class: "card" },
      React.createElement("h2", { class: "card-title" }, this.props.title),
      this.props.contents
        ? React.createElement("p", null, this.props.contents)
        : React.createElement(
          "p",
          { class: "text-muted font-italic" },
          "Content not provided"
        )
    );
  }
}

fetch("/api/todos", { method: "GET", credentials: "same-origin" })
  .then((response) => {
    return response.ok
      ? response.json()
      : Promise.reject("Error while retrieving todos");
  })
  .then((json) => {
    ReactDOM.render(
      json.map((todo) =>
        React.createElement(
          Todo,
          { title: todo.title, contents: todo.contents },
          null
        )
      ),
      document.getElementById("app-root")
    );
  });
