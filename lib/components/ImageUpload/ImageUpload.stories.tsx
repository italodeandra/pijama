import {
  default as ImageUploadComponent,
  ImageUploadProps,
} from "./ImageUpload";
import type { Meta, Story } from "@storybook/react";

// noinspection JSUnusedGlobalSymbols
export default {
  component: ImageUploadComponent,
  title: "Components/ImageUpload",
} as Meta;

const Template: Story<ImageUploadProps> = (args) => (
  <ImageUploadComponent {...args} />
);

export const ImageUpload = Template.bind({});
ImageUpload.storyName = "ImageUpload";
ImageUpload.args = {
  labelInput: "Images",
  onChange: console.info,
  value: [],
  labelMyDevice: "Meu dispositivo",
  labelEdit: "Alterar descrição",
  labelDelete: "Remover imagem",
  labelAltText: "Descrição",
  labelClose: "Fechar",
  labelEditDialogContent:
    "A descrição será utilizada como alternativa para a imagem.",
  labelDropFilesBrowseImport:
    "Solte imagens aqui, cole, {browse} ou importe de",
  labelBrowse: "navegue",
  labelDropFilesHere: "Solte seus arquivos aqui",
  labelFieldIsRequired: "Esse campo é obrigatório",
};
