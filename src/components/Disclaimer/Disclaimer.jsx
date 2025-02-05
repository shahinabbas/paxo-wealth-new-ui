import React, { useEffect } from 'react';

function Disclaimer() {
  useEffect(() => {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <div className="max-w-4xl  mx-auto bg-[#F5F9FF]  p-6 rounded-lg shadow-lg text-md mt-20">
        <h1 className="text-5xl font-meuthanies text-center mb-4">Disclaimer – Paxo Wealth</h1>

        <div className="text-lg ">
          

          <h2 className="text-2xl mt-10 font-meuthanies text-customBlue">1. Important Notice:</h2>
          <p className="text-md mt-2">
            YOU MUST READ AND AGREE TO THE FOLLOWING DISCLAIMER BEFORE CONTINUING.
            By accessing or using the Paxo Wealth website (“Website”) or mobile application (“Application”), collectively referred to as the “Platform”, you acknowledge and agree to the terms outlined in this Disclaimer. If you do not agree with these terms, please refrain from accessing or using the Platform.
          </p>

          <h2 className="text-2xl mt-10 font-meuthanies text-customBlue">2. General Information:</h2>
          <p className="text-md mt-2">
            The materials and information made available on the Platform (“Materials”) are provided for informational purposes only and do not constitute an offer, invitation, or solicitation to buy, sell, or subscribe to any financial products, services, or securities. The Materials should not be construed as investment advice or relied upon for making investment decisions.
            Paxo Wealth is not a financial advisory service. Any decisions made by users using the Platform are solely their responsibility. Users are encouraged to seek independent professional advice before acting on any information provided through the Platform.
          </p>

          <h2 className="text-2xl mt-10 font-meuthanies  text-customBlue">3. Regulatory Compliance:</h2>
          <p className="text-md mt-2 text-md">
            Paxo Wealth complies with applicable laws and regulations to ensure transparency and security for all transactions facilitated through its Platform. However, the Materials on the Platform have not been approved or verified by any regulatory authority in India or any other jurisdiction.
            Users must ensure that accessing or using the Platform does not violate any local laws or regulations applicable to them. If you are in doubt regarding your eligibility to access the Platform or the Materials, please refrain from proceeding.
          </p>

          <h2 className="text-2xl mt-10 font-meuthanies text-customBlue">4. Data Accuracy and Limitation of Liability:</h2>
          <p className="text-md mt-2">
            Paxo Wealth endeavors to provide accurate, complete, and updated information on the Platform. However, the Materials may contain typographical errors, inaccuracies, or outdated information. Paxo Wealth does not guarantee the accuracy, reliability, or completeness of the Materials.
            Paxo Wealth is not liable for:
          </p>
          <ul className="list-disc pl-8">
            <li>Any direct, indirect, incidental, or consequential damages arising from the use or inability to use the Platform.</li>
            <li>Delays or interruptions in accessing the Platform due to technical issues or third-party services.</li>
            <li>Errors or inaccuracies that may have inadvertently occurred in the Materials.</li>
          </ul>

          <h2 className="text-2xl mt-10 font-meuthanies text-customBlue">5. Use of AI Tools:</h2>
          <p className="text-md mt-2">
            The Platform may incorporate AI tools, such as chat portals, to assist users with queries. While every effort is made to ensure the accuracy and reliability of responses generated by AI, Paxo Wealth disclaims liability for:
          </p>
          <ul className="list-disc pl-8">
            <li>Errors, inaccuracies, or outdated information provided by the AI tools.</li>
            <li>Decisions made based on AI-generated responses.</li>
            <li>AI-generated content is not a substitute for professional advice. Users are encouraged to verify and cross-check all information provided by the AI tools and consult professionals for critical decisions.</li>
          </ul>

          <h2 className="text-2xl mt-10 font-meuthanies text-customBlue">6. Third-Party Content and Links:</h2>
          <p className="text-md mt-2">
            The Platform may contain links to third-party websites or services. Paxo Wealth is not responsible for the content, accuracy, or reliability of such third-party materials. Users access third-party links at their own risk and must comply with the terms of use of those websites.
          </p>

          <h2 className="text-2xl mt-10 font-meuthanies text-customBlue">7. Security and Transmission Risks:</h2>
          <p className="text-md mt-2">
            Paxo Wealth implements robust security measures to protect user data and ensure the reliability of transactions. However:
          </p>
          <ul className="list-disc pl-8">
            <li>Documents transmitted electronically via the Platform may be altered or tampered with during transmission.</li>
            <li>Paxo Wealth is not liable for any damages caused by third-party interception of data or unauthorized access to the Platform.</li>
          </ul>

          <h2 className="text-2xl mt-10 font-meuthanies text-customBlue">8. Forward-Looking Statements:</h2>
          <p className="text-md mt-2">
            The Materials may include forward-looking statements, which are subject to risks and uncertainties. Actual outcomes may differ materially from the expectations expressed or implied in such statements. Users should not place undue reliance on forward-looking statements.
          </p>

          <h2 className="text-2xl mt-10 font-meuthanies text-customBlue">9. Updates to Disclaimer:</h2>
          <p className="text-md mt-2">
            Paxo Wealth reserves the right to modify or update this Disclaimer at any time without prior notice. Continued use of the Platform signifies acceptance of the updated Disclaimer.
          </p>

          <h2 className="text-2xl mt-10 font-meuthanies text-customBlue">10. Contact Us:</h2>
          <p className="text-md mt-2">
            If you have any questions regarding this Disclaimer or require clarification, please contact:
          </p>
          <ul className="pl-8">
            <li>Email: support@paxowealth.com</li>
            <li>Phone: +91-XXXXXXXXXX</li>
            <li>Address: [Company Address]</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Disclaimer;
