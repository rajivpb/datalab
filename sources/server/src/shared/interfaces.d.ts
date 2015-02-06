/*
 * Copyright 2014 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */


// Explicitly permit o['property'] references on all objects by defining
// an explicit indexer on Object. For details,
// see: https://typescript.codeplex.com/discussions/535628
interface Object {
  [index: string]: any;
}

declare module app {

  interface Map<T> {
    [index: string]: T;
  }

  /**
   * Typedefs for the in-memory notebook model
   */
  module notebook {

    interface Notebook {
      name: string; // the name of the notebook
      id: string; // the notebook id
      worksheetIds: string[];
      worksheets: app.Map<Worksheet>; // worksheetId -> Worksheet
      metadata: any;
    }

    interface Worksheet {
      id: string; // the worksheet id
      label: string; // worksheet display label
      metadata: any;
      cells: Cell[];
    }

    interface Cell {
      id: string; // the cell id
      type: string; // 'code' | 'markdown' | 'heading' | 'etc'

      /**
       * Some metadata fields reserved for internal usage
       * {
       *   // if cell type is code
       *   language: 'python' | 'java' | 'html' | 'javascript' | etc.
       *   executionCounter: '<prompt text / number>'
       *   // if cell type is heading
       *   level: 1 | 2 | 3 | 4 | 5 | 6
       *   // other metadata needed for new/plugin-defined cell types go here
       * }
      */
      metadata?: any;

      source?: string; // source content (e.g., code, markdown text, etc.)
      outputs?: CellOutput[];

      // Note: The following fields are user-scoped; these should be handled on a per-user basis
      // under any future multi-writer implementation.
      active?: boolean;
    }


    interface CellOutput {
      type: string; // 'result' | 'error' | 'stdout' | 'stderr'

      /**
       * Each output has a mimetype bundle {<mimetype string>: <content string>}
       * {
       *   'text/html':  <content for mimetype text/html>,
       *   'text/plain':  <content for mimetype text/plain>,
       *   // any other mimetypes here for the output go here too
       * }
       */
      mimetypeBundle: Map<string>;
    }

  }
}
