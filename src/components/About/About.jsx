import React, { useEffect } from "react";

function About() {
  useEffect(() => {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className=" min-h-screen p-6 bg-white font-sf-pro">
      {/* Page Header */}
      <header className="mt-10 text-black p-6  text-center">
        <h1 className="text-3xl font-meuthanies">About PAXO Wealth</h1>
        <p className="mt-2 text-lg font-sf-pro">
          Empowering Financial Growth with Security
        </p>
      </header>

      {/* Introduction Section */}
      <section className="bg-white p-6 mt-6 rounded-md shadow-md">
        <h2 className="text-2xl  text-black font-meuthanies">Introduction</h2>
        <p className="mt-4 text-black leading-relaxed">
          Welcome to <span className="font-bold">PAXO Wealth</span>, your
          destination for secure financial solutions designed to deliver
          consistent and reliable earnings. We simplify traditional models with
          innovative, hassle-free earnings opportunities backed by real,
          verified assets. Whether you're looking for a steady monthly income or
          a growth-oriented plan, PAXO Wealth is your trusted partner for
          financial success.
        </p>
        <p className="mt-4 text-black leading-relaxed">
          Empowering Opportunities. Simplified for All. PAXO Wealth caters to
          individuals and businesses seeking predictable, secure, and
          hassle-free earnings. With our carefully designed solutions, you can
          achieve sustainable financial growth while enjoying peace of mind.
          Every opportunity is built around verified assets, ensuring a platform
          you can rely on for consistent monthly income without complexity.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-white p-6 mt-6 rounded-md shadow-md">
        <h2 className="text-2xl text-black  font-meuthanies">
          Mission & Vision
        </h2>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-customBlue">Mission</h3>
          <p className="mt-2 text-black leading-relaxed">
            To simplify financial growth by providing secure financial solutions
            that prioritize safety, transparency, and user convenience.
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-customBlue">Vision</h3>
          <p className="mt-2 text-black leading-relaxed">
            To become the leading platform for reliable and hassle-free earnings
            through asset-backed opportunities. To empower every individual with
            solutions designed for long-term financial stability and monthly
            income, free from risks.
          </p>
        </div>
      </section>

      {/* What We Stand For Section */}
      <section className="bg-white p-6 mt-6 rounded-md shadow-md">
        <h2 className="text-2xl  text-black font-meuthanies">
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="p-4 border border-gray-200 rounded-md">
            <h3 className="text-lg font-semibold text-customBlue">Security</h3>
            <p className="mt-2 text-black">
              All opportunities are backed by tangible, verified assets to
              ensure your earnings remain protected and reliable.
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-md">
            <h3 className="text-lg font-semibold text-customBlue">
              Transparency
            </h3>
            <p className="mt-2 text-black">
              We provide clear processes, a user-friendly dashboard, and no
              hidden fees, ensuring complete trust and control.
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-md">
            <h3 className="text-lg font-semibold text-customBlue">
              Simplicity
            </h3>
            <p className="mt-2 text-black">
              Designed for everyone, our platform offers easy-to-use tools to
              help you achieve consistent monthly income effortlessly.
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-md">
            <h3 className="text-lg font-semibold text-customBlue">
              Reliability
            </h3>
            <p className="mt-2 text-black">
              Our asset-backed solutions ensure stable and predictable payouts
              that align with your financial goals.
            </p>
          </div>
        </div>
        <p className="mt-6 text-black">
          Our commitment to secure financial solutions and hassle-free earnings
          ensures that you achieve financial success without stress or
          uncertainty. Every opportunity is tied to real assets, guaranteeing
          reliability and transparency.
        </p>
      </section>
    </div>
  );
}

export default About;
