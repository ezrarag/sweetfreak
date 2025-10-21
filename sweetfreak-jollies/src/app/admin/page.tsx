'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, Settings, QrCode, Download } from 'lucide-react';
import Link from 'next/link';
import QRGenerator from '@/components/QRGenerator';

export default function AdminPage() {
  const [baseUrl, setBaseUrl] = useState('https://sweetfreakjollies.com');

  const qrRoutes = [
    {
      id: 'menu',
      title: 'Menu QR Code',
      description: 'Direct customers to view the menu',
      url: `${baseUrl}/qr/menu`,
    },
    {
      id: 'order',
      title: 'Order QR Code',
      description: 'Direct customers to place an order',
      url: `${baseUrl}/qr/order`,
    },
    {
      id: 'about',
      title: 'About QR Code',
      description: 'Direct customers to learn about us',
      url: `${baseUrl}/qr/about`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-40"
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Home</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <Settings size={24} className="text-purple-500" />
              <span className="font-bold text-gray-800">Admin Panel</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-pink-500 bubble-text">QR Code</span>
            <span className="text-purple-500 bubble-text"> Generator</span>
          </h1>
          <p className="text-xl text-gray-700">
            Generate QR codes for your marketing materials
          </p>
        </motion.div>

        {/* Base URL Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Configuration
          </h2>
          <div className="max-w-md mx-auto">
            <label htmlFor="baseUrl" className="block text-sm font-bold text-gray-700 mb-2">
              Base URL
            </label>
            <input
              type="url"
              id="baseUrl"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-colors"
              placeholder="https://yourdomain.com"
            />
            <p className="text-sm text-gray-600 mt-2">
              Update this to match your actual domain
            </p>
          </div>
        </motion.div>

        {/* QR Code Generators */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {qrRoutes.map((route, index) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <QRGenerator
                url={route.url}
                title={route.title}
                description={route.description}
              />
            </motion.div>
          ))}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            How to Use
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">For Marketing Materials:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Generate the QR code you need</li>
                <li>Download the PNG image</li>
                <li>Add it to your flyers, business cards, or menus</li>
                <li>Customers can scan to access specific pages</li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">For Testing:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Copy the URL to test in your browser</li>
                <li>Use your phone's camera to scan QR codes</li>
                <li>Verify the landing pages work correctly</li>
                <li>Update the base URL for production</li>
              </ol>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Homepage
            </Link>
            <button
              onClick={() => window.print()}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center gap-2"
            >
              <Download size={20} />
              Print QR Codes
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
