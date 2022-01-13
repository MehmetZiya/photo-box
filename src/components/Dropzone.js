import { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useUserContext } from '../hooks/useUserContext'
import { useImageContext } from '../context/ImageContext'
import { useUpload } from '../hooks/useUpload'
import ProgressBar from 'react-bootstrap/ProgressBar'

const Dropzone = () => {
  const { user } = useUserContext()
  const { images, setImages, setIsUploadDone } = useImageContext()
  const { upload, isLoading, error, progress, imgInfo } = useUpload()

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (!acceptedFiles.length) {
        return
      }
      upload(acceptedFiles[0], user.uid)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (imgInfo) {
      setImages([
        ...images,
        {
          path: imgInfo.path,
          url: imgInfo.url,
          uuid: imgInfo.uuid,
        },
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgInfo])

  useEffect(() => {
    setIsUploadDone(isLoading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: 'image/jpeg, image/jpg, image/png',
    onDrop,
    maxFiles: 1,
  })
  return (
    <>
      <div {...getRootProps()} id='dropzone-container'>
        <input {...getInputProps()} />
        <p> Drop photo or click here</p>
        {acceptedFiles.length > 0 && (
          <div>
            <ul>
              {acceptedFiles.map((file) => (
                <li key={file.name}>
                  {file.name} ({Math.round(file.size / 1024)} kb)
                </li>
              ))}
              {progress && (
                <div>
                  <ProgressBar animated now={progress} />
                </div>
              )}
              {error && <p>{error}</p>}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default Dropzone
