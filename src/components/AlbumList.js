import { Link } from 'react-router-dom'
import Albums from '../assets/albums.svg'
import { useDeleteAlbum } from '../hooks/useDeleteAlbum'

const AlbumList = ({ albums, user }) => {
  const { deleteAlbum } = useDeleteAlbum()

  return (
    <div className='album-list'>
      {albums.filter((album) => album.photographerId === user.uid).length ===
        0 && (
        <p className='noAlbum'>{`Hi ${user.displayName.toUpperCase()}! You have not a album yet.`}</p>
      )}
      {albums
        .filter((album) => album.photographerId === user.uid)
        .map((album) => (
          <div className='album-card' key={album.id}>
            <Link to={`/albums/${album.id}`}>
              <h5 className='album-Name'>{album.name}</h5>
              <img src={Albums} alt='albums-icon' />
              <p className='album-Date'>
                {album.created.toDate().toDateString()}
              </p>
            </Link>
            <div className='remove-btn'>
              <i
                className='fas fa-times-circle 2-fa'
                onClick={() => deleteAlbum(album)}
              ></i>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AlbumList
