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

class MyAwesomePanel extends Autodesk.Viewing.UI.DockingPanel {
  constructor(viewer, id, title, options) {
    super(viewer.container, id, title, options);

    options = options || {};
    if (!options.heightAdjustment) {options.heightAdjustment = 45;}

    if (!options.marginTop) {options.marginTop = 0;}

    this.options = options;

    this.createScrollContainer(options);

    this.setUp();
  }

  setUp() {
    // this is where we should place the content of our panel
    const div = document.createElement('div');

    let content = '';
    for (let i = 0; i < 20; i++) {
      content += 'My content here <br/>';
    }

    div.innerHTML = content;
    this.scrollContainer.appendChild(div);

    // resize panel to fit text content
    this.resizeToContent();
  }
}
