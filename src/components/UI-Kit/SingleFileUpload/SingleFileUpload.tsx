"use client"
import { FC, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import { TFileItem, TSingleFileUploadProps } from './types';

import styles from './SingleFileUpload.module.scss';

import IcUpload from '@/assets/icons/upload.svg';


const SingleFileUpload: FC<TSingleFileUploadProps> = ({
                                                        onChange,
                                                        label,
                                                        wrapperClassname = '',
                                                        theme,
                                                        isReset,
                                                      }) => {
  const [file, setFile] = useState<TFileItem | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

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

  function convertToBase64(file: File, onSuccess: any) {
    const reader = new FileReader();
    reader.onload = () => onSuccess(reader.result);
    reader.readAsDataURL(file);
  }

  const onFileChange = async (e: any) => {
    if (e.target.files.length) {
      convertToBase64(e.target.files[0], (base64: string) => console.log(base64));
      const newFile = {
        fileUrl: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0] as File,
      };

      checkFileSize(newFile.file);
      checkFileExtension(newFile.file);

      if (!errorMessage) {
        onChange(newFile.file);

        setFile(newFile);
      }
    }
  };

  const onDelete = () => {
    if (fileInput.current !== null) fileInput.current.value = '';

    setFile(null);
    onChange(null);
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