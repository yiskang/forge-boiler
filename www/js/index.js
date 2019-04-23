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

(() => {
  // Put your code here

  function fetchForgeToken(callback) {
    fetch('https://forge-token-srv.herokuapp.com/api/forge/oauth/token', {
      method: 'get',
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return Promise.reject(
          new Error(`Failed to fetch token from server (status: ${response.status}, message: ${response.statusText})`),
        );
      })
      .then((data) => {
        if (!data) return Promise.reject(new Error('Empty token response'));

        callback(data.access_token, data.expires_in);
      })
      .catch(error => console.error(error));
  }

  function onLoadModelSuccess(model) {
    console.log('onLoadModelSuccess()!');
    console.log(model);
  }

  function onLoadModelError(viewerErrorCode) {
    console.error(`onLoadModelError() - errorCode:${viewerErrorCode}`);
  }

  function onDocumentLoadSuccess(doc) {
    const rootItem = doc.getRoot();
    const filter = { type: 'geometry', role: '3d' };
    const viewables = rootItem.search(filter);

    if (viewables.length === 0) {
      console.error('Document contains no viewables.');
      return;
    }

    const config3d = {
      extensions: ['Autodesk.ADN.Extension.Toolbar'],
    };


    // 初始化 Viewer 物件
    const viewerDiv = document.getElementById('viewer');
    const viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv, config3d);

    // 載入 Viewer 物件
    const initialViewable = viewables[0];
    viewer.startWithDocumentNode(doc, initialViewable)
      .then(onLoadModelSuccess)
      .catch(onLoadModelError);
  }

  function onDocumentLoadFailure(viewerErrorCode) {
    console.error(`onDocumentLoadFailure() - errorCode:${viewerErrorCode}`);
  }

  const documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bGt3ZWo3eHBiZ3A2M3g0aGwzMzV5Nm0yNm9ha2dnb2YyMDE3MDUyOHQwMjQ3MzIzODZ6L3JhY19iYXNpY19zYW1wbGVfcHJvamVjdC5ydnQ';

  const initializerOptions = {
    env: 'AutodeskProduction',
    getAccessToken: fetchForgeToken,
  };

  Autodesk.Viewing.Initializer(initializerOptions, () => {
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  });
})();
