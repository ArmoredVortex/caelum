// import React from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import CitySidebar from './components/CitySidebar/CitySidebar'
// import SearchResult from './components/SearchResult/SearchResult'
// import Dashboard from './components/Dashboard/Dashboard'

const App = () => {
  return (
    <>
    <div className='container' id='container'>
      <div className='search-bar-container'>
        <SearchBar />
      </div>
    </div>
    <CitySidebar />
    </>
  )
}

export default App