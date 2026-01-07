import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  getTotalPrice,
  onContinueShopping,
  onCheckout
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center py-16">
          <div className="text-6xl mb-4 text-habhab-wood/20 tracking-tighter">🍱</div>
          <h2 className="text-2xl font-montserrat font-bold text-habhab-wood-dark mb-2 uppercase tracking-wide">Your cart is empty</h2>
          <p className="text-habhab-wood-light mb-8">Add some delicious catering trays to get started!</p>
          <button
            onClick={onContinueShopping}
            className="bg-habhab-wood text-white px-8 py-3 rounded-xl hover:bg-habhab-leaf transition-all duration-200 font-bold shadow-lg"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={onContinueShopping}
          className="flex items-center space-x-2 text-habhab-wood/60 hover:text-habhab-wood-dark transition-colors duration-200 font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Menu</span>
        </button>
        <h1 className="text-3xl font-montserrat font-bold text-habhab-wood-dark uppercase tracking-widest text-center flex-1">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-red-400 hover:text-red-500 transition-colors duration-200 text-sm font-bold uppercase tracking-tighter"
        >
          Clear All
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-habhab-wood/10 overflow-hidden mb-8 shadow-sm">
        {cartItems.map((item, index) => (
          <div key={item.id} className={`p-6 ${index !== cartItems.length - 1 ? 'border-b border-habhab-wood/5' : ''}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-habhab-wood-dark mb-1">{item.name}</h3>
                {item.selectedVariation && (
                  <p className="text-xs font-medium text-habhab-wood/60 mb-1">Size: {item.selectedVariation.name}</p>
                )}
                {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                  <p className="text-xs font-medium text-habhab-wood/60 mb-1">
                    Add-ons: {item.selectedAddOns.map(addOn =>
                      addOn.quantity && addOn.quantity > 1
                        ? `${addOn.name} x${addOn.quantity}`
                        : addOn.name
                    ).join(', ')}
                  </p>
                )}
                <p className="text-sm font-bold text-habhab-leaf">₱{item.totalPrice} each</p>
              </div>

              <div className="flex items-center justify-between sm:justify-end space-x-6">
                <div className="flex items-center space-x-3 bg-habhab-cream rounded-xl p-1 border border-habhab-wood/5">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1.5 hover:bg-white rounded-lg transition-colors duration-200 text-habhab-wood"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-bold text-habhab-wood-dark min-w-[28px] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 hover:bg-white rounded-lg transition-colors duration-200 text-habhab-wood"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="text-right min-w-[80px]">
                  <p className="text-lg font-bold text-habhab-wood-dark">₱{item.totalPrice * item.quantity}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-habhab-wood/10 p-8 shadow-sm">
        <div className="flex items-center justify-between text-2xl font-montserrat font-bold text-habhab-wood-dark mb-8">
          <span>Total:</span>
          <span className="text-habhab-leaf">₱{getTotalPrice().toFixed(2)}</span>
        </div>

        <button
          onClick={onCheckout}
          className="w-full bg-habhab-wood text-white py-4 rounded-xl hover:bg-habhab-leaf transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-habhab-leaf/20"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;