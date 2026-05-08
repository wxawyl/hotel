import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { BookingContext } from '../contexts/BookingContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getProductImage } from '../utils/imageGenerator';

const defaultProductImage = 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=300&fit=crop';

const Products = () => {
  const { t, i18n } = useTranslation();
  const { currency, convertPrice, language, cart, setCart } = useContext(BookingContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [quantities, setQuantities] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const categories = [
    { id: 'all', name: { en: 'All', de: 'Alle', ko: '전체', ja: '全て', zh: '全部', vi: 'Tất cả' } },
    { id: 'food', name: { en: 'Food & Drinks', de: 'Essen & Trinken', ko: '음식 및 음료', ja: '食品・飲料', zh: '食品饮料', vi: 'Thực phẩm & đồ uống' } },
    { id: 'souvenir', name: { en: 'Souvenirs', de: 'Souvenirs', ko: '기념품', ja: '土産物', zh: '纪念品', vi: 'Kỷ niệm' } },
    { id: 'daily', name: { en: 'Daily Needs', de: 'Tägliche Bedürfnisse', ko: '일용품', ja: '日用品', zh: '日用品', vi: 'Hàng tiêu dùng' } },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        if (response.data.success) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getLocaleText = (obj) => {
    if (!obj) return '';
    try {
      const parsed = typeof obj === 'string' ? JSON.parse(obj) : obj;
      return parsed[language] || parsed.en || '';
    } catch {
      return obj.en || '';
    }
  };

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    console.log('Adding to cart:', product.name, 'quantity:', quantity);
    const existingItem = cart.find(item => item.id === product.id);
    
    let newCart;
    if (existingItem) {
      newCart = cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity }];
    }
    
    console.log('New cart:', newCart);
    setCart(newCart);
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
    setToastMessage(t('added.to.cart'));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const updateQuantity = (productId, qty) => {
    if (qty < 1) return;
    setQuantities(prev => ({ ...prev, [productId]: qty }));
  };

  const updateCartItemQuantity = (productId, qty) => {
    if (qty < 1) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: qty } : item
      ));
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(p => p.category === category);

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">{t('products.title')}</h1>
        <p className="text-gray-600 mb-8">
          {t('products.desc')}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                category === cat.id
                  ? 'bg-ocean text-white'
                  : 'bg-sand text-gray-600 hover:bg-ocean/20'
              }`}
            >
              {cat.name[language] || cat.name.en}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card overflow-hidden group">
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image_url ? product.image_url : (getProductImage(product.name) || defaultProductImage)}
                  alt={getLocaleText(product.name_locale)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = getProductImage(product.name) || defaultProductImage;
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">{getLocaleText(product.name_locale)}</h3>
                <p className="text-gray-600 text-sm mb-4">{getLocaleText(product.description_locale)}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xl font-bold text-ocean">
                    {currency} {convertPrice(product.price)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(product.id, (quantities[product.id] || 1) - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{quantities[product.id] || 1}</span>
                    <button
                      onClick={() => updateQuantity(product.id, (quantities[product.id] || 1) + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {t('stock')}: {product.stock}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="btn-primary px-4 py-2"
                  >
                    {t('add.to.cart')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">{t('no.products')}</p>
          </div>
        )}

        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setShowCart(true)}
            className="bg-orange-500 text-white px-8 py-5 rounded-full shadow-2xl flex items-center gap-3 hover:bg-orange-600 transition-all transform hover:scale-110 animate-pulse"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cart.length > 0 && (
              <>
                <span className="font-bold text-lg">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                <span className="text-sm">items</span>
                <span className="border-l border-white/30 pl-3">
                  {currency} {convertPrice(getCartTotal())}
                </span>
              </>
            )}
            {cart.length === 0 && (
              <span className="text-base font-semibold">Cart</span>
            )}
          </button>
        </div>

        {showToast && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
            {toastMessage}
          </div>
        )}

        {showCart && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCart(false)}>
            <div className="bg-white rounded-xl max-w-lg w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">{t('shopping.cart')}</h2>
                  <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-[50vh]">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-gray-500">{t('cart.empty')}</p>
                    <button
                      onClick={() => setShowCart(false)}
                      className="mt-4 text-ocean hover:text-ocean/80 font-medium"
                    >
                      {t('cart.shop_now')}
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                      <img
                        src={item.image_url || getProductImage(item.name) || defaultProductImage}
                        alt={getLocaleText(item.name_locale)}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold">{getLocaleText(item.name_locale)}</h3>
                        <p className="text-ocean">{currency} {convertPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">{t('total')}</span>
                  <span className="text-2xl font-bold text-ocean">
                    {currency} {convertPrice(getCartTotal())}
                  </span>
                </div>
                <button 
                  onClick={() => {
                    setShowCart(false);
                    navigate('/checkout');
                  }}
                  className="btn-primary w-full py-3"
                >
                  {t('checkout')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;