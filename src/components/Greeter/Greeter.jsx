// import React from 'react'
import './Greeter.css'
import Proptypes from 'prop-types'

const Greeter = ({ enabled }) => {
    if (!enabled) {
        return null;
    }
    return (
        <>
            <div id='greeter'>
                <div className='bigheader'>Wondering about the weather?</div>
                <div className='smallheader'>Enter your city name.</div>
            </div>
        </>
    )
}

Greeter.propTypes = {
    enabled: Proptypes.bool
}

export default Greeter