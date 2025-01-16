import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import motion for animations
import { Typewriter } from "react-simple-typewriter"; // Import Typewriter
import Video from "/Income.mp4";

const Icon = () => (
  <svg
    width="700"
    height="250"
    viewBox="0 0 429 385"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse
      cx="232.964"
      cy="191.166"
      rx="202.688"
      ry="163.925"
      transform="rotate(-125.858 232.964 191.166)"
      fill="white"
    />
    <rect x="194" y="84" width="65" height="26" fill="#0056E0" />
    <path
      d="M173 192.342V384H281V125.262L243.14 95H183.76V179.733L173 192.342Z"
      fill="#B1C9F2"
    />
    <path
      d="M303.559 322.849H296.93L292.562 310.325H307.926L303.559 322.849Z"
      stroke="black"
      stroke-width="2"
      stroke-miterlimit="10"
    />
    <path
      d="M300.246 322.759V382.893"
      stroke="black"
      stroke-width="2"
      stroke-miterlimit="10"
    />
    <path
      d="M297.945 335H302.54"
      stroke="black"
      stroke-width="2"
      stroke-miterlimit="10"
    />
    <path
      d="M291.492 303.043L294.194 305.745"
      stroke="black"
      stroke-width="2"
      stroke-miterlimit="10"
    />
    <path
      d="M308.995 303.043L306.293 305.745"
      stroke="black"
      stroke-width="2"
      stroke-miterlimit="10"
    />
    <path
      d="M300.652 302.101V297.914"
      stroke="black"
      stroke-width="2"
      stroke-miterlimit="10"
    />
    <path
      d="M264.388 335.875C263.271 330.339 265.5 323.483 263.688 317.115C261.431 309.194 253.397 306.97 245.983 306.885C237.679 306.79 232.28 312.762 231.693 320.829C231.32 325.981 233.766 331.101 232.143 336.131C231.395 338.449 223.711 345.944 226.678 353.496C228.713 358.681 234.452 357.938 239.817 358.009C245.415 358.085 249.739 359.197 251.651 360.101C259.879 363.985 267.596 361.828 270.189 355.346C272.602 349.308 265.476 341.231 264.393 335.875H264.388Z"
      fill="#1DF6A7"
    />
    <path
      d="M248.293 384V339.202"
      stroke="#16161E"
      stroke-width="2"
      stroke-miterlimit="10"
    />
    <path
      d="M248.277 349.109L254.201 343.186"
      stroke="#16161E"
      stroke-width="2"
      stroke-miterlimit="10"
    />
    <path
      opacity="0.3"
      d="M54.3164 383.068L54.7564 255.278L88.6624 223.822L122.048 255.391V383.304L54.3164 383.068Z"
      fill="#0C65F5"
    />
    <path
      d="M88.6641 223.822H172.913L205.598 255.391H122.05L88.6641 223.822Z"
      fill="#0056E0"
    />
    <path
      d="M205.596 255.391H122.047V383.304H205.596V255.391Z"
      fill="#ECECEC"
    />
    <path
      d="M88.6625 223.822H172.211L205.597 255.391V383.304H122.048V255.391L88.6625 223.822ZM88.6625 223.822L54.4727 255.391V382.897"
      stroke="#16161E"
      stroke-width="1.5"
      stroke-miterlimit="10"
    />
    <path d="M80.6602 274.985H72.5078V283.137H80.6602V274.985Z" fill="white" />
    <path
      d="M87.2231 256.238C89.4756 256.238 91.3016 254.412 91.3016 252.16C91.3016 249.907 89.4756 248.081 87.2231 248.081C84.9706 248.081 83.1445 249.907 83.1445 252.16C83.1445 254.412 84.9706 256.238 87.2231 256.238Z"
      fill="white"
    />
    <path
      d="M101.934 274.985H93.7812V283.137H101.934V274.985Z"
      fill="#0056E0"
    />
    <path d="M80.6602 296.258H72.5078V304.41H80.6602V296.258Z" fill="white" />
    <path d="M101.934 296.258H93.7812V304.41H101.934V296.258Z" fill="#0056E0" />
    <path
      d="M80.6602 317.536H72.5078V325.688H80.6602V317.536Z"
      fill="#0056E0"
    />
    <path d="M101.934 317.536H93.7812V325.688H101.934V317.536Z" fill="white" />
    <path d="M146.652 274.985H138.5V283.137H146.652V274.985Z" fill="#0C65F5" />
    <path d="M167.926 274.985H159.773V283.137H167.926V274.985Z" fill="white" />
    <path
      d="M189.203 274.985H181.051V283.137H189.203V274.985Z"
      fill="#0C65F5"
    />
    <path d="M146.652 296.258H138.5V304.41H146.652V296.258Z" fill="#0C65F5" />
    <path d="M167.926 296.258H159.773V304.41H167.926V296.258Z" fill="#0C65F5" />
    <path d="M189.203 296.258H181.051V304.41H189.203V296.258Z" fill="white" />
    <path d="M146.652 317.536H138.5V325.688H146.652V317.536Z" fill="white" />
    <path
      d="M167.926 317.536H159.773V325.688H167.926V317.536Z"
      fill="#0C65F5"
    />
    <path
      d="M189.203 317.536H181.051V325.688H189.203V317.536Z"
      fill="#0C65F5"
    />
    <path d="M146.652 296.258H138.5V304.41H146.652V296.258Z" fill="#D1D2DC" />
    <path d="M146.652 296.258H138.5V304.41H146.652V296.258Z" fill="#72BE4A" />
    <path
      d="M205.596 255.391H122.047"
      stroke="#16161E"
      stroke-width="1.5"
      stroke-miterlimit="10"
    />
    <path
      d="M62.8242 338.127H109.112"
      stroke="#16161E"
      stroke-width="1.5"
      stroke-miterlimit="10"
    />
    <rect
      x="279.75"
      y="193.75"
      width="62.5"
      height="189.5"
      stroke="black"
      stroke-width="1.5"
    />
    <path
      d="M417 237.5H395.5V327.5H406.5V383.5H428V327.5H417V237.5Z"
      fill="white"
    />
    <path
      d="M321.184 384V265.664L341.931 235.646H395.161V326.649H406.422V383.219"
      stroke="#16161E"
      stroke-width="2"
      stroke-miterlimit="10"
    />
    <path
      d="M321 267.354V384.854H406V327.854H394.5V237.354H341.5L321 267.354Z"
      fill="#0056E0"
    />
    <path
      d="M395.945 237L416.693 237.435V328.002H427.528V384.573"
      stroke="#16161E"
      stroke-width="1.5"
      stroke-miterlimit="10"
    />
    <path d="M341.415 275.212H333.57V283.057H341.415V275.212Z" fill="white" />
    <path
      d="M362.091 275.212H354.246V283.057H362.091V275.212Z"
      fill="#0C65F5"
    />
    <path
      d="M382.767 275.212H374.922V283.057H382.767V275.212Z"
      fill="#0C65F5"
    />
    <path d="M341.415 294.82H333.57V302.665H341.415V294.82Z" fill="#0C65F5" />
    <path d="M362.091 294.82H354.246V302.665H362.091V294.82Z" fill="white" />
    <path d="M382.767 294.82H374.922V302.665H382.767V294.82Z" fill="#0C65F5" />
    <path
      d="M362.091 255.671H354.246V263.516H362.091V255.671Z"
      fill="#0C65F5"
    />
    <path d="M382.767 255.671H374.922V263.516H382.767V255.671Z" fill="white" />
    <path d="M341.415 314.427H333.57V322.272H341.415V314.427Z" fill="#0C65F5" />
    <path
      d="M362.091 314.427H354.246V322.272H362.091V314.427Z"
      fill="#0C65F5"
    />
    <path d="M382.767 314.427H374.922V322.272H382.767V314.427Z" fill="white" />
    <path
      d="M381.882 348.84C381.882 356.216 375.901 362.197 368.525 362.197C361.149 362.197 355.168 356.216 355.168 348.84C355.168 343.063 363.353 330.178 366.912 324.855C367.683 323.706 369.372 323.706 370.143 324.855C373.697 330.178 381.887 343.063 381.887 348.84H381.882Z"
      stroke="#16161E"
      stroke-width="2"
      stroke-miterlimit="10"
    />
    <path
      d="M368.523 348.565V383.806"
      stroke="#16161E"
      stroke-width="2"
      stroke-miterlimit="10"
    />
    <path
      d="M368.637 355.156L371.935 351.858"
      stroke="#16161E"
      stroke-width="2"
      stroke-miterlimit="10"
    />
    <g clip-path="url(#clip0_0_1)">
      <path
        d="M146.626 181.621C140.008 181.621 134.621 187.007 134.621 193.626C134.621 200.246 140.008 205.631 146.626 205.631C153.245 205.631 158.631 200.246 158.631 193.626C158.631 187.007 153.245 181.621 146.626 181.621ZM152.083 188.169H148.807C149.283 188.803 149.614 189.548 149.778 190.352H152.083V192.535H149.781C149.344 194.667 147.671 196.353 145.539 196.789L149.642 201.654L147.975 203.06L140.935 194.718H144.443C145.864 194.718 147.064 193.802 147.516 192.535H141.169V190.352H147.516C147.064 189.084 145.864 188.169 144.443 188.169H141.169V185.987H152.083V188.169Z"
        fill="#0056E0"
      />
      <path
        d="M146.626 175C136.397 175 128 183.396 128 193.626C128 203.856 136.397 212.252 146.626 212.252C156.855 212.252 165.252 203.856 165.252 193.626C165.252 183.396 156.855 175 146.626 175ZM146.626 207.814C138.803 207.814 132.438 201.449 132.438 193.626C132.438 185.803 138.803 179.438 146.626 179.438C154.449 179.438 160.814 185.803 160.814 193.626C160.814 201.449 154.449 207.814 146.626 207.814Z"
        fill="#0056E0"
      />
    </g>
    <path
      d="M279.845 383.129V123.764L240.656 94.6885H183.014V179.454L174.488 190.19V221.111"
      stroke="#16161E"
      stroke-width="1.5"
      stroke-miterlimit="10"
    />
    <path d="M266.972 134.878H195.887V140.235H266.972V134.878Z" fill="white" />
    <path d="M266.972 154.77H195.887V160.126H266.972V154.77Z" fill="white" />
    <path d="M266.972 174.666H195.887V180.022H266.972V174.666Z" fill="white" />
    <path d="M266.972 194.558H195.887V199.914H266.972V194.558Z" fill="white" />
    <path d="M266.972 214.449H195.887V219.805H266.972V214.449Z" fill="white" />
    <path d="M266.971 234.34H243.172V239.696H266.971V234.34Z" fill="white" />
    <path d="M266.971 254.237H243.172V259.593H266.971V254.237Z" fill="white" />
    <path d="M266.971 274.128H243.172V279.485H266.971V274.128Z" fill="white" />
    <path
      d="M193.75 93.359V84.4731H259.031V105.969"
      stroke="#16161E"
      stroke-width="1.5"
      stroke-miterlimit="10"
    />
    <path d="M133.5 170.5V124" stroke="black" stroke-width="2" />
    <path
      d="M159 170.5V144.5M147 170.5L147 106"
      stroke="black"
      stroke-width="2"
    />
    <path d="M132 239H160" stroke="white" stroke-width="2" />
    <path
      d="M158.316 376.075V383.376"
      stroke="black"
      stroke-width="2"
      stroke-miterlimit="10"
    />
    <path
      d="M193.723 376.075V383.376"
      stroke="black"
      stroke-width="2"
      stroke-miterlimit="10"
    />
    <path
      d="M158.113 372.573V363.626C158.113 362.102 159.348 360.863 160.876 360.863H190.756C192.279 360.863 193.519 362.098 193.519 363.626V372.777"
      stroke="black"
      stroke-width="2"
      stroke-miterlimit="10"
    />
    <path
      d="M198.569 372.256H153V375.942H198.569V372.256Z"
      stroke="black"
      stroke-width="2"
      stroke-miterlimit="10"
    />
    <path d="M97.448 165.629H26V132H97.448V165.629Z" fill="#0056E0" />
    <path
      d="M43.1484 153.353L44.2988 151.915C45.3054 152.813 46.4917 153.424 47.9296 153.424C49.2957 153.424 50.0146 152.741 50.0146 151.951C50.0146 151.052 49.2238 150.728 47.4623 150.297C45.1616 149.794 43.5798 149.147 43.5798 147.061C43.5798 145.12 45.2335 143.718 47.5701 143.718C49.3316 143.718 50.6258 144.293 51.7402 145.264L50.6617 146.738C49.6911 145.911 48.5767 145.444 47.4982 145.444C46.4198 145.444 45.6289 146.127 45.6289 146.882C45.6289 147.78 46.4557 148.104 48.2172 148.499C50.5179 149.003 52.0637 149.758 52.0637 151.771C52.0637 153.784 50.5539 155.15 47.9296 155.15C46.0243 155.15 44.4426 154.503 43.2203 153.353H43.1484Z"
      fill="white"
    />
    <path
      d="M55.8725 145.767V148.428H61.5883V150.261H55.8725V153.137H62.1635V154.97H53.8594V143.934H62.1635V145.767H55.8725Z"
      fill="white"
    />
    <path
      d="M71.6922 153.137V154.97H64.0352V143.934H66.0123V153.137H71.6922Z"
      fill="white"
    />
    <path
      d="M80.8993 153.137V154.97H73.2422V143.934H75.2194V153.137H80.8993Z"
      fill="white"
    />
    <path d="M425.448 167.629H354V134H425.448V167.629Z" fill="#0056E0" />
    <path
      d="M374.691 145.334H379.896C381.722 145.334 383.032 146.43 383.032 147.971C383.032 149.033 382.481 149.786 381.55 150.3C382.756 150.882 383.48 151.841 383.48 153.005C383.48 154.683 382.067 155.882 380.103 155.882H374.726V145.369L374.691 145.334ZM379.448 149.649C380.378 149.649 381.068 149.101 381.068 148.348C381.068 147.595 380.378 147.012 379.448 147.012H376.622V149.649H379.448ZM379.723 154.204C380.757 154.204 381.516 153.588 381.516 152.697C381.516 151.807 380.792 151.19 379.723 151.19H376.622V154.204H379.723Z"
      fill="white"
    />
    <path
      d="M385.309 151.362V145.334H387.239V151.293C387.239 153.04 388.376 154.307 389.996 154.307C391.616 154.307 392.753 153.04 392.753 151.293V145.334H394.649V151.362C394.649 154.101 392.719 156.019 389.996 156.019C387.273 156.019 385.343 154.101 385.343 151.362H385.309Z"
      fill="white"
    />
    <path
      d="M400.092 151.91L395.887 145.334H398.161L401.091 150.095L404.055 145.334H406.227L402.056 151.91V155.848H400.092V151.91Z"
      fill="white"
    />
    <path
      d="M303.144 191.479C292.484 191.479 281.438 181.598 281.328 181.499C280.594 180.834 279.475 180.834 278.741 181.499C278.631 181.599 267.613 191.479 256.926 191.479C255.862 191.479 255 192.341 255 193.404V216.467C255 235.15 268.896 242.615 279.348 246.605C279.569 246.69 279.802 246.732 280.035 246.732C280.268 246.732 280.5 246.69 280.722 246.605C295.377 241.011 305.069 232.283 305.069 216.467V193.404C305.069 192.341 304.207 191.479 303.144 191.479Z"
      fill="#0056E0"
    />
    <path
      d="M280.035 200.386C272.602 200.386 266.555 206.433 266.555 213.866C266.555 221.299 272.602 227.346 280.035 227.346C287.468 227.346 293.515 221.299 293.515 213.866C293.515 206.433 287.468 200.386 280.035 200.386ZM285.248 213.302L279.471 219.079C279.095 219.455 278.602 219.643 278.109 219.643C277.616 219.643 277.123 219.455 276.748 219.079L274.822 217.153C274.07 216.401 274.07 215.182 274.822 214.43C275.574 213.678 276.793 213.678 277.545 214.43L278.109 214.994L282.525 210.578C283.277 209.826 284.496 209.826 285.248 210.578C286 211.331 286 212.55 285.248 213.302Z"
      fill="white"
    />
    <path
      d="M21.3906 325C9.59577 325 0 334.596 0 346.39C0 361.028 19.1425 382.517 19.9575 383.425C20.723 384.277 22.0596 384.276 22.8237 383.425C23.6387 382.517 42.7812 361.028 42.7812 346.39C42.781 334.596 33.1854 325 21.3906 325ZM21.3906 357.153C15.4563 357.153 10.6286 352.325 10.6286 346.39C10.6286 340.456 15.4565 335.628 21.3906 335.628C27.3248 335.628 32.1525 340.456 32.1525 346.391C32.1525 352.325 27.3248 357.153 21.3906 357.153Z"
      fill="#0056E0"
    />
    <defs>
      <clipPath id="clip0_0_1">
        <rect
          width="37.252"
          height="37.252"
          fill="white"
          transform="translate(128 175)"
        />
      </clipPath>
    </defs>
  </svg>
);
function BoostIncome() {
  const [startSecondLine, setStartSecondLine] = useState(false); // State to control second line

  // Animation variants for the video
  const videoVariants = {
    hidden: { y: "-100vh", opacity: 0 }, // Start off-screen (top)
    visible: {
      y: 0, // Move to the fixed position
      opacity: 1, // Fade in
      transition: {
        type: "spring",
        stiffness: 50, // Smooth spring effect
        damping: 10, // Prevent overshooting
        duration: 3, // Animation duration
      },
    },
  };

  // Animation variants for the title
  const titleVariants = {
    hidden: { x: "100vw", opacity: 0 }, // Start off-screen (right)
    visible: {
      x: 0, // Move to the fixed position
      opacity: 1, // Fade in
      transition: {
        type: "spring",
        stiffness: 60, // Smooth spring effect
        damping: 12, // Prevent overshooting
        duration: 1, // Animation duration
      },
    },
  };
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -100 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };
  // Trigger the second line after the first line finishes
  useEffect(() => {
    if (!startSecondLine) {
      // Delay the start of the second line after the first line
      const timer = setTimeout(() => {
        setStartSecondLine(true); // Set to true after a delay
      }, 4000); // 4 seconds for first line to finish typing (adjust as needed)

      // Cleanup the timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [startSecondLine]);

  return (
    <div className="h-screen md:flex bg-white items-center ">
      {/* Animated Video */}
      {/* <motion.video
        src={Video}
        className="w-[700px] h-[550px]"
        autoPlay
        loop
        muted
        playsInline
        initial="hidden"
        animate="visible"
        variants={videoVariants}
      /> */}
      <motion.div initial="hidden" animate="visible" variants={iconVariants}>
        <Icon  />
      </motion.div>
      <div className="md:-ml-20 ml-10 md:mt-0 -mt-28 font-meuthanies">
        {/* Animated Title */}
        <motion.h1
          className="text-5xl"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          Boost <span className="text-customBlue">Income</span>
        </motion.h1>
        {/* Typewriter Description - First Line */}
        <div className="text-black opacity-50 mt-4 font-sf-pro">
          <Typewriter
            words={["Experience immediate 48% growth with"]}
            loop={1} // Type once
            cursor={false} // Disable cursor
            typeSpeed={85} // Type each character at 55ms
            delaySpeed={500} // Optional delay before starting the next word
          />
        </div>

        {/* Typewriter Description - Second Line (Rendered after delay) */}
        <div className="text-black opacity-50 font-sf-pro">
          <Typewriter
            words={[" secure payouts."]}
            loop={1} // Type once
            cursor={false} // Disable cursor
            typeSpeed={100}
            delaySpeed={0} // Slight delay after first line
          />
        </div>
      </div>
    </div>
  );
}

export default BoostIncome;
