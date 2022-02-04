import { useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../firebase/config'
import { v4 as uuidv4 } from 'uuid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

export const useUpload = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isUploadDone, setIsUploadDone] = useState(false)
  const [progress, setProgress] = useState([])
  const [error, setError] = useState(null)
  const [imgInfo, setImgInfo] = useState(null)

  const upload = async (images, uid) => {
    setIsLoading(true)
    setIsUploadDone(false)
    setError(null)
    const progressArray = []

    // each image has a progresbar
    images.map((image, i) => progressArray.push(i))

    images.forEach((image, i) => {
      setImgInfo(null)
      const uuid = uuidv4()
      const ext = image.name.substring(image.name.lastIndexOf('.') + 1)
      const fileRef = ref(storage, `${uid}/${uuid}.${ext}`)
      const uploadProcess = uploadBytesResumable(fileRef, image)

      uploadProcess.on(
        'state_changed',
        (uploadProcessSnapshot) => {
          progressArray.splice(
            i,
            1,
            Math.round(
              (uploadProcessSnapshot.bytesTransferred /
                uploadProcessSnapshot.totalBytes) *
                100
            )
          )
          setProgress([...progressArray])
        },
        (e) => {
          setError(`Upload failed due to ${e.message}`)
          setIsLoading(false)
        },
        async () => {
          // get download url
          const URL = await getDownloadURL(fileRef)

          const result = await addDoc(collection(db, 'images'), {
            name: image.name,
            path: fileRef.fullPath,
            type: image.type,
            createdAt: serverTimestamp(),
            photographerId: uid,
            URL,
            uuid,
          })
          setImgInfo({
            URL,
            path: fileRef.fullPath,
            uuid,
            imageRef: result.id,
          })
        }
      )
      setIsLoading(false)
      setIsUploadDone(true)
      setProgress(null)
    })
  }
  return {
    upload,
    isLoading,
    isUploadDone,
    error,
    progress,
    imgInfo,
    URL,
  }
}
