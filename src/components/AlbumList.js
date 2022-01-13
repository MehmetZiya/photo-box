import { Link } from 'react-router-dom'
import Albums from '../assets/albums.svg'

const AlbumList = ({ albums, user }) => {
  return (
    <div className='album-list'>
      {albums.length === 0 && (
        <p>{`Hi! ${user.displayName} You have not a album yet.`}</p>
      )}
      {albums.map((album) => (
        <div className='album-card' key={album.id}>
          <Link to={`/albums/${album.id}`}>
            <img src={Albums} alt='albums-icon' />
            <h5>{album.name}</h5>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default AlbumList
