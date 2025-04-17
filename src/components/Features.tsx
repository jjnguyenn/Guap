// components/Features.tsx
import React from "react";

const Features = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-md rounded-xl">
            <h3 className="text-2xl font-semibold mb-2">Fast Transactions</h3>
            <p>Send and receive money quickly and securely, anytime and anywhere.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-xl">
            <h3 className="text-2xl font-semibold mb-2">Secure Banking</h3>
            <p>24/7 availability to assist you with your banking needs, no matter the time.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-xl">
            <h3 className="text-2xl font-semibold mb-2">24/7 Support</h3>
            <p>24/7 availability to assist you with your banking needs, no matter the time.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
