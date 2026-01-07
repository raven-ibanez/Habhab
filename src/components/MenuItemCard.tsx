import React, { useState } from 'react';
import { Plus, Minus, X, ShoppingCart } from 'lucide-react';
import { MenuItem, Variation, AddOn } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity?: number, variation?: Variation, addOns?: AddOn[]) => void;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onAddToCart,
  quantity,
  onUpdateQuantity
}) => {
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<Variation | undefined>(
    item.variations?.[0]
  );
  const [selectedAddOns, setSelectedAddOns] = useState<(AddOn & { quantity: number })[]>([]);

  const calculatePrice = () => {
    let price = item.effectivePrice || item.basePrice;
    if (selectedVariation) {
      price = (item.effectivePrice || item.basePrice) + selectedVariation.price;
    }
    selectedAddOns.forEach(addOn => {
      price += addOn.price * addOn.quantity;
    });
    return price;
  };

  const handleAddToCart = () => {
    if (item.variations?.length || item.addOns?.length) {
      setShowCustomization(true);
    } else {
      onAddToCart(item, 1);
    }
  };

  const handleCustomizedAddToCart = () => {
    const addOnsForCart: AddOn[] = selectedAddOns.flatMap(addOn =>
      Array(addOn.quantity).fill({ ...addOn, quantity: undefined })
    );
    onAddToCart(item, 1, selectedVariation, addOnsForCart);
    setShowCustomization(false);
    setSelectedAddOns([]);
  };

  const handleIncrement = () => {
    onUpdateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onUpdateQuantity(item.id, quantity - 1);
    }
  };

  const updateAddOnQuantity = (addOn: AddOn, quantity: number) => {
    setSelectedAddOns(prev => {
      const existingIndex = prev.findIndex(a => a.id === addOn.id);

      if (quantity <= 0) {
        return prev.filter(a => a.id !== addOn.id);
      }

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity };
        return updated;
      } else {
        return [...prev, { ...addOn, quantity }];
      }
    });
  };

  const groupedAddOns = item.addOns?.reduce((groups, addOn) => {
    const category = addOn.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(addOn);
    return groups;
  }, {} as Record<string, AddOn[]>);

  return (
    <>
      <div className={`bg-white rounded-xl border border-habhab-wood-light/10 p-5 hover:border-habhab-leaf/40 transition-all duration-300 animate-scale-in flex flex-col justify-between h-full ${!item.available ? 'opacity-60' : ''}`}>
        <div>
          <div className="flex justify-between items-start mb-2 text-left">
            <h4 className="text-xl font-bold text-habhab-wood-dark leading-tight">{item.name}</h4>
            <div className="text-lg font-bold text-habhab-leaf shrink-0 ml-4">
              ₱{(item.effectivePrice || item.basePrice).toFixed(2)}
            </div>
          </div>

          <p className="text-sm text-habhab-wood-light leading-relaxed mb-4 text-left">
            {!item.available ? 'Currently Unavailable' : item.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="text-[10px] font-bold text-habhab-wood/40 uppercase tracking-widest">
            {item.variations && item.variations.length > 0 ? 'Multiple sizes' : 'Standard portion'}
          </div>

          <div className="flex-shrink-0">
            {!item.available ? (
              <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Out of Stock</span>
            ) : quantity === 0 ? (
              <button
                onClick={handleAddToCart}
                className="bg-habhab-wood text-white px-5 py-2 rounded-lg hover:bg-habhab-leaf transition-all duration-200 font-bold text-sm shadow-sm"
              >
                {item.variations?.length || item.addOns?.length ? 'Customize' : 'Add'}
              </button>
            ) : (
              <div className="flex items-center space-x-2 bg-habhab-cream rounded-lg p-1 border border-habhab-wood/10">
                <button
                  onClick={handleDecrement}
                  className="p-1.5 hover:bg-white rounded-md transition-colors duration-200"
                >
                  <Minus className="h-4 w-4 text-habhab-wood" />
                </button>
                <span className="font-bold text-habhab-wood-dark min-w-[24px] text-center text-sm">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="p-1.5 hover:bg-white rounded-md transition-colors duration-200"
                >
                  <Plus className="h-4 w-4 text-habhab-wood" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showCustomization && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-6 flex items-center justify-between rounded-t-2xl z-10">
              <div>
                <h3 className="text-xl font-bold text-habhab-wood-dark">Customize {item.name}</h3>
                <p className="text-sm text-habhab-wood-light mt-1">Choose your preferences</p>
              </div>
              <button
                onClick={() => setShowCustomization(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6">
              {item.variations && item.variations.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-habhab-wood-dark uppercase tracking-widest mb-4">Choose Size</h4>
                  <div className="space-y-3">
                    {item.variations.map((variation) => (
                      <label
                        key={variation.id}
                        className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${selectedVariation?.id === variation.id
                            ? 'border-habhab-leaf bg-habhab-leaf/5'
                            : 'border-gray-100 hover:border-habhab-leaf/30'
                          }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="variation"
                            checked={selectedVariation?.id === variation.id}
                            onChange={() => setSelectedVariation(variation)}
                            className="text-habhab-leaf focus:ring-habhab-leaf"
                          />
                          <span className="font-bold text-habhab-wood-dark">{variation.name}</span>
                        </div>
                        <span className="text-habhab-wood font-bold">
                          ₱{((item.effectivePrice || item.basePrice) + variation.price).toFixed(2)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {groupedAddOns && Object.keys(groupedAddOns).length > 0 && (
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-habhab-wood-dark uppercase tracking-widest mb-4">Add-ons</h4>
                  {Object.entries(groupedAddOns).map(([category, addOns]) => (
                    <div key={category} className="mb-6 last:mb-0">
                      <h5 className="text-xs font-bold text-habhab-leaf mb-3 uppercase tracking-wider">
                        {category.replace('-', ' ')}
                      </h5>
                      <div className="space-y-3">
                        {addOns.map((addOn) => (
                          <div
                            key={addOn.id}
                            className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all duration-200"
                          >
                            <div className="flex-1">
                              <span className="font-bold text-habhab-wood-dark">{addOn.name}</span>
                              <div className="text-xs text-habhab-wood-light mt-0.5">
                                {addOn.price > 0 ? `+ ₱${addOn.price.toFixed(2)}` : 'Free'}
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              {selectedAddOns.find(a => a.id === addOn.id) ? (
                                <div className="flex items-center space-x-2 bg-habhab-leaf/10 rounded-lg p-1 border border-habhab-leaf/20">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = selectedAddOns.find(a => a.id === addOn.id);
                                      updateAddOnQuantity(addOn, (current?.quantity || 1) - 1);
                                    }}
                                    className="p-1 hover:bg-white rounded transition-colors duration-200"
                                  >
                                    <Minus className="h-3 w-3 text-habhab-leaf" />
                                  </button>
                                  <span className="font-bold text-habhab-leaf min-w-[20px] text-center text-xs">
                                    {selectedAddOns.find(a => a.id === addOn.id)?.quantity || 0}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = selectedAddOns.find(a => a.id === addOn.id);
                                      updateAddOnQuantity(addOn, (current?.quantity || 0) + 1);
                                    }}
                                    className="p-1 hover:bg-white rounded transition-colors duration-200"
                                  >
                                    <Plus className="h-3 w-3 text-habhab-leaf" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => updateAddOnQuantity(addOn, 1)}
                                  className="p-2 text-habhab-leaf hover:bg-habhab-leaf/10 rounded-lg transition-colors border border-habhab-leaf/20"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="sticky bottom-0 bg-white pt-4 pb-2 border-t border-gray-100">
                <button
                  onClick={handleCustomizedAddToCart}
                  className="w-full bg-habhab-leaf text-white py-4 rounded-xl hover:bg-habhab-leaf-dark transition-all duration-200 font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-habhab-leaf/20"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart - ₱{calculatePrice().toFixed(2)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemCard;