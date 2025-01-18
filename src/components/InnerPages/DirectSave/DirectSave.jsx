import React, { useEffect } from 'react'
import DirectSaveHome from './DirectSaveHome'
import DirectSaveFeatures from './DirectSaveFeatures'
import FeaturedProperties from './FeaturedProperties'
import prestige  from "/prestige.png"
import DirectSaveHowItWorks from './DirectSaveHowItWorks'
import DirectSaveFAQ from './DirectSaveFAQ'
import DirectSaveExplore from './DirectSaveExplore'
import CustomerBenefits from './CustomerBenefits'
import Statistics from './Statistics'
function DirectSave() {
  
    useEffect(() => {
      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, []);
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
      <Statistics/>
      <CustomerBenefits/>
      <DirectSaveFAQ/>
      <DirectSaveExplore/>
    </div>
  )
}

export default DirectSave
