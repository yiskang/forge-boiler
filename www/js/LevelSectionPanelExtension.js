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

class LevelSectionPanelExtension extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);

    this.panel = null;
    this.createUI = this.createUI.bind(this);
    this.onToolbarCreated = this.onToolbarCreated.bind(this);
  }

  onToolbarCreated() {
    this.viewer.removeEventListener(
      Autodesk.Viewing.TOOLBAR_CREATED_EVENT,
      this.onToolbarCreated,
    );

    this.createUI();
  }

  createUI() {
    const viewer = this.viewer;

    const lvlSectionPanel = new LevelSectionPanel(viewer, 'Level Section');

    viewer.addPanel(lvlSectionPanel);
    this.panel = lvlSectionPanel;

    const lvlSectionButton = new Autodesk.Viewing.UI.Button('toolbar-adnLevelSectionsTool');
    lvlSectionButton.setToolTip('Level Sections');
    lvlSectionButton.setIcon('adsk-icon-plane-y');
    lvlSectionButton.onClick =  () => {
      lvlSectionPanel.setVisible(!lvlSectionPanel.isVisible());
    };

    const subToolbar = new Autodesk.Viewing.UI.ControlGroup('toolbar-adn-tools');
    subToolbar.addControl(lvlSectionButton);
    this.subToolbar = subToolbar;

    viewer.toolbar.addControl(this.subToolbar);

    lvlSectionPanel.addVisibilityListener((visible) => {
      if (visible)
        viewer.onPanelVisible( lvlSectionPanel, viewer );

      lvlSectionButton.setState(visible ? Autodesk.Viewing.UI.Button.State.ACTIVE : Autodesk.Viewing.UI.Button.State.INACTIVE);
    });
  }

  load() {
    if (this.viewer.toolbar) {
      // Toolbar is already available, create the UI
      this.createUI();
    } else {
      // Toolbar hasn't been created yet, wait until we get notification of its creation
      this.viewer.addEventListener(
        Autodesk.Viewing.TOOLBAR_CREATED_EVENT,
        this.onToolbarCreated,
      );
    }

    return true;
  }

  unload() {
    if (this.panel) {
      this.panel.uninitialize();
      delete this.panel;
      this.panel = null;
    }

    if (this.subToolbar) {
      this.viewer.toolbar.removeControl(this.subToolbar);
      delete this.subToolbar;
      this.subToolbar = null;
    }

    return true;
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension('Autodesk.ADN.LevelSection', LevelSectionPanelExtension);
