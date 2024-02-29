"use client"
import { FC, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import styles from './SingleFileUpload.module.scss';

import IcUpload from '@/assets/icons/upload.svg';


export type TFile = {
  id: number;
  url: string;
};

export type TFileUploadProps = {
  uploadedFiles?: TFile[];
  type: 'files' | 'images';
  onChange?: (files: string) => void;
  deleteFunc?: (itemId: string, photoId: number) => void;
  uploadFunc?: (itemId: string, photos: FormData) => void;
  itemId?: string;
  fieldName: string;
  isEditing?: boolean;
  label?: string;
  wrapperClassname?: string;
};
export type TSingleFileUploadProps = {
  onChange: (file: string) => void;
  label?: string;
  wrapperClassname?: string;
  isReset?: boolean;
  theme?: 'blue'
};

export type TFileItem = {
  fileUrl: string;
  file: File | null;
};
const SingleFileUpload: FC<TSingleFileUploadProps> = ({
                                                        onChange,
                                                        label,
                                                        wrapperClassname = '',
                                                        theme,
                                                        isReset,
                                                      }) => {
  const [file, setFile] = useState<TFileItem | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [base64file, setBase64File] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isReset) {
      setFile(null);
      if (fileInput.current !== null) fileInput.current.value = '';
    }
  }, [isReset]);

  const checkFileSize = (file: File) => {

    console.log(file)
    if (file.size > 5242880) {
      setErrorMessage(() => 'Файл слишком большой');
      return false;
    }

    setErrorMessage(() => '');
    return true;
  };
  const fileExtension = ' Поддерживаемые типы файлов: jpg, jpeg, png, pdf.';

  const checkFileExtension = (file: File) => {
    const fileExtensionRegExp = /.(jpg|jpeg|png|pdf)$/i;

    if (!file.name.match(fileExtensionRegExp)) {
      setErrorMessage(() => 'Неподходящее расширение файла!');
      return false;
    }

    setErrorMessage(() => '');
    return true;
  };
// @ts-ignore
  const getBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      // @ts-ignore
      setBase64File(reader.result)
      // @ts-ignore
      onChange(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    }
  }

  const onFileChange = async (e: any) => {
    if (e.target.files.length) {
      getBase64(e.target.files[0]);
      onChange(base64file)
      const newFile = {
        fileUrl: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0] as File,
      };

      checkFileSize(newFile.file);
      checkFileExtension(newFile.file);

      if (!errorMessage) {
        setFile(newFile);
      }
    }
  };

  const onDelete = () => {
    if (fileInput.current !== null) fileInput.current.value = '';

    setFile(null);
  };

  const containerClasses = clsx(styles.fileUpload, {
    [wrapperClassname]: !!wrapperClassname,
    [styles.error]: !!errorMessage,
    [styles.blue]: theme === 'blue'
  });

  return (
    <div className={containerClasses}>
      <label className={styles.uploadBtn}>
        <IcUpload />
        <span>
          {file !== null ? file.fileUrl.split('/')[file.fileUrl.split('/').length - 1].substring(0, 10) + '...' : label}
        </span>
        <input ref={fileInput} type='file' accept='.jpg,.jpeg,.png,.pdf' onChange={onFileChange} />
      </label>
    </div>
  );
};

export default SingleFileUpload;