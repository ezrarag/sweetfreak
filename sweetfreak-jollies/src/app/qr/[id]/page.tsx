'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { ArrowLeft, QrCode } from 'lucide-react';
import Link from 'next/link';
import Menu from '@/components/Menu';
import Contact from '@/components/Contact';

export default function QRPage() {
  const params = useParams();
  const qrId = params.id as string;

  const getContent = () => {
    switch (qrId) {
      case 'menu':
        return {
          title: 'Our Menu',
          subtitle: 'Delicious candied fruits and adult drinks',
          content: <Menu />,
        };
      case 'order':
        return {
          title: 'Place Your Order',
          subtitle: 'Contact us to order your favorites',
          content: <Contact />,
        };
      case 'about':
        return {
          title: 'About Sweet Freak & Jollies',
          subtitle: 'A mother-daughter duo bringing you sweet treats',
          content: (
            <div className="py-20 px-4 bg-white/10 backdrop-blur-sm">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  <span className="text-pink-500 bubble-text">About</span>
                  <span className="text-purple-500 bubble-text"> Us</span>
                </h2>
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We&apos;re a passionate mother-daughter team bringing you the sweetest treats and most refreshing drinks! 
                    Our candied fruits are made with love and our adult drinks pack a Jolly Rancher punch that&apos;ll make your taste buds dance.
                  </p>
                </div>
              </div>
            </div>
          ),
        };
      default:
        return {
          title: 'Welcome to Sweet Freak & Jollies',
          subtitle: 'Scan another QR code or explore our site',
          content: (
            <div className="py-20 px-4 bg-white/10 backdrop-blur-sm">
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    QR Code Not Found
                  </h2>
                  <p className="text-gray-600 mb-6">
                    This QR code doesn&apos;t match any of our pages. Please try scanning a different code.
                  </p>
                  <Link
                    href="/"
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
                  >
                    Go to Homepage
                  </Link>
                </div>
              </div>
            </div>
          ),
        };
    }
  };

  const { title, subtitle, content } = getContent();

  return (
    <div className="min-h-screen">
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
              <QrCode size={24} className="text-pink-500" />
              <span className="font-bold text-gray-800">QR Landing</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-20 px-4 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-pink-500 bubble-text">{title}</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8">{subtitle}</p>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {content}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-white/90 backdrop-blur-sm py-8 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Sweet Freak & Jollies
          </h3>
          <p className="text-gray-600 mb-4">
            Candied Fruits & Adult Drinks with a Jolly Rancher Twist
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/"
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
            >
              Visit Full Site
            </Link>
            <Link
              href="/admin"
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
