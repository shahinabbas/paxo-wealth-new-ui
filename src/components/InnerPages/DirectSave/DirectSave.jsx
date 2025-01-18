import React from 'react'
import DirectSaveHome from './DirectSaveHome'
import DirectSaveFeatures from './DirectSaveFeatures'
import FeaturedProperties from './FeaturedProperties'
import prestige  from "/prestige.png"
import DirectSaveHowItWorks from './DirectSaveHowItWorks'
function DirectSave() {
  return (
    <div>
      <DirectSaveHome/>
      <DirectSaveFeatures/>
      <FeaturedProperties/>
      <div className='mt-10 md:px-10 px-5'>
        <img
          src={prestige}
          alt="Image"
          className='object-cover w-full md:h-80' 
        />
      </div>
      <DirectSaveHowItWorks/>
    </div>
  )
}

export default DirectSave
