import { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useUserContext } from '../hooks/useUserContext'
import { useImageContext } from '../context/ImageContext'
import { useUpload } from '../hooks/useUpload'
import ProgressBar from 'react-bootstrap/ProgressBar'

const Dropzone = () => {
  const { user } = useUserContext()
  const { dropImages, setDropImages, setIsUploadDone } = useImageContext()
  const { upload, isLoading, error, progress, imgInfo } = useUpload()

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (!acceptedFiles.length) {
        return
      }
      upload(acceptedFiles, user.uid)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (imgInfo) {
      setDropImages([
        ...dropImages,
        {
          path: imgInfo.path,
          URL: imgInfo.URL,
          uuid: imgInfo.uuid,
          imageRef: imgInfo.imageRef,
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
  })
  return (
    <>
      <div {...getRootProps()} id='dropzone-container'>
        <input {...getInputProps()} />
        <p> Drop photo or click here</p>
        {acceptedFiles.length > 0 && (
          <div>
            <ul>
              {acceptedFiles.map((file, i) => (
                <li key={i}>
                  {file.name} ({Math.round(file.size / 1024)} kb)
                </li>
              ))}
              {progress &&
                progress.map((prog, i) => (
                  <div className='progBar' key={i}>
                    <ProgressBar animated now={prog} />
                  </div>
                ))}
              {error && <p>{error}</p>}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default Dropzone
