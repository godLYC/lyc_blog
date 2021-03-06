/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */

import { Fun } from '@ephox/katamari';
import { Element, SelectorFind } from '@ephox/sugar';
import EditorManager from 'tinymce/core/api/EditorManager';
import Env from 'tinymce/core/api/Env';
import Control from './Control';
import Align from './editorui/Align';
import FontSelect from './editorui/FontSelect';
import FontSizeSelect from './editorui/FontSizeSelect';
import Formats from './editorui/Formats';
import FormatSelect from './editorui/FormatSelect';
import InsertButton from './editorui/InsertButton';
import SimpleControls from './editorui/SimpleControls';
import UndoRedo from './editorui/UndoRedo';
import VisualAid from './editorui/VisualAid';
import FloatPanel from './FloatPanel';
import Widget from './Widget';
import { document } from '@ephox/dom-globals';

const setupEnvironment = function () {
  Widget.tooltips = !Env.iOS;

  Control.translate = function (text) {
    return EditorManager.translate(text);
  };
};

const setupUiContainer = function (editor) {
  if (editor.settings.ui_container) {
    Env.container = SelectorFind.descendant(Element.fromDom(document.body), editor.settings.ui_container).fold(Fun.constant(null), function (elm) {
      return elm.dom();
    });
  }
};

const setupRtlMode = function (editor) {
  if (editor.rtl) {
    Control.rtl = true;
  }
};

const setupHideFloatPanels = function (editor) {
  editor.on('mousedown progressstate', function () {
    FloatPanel.hideAll();
  });
};

const setup = function (editor) {
  setupRtlMode(editor);
  setupHideFloatPanels(editor);
  setupUiContainer(editor);
  setupEnvironment();

  FormatSelect.register(editor);
  Align.register(editor);
  SimpleControls.register(editor);
  UndoRedo.register(editor);
  FontSizeSelect.register(editor);
  FontSelect.register(editor);
  Formats.register(editor);
  VisualAid.register(editor);
  InsertButton.register(editor);
};

export default {
  setup
};