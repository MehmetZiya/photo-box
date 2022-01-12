import { useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../firebase/config'
import { v4 as uuidv4 } from 'uuid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

export const useUpload = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isUploadDone, setIsUploadDone] = useState(false)
  const [progress, setProgress] = useState(null)
  const [error, setError] = useState(null)
  const [imgInfo, setImgInfo] = useState(null)

  const upload = async (image, uid) => {
    setIsLoading(true)
    setIsUploadDone(false)
    setError(null)
    setImgInfo(null)

    const uuid = uuidv4()
    const fileRef = ref(storage, `${uid}/${uuid}`)
    const uploadProcess = uploadBytesResumable(fileRef, image)

    uploadProcess.on(
      'state_changed',
      (uploadProcessSnapshot) => {
        setProgress(
          Math.round(
            (uploadProcessSnapshot.bytesTransferred /
              uploadProcessSnapshot.totalBytes) *
              100
          )
        )
      },
      (e) => {
        setError('Upload failed')
        setIsLoading(false)
      },
      async () => {
        // get url
        const url = await getDownloadURL(fileRef)
        await addDoc(collection(db, 'images'), {
          name: image.name,
          artist: uid,
          path: fileRef.fullPath,
          type: image.type,
          createdAt: serverTimestamp(),
          url,
          uuid,
        })

        setImgInfo({
          url,
          path: fileRef.fullPath,
          uuid,
        })
        setIsLoading(false)
        setIsUploadDone(true)
        setProgress(null)
      }
    )
  }
  return {
    upload,
    isLoading,
    isUploadDone,
    error,
    progress,
    imgInfo,
  }
}
