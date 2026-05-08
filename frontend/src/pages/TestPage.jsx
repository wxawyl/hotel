import React from 'react';
import { useTranslation } from 'react-i18next';

const TestPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Test Page</h1>
        <p className="text-gray-600 mb-8">This is a test page to verify routing works</p>
        
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Booking Form Test</h2>
          <div className="space-y-4">
            <div className="p-4 border-2 border-gray-200 rounded-xl">
              <label className="block text-sm font-medium mb-2">Select Hotel</label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl">
                <option>Hotel 1</option>
                <option>Hotel 2</option>
                <option>Hotel 3</option>
              </select>
            </div>
            
            <div className="p-4 border-2 border-gray-200 rounded-xl">
              <label className="block text-sm font-medium mb-2">Services</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">Breakfast - $15</div>
                <div className="p-3 bg-gray-50 rounded-lg">Spa - $50</div>
              </div>
            </div>
            
            <button className="w-full bg-blue-500 text-white py-4 rounded-xl font-medium hover:bg-blue-600 transition-colors">
              {t('confirm.booking')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;