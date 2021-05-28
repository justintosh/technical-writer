'use babel';

import TechnicalWriter from '../lib/technical-writer';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('TechnicalWriter', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('technical-writer');
  });

  describe('when the technical-writer:addConditionalTag event is triggered', () => {
    it('adds conditional tag to the selected text', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.technical-writer')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'technical-writer:addConditionalTag');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.technical-writer')).toExist();

        let technicalWriterElement = workspaceElement.querySelector('.technical-writer');
        expect(technicalWriterElement).toExist();

        let technicalWriterPanel = atom.workspace.panelForItem(technicalWriterElement);
        expect(technicalWriterPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'technical-writer:addConditionalTag');
        expect(technicalWriterPanel.isVisible()).toBe(false);
      });
    });

    it('adds conditional tag to the selected text', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.technical-writer')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'technical-writer:addConditionalTag');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let technicalWriterElement = workspaceElement.querySelector('.technical-writer');
        expect(technicalWriterElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'technical-writer:addConditionalTag');
        expect(technicalWriterElement).not.toBeVisible();
      });
    });
  });
});
