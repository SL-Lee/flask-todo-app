import { CreateTodoButton } from "./appComponents.js";
import { CreateTodoView, EditTodoView, TodoListView } from "./appViews.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeView: "TodoListView" };
    this.updateView = this.updateView.bind(this);
  }

  updateView(newView) {
    this.setState({ activeView: newView });
  }

  render() {
    let elements = [
      React.createElement("h1", null, "My To-dos"),
      React.createElement(
        CreateTodoButton,
        { updateView: this.updateView },
        null
      ),
    ];

    if (this.state.activeView == "TodoListView") {
      elements.push(
        React.createElement(TodoListView, { updateView: this.updateView }, null)
      );
    } else if (this.state.activeView == "CreateTodoView") {
      elements.push(
        React.createElement(
          CreateTodoView,
          { updateView: this.updateView },
          null
        )
      );
    } else if (this.state.activeView == "EditTodoView") {
      elements.push(
        React.createElement(EditTodoView, { updateView: this.updateView }, null)
      );
    }

    return elements;
  }
}

ReactDOM.render(
  React.createElement(App, null, null),
  document.getElementById("app-root")
);
