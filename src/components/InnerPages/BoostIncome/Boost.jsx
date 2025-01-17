import React, { useEffect, useState } from "react";
import {
  FaArrowTrendUp,
  FaShield,
  FaMoneyBillTrendUp,
  FaChartLine,
  FaArrowRight,
  FaLock,
  FaClock,
  FaCircleCheck,
  FaUsers,
  FaBuilding,
  FaLocationDot,
  FaArrowUp,
  FaArrowDown,
  FaFilter,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IoShieldCheckmark } from "react-icons/io5";
import axios from "axios";

const Boost = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  // Fetch categories and properties
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

  // Filter properties based on active filters
  const filteredProperties = properties.filter((property) => {
    const matchesCategory =
      activeCategory === "all" || property.category?._id === activeCategory;
    const matchesType =
      propertyTypeFilter === "all" || property.type === propertyTypeFilter;
    return matchesCategory && matchesType;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-customGreen"></div>
      </div>
    );
  }
  const onClick = (slug) => {
    navigate(`/property-detail/${slug}`);
  };
  return (
    <div className="bg-gray-950 text-white min-h-screen font-sans pb-10">
      {/* Hero Section */}
      <section className="px-4 py-20 text-center bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl  mb-6 font-meuthanies">
            Boost Income –{" "}
            <span className="text-customGreen">Instant Growth</span>, Secure and
            Hassle-Free
          </h1>
          <p className=" mb-8 text-gray-300 font-sf-pro">
            Achieve immediate growth of up to 48% backed by verified properties,
            with consistent payouts for 12 months.
          </p>
          <div className="md:flex justify-center gap-4 font-sf-pro">
            <button className="bg-customGreen text-black hover:bg-green-600 px-8 py-3 rounded-lg font-semibold">
              Activate BoostIncome Now
            </button>
            <button className="border md:mt-0 mt-5 border-customGreen hover:bg-customGreen/10 md:px-8 px-16 py-3 rounded-lg font-semibold">
              Learn How It Works
            </button>
          </div>
          <div className="flex justify-center gap-16 mt-16 font-sf-pro">
            <div className="text-center">
              <IoShieldCheckmark className="w-12 h-12 text-customGreen mx-auto mb-2" />
              <p>Secure</p>
            </div>
            <div className="text-center">
              <FaMoneyBillTrendUp className="w-12 h-12 text-customGreen mx-auto mb-2" />
              <p>Instant Payouts</p>
            </div>
            <div className="text-center">
              <FaChartLine className="w-12 h-12 text-customGreen mx-auto mb-2" />
              <p>Real-time Monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Dashboard Section */}
      <section className="px-4 py-16 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center font-meuthanies">
            Unlock Property Opportunities and Boost Your Income Instantly
          </h2>
          <h1 className="text-center mb-10 mt-3">
            Select the BoostIncome plan that suits your goals and start building
            <br />
            your financial growth with flexible options.
          </h1>

          {error && (
            <p className="bg-red-500 text-white px-4 py-2 rounded-md mb-6 text-center">
              {error}
            </p>
          )}

          {/* Category Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setActiveCategory(category.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeCategory === category.value
                      ? "bg-customGreen text-black"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {category.name}
                  {category.range && (
                    <span className="ml-2 text-xs opacity-75">
                      ({category.range})
                    </span>
                  )}
                </button>
              ))}
            </div>
            {/* Category Description */}
            <div className="text-gray-400 text-sm">
              {
                categories.find((cat) => cat.value === activeCategory)
                  ?.description
              }
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-900 p-6 rounded-lg mb-8">
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-2">
                <FaFilter className="text-customGreen" />
                <span className="font-semibold">Filters:</span>
              </div>

              <select
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm"
                onChange={(e) => setPropertyTypeFilter(e.target.value)}
                value={propertyTypeFilter}
              >
                <option value="all">All Property Types</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="plot">Plot</option>
              </select>
            </div>
          </div>

          {/* Property Listings */}
          {filteredProperties.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              No properties found matching your criteria
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <div
                  key={property._id}
                  className="bg-gray-900 rounded-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">
                          {property.property_name}
                        </h3>
                      </div>
                      <div className="flex items-center">
                        {property.demand === "high" ? (
                          <FaArrowUp className="text-customGreen" />
                        ) : (
                          <FaArrowDown className="text-yellow-500" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Category:</span>
                        <span className="font-semibold text-customGreen">
                          {property.category?.name}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Market Value:</span>
                        <span className="font-semibold">
                          {property.marketValue}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Growth Potential:</span>
                        <span className="font-semibold text-customGreen">
                          {property.capital_appreciation}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          Pre-Listed Buyers:
                        </span>
                        <span className="font-semibold">
                          {property.preBuyers} Available
                        </span>
                      </div>
                    </div>

                    <button
                      className="w-full mt-6 bg-customGreen hover:bg-green-600 text-black py-2 rounded-lg font-semibold transition-colors"
                      onClick={() => onClick(property.slug)}
                    >
                      Activate Growth Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl  text-center mb-12 font-meuthanies">
            Why Choose <span className="text-customGreen">BoostIncome?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaArrowTrendUp className="w-8 h-8" />,
                title: "48% Immediate Growth",
                description:
                  "Achieve instant growth without waiting or market risks",
              },
              {
                icon: <FaMoneyBillTrendUp className="w-8 h-8" />,
                title: "4% Monthly Payouts",
                description: "Receive consistent payouts for 12 months",
              },
              {
                icon: <FaShield className="w-8 h-8" />,
                title: "Asset-Backed Security",
                description:
                  "Every opportunity is tied to verified, tangible properties",
              },
              {
                icon: <FaLock className="w-8 h-8" />,
                title: "Hassle-Free Process",
                description: "Simple activation with no complex calculations",
              },
              {
                icon: <FaClock className="w-8 h-8" />,
                title: "Zero Market Dependency",
                description:
                  "Your growth is secure, independent of market fluctuations",
              },
              {
                icon: <FaChartLine className="w-8 h-8" />,
                title: "Real-Time Dashboard",
                description:
                  "Monitor your payouts, agreements, and growth progress seamlessly",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg">
                <div className="text-customGreen mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 font-meuthanies">
                  {feature.title}
                </h3>
                <p className="text-gray-400 font-sf-pro">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-20 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl  text-center mb-12 font-meuthanies">
            How <span className="text-customGreen">BoostIncome</span> Works
          </h2>
          <div className="space-y-8 font-sf-pro">
            {[
              {
                title: "Explore Verified Opportunities",
                description:
                  "Browse a curated selection of premium properties tied to real assets",
              },
              {
                title: "Select Your Property",
                description:
                  "Choose a property and proceed to trade it instantly",
              },
              {
                title: "Instant Buyer Match",
                description:
                  "Our PAXO Wealth algorithm identifies pre-listed buyers",
              },
              {
                title: "Growth Secured",
                description:
                  "Complete the trade and achieve up to 48% immediate growth",
              },
              {
                title: "Monitor Progress",
                description:
                  "Track your transaction history and payouts in real time",
              },
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-customGreen text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-meuthanies text-center mb-12">
            See{" "}
            <span className="text-customGreen font-meuthanies">
              BoostIncome
            </span>{" "}
            in Action
          </h2>
          <div className="grid md:grid-cols-2 gap-8 font-sf-pro">
            {[
              {
                amount: "₹10 Lakhs",
                growth: "₹14.8 Lakhs",
                payout: "₹40,000",
              },
              {
                amount: "₹5 Lakhs",
                growth: "₹7.4 Lakhs",
                payout: "₹20,000",
              },
            ].map((example, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Amount Activated</span>
                    <span className="text-xl font-bold">{example.amount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Immediate Growth</span>
                    <span className="text-xl font-bold text-customGreen">
                      {example.growth}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Monthly Payout</span>
                    <span className="text-xl font-bold text-customGreen">
                      {example.payout}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl  mb-6 font-meuthanies">
            Ready to Start Your{" "}
            <span className="text-customGreen">Growth Journey?</span>
          </h2>
          <p className="text-xl mb-8 text-gray-300 font-sf-pro">
            Join thousands of investors already growing their wealth with
            BoostIncome
          </p>
          <button className="bg-customGreen font-sf-pro hover:bg-green-600 px-8 py-3 rounded-lg font-semibold">
            Get Started Now
          </button>
          <div className="flex justify-center gap-8 mt-8 font-sf-pro">
            <div className="flex items-center gap-2">
              <FaCircleCheck className="w-6 h-6 text-customGreen" />
              <span>100% Verified Properties</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="w-6 h-6 text-customGreen" />
              <span>10,000+ Active Users</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Boost;
