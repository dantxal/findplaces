import Head from 'next/head'
import Image from 'next/image'

import { AiFillIdcard, AiFillStar, AiFillClockCircle } from 'react-icons/ai'
import { ChangeEvent, useState } from 'react'

export default function Home() {
  const [search, setSearch] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  return (
    <div className="w-screen flex flex-col justify-center h-full">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex max-w-screen-xl px-10 py-5 justify-between ">
        <div className="">findschool</div>
        <div>home</div>
      </div>

      <form className="bg-gray-200 flex flex-col px-10 py-5 justify-center items-center space-y-4">
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
          <div className="flex space-x-1">
            <AiFillStar size={20} color="#ecc94b" />
            <AiFillStar size={20} color="#555" />
            <AiFillStar size={20} color="#555" />
            <AiFillStar size={20} color="#555" />
            <AiFillStar size={20} color="#555" />
          </div>
        </div>

        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>

      <div className="bg-gray-100 flex flex-col px-10 py-5 justify-center items-center space-y-4">
        <h1 className="text-lg">Showing...</h1>
        <div className="bg-white w-full max-w-6xl rounded p-5 flex space-x-5">
          <Image
            src="/schoolPic.png"
            alt=""
            width={360}
            height={300}
            className="rounded"
          />
          <div className="flex-grow space-y-1">
            <div className="flex justify-between w-full">
              <h2>The British College Of Brazil</h2>
              <div className="flex space-x-1">
                <AiFillStar size={20} color="#ecc94b" />
                <AiFillStar size={20} color="#555" />
                <AiFillStar size={20} color="#555" />
                <AiFillStar size={20} color="#555" />
                <AiFillStar size={20} color="#555" />
              </div>
            </div>
            <div className="flex justify-between m">
              <div className="flex space-x-1 items-center text-gray-600 text-sm">
                <AiFillIdcard size={16} color="#22a8e1" />
                <p>R. Álvares de Azevedo, 50</p>
              </div>
              <div className="flex space-x-1 items-center text-gray-600 text-sm">
                <AiFillClockCircle size={16} color="#00b8d1" />
                <p>10 minutes</p>
              </div>
            </div>
            <div>
              <p>Lorem ipsum dolor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
