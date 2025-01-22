import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdArrowOutward, MdLocationPin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'; // Import motion from framer-motion

const Verified = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.4172 10.5854L21.7803 8.9488C21.3919 8.56032 21.0735 7.79259 21.0735 7.24203V4.92749C21.0735 3.82648 20.1741 2.92703 19.0733 2.92645H16.7579C16.2079 2.92645 15.4393 2.60751 15.0508 2.21931L13.4142 0.58273C12.6366 -0.194895 11.3634 -0.194895 10.5857 0.58273L8.94915 2.22048C8.5603 2.60897 7.79083 2.92703 7.24208 2.92703H4.92754C3.82799 2.92703 2.92737 3.82648 2.92737 4.92749V7.24208C2.92737 7.79048 2.60908 8.56061 2.22053 8.94886L0.583658 10.5854C-0.194553 11.3631 -0.194553 12.6363 0.583658 13.4152L2.22053 15.0517C2.60932 15.4402 2.92737 16.2101 2.92737 16.7585V19.0731C2.92737 20.1729 3.82799 21.0736 4.92754 21.0736H7.24213C7.79206 21.0736 8.56066 21.3919 8.94921 21.7801L10.5858 23.4173C11.3634 24.1943 12.6366 24.1943 13.4143 23.4173L15.0508 21.7801C15.4397 21.3916 16.208 21.0736 16.7579 21.0736H19.0734C20.1741 21.0736 21.0736 20.1729 21.0736 19.0731V16.7585C21.0736 16.2077 21.3921 15.44 21.7804 15.0517L23.4173 13.4152C24.1943 12.6363 24.1943 11.363 23.4172 10.5854ZM10.4123 16.5001L5.99949 12.0867L7.41376 10.6727L10.4127 13.6716L16.586 7.49979L17.9999 8.91376L10.4123 16.5001Z"
      fill="#0056E0"
    />
  </svg>
);
const Returns = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.9505 10.7211C9.9505 10.3228 10.2735 10 10.6718 10H14.4077C14.8061 10 15.1289 10.3228 15.1289 10.7211V20.8188H9.9505V10.7211Z"
      fill="#0056E0"
    />
    <path
      d="M22.0847 6.72125C22.0847 6.32281 21.7617 6 21.3634 6H17.6275C17.2292 6 16.9062 6.32281 16.9062 6.72125V20.8956H22.0847V6.72125Z"
      fill="#0056E0"
    />
    <path
      d="M3.00146 13.6077C3.00146 13.2722 3.32428 13 3.72253 13H7.45862C7.85687 13 8.17969 13.2722 8.17969 13.6077V21H3.00146V13.6077Z"
      fill="#0056E0"
    />
    <path
      d="M22.6931 22.5576H2.39313C1.99469 22.5576 1.67188 22.8804 1.67188 23.2787C1.67188 23.6771 1.99469 23.9999 2.39313 23.9999H22.6931C23.0914 23.9999 23.4144 23.6771 23.4144 23.2787C23.4144 22.8804 23.0914 22.5576 22.6931 22.5576Z"
      fill="#0056E0"
    />
  </svg>
);
const Income = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.3747 8.6395H13.4372C14.1547 7.8145 14.9872 7.093 15.9102 6.5H11.3747C10.7837 6.5 10.3047 6.979 10.3047 7.57C10.3047 8.161 10.7837 8.6395 11.3747 8.6395Z"
      fill="#0056E0"
    />
    <path
      d="M11.9548 10.7983H5.90984C5.31884 10.7983 4.83984 11.2773 4.83984 11.8683C4.83984 12.4593 5.31884 12.9383 5.90984 12.9383H11.0843C11.3033 12.1903 11.5958 11.4743 11.9548 10.7983Z"
      fill="#0056E0"
    />
    <path
      d="M10.6186 16.1667C10.6186 15.8057 10.6376 15.4492 10.6701 15.0967H1.29656C0.705563 15.0967 0.226562 15.5757 0.226562 16.1667C0.226562 16.7577 0.705563 17.2367 1.29656 17.2367H10.6701C10.6371 16.8842 10.6186 16.5277 10.6186 16.1667Z"
      fill="#0056E0"
    />
    <path
      d="M11.0822 19.395H5.81219C5.22119 19.395 4.74219 19.874 4.74219 20.465C4.74219 21.056 5.22119 21.535 5.81219 21.535H11.9527C11.5937 20.8585 11.3012 20.1425 11.0822 19.395Z"
      fill="#0056E0"
    />
    <path
      d="M13.4378 23.6934H11.3278C10.7368 23.6934 10.2578 24.1724 10.2578 24.7634C10.2578 25.3544 10.7368 25.8334 11.3278 25.8334H15.9113C14.9878 25.2399 14.1553 24.5184 13.4378 23.6934Z"
      fill="#0056E0"
    />
    <path
      d="M21.9165 6.5C16.5865 6.5 12.25 10.8365 12.25 16.1665C12.25 21.4965 16.5865 25.833 21.9165 25.833C27.2465 25.833 31.5835 21.4965 31.5835 16.1665C31.5835 10.8365 27.247 6.5 21.9165 6.5ZM21.807 24.254H21.4885V23.178H21.807C25.673 23.178 28.818 20.033 28.818 16.167C28.818 12.301 25.673 9.156 21.807 9.156H21.4885V8.0795H21.807C26.2665 8.0795 29.8945 11.7075 29.8945 16.167C29.8945 20.6265 26.266 24.254 21.807 24.254Z"
      fill="#0056E0"
    />
    <g clip-path="url(#clip0_552_1342)">
      <path
        d="M23.9669 13.6523C23.9264 13.6118 23.8747 13.5916 23.8118 13.5916H22.6581C22.5815 13.2184 22.4376 12.8944 22.2262 12.6201H23.7982C23.8613 12.6201 23.9129 12.5998 23.9535 12.5594C23.9937 12.519 24.014 12.4672 24.014 12.4043V11.7159C24.014 11.6529 23.9938 11.6012 23.9535 11.5607C23.9128 11.5203 23.8612 11.5 23.7982 11.5H18.1846C18.1216 11.5 18.0699 11.5203 18.0294 11.5607C17.989 11.6012 17.9688 11.6529 17.9688 11.7159V12.6132C17.9688 12.6717 17.9901 12.7223 18.0328 12.765C18.0756 12.8077 18.1262 12.8291 18.1846 12.8291H19.163C20.112 12.8291 20.7148 13.0832 20.9711 13.5915H18.1846C18.1216 13.5915 18.0699 13.6117 18.0294 13.6522C17.989 13.6927 17.9688 13.7444 17.9688 13.8074V14.4956C17.9688 14.5586 17.989 14.6103 18.0294 14.6507C18.0699 14.6913 18.1217 14.7114 18.1846 14.7114H21.0657C20.9667 15.0804 20.7362 15.3614 20.3741 15.5549C20.0119 15.7483 19.5341 15.845 18.9403 15.845H18.1846C18.1262 15.845 18.0756 15.8664 18.0328 15.9091C17.9901 15.9519 17.9688 16.0025 17.9688 16.0609V16.9179C17.9688 16.9764 17.989 17.0259 18.0294 17.0663C18.893 17.9839 20.0131 19.268 21.3895 20.9189C21.43 20.973 21.4862 20.9999 21.5582 20.9999H22.8738C22.9684 20.9999 23.0336 20.9595 23.0695 20.8784C23.1145 20.7975 23.1057 20.721 23.0425 20.649C21.7292 19.0386 20.6968 17.8332 19.9457 17.0325C20.7103 16.9426 21.3311 16.6952 21.8079 16.2904C22.2847 15.8856 22.5747 15.3592 22.6783 14.7115H23.8118C23.8747 14.7115 23.9265 14.6914 23.9669 14.6508C24.0074 14.6105 24.0277 14.5587 24.0277 14.4958V13.8076C24.0277 13.7445 24.0074 13.6928 23.9669 13.6523Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_552_1342">
        <rect
          width="9.5"
          height="9.5"
          fill="white"
          transform="translate(16.25 11.5)"
        />
      </clipPath>
    </defs>
  </svg>
);
const Growth = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.99609 5C9.99609 4.44772 10.4438 4 10.9961 4H14.9961C15.5484 4 15.9961 4.44772 15.9961 5V9C15.9961 9.55228 15.5484 10 14.9961 10C14.4438 10 13.9961 9.55228 13.9961 9V6H10.9961C10.4438 6 9.99609 5.55228 9.99609 5Z"
      fill="#0CB184"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L10.05 11.3642C9.76964 11.639 9.39263 11.7929 9 11.7929C8.60737 11.7929 8.23039 11.639 7.95 11.3641L7.94286 11.3571L6 9.41421L2.70711 12.7071C2.31658 13.0976 1.68342 13.0976 1.29289 12.7071C0.902369 12.3166 0.902369 11.6834 1.29289 11.2929L4.94996 7.63582C5.23036 7.36098 5.60737 7.20707 6 7.20707C6.39263 7.20707 6.76961 7.36102 7.05 7.63586L7.05714 7.64286L9 9.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"
      fill="#0CB184"
    />
  </svg>
);
const Loss = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 11C10 11.5523 10.4477 12 11 12H15C15.5523 12 16 11.5523 16 11V7C16 6.44772 15.5523 6 15 6C14.4477 6 14 6.44772 14 7V10H11C10.4477 10 10 10.4477 10 11Z"
      fill="#FFCE3A"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.7071 11.7071C16.0976 11.3166 16.0976 10.6834 15.7071 10.2929L10.05 4.63582C9.76964 4.36098 9.39263 4.20707 9 4.20707C8.60737 4.20707 8.23039 4.36102 7.95 4.63586L7.94286 4.64286L6 6.58579L2.70711 3.29289C2.31658 2.90237 1.68342 2.90237 1.29289 3.29289C0.902369 3.68342 0.902369 4.31658 1.29289 4.70711L4.94996 8.36418C5.23036 8.63902 5.60737 8.79293 6 8.79293C6.39263 8.79293 6.76961 8.63898 7.05 8.36414L7.05714 8.35714L9 6.41421L14.2929 11.7071C14.6834 12.0976 15.3166 12.0976 15.7071 11.7071Z"
      fill="#FFCE3A"
    />
  </svg>
);

const Starter = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect   width="32" height="32" rx="16" fill="#FFCE3A" />
    <path
      d="M8 16C8 11.5816 11.5816 8 16 8C16 8 16 16 8 16ZM8 16C8 20.4184 11.5816 24 16 24C16 24 16 16 8 16ZM16 24C20.4182 24 24 20.4184 24 16C16 16 16 24 16 24ZM24 16C24 11.5816 20.4182 8 16 8C16 8 16 16 24 16Z"
      fill="#ffffff"
    />
  </svg>
);
const ProgressiveGrowth = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="32" rx="16" fill="#FFCE3A" />
    <g clip-path="url(#clip0_552_1807)">
      <path d="M24.002 16.9355H16.9375V24H24.002V16.9355Z" fill="#ffffff" />
      <path
        d="M23.5951 10.1038C22.9662 8.85706 21.6737 8 20.1846 8C18.0796 8 16.3672 9.71252 16.3672 11.8175C16.3672 13.9225 18.0796 15.6349 20.1846 15.6349C21.6737 15.6349 22.9662 14.7778 23.5951 13.5311C23.8552 13.0155 24.0021 12.4333 24.0021 11.8174C24.0021 11.2015 23.8552 10.6194 23.5951 10.1038Z"
        fill="#ffffff"
      />
      <path d="M12.1047 8L8 15.2285H16.2094L12.1047 8Z" fill="#ffffff" />
      <path
        d="M8 20.5551L9.98901 24.0001H13.967L15.9561 20.5551L13.967 17.1099H9.98901L8 20.5551Z"
        fill="#ffffff"
      />
    </g>
    <defs>
      <clipPath id="clip0_552_1807">
        <rect width="16" height="16" fill="white" transform="translate(8 8)" />
      </clipPath>
    </defs>
  </svg>
);
const Builder = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="32" rx="16" fill="#FFCE3A" />
    <g clip-path="url(#clip0_552_1817)">
      <path
        d="M15.8464 14.689L7.90534 10.5938C7.66371 10.4692 7.66131 10.1244 7.90142 9.99681C8.59738 9.62716 10.4084 8.70575 15.3772 6.15039C15.7673 5.94987 16.2323 5.94987 16.6224 6.15039C21.6352 8.72837 23.4383 9.64434 24.1258 10.0119C24.3656 10.1402 24.3624 10.485 24.1203 10.609L16.1545 14.6894C16.0577 14.739 15.943 14.7388 15.8464 14.689ZM16.3368 15.5593V25.6625C16.3368 25.9133 16.601 26.0763 16.825 25.9636C17.4943 25.6269 19.271 24.7068 24.2884 22.1264C24.7442 21.8922 25.0273 21.4284 25.0273 20.9161C25.0273 14.3805 25.0361 12.2181 25.0242 11.4487C25.0203 11.1991 24.7558 11.0407 24.5336 11.1545L16.5202 15.2593C16.4076 15.317 16.3368 15.4328 16.3368 15.5593ZM15.4803 15.2585L7.46791 11.1266C7.246 11.0121 6.98132 11.1701 6.97652 11.4198C6.9619 12.1783 6.97239 14.3209 6.97239 20.9162C6.97239 21.4284 7.25548 21.8922 7.71127 22.1264C12.7267 24.7057 14.5045 25.6263 15.1746 25.9634C15.3987 26.0761 15.6628 25.9131 15.6628 25.6622V15.5581C15.6628 15.4319 15.5924 15.3163 15.4803 15.2585Z"
        fill="#ffffff"
      />
    </g>
    <defs>
      <clipPath id="clip0_552_1817">
        <rect width="20" height="20" fill="white" transform="translate(6 6)" />
      </clipPath>
    </defs>
  </svg>
);
const Pinnacle = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="32" rx="16" fill="#FFCE3A" />
    <path
      d="M16 7.35938L6 24.6411H16H26L16 7.35938ZM23.6358 23.1321L16 18.2215V9.93611L23.6358 23.1321Z"
      fill="#ffffff"
    />
  </svg>
);


const BoostIncomeProperties = () => {
  
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const apiURL = process.env.REACT_APP_API_URL;
 useEffect(() => {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [categoriesResponse, propertiesResponse] = await Promise.all([
          axios.get(`${apiURL}/category/get-boostincome-category`),
          axios.get(`${apiURL}/property/get-boostincome-property`),
        ]);

        // Transform categories data to match the required format
        const transformedCategories = [
          {
            name: "All Categories",
            value: "all",
            description: "View all property opportunities",
          },
          ...categoriesResponse.data.map((cat) => ({
            name: cat.name,
            value: cat._id,
            description: cat.description,
            range: cat.range,
          })),
        ];

        setCategories(transformedCategories);
        setProperties(propertiesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          error.response?.data?.message ||
            "Failed to load data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiURL]);
  const categoryData = [
    { name: "All Categories", range: "" },
    {
      icon: <Starter />,
      name: "Starter Edge (₹50k - ₹1L)",
      range: "₹50k - ₹1L",
    },
    {
      icon: <ProgressiveGrowth />,
      name: "Progressive Growth (₹1L - ₹5L)",
      range: "₹1L - ₹5L",
    },
    {
      icon: <Builder />,
      name: "Wealth Builder (₹5L - ₹10L)",
      range: "₹5L - ₹10L",
    },
    { icon: <Pinnacle />, name: "Pinnacle Growth (₹10+)", range: "₹10+" },
  ];

  const handleCategoryClick = (categoryName, categoryValue) => {
    setSelectedCategory(categoryName);
    setActiveCategory(
      categoryValue === "All Categories" ? "all" : categoryValue
    );
  };

  const filteredProperties = properties.filter((property) => {
    const matchesCategory =
      activeCategory === "all" || property.category?._id === activeCategory;
    const matchesType =
      propertyTypeFilter === "all" || property.type === propertyTypeFilter;
    return matchesCategory && matchesType;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-customBlue "></div>
      </div>
    );
  }
  const onClick = (slug) => {
    navigate(`/property-detail/${slug}`);
  };
  return (
  
    <div className="mt-20 ">
      <h1 className="font-meuthanies text-center text-4xl md:text-5xl xl:text-5xl text-black">
        Featured Pre - Listed Properties
      </h1>

      <div className="md:flex justify-center mt-8 gap-2 px-4">
        {/* Category Filter UI */}
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => handleCategoryClick(category.name, category.value)}
            className={`flex gap-2 items-center ${
              selectedCategory === category.name
                ? "bg-customBlue text-white"
                : "bg-[#F6F6F6] text-[#666666]"
            } p-2 md:rounded-lg cursor-pointer`}
          >
            {category.name === "Starter  Edge" ? (
              <Starter />
            ) : category.name === "Progressive Growth" ? (
              <ProgressiveGrowth />
            ) : category.name === "Wealth Builder" ? (
              <Builder />
            ) : category.name === "Pinnacle Growth" ? (
              <Pinnacle />
            ) : null}
            <h1 className="text-sm">{category.name}</h1>
            <h1>{category.range}</h1>
          </div>
        ))}
      </div>
      {filteredProperties.length === 0 ? (
        <div className="text-center text-black py-10">
          No properties found matching your criteria
        </div>
      ) : (
        <div className="md:grid md:grid-cols-3  md:px-8 px-4  justify-center items-center gap-8 mt-4">
          {filteredProperties.map((property, index) => (
            <div className="md:w-[380px] font-sf-pro my-4 hover:shadow-2xl bg-white rounded-lg border border-[#D9D9D9] transform transition-transform duration-300 hover:scale-105">
              <div className="text-md text-blue-500 bg-[#F4F9FF] rounded-lg p-2 text-center font-semibold mb-2">
                {property.property_name}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold text-[#101010">
                  {property.property_subName}
                </h2>
                <p className="text-sm text-[#666666] line-clamp-2">
                  {property.description}
                </p>

                <div className="flex items-center justify-between my-3 text-sm text-[#000000]">
                  <div className="flex items-center">
                    <MdLocationPin />
                    <span>{property.property_location}</span>
                  </div>
                  <span
                    className={`${
                      property.demand === "high"
                        ? "bg-[#0CB1841A] text-[#0CB184]"
                        : "bg-[#FFCE3A1A] text-[#FFCE3A]"
                    } flex gap-2 text-xs font-semibold ml-4 px-2 py-1 rounded`}
                  >
                    {property.demand === "high" ? <Growth /> : <Loss />}{" "}
                    {property.demand == "high" ? "High Demand" : "Low Demand"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm  my-3">
                  <div>
                    <span className="block font-medium text-[#666666]">
                      Market Value
                    </span>
                    <span className="text-[#101010] font-semibold">
                      {property.property_unit_price}
                    </span>
                  </div>
                  <div>
                    <span className="block font-medium text-[#666666]">
                      Growth Potential
                    </span>
                    <span className="text-customBlue font-semibold">
                      {property.capital_appreciation} %
                    </span>
                  </div>
                  <div>
                    <span className="block font-medium text-[#666666]">
                      Pre-Listed Buyers
                    </span>
                    <span className="text-[#101010] font-semibold">
                      Available
                    </span>
                  </div>
                  <div>
                    <span className="block font-medium text-[#666666]">
                      Minimum Participation
                    </span>
                    <span className="text-[#101010] font-semibold">
                      {property.minimum_sqft}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onClick(property.slug)}
                  className="w-full bg-customYellow text-black font-semibold py-2 px-4 rounded-lg flex items-center gap-2 justify-center mt-4"
                >
                  <h1>Activate Growth Now</h1>
                  <MdArrowOutward />
                </button>
              </div>
              <div className="flex justify-between items-center mt-4 px-3 p-2 text-sm text-customBlue bg-[#F6F6F6] rounded-b-lg pt-3">
                <div className="flex  gap-2  text-[12px]  items-center">
                  <Verified />
                  <span>Verified Property</span>
                </div>
                <div className="flex  gap-2  text-[12px]  items-center">
                  <Returns /> <span>High Returns</span>
                </div>
                <div className="flex  gap-2 text-[12px]  items-center">
                  <Income />
                  <span>Steady Income</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BoostIncomeProperties;
