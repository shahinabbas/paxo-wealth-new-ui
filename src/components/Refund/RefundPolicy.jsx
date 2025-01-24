import React, { useEffect } from "react";

// Define text sizes and spacing variables for reuse
const styles = {
  title:
    "text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-meuthanies text-center mt-2",
  sectionTitle:
    "md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-meuthanies text-customBlue mt-10",
  paragraph: "text-md sm:text-lg lg:text-xl 2xl:text-2xl mb-4 mt-2",
  listItem: "list-disc list-inside text-md lg:text-lg 2xl:text-xl mb-4",
  subListItem:
    "list-disc list-inside text-sm sm:text-md lg:text-lg 2xl:text-xl mb-4",
};

function RefundPolicy() {
  useEffect(() => {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F9FF] p-4 sm:p-8 font-sf-pro">
      <div className="max-w-4xl xl:w-6xl text-black font-sf-pro mx-auto bg-white p-6 rounded-lg shadow-lg md:mt-0 mt-14">
        <h1 className={styles.title}>Refund Policy</h1>

        <h2 className={styles.sectionTitle}>1. Eligibility for Refunds</h2>
        <p className={styles.paragraph}>
          Refunds are issued under the following conditions:
        </p>
        <ul className={styles.listItem}>
          <li>
            <strong>Service Non-Delivery:</strong> If the services promised were
            not delivered as per the agreed terms.
          </li>
          <li>
            <strong>Duplicate Payment:</strong> If a duplicate payment has been
            made due to a technical error.
          </li>
          <li>
            <strong>Cancellation Within the Cooling-Off Period:</strong> If you
            cancel your subscription or service within the specified cooling-off
            period (as per the agreement).
          </li>
        </ul>
        <p className={styles.paragraph}>Refunds will not be issued for:</p>
        <ul className={styles.listItem}>
          <li>Partial usage of a service.</li>
          <li>Voluntary cancellation after the cooling-off period.</li>
          <li>
            Services rendered as per agreed terms without any errors or
            omissions.
          </li>
        </ul>

        <h2 className={styles.sectionTitle}>2. Refund Request Process</h2>
        <p className={styles.paragraph}>
          To request a refund, please follow these steps:
        </p>
        <ul className={styles.listItem}>
          <li>
            Email your request to{" "}
            <a href="mailto:support@paxowealth.com" className="text-customBlue">
              support@paxowealth.com
            </a>{" "}
            with the subject line "Refund Request."
          </li>
          <a>Include the following details:</a>
          <ul className={styles.subListItem}>
            <li>Full Name</li>
            <li>Transaction ID</li>
            <li>Date of Payment</li>
            <li>Reason for Refund Request</li>
            <li>
              Allow up to 7 business days for our team to review and respond to
              your request.
            </li>
          </ul>
        </ul>

        <h2 className={styles.sectionTitle}>3. Refund Approval and Timeline</h2>
        <p className={styles.paragraph}>Once a refund request is approved:</p>
        <ul className={styles.listItem}>
          <li>
            Refunds will be processed within 14 business days to the original
            payment method.
          </li>
          <li>
            You will receive an email confirmation with the refund details.
          </li>
        </ul>

        <h2 className={styles.sectionTitle}>4. Important Notes</h2>
        <p className={styles.paragraph}>
          Refunds are subject to verification and approval by
          <span className="font-semibold ml-2">PAXO Wealth</span> .
        </p>
        <p className={styles.paragraph}>
          Any applicable transaction fees or administrative charges may be
          deducted from the refund amount.
        </p>
        <p className={styles.paragraph}>
          For questions about your refund status, you can contact us at{" "}
          <a href="mailto:support@paxowealth.com" className="text-customBlue">
            support@paxowealth.com
          </a>{" "}
          or call +1 234-567-89.
        </p>

        <h2 className={styles.sectionTitle}>5. Exceptions</h2>
        <p className={styles.paragraph}>
          Certain services or transactions may be non-refundable. These include
          but are not limited to:
        </p>
        <ul className={styles.listItem}>
          <li>
            Services that involve extensive customization or consultation.
          </li>
          <li>Transactions that have been flagged for fraudulent activity.</li>
          <li>
            Payments for third-party services facilitated through{" "}
            <span className="font-semibold ml-1">PAXO Wealth</span>.
          </li>
        </ul>

        <h2 className={styles.sectionTitle}>6. Address for Correspondence</h2>
        <p className={styles.paragraph}>
          If you need further assistance, you may contact us at:
        </p>
        <p className={styles.paragraph}>
          <span className="font-semibold">PAXO Wealth</span>, NESCO IT Park,
          Building 4, North Wing, Western Express Hwy, Goregaon, Mumbai,
          Maharashtra.
        </p>

        <h2 className={styles.sectionTitle}>
          7. Updates to This Refund Policy
        </h2>
        <p className={styles.paragraph}>
          We reserve the right to update or modify this Refund Policy at any
          time. Any changes will be communicated via our Platform and will take
          effect immediately.
        </p>
        <p className={styles.paragraph}>
          For any additional questions, please reach out to{" "}
          <a href="mailto:info@paxowealth.com" className="text-customBlue">
            info@paxowealth.com
          </a>{" "}
          or call us at <span className="text-customBlue">+1 234-567-89</span>.
        </p>
      </div>
    </div>
  );
}

export default RefundPolicy;
