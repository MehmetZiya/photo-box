import { useParams } from 'react-router-dom'
import { useDocument } from '../hooks/useDocument'
import { SRLWrapper } from 'simple-react-lightbox'

const Photos = () => {
  const { id } = useParams()
  const { documents, loading } = useDocument(id)
  console.log(documents)
  return (
    <div>
      {documents && (
        <>
          <h4>{documents.name}</h4>
          <div className='img-flex'>
            {loading && <p>Loading..</p>}
            {documents.images.map((image) => (
              <SRLWrapper>
                <div className='img-box'>
                  <img src={image.url} alt={image.path} />
                </div>
              </SRLWrapper>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Photos
