import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { CartItem, PaymentMethod, ServiceType } from '../types';
import { usePaymentMethods } from '../hooks/usePaymentMethods';

interface CheckoutProps {
  cartItems: CartItem[];
  totalPrice: number;
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, totalPrice, onBack }) => {
  const { paymentMethods } = usePaymentMethods();
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType>('dine-in');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pickupTime, setPickupTime] = useState('5-10');
  const [customTime, setCustomTime] = useState('');
  // Dine-in specific state
  const [partySize, setPartySize] = useState(1);
  const [dineInTime, setDineInTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('gcash');
  const [notes, setNotes] = useState('');

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Set default payment method when payment methods are loaded
  React.useEffect(() => {
    if (paymentMethods.length > 0 && !paymentMethod) {
      setPaymentMethod(paymentMethods[0].id as PaymentMethod);
    }
  }, [paymentMethods, paymentMethod]);

  const selectedPaymentMethod = paymentMethods.find(method => method.id === paymentMethod);

  const handleProceedToPayment = () => {
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    const timeInfo = serviceType === 'pickup'
      ? (pickupTime === 'custom' ? customTime : `${pickupTime} minutes`)
      : '';

    const dineInInfo = serviceType === 'dine-in'
      ? `👥 Party Size: ${partySize} person${partySize !== 1 ? 's' : ''}\n🕐 Preferred Time: ${new Date(dineInTime).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}`
      : '';

    const orderDetails = `
🛒 HabHab ORDER

👤 Customer: ${customerName}
📞 Contact: ${contactNumber}
📍 Service: ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}
${serviceType === 'delivery' ? `🏠 Address: ${address}${landmark ? `\n🗺️ Landmark: ${landmark}` : ''}` : ''}
${serviceType === 'pickup' ? `⏰ Pickup Time: ${timeInfo}` : ''}
${serviceType === 'dine-in' ? dineInInfo : ''}


📋 ORDER DETAILS:
${cartItems.map(item => {
      let itemDetails = `• ${item.name}`;
      if (item.selectedVariation) {
        itemDetails += ` (${item.selectedVariation.name})`;
      }
      if (item.selectedAddOns && item.selectedAddOns.length > 0) {
        itemDetails += ` + ${item.selectedAddOns.map(addOn =>
          addOn.quantity && addOn.quantity > 1
            ? `${addOn.name} x${addOn.quantity}`
            : addOn.name
        ).join(', ')}`;
      }
      itemDetails += ` x${item.quantity} - ₱${item.totalPrice * item.quantity}`;
      return itemDetails;
    }).join('\n')}

💰 TOTAL: ₱${totalPrice}
${serviceType === 'delivery' ? `🛵 DELIVERY FEE: ` : ''}

💳 Payment: ${selectedPaymentMethod?.name || paymentMethod}
📸 Payment Screenshot: Please attach your payment receipt screenshot

${notes ? `📝 Notes: ${notes}` : ''}

Please confirm this order to proceed. Thank you for choosing HabHab! 🍲
    `.trim();

    const encodedMessage = encodeURIComponent(orderDetails);
    const messengerUrl = `https://m.me/habhabbxu2019?text=${encodedMessage}`;

    window.open(messengerUrl, '_blank');
  };

  const isDetailsValid = customerName && contactNumber &&
    (serviceType !== 'delivery' || address) &&
    (serviceType !== 'pickup' || (pickupTime !== 'custom' || customTime)) &&
    (serviceType !== 'dine-in' || (partySize > 0 && dineInTime));

  if (step === 'details') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-habhab-wood/60 hover:text-habhab-wood-dark transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Cart</span>
          </button>
          <h1 className="text-3xl font-montserrat font-bold text-habhab-wood-dark ml-8 uppercase tracking-widest">Order Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl border border-habhab-wood/10 p-8 shadow-sm h-fit">
            <h2 className="text-xl font-bold text-habhab-wood-dark mb-6 uppercase tracking-wider">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b border-habhab-wood/5 last:border-0">
                  <div className="flex-1 pr-4">
                    <h4 className="font-bold text-habhab-wood-dark">{item.name}</h4>
                    {item.selectedVariation && (
                      <p className="text-xs text-habhab-wood/60 uppercase font-medium mt-0.5">Size: {item.selectedVariation.name}</p>
                    )}
                    {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                      <p className="text-xs text-habhab-wood/60 font-medium mt-0.5">
                        Add-ons: {item.selectedAddOns.map(addOn => addOn.name).join(', ')}
                      </p>
                    )}
                    <p className="text-xs font-bold text-habhab-leaf mt-1">₱{item.totalPrice} x {item.quantity}</p>
                  </div>
                  <span className="font-bold text-habhab-wood-dark">₱{item.totalPrice * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-habhab-wood/10 pt-6">
              <div className="flex items-center justify-between text-2xl font-montserrat font-bold text-habhab-wood-dark">
                <span>Total:</span>
                <span className="text-habhab-leaf">₱{totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="bg-white rounded-2xl border border-habhab-wood/10 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-habhab-wood-dark mb-6 uppercase tracking-wider">Customer Information</h2>

            <form className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-habhab-wood-dark uppercase tracking-widest mb-2">Full Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 border border-habhab-wood/10 rounded-xl focus:ring-2 focus:ring-habhab-leaf/20 focus:border-habhab-leaf transition-all duration-200 outline-none"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-habhab-wood-dark uppercase tracking-widest mb-2">Contact Number *</label>
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-habhab-wood/10 rounded-xl focus:ring-2 focus:ring-habhab-leaf/20 focus:border-habhab-leaf transition-all duration-200 outline-none"
                  placeholder="09XX XXX XXXX"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-habhab-wood-dark uppercase tracking-widest mb-3">Service Type *</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'dine-in', label: 'Dine In', icon: '🍲' },
                    { value: 'pickup', label: 'Pickup', icon: '🚶' },
                    { value: 'delivery', label: 'Delivery', icon: '🛵' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setServiceType(option.value as ServiceType)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${serviceType === option.value
                        ? 'border-habhab-wood bg-habhab-wood text-white shadow-md'
                        : 'border-habhab-wood/5 bg-habhab-cream/30 text-habhab-wood hover:border-habhab-wood/20'
                        }`}
                    >
                      <div className="text-xl mb-1">{option.icon}</div>
                      <div className="text-[10px] font-bold uppercase tracking-tighter">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {serviceType === 'dine-in' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-habhab-wood-dark uppercase tracking-widest mb-2">Party Size *</label>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={() => setPartySize(Math.max(1, partySize - 1))}
                        className="w-10 h-10 rounded-lg border border-habhab-wood/10 flex items-center justify-center text-habhab-wood hover:bg-habhab-cream transition-all duration-200"
                      >
                        -
                      </button>
                      <span className="text-xl font-bold text-habhab-wood-dark min-w-[2rem] text-center">{partySize}</span>
                      <button
                        type="button"
                        onClick={() => setPartySize(Math.min(50, partySize + 1))}
                        className="w-10 h-10 rounded-lg border border-habhab-wood/10 flex items-center justify-center text-habhab-wood hover:bg-habhab-cream transition-all duration-200"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-habhab-wood-dark uppercase tracking-widest mb-2">Preferred Time *</label>
                    <input
                      type="datetime-local"
                      value={dineInTime}
                      onChange={(e) => setDineInTime(e.target.value)}
                      className="w-full px-4 py-3 border border-habhab-wood/10 rounded-xl focus:ring-2 focus:ring-habhab-leaf/20 focus:border-habhab-leaf transition-all duration-200 outline-none"
                      required
                    />
                  </div>
                </>
              )}

              {serviceType === 'pickup' && (
                <div>
                  <label className="block text-xs font-bold text-habhab-wood-dark uppercase tracking-widest mb-3">Pickup Time *</label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: '15-20', label: '15-20 mins' },
                        { value: '30-45', label: '30-45 mins' },
                        { value: '60+', label: '1 hour +' },
                        { value: 'custom', label: 'Custom' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setPickupTime(option.value)}
                          className={`p-3 rounded-xl border-2 transition-all duration-200 text-xs font-bold uppercase tracking-wider ${pickupTime === option.value
                            ? 'border-habhab-wood bg-habhab-wood text-white'
                            : 'border-habhab-wood/5 bg-habhab-cream/30 text-habhab-wood'
                            }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>

                    {pickupTime === 'custom' && (
                      <input
                        type="text"
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                        className="w-full px-4 py-3 border border-habhab-wood/10 rounded-xl focus:ring-2 focus:ring-habhab-leaf/20 focus:border-habhab-leaf transition-all duration-200 outline-none"
                        placeholder="e.g. 2:30 PM Tomorrow"
                        required
                      />
                    )}
                  </div>
                </div>
              )}

              {serviceType === 'delivery' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-habhab-wood-dark uppercase tracking-widest mb-2">Delivery Address *</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 border border-habhab-wood/10 rounded-xl focus:ring-2 focus:ring-habhab-leaf/20 focus:border-habhab-leaf transition-all duration-200 outline-none"
                      placeholder="Enter your complete delivery address"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-habhab-wood-dark uppercase tracking-widest mb-2">Landmark</label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full px-4 py-3 border border-habhab-wood/10 rounded-xl focus:ring-2 focus:ring-habhab-leaf/20 focus:border-habhab-leaf transition-all duration-200 outline-none"
                      placeholder="e.g. Near City Hall"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-habhab-wood-dark uppercase tracking-widest mb-2">Special Instructions</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 border border-habhab-wood/10 rounded-xl focus:ring-2 focus:ring-habhab-leaf/20 focus:border-habhab-leaf transition-all duration-200 outline-none"
                  placeholder="Any special requests or notes..."
                  rows={2}
                />
              </div>

              <button
                type="button"
                onClick={handleProceedToPayment}
                disabled={!isDetailsValid}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 transform shadow-lg ${isDetailsValid
                  ? 'bg-habhab-leaf text-white hover:bg-habhab-leaf-dark hover:scale-[1.02]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                  }`}
              >
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Payment Step
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={() => setStep('details')}
          className="flex items-center space-x-2 text-habhab-wood/60 hover:text-habhab-wood-dark transition-colors duration-200 font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Details</span>
        </button>
        <h1 className="text-3xl font-montserrat font-bold text-habhab-wood-dark ml-8 uppercase tracking-widest">Payment</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-habhab-wood/10 p-8 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-habhab-wood-dark mb-6 uppercase tracking-wider">Payment Method</h2>

          <div className="grid grid-cols-1 gap-4 mb-8">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center space-x-4 ${paymentMethod === method.id
                  ? 'border-habhab-leaf bg-habhab-leaf/5 text-habhab-wood-dark shadow-sm'
                  : 'border-habhab-wood/5 bg-habhab-cream/30 text-habhab-wood hover:border-habhab-wood/10'
                  }`}
              >
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm border border-habhab-wood/5">
                  💳
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold">{method.name}</div>
                  <div className="text-[10px] uppercase font-bold text-habhab-wood/40 tracking-wider">Fast & Secure</div>
                </div>
                {paymentMethod === method.id && (
                  <div className="w-6 h-6 bg-habhab-leaf rounded-full flex items-center justify-center text-white">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>

          {selectedPaymentMethod && (
            <div className="bg-habhab-cream/30 rounded-2xl border border-habhab-wood/5 p-6 mb-8">
              <h3 className="text-xs font-bold text-habhab-leaf uppercase tracking-widest mb-4">Payment Details</h3>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-2 bg-white rounded-2xl shadow-sm border border-habhab-wood/5">
                  <img
                    src={selectedPaymentMethod.qr_code_url}
                    alt={`${selectedPaymentMethod.name} QR Code`}
                    className="w-48 h-48 rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-habhab-wood-dark uppercase tracking-wide">{selectedPaymentMethod.account_name}</p>
                  <p className="font-mono text-lg font-bold text-habhab-leaf">{selectedPaymentMethod.account_number}</p>
                  <p className="text-xs font-medium text-habhab-wood/60 italic mt-2">Scan QR code or use account details</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-4">
            <span className="text-2xl">📸</span>
            <p className="text-xs font-medium text-blue-800 leading-relaxed">
              <strong>Keep your receipt!</strong> After payment, take a screenshot and attach it to the messenger chat to confirm your order.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-habhab-wood/10 p-8 shadow-sm">
          <h2 className="text-xl font-bold text-habhab-wood-dark mb-6 uppercase tracking-wider">Final Verification</h2>

          <div className="space-y-4 mb-8">
            <div className="bg-habhab-cream/20 rounded-xl p-4 border border-habhab-wood/5">
              <h4 className="text-[10px] font-bold text-habhab-leaf uppercase tracking-widest mb-2">Delivery & Customer</h4>
              <div className="space-y-1 text-sm">
                <p className="text-habhab-wood-dark"><strong>{customerName}</strong></p>
                <p className="text-habhab-wood/60 font-medium">{contactNumber}</p>
                <div className="pt-2">
                  <span className="bg-habhab-wood text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">{serviceType}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-start text-sm border-b border-habhab-wood/5 pb-2 last:border-0 last:pb-0">
                  <div className="flex-1 pr-4">
                    <p className="font-bold text-habhab-wood-dark">{item.name} x{item.quantity}</p>
                    <p className="text-[10px] text-habhab-wood/60 font-medium">₱{item.totalPrice} each</p>
                  </div>
                  <p className="font-bold text-habhab-wood-dark">₱{item.totalPrice * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-habhab-wood/10 pt-6 mb-8">
            <div className="flex items-center justify-between text-2xl font-montserrat font-bold text-habhab-wood-dark">
              <span>Total:</span>
              <span className="text-habhab-leaf">₱{totalPrice}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 transform bg-habhab-wood text-white hover:bg-habhab-leaf hover:scale-[1.02] shadow-lg shadow-habhab-wood/10"
          >
            Send Order via Messenger
          </button>

          <p className="text-[10px] text-habhab-wood/40 text-center mt-4 leading-relaxed font-medium">
            You will be redirected to Facebook Messenger to complete your order. Thank you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;