const Images = ({ images, onRemove }) => {
  return (
    <div className='uploaded-images'>
      {images.map((image) => (
        <div key={image.uuid} className='image-box'>
          <img src={image.url} alt={image.name} />
          <span className='remove-btn' onClick={() => onRemove(image)}>
            x
          </span>
        </div>
      ))}
    </div>
  )
}

export default Images
