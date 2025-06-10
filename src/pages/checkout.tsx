import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../lib/cart-context';
import { LanguageContext } from '../App';
import Navbar from '../components/Navbar';

// Translation dictionaries
const translations = {
  en: {
    checkout: 'Checkout',
    yourOrder: 'Your Order',
    fullName: 'Full Name',
    address: 'Address',
    phoneNumber: 'Phone Number',
    paymentNote: 'Payment on delivery',
    order: 'Order',
    orderConfirmed: 'Order confirmed. Thank you for your purchase!',
    nameRequired: 'Name is required',
    addressRequired: 'Address is required',
    phoneRequired: 'Phone number is required',
    total: 'Total'
  },
  al: {
    checkout: 'Blerja',
    yourOrder: 'Porosia Juaj',
    fullName: 'Emri i Plotë',
    address: 'Adresa',
    phoneNumber: 'Numri i Telefonit',
    paymentNote: 'Pagesa ne dorezim te produktit',
    order: 'Porosit',
    orderConfirmed: 'Porosia u konfirmua. Faleminderit për blerjen!',
    nameRequired: 'Emri është i detyrueshëm',
    addressRequired: 'Adresa është e detyrueshme',
    phoneRequired: 'Numri i telefonit është i detyrueshëm',
    total: 'Totali'
  },
  it: {
    checkout: 'Checkout',
    yourOrder: 'Il Tuo Ordine',
    fullName: 'Nome Completo',
    address: 'Indirizzo',
    phoneNumber: 'Numero di Telefono',
    paymentNote: 'Pagamento alla consegna',
    order: 'Ordina',
    orderConfirmed: 'Ordine confermato. Grazie per il tuo acquisto!',
    nameRequired: 'Il nome è richiesto',
    addressRequired: "L'indirizzo è richiesto",
    phoneRequired: 'Il numero di telefono è richiesto',
    total: 'Totale'
  }
};

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const t = translations[language] || translations.en;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t.nameRequired;
    }

    if (!formData.address.trim()) {
      newErrors.address = t.addressRequired;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = t.phoneRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Prepare order data
    const orderData = {
      customerInfo: formData,
      items: cart.map(({product}) => ({
        name: product.name,
        price: product.price,
        description: product.description
      })),
      orderDate: new Date().toISOString(),
      language: language
    };

    // Here you can send the order data to your backend/email service
    console.log('Order data:', orderData);

    // For now, we'll just simulate the order confirmation
    setIsOrderConfirmed(true);

    // Clear cart after successful order
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (isOrderConfirmed) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center bg-zinc-50">
          <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-zinc-800 mb-2">{t.orderConfirmed}</h2>
            <p className="text-zinc-600">Redirecting to home...</p>
          </div>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    return cart.reduce((total, {product}) => {
      // Extract numeric value from price string (assuming format like "$999")
      const price = parseFloat(product.price.replace(/[^\d.]/g, ''));
      return total + price;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <div className="pt-20 pb-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">{t.checkout}</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{t.yourOrder}</h2>
              <div className="space-y-4">
                {cart.map(({product}, idx) => (
                  <div key={product.name} className="flex items-center gap-4 py-2 border-b border-zinc-100">
                    <img
                      src={product.gallery[0]}
                      alt={product.name}
                      className="w-16 h-12 object-cover rounded border border-zinc-200"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-zinc-600 text-sm">{product.price}</div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 font-semibold text-lg">
                  <span>{t.total}:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <form onSubmit={handleSubmitOrder} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-zinc-700 mb-2">
                    {t.fullName} *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition ${
                      errors.fullName ? 'border-red-500' : 'border-zinc-300'
                    }`}
                    required
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-zinc-700 mb-2">
                    {t.address} *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition resize-none ${
                      errors.address ? 'border-red-500' : 'border-zinc-300'
                    }`}
                    required
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-zinc-700 mb-2">
                    {t.phoneNumber} *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition ${
                      errors.phoneNumber ? 'border-red-500' : 'border-zinc-300'
                    }`}
                    required
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

                {/* Payment Note */}
                <div className="bg-zinc-50 p-4 rounded-lg">
                  <p className="text-zinc-700 text-center font-medium">
                    {t.paymentNote}
                  </p>
                </div>

                {/* Order Button */}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg hover:bg-zinc-800 transition-colors"
                >
                  {t.order}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
