import React from "react";
import { MdArrowOutward } from "react-icons/md";
const Starter = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 40C18 27.8495 27.8495 18 40 18C40 18 40 40 18 40ZM18 40C18 52.1505 27.8495 62 40 62C40 62 40 40 18 40ZM40 62C52.1501 62 62 52.1505 62 40C40 40 40 62 40 62ZM62 40C62 27.8495 52.1501 18 40 18C40 18 40 40 62 40Z"
      fill="#0056E0"
    />
  </svg>
);
const Growth = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_519_5140)">
      <path d="M63.998 42.8066H42.8047V64H63.998V42.8066Z" fill="#0056E0" />
      <path
        d="M62.7775 22.3113C60.8907 18.5712 57.0133 16 52.5459 16C46.231 16 41.0938 21.1376 41.0938 27.4525C41.0938 33.7675 46.231 38.9047 52.5459 38.9047C57.0133 38.9047 60.8907 36.3335 62.7775 32.5934C63.5579 31.0465 63.9984 29.3 63.9984 27.4521C63.9984 25.6046 63.5579 23.8582 62.7775 22.3113Z"
        fill="#0056E0"
      />
      <path d="M28.3142 16L16 37.6855H40.6281L28.3142 16Z" fill="#0056E0" />
      <path
        d="M16 53.6647L21.967 63.9999H33.9011L39.8682 53.6647L33.9011 43.3291H21.967L16 53.6647Z"
        fill="#0056E0"
      />
    </g>
    <defs>
      <clipPath id="clip0_519_5140">
        <rect
          width="48"
          height="48"
          fill="white"
          transform="translate(16 16)"
        />
      </clipPath>
    </defs>
  </svg>
);
const Wealth = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M39.6305 36.8535L20.572 27.0251C19.9921 26.7261 19.9864 25.8985 20.5626 25.5923C22.2329 24.7052 26.5794 22.4938 38.5045 16.3609C39.4407 15.8797 40.5568 15.8797 41.493 16.3609C53.5236 22.5481 57.8512 24.7464 59.5011 25.6286C60.0767 25.9365 60.069 26.7639 59.4879 27.0615L40.37 36.8546C40.1378 36.9736 39.8625 36.9731 39.6305 36.8535ZM40.8076 38.9423V63.1899C40.8076 63.7918 41.4416 64.1832 41.9793 63.9127C43.5856 63.1046 47.8496 60.8962 59.8913 54.7033C60.9852 54.1412 61.6646 53.028 61.6646 51.7987C61.6646 36.1131 61.686 30.9235 61.6574 29.0769C61.6481 28.478 61.013 28.0976 60.4799 28.3707L41.2476 38.2223C40.9775 38.3609 40.8076 38.6388 40.8076 38.9423ZM38.7519 38.2204L19.5222 28.3038C18.9896 28.0291 18.3544 28.4083 18.3429 29.0074C18.3078 30.8279 18.333 35.9702 18.333 51.7988C18.333 53.0281 19.0124 54.1413 20.1063 54.7034C32.1432 60.8938 36.4101 63.1031 38.0183 63.9121C38.556 64.1827 39.19 63.7913 39.19 63.1894V38.9394C39.1899 38.6366 39.0209 38.3592 38.7519 38.2204Z"
      fill="#0056E0"
    />
  </svg>
);
const Pinnacle = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M40 19.2617L16 60.7378H40H64L40 19.2617ZM58.3259 57.1163L40 45.3308V25.4459L58.3259 57.1163Z"
      fill="#0056E0"
    />
  </svg>
);

const plans = [
  {
    icon: Starter,
    name: "Starter Edge",
    description: "Ideal for beginners aiming to start their growth journey.",
    priceRange: "₹50K – ₹1L",
    immediateGrowth: "Up to 48%",
    monthlyPayout: "3.5% of the plan amount",
    buttonText: "Activate Boost Income Now",
  },
  {
    icon: Growth,
    name: "Progressive Growth",
    description: "Designed for individuals seeking scalable progress.",
    priceRange: "₹1L – ₹5L",
    immediateGrowth: "Up to 48%",
    monthlyPayout: "4% of the plan amount",
    buttonText: "Activate Boost Income Now",
  },
  {
    icon: Wealth,
    name: "Wealth Builder",
    description:
      "Perfect for those aiming for substantial finance advancement.",
    priceRange: "₹5L – ₹10L",
    immediateGrowth: "Up to 48%",
    monthlyPayout: "4.2% of the plan amount",
    buttonText: "Activate Boost Income Now",
  },
  {
    icon: Pinnacle,
    name: "Pinnacle Growth",
    description: "Premium option for significant financial growth.",
    priceRange: "₹10L+",
    immediateGrowth: "Up to 48%",
    monthlyPayout: "4.5% of the plan amount",
    buttonText: "Activate Boost Income Now",
  },
];
function Unlock() {
  return (
    <div className="px-5 xl:px-14 md:px-10 pb-10">
      <div>
        <div className="md:flex mt-10">
          <div className="relative inline-block">
            <span className="absolute inset-0 bg-customYellow transform rotate-[-2deg] w-full h-full"></span>
            <span className="relative z-10 font-meuthanies text-[30px] md:text-[45px]">
              Unlock Property
            </span>
          </div>
          <h1 className="md:text-[45px] text-[30px] font-meuthanies md:ml-2">
            Opportunities and
          </h1>
        </div>
        <h1 className="md:text-[45px] text-[30px] font-meuthanies">
          Boost Your Income Instantly
        </h1>
        <h1 className="text-[#303030] font-sf-pro opacity-50 mt-2 xl:text-xl text-sm">
          Select the Boost Income plan that suits your goals and start building
          your financial growth with flexible options.
        </h1>
      </div>
      <div className="md:flex gap-4 mt-8">
        {plans.map((plan, index) => {
          return (
            <div
              key={index}
              className="bg-[#ECF1F8] p-4 my-4 md:my-4 md:w-[400px] xl:w-[400px] rounded-lg flex flex-col justify-between
                   h-[430px] md:h-[410px] xl:h-[520px]"
            >
              <div>
                <plan.icon className="mb-4" />
                <h1 className="font-meuthanies text-customBlue text-xl xl:text-2xl mt-2">
                  {plan.name}
                </h1>
                <hr className="border-t-1 mt-4 border-[#101010]" />
                <ul className="list-disc ml-6 mt-6">
                  <li className="xl:text-xl md:text-sm font-semibold">
                    {plan.priceRange}
                  </li>
                  <li className="mt-2 md:text-sm xl:text-xl">
                    {plan.description}
                  </li>
                  <li className="mt-2 md:text-sm xl:text-xl">
                    <strong>Immediate Growth:</strong> {plan.immediateGrowth}
                  </li>
                  <li className="mt-2 md:text-sm xl:text-xl">
                    <strong>Monthly Payout:</strong> {plan.monthlyPayout}
                  </li>
                </ul>
              </div>
              <div className="bottom-2 xl:mb-6 flex xl:text-xl justify-center items-center mt-4 rounded-full bg-customYellow p-2">
                <h1 className="font-sf-pro font-semibold">{plan.buttonText}</h1>
                <MdArrowOutward />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Unlock;
