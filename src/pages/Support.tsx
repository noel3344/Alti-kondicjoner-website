import React from 'react';
import { Link } from 'react-router-dom';

export default function Support() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="w-full flex items-center justify-between px-8 py-5 border-b">
        <div className="font-bold text-xl">About AC</div>
        <ul className="flex gap-8 text-md font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/support">Support</Link></li>
        </ul>
      </nav>
      <main className="flex-1 py-20 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Support</h1>
        <section className="bg-zinc-100 p-8 rounded-lg mb-6">FAQs placeholder - You can add your questions & answers here.</section>
        <section className="bg-zinc-50 p-8 rounded-lg">Contact information placeholder - Phone, email, social links, etc.</section>
      </main>
      <footer className="py-8 px-8 bg-zinc-900 text-white text-center">
        &copy; {new Date().getFullYear()} About AC. All rights reserved.
      </footer>
    </div>
  );
}
