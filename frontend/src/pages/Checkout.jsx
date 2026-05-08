import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookingContext } from '../contexts/BookingContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { t, i18n } = useTranslation();
  const { cart, currency, convertPrice, getLocaleText } = useContext(BookingContext);
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePayment = async () => {
    if (paymentMethod === 'credit' && (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv)) {
      alert(t('please_fill_all_card_details'));
      return;
    }

    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          amount: getTotal(),
          cart: cart,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setPaymentSuccess(true);
      } else {
        alert(result.error || t('payment_failed'));
      }
    } catch (error) {
      alert(t('payment_error') + ': ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (cart.length === 0 && !paymentSuccess) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
        <p className="text-gray-600 text-lg">{t('your_cart_is_empty')}</p>
        <button
          onClick={() => navigate('/products')}
          className="mt-4 btn-primary"
        >
          {t('continue_shopping')}
        </button>
      </div>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('payment_success')}</h2>
            <p className="text-gray-600 mb-8">{t('payment_success_desc')}</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-gray-800 mb-2">{t('order_summary')}</h3>
              <div className="space-y-2">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{getLocaleText(item.name) || getLocaleText(item.name_locale) || item.name} x {item.quantity}</span>
                    <span>{currency} {convertPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                  <span>{t('total')}</span>
                  <span>{currency} {convertPrice(getTotal())}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleContinueShopping}
              className="btn-primary px-8 py-3"
            >
              {t('continue_shopping')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">{t('checkout')}</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-6">{t('order_summary')}</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 py-4 border-b last:border-0">
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl">
                    {item.type === 'room' ? (
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    ) : item.type === 'service' ? (
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ) : (
                      <img
                        src={item.image_url || `https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=100&h=100&fit=crop`}
                        alt={item.name}
                        className="w-full h-full rounded-lg object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{getLocaleText(item.name) || getLocaleText(item.name_locale) || item.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {item.type === 'room' ? `Qty: ${item.quantity} x ${item.nights} nights` : 
                       item.type === 'service' && item.multiplier > 1 ? `Qty: ${item.multiplier}` :
                       `Qty: ${item.quantity || 1}`}
                    </p>
                  </div>
                  <p className="font-semibold text-ocean">{currency} {convertPrice(item.price * (item.quantity || 1))}</p>
                </div>
              ))}
              <div className="pt-4 border-t mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">{t('total')}</span>
                  <span className="text-2xl font-bold text-ocean">{currency} {convertPrice(getTotal())}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-6">{t('payment_details')}</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">{t('payment_method')}</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setPaymentMethod('credit')}
                    className={`p-4 rounded-lg border-2 transition ${
                      paymentMethod === 'credit' ? 'border-ocean bg-ocean/5' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                        <line x1="1" y1="10" x2="23" y2="10"/>
                      </svg>
                      <span className="text-sm">{t('stripe')}</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-4 rounded-lg border-2 transition ${
                      paymentMethod === 'paypal' ? 'border-ocean bg-ocean/5' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#003087">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span className="text-sm">{t('paypal')}</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('vnpay')}
                    className={`p-4 rounded-lg border-2 transition ${
                      paymentMethod === 'vnpay' ? 'border-ocean bg-ocean/5' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                      <span className="text-sm">{t('vnpay')}</span>
                    </div>
                  </button>
                </div>
              </div>
              
              {paymentMethod === 'credit' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">{t('card_number')}</label>
                    <input
                      type="text"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                      placeholder={t('card_number_placeholder')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">{t('card_holder_name')}</label>
                    <input
                      type="text"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                      placeholder={t('card_holder_placeholder')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">{t('expiry_date')}</label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                        placeholder={t('expiry_placeholder')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">{t('cvv')}</label>
                      <input
                        type="text"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        placeholder={t('cvv_placeholder')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'paypal' && (
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-blue-700">{t('paypal_redirect')}</p>
                </div>
              )}
              
              {paymentMethod === 'vnpay' && (
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="text-center mb-4">
                    <svg className="w-12 h-12 text-red-600 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                    <p className="text-red-700 font-medium">{t('vnpay_title')}</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">{t('bank_account_number')}</label>
                      <input
                        type="text"
                        placeholder={t('bank_account_placeholder')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">{t('account_holder_name')}</label>
                      <input
                        type="text"
                        placeholder={t('account_holder_placeholder')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full mt-6 btn-primary py-3 text-lg font-medium"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    {t('processing')}
                  </span>
                ) : (
                  `${t('pay')} ${currency} ${convertPrice(getTotal())}`
                )}
              </button>
              
              <p className="text-center text-gray-500 text-sm mt-4">
                {t('terms_of_service')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;