import AlbumList from '../components/AlbumList'
import { useCollection } from '../hooks/useCollection'
import { useUserContext } from '../hooks/useUserContext'
const Home = () => {
  const { user } = useUserContext()
  const { documents, error } = useCollection('albums', ['created', 'desc'])

  return (
    <div className='homePage'>
      <h3>Album List</h3>

      {user && (
        <div>{documents && <AlbumList albums={documents} user={user} />}</div>
      )}
      {error && <p>{error}</p>}
    </div>
  )
}

export default Home
