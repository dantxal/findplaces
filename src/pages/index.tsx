/* eslint-disable multiline-ternary */
import Head from 'next/head'
import Link from 'next/link'
import GooglePlacesMock from 'google-maps-places-mock'
import { AiFillIdcard, AiFillClockCircle } from 'react-icons/ai'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import Rating from '@material-ui/lab/Rating'

export default function Home(): React.ReactElement {
  const [lastSearch, setLastSearch] = useState({ term: '', rating: 0 })
  const [search, setSearch] = useState('')
  const [filterRating, setFilterRating] = useState(0)
  const [position, setPosition] = useState<Position>()
  const [places, setPlaces] = useState([])

  useEffect(() => {
    // if (navigator?.geolocation) {
    navigator.geolocation.getCurrentPosition((pos: Position) => {
      setPosition(pos)
      getPlaces(pos)
    })
    // }
  }, [])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  async function getPlaces(pos: Position) {
    const mockPosition: Position = pos || {
      coords: {
        latitude: 0,
        longitude: 0,
        accuracy: null,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
      },
      timestamp: Date.now()
    }
    const request = new GooglePlacesMock(
      {
        lat: mockPosition.coords.latitude,
        lng: mockPosition.coords.longitude
      },
      500
    )
    const response = await request.nearbySearch()

    const nonDuplicate = response.filter(
      (place, index) =>
        response.map(item => item.id).indexOf(place.id) === index
    )
    const data = nonDuplicate
      .map(place => ({ ...place, rating: Math.floor(place.rating * 5) }))
      .filter(place => place.rating >= filterRating)

    setPlaces(data)
    setLastSearch({ term: search, rating: filterRating })
  }

  const handleFormSubmit = async e => {
    e.preventDefault()

    // ! Decided to use this mock since the places API has no free plan
    getPlaces(position)

    // ? This is what the response would look like if it were to use the api
    // const response = await api.get('/nearbysearch/json', {
    //   params: {
    //     location: `${position.coords.latitude},${position.coords.longitude}`,
    //     radius: 500
    //   }
    // })
  }

  return (
    <div className="w-full flex flex-col justify-center h-full">
      <Head>
        <title>findplaces | Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex max-w-screen-xl px-10 py-5 justify-between ">
        <div className="font-semibold">findplaces</div>
        <Link href="/">
          <a>home</a>
        </Link>
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="bg-gray-200 flex flex-col px-10 py-5 justify-center items-center space-y-4"
      >
        <div className="flex space-x-2 items-center">
          <label htmlFor="query">Name</label>
          <input
            name="query"
            onChange={handleChange}
            value={search}
            type="text"
            className="p-2"
            placeholder="Type a term to search"
          />
        </div>

        <div className="flex space-x-2 items-center">
          <label htmlFor="rate">Minimum Rating</label>
          <Rating
            name="minimum-rating"
            value={filterRating}
            onChange={(event, newValue) => setFilterRating(newValue)}
          />
        </div>

        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>

      <div className="bg-gray-100 flex flex-col px-10 py-5 justify-center items-center space-y-4">
        <h1 className="text-lg">
          {`Showing ${lastSearch.term || 'all'} with rating of at least ${
            lastSearch.rating
          } stars`}
        </h1>

        {places.length ? (
          places.map(place => (
            <div
              key={place.id}
              className="bg-white w-full max-w-6xl rounded p-5 flex space-x-5"
            >
              <img
                style={{ width: 360, height: 300 }}
                src="/schoolPic.png"
                alt=""
                className="rounded"
              />

              <div className="flex-grow space-y-1">
                <div className="flex justify-between w-full">
                  <h2>{place.name}</h2>
                  <Rating value={place.rating} readOnly />
                </div>

                <div className="flex space-x-3 m">
                  <div className="flex space-x-1 items-center text-gray-600 text-sm">
                    <AiFillIdcard size={16} color="#22a8e1" />
                    <p>R. Álvares de Azevedo, 50</p>
                  </div>

                  <div className="flex space-x-1 items-center text-gray-600 text-sm">
                    <AiFillClockCircle size={16} color="#00b8d1" />
                    <p>10 minutes</p>
                  </div>
                </div>

                <div className="text-gray-700">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No place found with these search parameters</div>
        )}
      </div>
    </div>
  )
}
