import React from 'react';
import ReactDOM from 'react-dom';

if (typeof document !== 'undefined') {
  var MediumEditor = require('medium-editor');
}

export default class ReactMediumEditor extends React.Component {
  static defaultProps = {
    tag: 'div'
  };

  constructor(props) {
    super(props);

    this.state = {
      text: this.props.text
    };
  }

  componentDidMount() {
    const dom = ReactDOM.findDOMNode(this);

    this.medium = new MediumEditor(dom, {
      "toolbar": {
        /* These are the default options for the toolbar,
           if nothing is passed this is what is used */
        allowMultiParagraphSelection: true,
        buttons: ['bold', 'italic', 'underline', 'h2', 'h3', 'quote'],
        diffLeft: 0,
        diffTop: -10,
        firstButtonClass: 'medium-editor-button-first',
        lastButtonClass: 'medium-editor-button-last',
        relativeContainer: null,
        standardizeSelectionStart: false,
        static: false,
        /* options which only apply when static is true */
        align: 'center',
        sticky: false,
        updateOnEmptySelection: false
      }
    });
    this.medium.subscribe('editableInput', e => {
      console.log(e)
      this._updated = true;
      this.change(dom.innerHTML);
    });

    // this.medium.subscribe('editableDrag', e => {
    //   // this._updated = true;
    //   console.log(e)
    // });

    this.medium.subscribe('editableDrop', e => {
      this._updated = true;
      console.log(e)
    });



    this.medium.on(dom, "editableDrop", (type, listener, useCapture) => {
      console.log(type, listener, useCapture)
    }, true)
  }

  componentDidUpdate() {
    this.medium.restoreSelection();
  }

  componentWillUnmount() {
    this.medium.destroy();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.state.text && !this._updated) {
      this.setState({ text: nextProps.text });
    }

    if (this._updated) this._updated = false;
  }

  render() {
    const {
      options,
      text,
      tag,
      contentEditable,
      dangerouslySetInnerHTML,
      ...props
    } = this.props;
    props.dangerouslySetInnerHTML = { __html: this.state.text };

    if (this.medium) {
      this.medium.saveSelection();
    }

    return React.createElement(tag, props);
  }

  change(text) {
    if (this.props.onChange) this.props.onChange(text, this.medium);
  }
}