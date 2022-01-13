import AlbumList from '../components/AlbumList'
import { useCollection } from '../hooks/useCollection'
import { useUserContext } from '../hooks/useUserContext'
const Home = () => {
  const { user } = useUserContext()
  const { documents, error } = useCollection('albums')

  return (
    <div className='homePage'>
      <h3>Album List</h3>
      {user && <div>{documents && <AlbumList albums={documents} />}</div>}
    </div>
  )
}

export default Home
