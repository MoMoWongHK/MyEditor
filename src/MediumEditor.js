import React from "react";
import MyEditor from "./MyEditor"

class MediumEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  handleChange(text, medium) {
    this.setState({ text: text });
  }

  render() {
    return (
      <div className="app">
        <h1>react-medium-editor</h1>
        <h3>Html content</h3>
        <div>{this.state.text}</div>
        <h3>Editor #2</h3>
        <MyEditor
          id="myEditor"
          text={this.state.text}

          onChange={(text, medium) => this.handleChange(text, medium)}
        />
        <div class="medium-editor-toolbar medium-editor-stalker-toolbar">
          <ul class="medium-editor-toolbar-actions">
            <li>
              <button
                class="medium-editor-action medium-editor-action-bold medium-editor-button-first"
                data-action="bold"
                title="bold"
                aria-label="bold"
              >
                B
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default MediumEditor;
