const Images = ({ images, onRemove }) => {
  return (
    <div className='uploaded-images'>
      {images.map((image) => (
        <div key={image.uuid} className='image-box'>
          <img src={image.url} alt={image.name} />
          <div className='remove-btn'>
            <i
              className='fas fa-times-circle 2-fa '
              onClick={() => onRemove(image)}
            ></i>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Images
