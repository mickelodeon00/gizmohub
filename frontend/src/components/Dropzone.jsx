import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';

const Dropzone = ({ className, setFiles, setRejected }) => {
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length) {
        setFiles((prev) => [
          ...prev,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
        console.log(acceptedFiles);
      }
      if (rejectedFiles.length) {
        setRejected((prev) => [
          ...prev,
          ...rejectedFiles.map(({ errors, file }) => ({
            name: file.name,
            errors: [
              ...errors.map(({ code, message }) => ({
                code,
                message:
                  code === 'file-too-large'
                    ? 'File is larger than 500kb'
                    : message,
              })),
            ],
          })),
        ]);
        // console.log('rejectedFiles yaga', rejectedFiles);
        // console.log('rejectedFiles yaga', rejected);
      }
    },
    [setFiles, setRejected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    maxSize: 1024 * 500,
    // maxFiles: 6,
  });

  return (
    <section {...getRootProps()} className={className}>
      <input {...getInputProps()} />
      <FaCloudUploadAlt className="text-5xl text-slate-500 " />
      <div className="text-slate-400">
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag 'n' drop some image files here, or click to select images</p>
        )}
      </div>
    </section>
  );
};

export default Dropzone;
