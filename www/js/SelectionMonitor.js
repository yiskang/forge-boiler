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

class SelectionMonitor extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
  }

  onSelectionChange(event) {
    const dbIds = event.dbIdArray;
    if (dbIds.length < 0) return;

    const color = new THREE.Vector4(255 / 255, 0, 0, 1);

    for (let i = 0; i < dbIds.length; ++i) {
      this.viewer.setThemingColor(dbIds[i], color);
    }
  }

  onBuildingContextMenuItem(menu, status) {
    if (!status.hasSelected) {
      menu.push({
        title: 'Clear overridden colors',
        target: () => {
          this.viewer.clearThemingColors();
        },
      });
    }
  }

  load() {
    this.onSelectionChange = this.onSelectionChange.bind(this);

    this.viewer.addEventListener(
      Autodesk.Viewing.SELECTION_CHANGED_EVENT,
      this.onSelectionChange,
    );

    this.onBuildingContextMenuItem = this.onBuildingContextMenuItem.bind(this);

    this.viewer.registerContextMenuCallback(
      'Autodesk.ADN.ColorMenu',
      this.onBuildingContextMenuItem,
    );


    return true;
  }

  unload() {
    this.viewer.removeEventListener(
      Autodesk.Viewing.SELECTION_CHANGED_EVENT,
      this.onSelectionChange,
    );

    this.viewer.unregisterContextMenuCallback('Autodesk.ADN.ColorMenu');

    return true;
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
  'Autodesk.ADN.Extension.Monitor.Selection',
  SelectionMonitor,
);
