//
// Copyright (c) Autodesk, Inc. All rights reserved
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
//
// Forge Boiler
// by Eason Kang - Autodesk Developer Network (ADN)
//

class MyToolbarExt extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);

    this.subtoolbar = null;
  }

  onToolbarCreatedBinded(event) {
    this.viewer.removeEventListener(
      Autodesk.Viewing.TOOLBAR_CREATED_EVENT,
      this.onToolbarCreatedBinded,
    );

    this.onToolbarCreatedBinded = null;
    this.createUI();
  }

  createUI() {
    this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('MyAwesomeAppToolbar');

    const toolbar = this.viewer.getToolbar();
    toolbar.addControl(this.subToolbar);

    const button = new Autodesk.Viewing.UI.Button('MyAwesomeButton');
    this.subToolbar.addControl(button);

    button.addClass('myAwesomeToolbarButton');
    button.icon.classList.add('glyphicon');
    button.setIcon('glyphicon-book');
    button.setToolTip('My Awesome button');

    button.onClick = (event) => {
      const btnState = button.getState();
      if (btnState === Autodesk.Viewing.UI.Button.State.INACTIVE) {
        button.setState(Autodesk.Viewing.UI.Button.State.ACTIVE);
        alert('MyAwesomeButton active');
      } else if (btnState === Autodesk.Viewing.UI.Button.State.ACTIVE) {
        button.setState(Autodesk.Viewing.UI.Button.State.INACTIVE);
        alert('MyAwesomeButton inactive');
      }
    };
  }

  load() {
    if (this.viewer.getToolbar()) {
      // Toolbar 已產生時，直接建立我們的 sub toolbar
      this.createUI();
    } else {
      // 註冊事件等待 Viewer 通知 Toolbar 已產生
      this.onToolbarCreatedBinded = this.onToolbarCreated.bind(this);
      this.viewer.addEventListener(
        Autodesk.Viewing.TOOLBAR_CREATED_EVENT,
        this.onToolbarCreatedBinded,
      );
    }

    return true;
  }

  unload() {
    this.viewer.toolbar.removeControl(this.subToolbar);

    return true;
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
  'Autodesk.ADN.Extension.Toolbar',
  MyToolbarExt,
);
