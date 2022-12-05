import React from "react";

import { Editor as ToastEditor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "./index.css";

export default function Editor(props: any) {
  return (
    <ToastEditor
      toolbarItems={[
        ["bold", "italic"],
        ["ul", "ol"],
      ]}
      previewStyle="vertical"
      height="300px"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      {...props}
    />
  );
}
