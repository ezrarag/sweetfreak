'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import QRCode from 'qrcode';
import { Download, Copy, QrCode as QrCodeIcon } from 'lucide-react';

interface QRGeneratorProps {
  url: string;
  title: string;
  description?: string;
}

export default function QRGenerator({ url, title, description }: QRGeneratorProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = async () => {
    setIsGenerating(true);
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      setQrCodeDataUrl(dataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement('a');
      link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-qr.png`;
      link.href = qrCodeDataUrl;
      link.click();
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <QrCodeIcon size={32} className="text-pink-500" />
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        </div>
        
        {description && (
          <p className="text-gray-600 mb-6">{description}</p>
        )}

        <div className="mb-6">
          <div className="bg-gray-100 rounded-2xl p-4 mb-4">
            <p className="text-sm text-gray-600 mb-2">URL:</p>
            <p className="text-sm font-mono text-gray-800 break-all">{url}</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateQRCode}
            disabled={isGenerating}
            className="bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center gap-2 mx-auto"
          >
            {isGenerating ? 'Generating...' : 'Generate QR Code'}
          </motion.button>
        </div>

        {qrCodeDataUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <img
                src={qrCodeDataUrl}
                alt={`QR Code for ${title}`}
                className="mx-auto"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadQRCode}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-colors flex items-center gap-2"
              >
                <Download size={16} />
                Download
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyUrl}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors flex items-center gap-2"
              >
                <Copy size={16} />
                Copy URL
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
