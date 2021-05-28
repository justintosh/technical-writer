'use babel';

import { CompositeDisposable } from 'atom';

export default {

  modalPanel: null,
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that run addConditionalTag in this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'technical-writer:addConditionalTag': () => this.addConditionalTag(),
      'technical-writer:convertTextToLink': () => this.convertTextToLink(),
      'technical-writer:duplicateLine': () => this.duplicateLine(),
      'technical-writer:addPageBreak': () => this.addPageBreak(),
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
  },

  serialize() {
    return {
    };
  },

  addConditionalTag() {
    const editor = atom.workspace.getActiveTextEditor();
    const selection = editor.getLastSelection();
    var text = selection.getText();

    editor.insertText('{~~}' + text + '{~/~}');

    var currentPosition = editor.getCursorBufferPositions()
    var row = currentPosition[0]['row'];
    var column = currentPosition[0]['column'];

    editor.setCursorBufferPosition([row, column - text.length - 7])
    editor.addCursorAtBufferPosition([row, column - 2])
  },

  convertTextToLink() {
    const editor = atom.workspace.getActiveTextEditor();
    const selection = editor.getLastSelection();
    var text = selection.getText();
    var linkText = '#' + text.replace(/ /g, '_').replace(/\//g, '-').toLowerCase();

    editor.insertText('[' + text + '](' + linkText + ')');
  },

  duplicateLine() {
    const editor = atom.workspace.getActiveTextEditor();
    var currentPosition = editor.getCursorBufferPositions()
    var row = currentPosition[0]['row'];
    var text = editor.lineTextForBufferRow(row);

    editor.setCursorBufferPosition([row + 1, 0]);
    editor.insertText(text);
    editor.insertNewline();
    editor.setCursorBufferPosition([row + 1, 0]);
  },

  addPageBreak() {
    const editor = atom.workspace.getActiveTextEditor();
    editor.insertText(' {.break-before}');
  }

};
