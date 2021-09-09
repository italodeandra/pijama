import { useEffect } from "react";

export const useOnPasteFiles = (
  allowedFileTypes: string[],
  onAcceptFiles: (files: File[]) => void
) => {
  useEffect(() => {
    document.onpaste = function (event) {
      const items = (
        event.clipboardData || (event as any).originalEvent.clipboardData
      ).items;
      for (const index in items) {
        const item = items[index];
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (allowedFileTypes.includes(file.type)) {
            onAcceptFiles([file]);
          }
        }
      }
    };

    return () => {
      document.onpaste = null;
    };
  }, [allowedFileTypes, onAcceptFiles]);
};
