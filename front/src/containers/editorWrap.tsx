import React from 'react';
import { IEditorProps, Editor } from '../components/modelDataEditor/editor';


const EditorWrap = function (props: IEditorProps): any {
  const {
    view, cells, onCellsLoad, onSave,
  } = props;

  if (!view) {
    return <>loading...</>;
  }

  return (
    <>
      <Editor view={view} cells={cells} onCellsLoad={onCellsLoad} onSave={onSave} />
    </>
  );
};

export default EditorWrap;
