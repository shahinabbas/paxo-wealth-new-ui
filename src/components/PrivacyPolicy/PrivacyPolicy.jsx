import React, { useEffect } from "react";

function PrivacyPolicy() {
  useEffect(() => {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="min-h-screen bg-[#F5F9FF] p-4 sm:p-8">
      <div className="max-w-4xl text-black font-sf-pro mx-auto bg-white p-6 rounded-lg shadow-lg md:mt-0 mt-14">
        <h1 className="text-4xl md:text-5xl font-meuthanies text-center mt-2">
          Privacy Policy{" "}
        </h1>

        <h2 className="text-2xl font-meuthanies text-customBlue mt-10">1. Introduction</h2>
        <p className="text-md mb-4">
          Any information provided by you while accessing or using the website
          (“Website”) or our mobile application (“Application”), both
          collectively referred to as the “Platform”, shall be handled as per
          the privacy policy outlined herein (“Privacy Policy”). For the purpose
          of this document, all other capitalized or uncapitalized terms used
          herein and not specifically defined herein shall have the meaning
          assigned to them under our ‘Terms and Conditions.’ By continuing to
          use or access the Platform, you agree to the practices described in
          this Privacy Policy. If you do not agree with our practices, you
          should immediately stop accessing the Platform.
        </p>

        <h2 className="text-2xl font-meuthanies text-customBlue mt-10">
          2. Applicability & Type of Information Collected
        </h2>
        <p className="text-md mt-2">
          Please read and understand the policy carefully. If you do not agree
          with our practices, stop accessing the Platform immediately. The
          information we collect (“Information”) may include:
        </p>
        <ul className="list-disc list-inside text-md mb-4">
          <li>
            <strong>Personal Information:</strong> Name, email, phone number,
            address, nationality, and date of birth.
          </li>
          <li>
            <strong>KYC Information:</strong> Aadhaar, PAN, and bank details for
            identity verification and regulatory compliance.
          </li>
          <li>
            <strong>Usage Data:</strong> Information such as IP address, browser
            type, and pages visited while interacting with the Platform.
          </li>
          <li>
            <strong>Cookies and Tracking Information:</strong> Cookies or
            tracking technologies may collect standard log data and visitor
            behavior patterns to enhance user experience.
          </li>
        </ul>
        <p className="text-md mb-4">
          Note: This policy does not apply to any information collected by third
          parties using the Platform or through links or advertisements on the
          Platform. Paxo Wealth does not control third-party activities and is
          not responsible for their data practices.
        </p>

        <h2 className="text-2xl font-meuthanies text-customBlue mt-10">
          3. Nature and Manner of Collecting Information
        </h2>
        <p className="text-md mt-2">We may collect information in the following ways:</p>
        <ul className="list-disc list-inside text-md mb-4">
          <li>
            <strong>Direct Input:</strong> Information you provide during
            registration, KYC verification, or while using our services.
          </li>
          <li>
            <strong>Cookies:</strong> Text files placed on your computer or
            device to track and improve your experience on the Platform.
          </li>
          <li>
            <strong>Third-Party Tools:</strong> Some tools integrated into the
            Platform may collect additional data, such as usage patterns or
            interactions.
          </li>
          <li>
            <strong>Advertisements:</strong> Third-party advertisers on the
            Platform may use their cookies or tracking technologies. Paxo Wealth
            does not control or take responsibility for such third-party
            tracking mechanisms.
          </li>
        </ul>

        <h2 className="text-2xl font-meuthanies text-customBlue mt-10">
          4. Purpose and Use of Information Collected
        </h2>
        <p className="text-md mt-2">
          The information collected will be used for legitimate business
          interests, including:
        </p>
        <ul className="list-disc list-inside text-md mb-4">
          <li>
            <strong>Identity Verification:</strong> Ensuring compliance with
            applicable laws and KYC requirements.
          </li>
          <li>
            <strong>Account Creation:</strong> Facilitating the creation and
            management of your user account.
          </li>
          <li>
            <strong>Communication:</strong> Informing you about products,
            services, or promotional offers that you might find useful.
          </li>
          <li>
            <strong>Service Delivery:</strong> Providing you with services and
            features as highlighted in the Terms and Conditions.
          </li>
          <li>
            <strong>Administrative Updates:</strong> Sending notifications,
            confirmations, and reminders for transactions or account activities.
          </li>
          <li>
            <strong>Regulatory Compliance:</strong> Sharing information with
            authorized regulatory bodies as required under applicable laws.
          </li>
        </ul>
        <p className="text-md mb-4">
          If we rely on your consent to process your information, you may
          withdraw it at any time by contacting us at{" "}
          <a href="mailto:privacy@paxowealth.com">privacy@paxowealth.com</a>.
          Withdrawal of consent may impact your access to services on the
          Platform.
        </p>

        <h2 className="text-2xl font-meuthanies text-customBlue mt-10">
          5. Disclosure of Information
        </h2>
        <p className="text-md mt-2">
          Paxo Wealth does not disclose or share your personally identifiable
          information without your explicit consent, except:
        </p>
        <ul className="list-disc list-inside text-md mb-4">
          <li>
            To agents, employees, and third-party service providers for
            operational purposes.
          </li>
          <li>
            To regulatory bodies for KYC verification or compliance purposes.
          </li>
          <li>
            All disclosures will be made on a need-to-know basis and will adhere
            to confidentiality standards.
          </li>
        </ul>

        <h2 className="text-2xl font-meuthanies text-customBlue mt-10">
          6. Data Security & Retention
        </h2>
        <p className="text-md mt-2">
          <strong>Security:</strong> We implement robust security measures,
          including SSL encryption, secure servers, and restricted access to
          sensitive data. However, no system is entirely secure, and we cannot
          guarantee impenetrability.
        </p>
        <p className="text-md mb-4">
          <strong>Retention:</strong> We retain personal information as long as
          required for the purposes outlined in this Privacy Policy unless
          otherwise mandated by law.
        </p>

        <h2 className="text-2xl font-meuthanies text-customBlue mt-10">7. User Rights</h2>
        <p className="text-md mt-2">
          In accordance with applicable data protection laws, you have the right
          to:
        </p>
        <ul className="list-disc list-inside text-md mb-4">
          <li>Request access to your personal data.</li>
          <li>Request corrections or updates to inaccurate information.</li>
          <li>Request deletion of your data (subject to legal obligations).</li>
          <li>
            Object to the processing of your personal data under certain
            circumstances.
          </li>
        </ul>
        <p className="text-md mb-4">
          To exercise these rights, contact us at{" "}
          <a href="mailto:privacy@paxowealth.com">privacy@paxowealth.com</a>.
          Requests will be handled promptly in compliance with applicable laws.
        </p>

        <h2 className="text-2xl font-meuthanies text-customBlue mt-10">8. Policy Updates</h2>
        <p className="text-md mt-2">
          This Privacy Policy may be updated periodically. Significant changes
          will be communicated through platform notifications or email.
        </p>
        <p className="text-md mb-4">
          For queries, contact us at{" "}
          <a href="mailto:privacy@paxowealth.com">privacy@paxowealth.com</a>.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
