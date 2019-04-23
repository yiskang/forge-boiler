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

class MyExtension extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
  }

  load() {
    this.viewer.setEnvMapBackground(false);
    this.viewer.setBackgroundColor(255, 0, 0, 255, 255, 255);
    return true;
  }

  unload() {
    this.viewer.setBackgroundColor(216, 230, 248, 230, 228, 220);
    return true;
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension('DemoExtension', MyExtension);