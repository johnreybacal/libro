import { useState } from "react"

function ErrorPage() {
  const [isCountryRoads, setIsCountryRoads] = useState(false)

  return <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
    <div className="text-center">
      <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">Something's wrong</h1>
      <p className="mt-6 text-lg font-medium sm:text-xl/8">There's seems to be a problem here.</p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <button
          className="btn btn-primary btn-outline w-32"
          onClick={() => {
            history.back()
          }}
        >
          Go back
        </button>
        <a
          className="btn btn-primary btn-outline w-32"
          href={import.meta.env.BASE_URL}
          onMouseEnter={() => setIsCountryRoads(true)}
          onMouseLeave={() => setIsCountryRoads(false)}
        >
          {isCountryRoads ? "Country roads" : "Take me home"}
        </a>
      </div>
    </div>
  </main>
}

export default ErrorPage