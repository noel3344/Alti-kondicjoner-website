import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
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
        <h1 className="text-4xl font-bold mb-6">About AC</h1>
        <section className="bg-zinc-100 p-8 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold mb-2">Our Story</h2>
          <p>About AC was founded with a mission to create beautifully designed, intuitive technology for modern living. From smart home devices to cutting-edge wearables, every AC product embodies our passion for seamless innovation and exceptional customer experience.</p>
        </section>
        <section className="bg-zinc-50 p-8 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p>Empower everyone to live smarter and better through thoughtful technology solutions that are as elegant as they are powerful.</p>
        </section>
        <section className="bg-zinc-100 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
          <ul className="list-disc ml-8 space-y-1">
            <li>Design first, always</li>
            <li>Innovation with purpose</li>
            <li>User empowerment</li>
            <li>Sustainability & responsibility</li>
            <li>Customer obsession</li>
          </ul>
        </section>
      </main>
      <footer className="py-8 px-8 bg-zinc-900 text-white text-center">
        &copy; {new Date().getFullYear()} About AC. All rights reserved.
      </footer>
    </div>
  );
}
