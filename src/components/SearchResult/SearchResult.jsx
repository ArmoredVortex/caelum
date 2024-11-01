// import React from 'react'
import Prototypes from 'prop-types'

import './SearchResult.css'

const SearchResult = ({ searchResult }) => {
    return (
        <div id='search-result'>{searchResult}</div>
    )
}

SearchResult.propTypes = {
    searchResult: Prototypes.string,
}

export default SearchResult;
