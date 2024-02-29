export type TFile = {
  id: number;
  url: string;
};

export type TFileUploadProps = {
  uploadedFiles?: TFile[];
  type: 'files' | 'images';
  onChange?: (files: File[]) => void;
  deleteFunc?: (itemId: string, photoId: number) => void;
  uploadFunc?: (itemId: string, photos: FormData) => void;
  itemId?: string;
  fieldName: string;
  isEditing?: boolean;
  label?: string;
  wrapperClassname?: string;
};
export type TSingleFileUploadProps = {
  onChange: (file: File | null) => void;
  label?: string;
  wrapperClassname?: string;
  isReset?: boolean;
  theme?: 'blue'
};

export type TFileItem = {
  fileUrl: string;
  file: File | null;
};