import Head from 'next/head'

export default function Home () {
  return (
    <div className="w-screen flex flex-col justify-center h-full">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex max-w-screen-xl px-5 py-2 justify-between '>
        <div className=''>
          findschool
        </div>
        <div>
          home
        </div>
      </div>
      <form>
        <label htmlFor="query">
          Name
        </label>
        <input type="text" name="query" />
        <label htmlFor="rate">
          Minimum Rating
        </label>
        <input type="select" name="rate"/>
      </form>
    </div>
  )
}
