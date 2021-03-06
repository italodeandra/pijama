import { Box, Grid } from "@material-ui/core";
import { ObjectId } from "bson";
import { useCallback, VFC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDeepCompareEffect, useList } from "react-use";
import DragAndDropFiles from "./DragAndDropFiles";
import Image from "./Image";
import { useOnPasteFiles } from "./useOnPasteFiles";
import { FormLabel } from "../TextField";

export interface IImage {
  _id: ObjectId;
  url: string;
  alt: string;
}

export interface ImageUploadProps {
  labelInput: string;
  value: IImage[];
  onChange: (value: IImage[]) => void;
  allowedFileTypes?: string[];
  labelDropFilesBrowseImport?: string;
  labelBrowse?: string;
  labelMyDevice?: string;
  labelDropFilesHere?: string;
  labelEdit?: string;
  labelDelete?: string;
  labelAltText?: string;
  labelClose?: string;
  labelEditDialogContent?: string;
  labelFieldIsRequired?: string;
}

const ImageUpload: VFC<ImageUploadProps> = ({
  labelInput,
  value = [],
  onChange,
  allowedFileTypes = ["image/png", "image/jpeg"],
  labelDropFilesBrowseImport = "Drop images here, paste, {browse} or import from",
  labelBrowse = "browse",
  labelMyDevice = "My device",
  labelDropFilesHere = "Drop your files here",
  labelEdit = "Edit alt text",
  labelDelete = "Delete",
  labelAltText = "Alt text",
  labelClose = "Close",
  labelEditDialogContent = "This text will be used as an alternative for the image",
  labelFieldIsRequired = "This field is required",
}) => {
  const [acceptedImages, { push, remove, set, updateAt }] =
    useList<IImage>(value);

  useDeepCompareEffect(() => set(value), [set, value]);
  useDeepCompareEffect(() => onChange(acceptedImages), [acceptedImages]);

  const handleAcceptedImages = useCallback(
    (files: File[]) => {
      for (let file of files) {
        push({
          _id: new ObjectId(),
          url: URL.createObjectURL(file),
          alt: file.name,
        });
      }
    },
    [push]
  );

  useOnPasteFiles(allowedFileTypes, handleAcceptedImages);

  const handleRemoveImage = (index: number) => {
    remove(index);
  };
  const handleChangeImage = (index: number, newImage: IImage) => {
    updateAt(index, newImage);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <FormLabel>{labelInput}</FormLabel>
      <Box sx={{ mt: 0.25 }}>
        <Grid container spacing={1}>
          {acceptedImages.map((image, index) => (
            <Grid key={image._id.toHexString()} item xs={12} sm={"auto"}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                image={image}
                onChange={(newImage) => handleChangeImage(index, newImage)}
                onDelete={() => handleRemoveImage(index)}
                labelEdit={labelEdit}
                labelDelete={labelDelete}
                labelAltText={labelAltText}
                labelClose={labelClose}
                labelEditDialogContent={labelEditDialogContent}
                labelFieldIsRequired={labelFieldIsRequired}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={"auto"}>
            <DragAndDropFiles
              allowedFileTypes={allowedFileTypes}
              onAcceptFiles={handleAcceptedImages}
              labelMyDevice={labelMyDevice}
              labelDropFilesBrowseImport={labelDropFilesBrowseImport}
              labelBrowse={labelBrowse}
              labelDropFilesHere={labelDropFilesHere}
            />
          </Grid>
        </Grid>
      </Box>
    </DndProvider>
  );
};

export default ImageUpload;
