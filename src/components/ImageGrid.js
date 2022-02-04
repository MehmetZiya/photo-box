import { SRLWrapper } from 'simple-react-lightbox'
import Photos from './Photos'
const ImageGrid = ({ images, removeImage }) => {
  return (
    <SRLWrapper>
      <div className='image-flex'>
        {images.map((image) => (
          <div key={image.uuid}>
            <Photos image={image} removeImage={removeImage} />
          </div>
        ))}
      </div>
    </SRLWrapper>
  )
}

export default ImageGrid
