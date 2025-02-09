import MoviesSection from './components/MoviesSection'
import TrendingMoviesSection from './components/TrendingMoviesSection'

const App = () => {
  return (
    <main>
      <div className="wrapper">
        <h1>
          Find Best <span className="text-gradient">Movies</span>
        </h1>

        <header>
          <img src="header.jpg" alt="Header Banner" className="mb-10" />
        </header>

        <TrendingMoviesSection />

        <MoviesSection />
      </div>
    </main>
  )
}

export default App
