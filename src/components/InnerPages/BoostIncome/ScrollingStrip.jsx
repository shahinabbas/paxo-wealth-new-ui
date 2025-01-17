import React from "react";
import { motion } from "framer-motion";

function ScrollingStrip() {
  return (
    <div className="bg-white p-4 overflow-hidden font-meuthanies md:-mt-8">
      <div class="relative flex overflow-x-hidden">
        <div class="relative flex overflow-x-hidden">
          <div class="md:py-12 py-6 animate-marquee whitespace-nowrap">
            <span class="text-2xl mx-4">Secure</span>
            <span className="mx-4 text-2xl">|</span>

            <span class="text-2xl mx-4">Instant Payouts</span>
            <span className="mx-4 text-2xl">|</span>

            <span class="text-2xl mx-4">Real-Time Monitoring</span>
            <span className="mx-4 text-2xl">|</span>

            <span class="text-2xl mx-4">Risk-Free Growth</span>
            <span className="mx-4 text-2xl">|</span>

            <span class="text-2xl mx-4">Personalized Plans</span>
            <span className="mx-4 text-2xl">|</span>

            <span class="text-2xl mx-4">Hassle-Free Activation</span>
            <span className="mx-4 text-2xl">|</span>

            <span class="text-2xl mx-4">Dedicated Support</span>
            <span className="mx-4 text-2xl">|</span>

            <span class="text-2xl mx-4">Transparent Processes</span>
            <span className="text-2xl mx-4">|</span>
          </div>

          <div class="absolute top-0 md:py-12 py-6 animate-marquee2 whitespace-nowrap">
            <span class="text-2xl mx-4">Secure</span>
            <span className="mx-4 text-2xl">|</span>

            <span class="text-2xl mx-4">Instant Payouts</span>
            <span className="mx-4 text-2xl">|</span>

            <span class="text-2xl mx-4">Real-Time Monitoring</span>
            <span class="text-2xl">|</span>

            <span class="text-2xl mx-4">Risk-Free Growth</span>
            <span className="mx-4 text-2xl">|</span>

            <span class="text-2xl mx-4">Personalized Plans</span>
            <span className="mx-4 text-2xl">|</span>

            <span class="text-2xl mx-4">Hassle-Free Activation</span>
            <span className="mx-4 text-2xl">|</span>

            <span class="text-2xl mx-4">Dedicated Support</span>
            <span className="mx-4 text-2xl">|</span>

            <span class="text-2xl mx-4">Transparent Processes</span>
            <span className="text-2xl mx-4">|</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollingStrip;
