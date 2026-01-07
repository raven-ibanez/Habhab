import React from 'react';
import { MenuItem, CartItem } from '../types';
import { useCategories } from '../hooks/useCategories';
import MenuItemCard from './MenuItemCard';

interface MenuProps {
  menuItems: MenuItem[];
  addToCart: (item: MenuItem, quantity?: number, variation?: any, addOns?: any[]) => void;
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
}

const Menu: React.FC<MenuProps> = ({ menuItems, addToCart, cartItems, updateQuantity }) => {
  const { categories } = useCategories();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-montserrat font-bold text-habhab-wood-dark mb-4 uppercase tracking-[0.1em]">Our Menu</h2>
        <div className="h-1 w-20 bg-habhab-leaf mx-auto rounded-full mb-6" />
        <p className="text-habhab-wood-light max-w-2xl mx-auto font-medium">
          Freshly prepared food trays and professional catering services for your special occasions.
          Everything made with love and fresh ingredients.
        </p>
      </div>

      {categories.map((category) => {
        const categoryItems = menuItems.filter(item => item.category === category.id);

        if (categoryItems.length === 0) return null;

        return (
          <section key={category.id} id={category.id} className="mb-20">
            <div className="flex items-center mb-10 border-b border-habhab-wood/10 pb-4">
              <span className="text-3xl mr-4">{category.icon}</span>
              <h3 className="text-3xl font-montserrat font-bold text-habhab-wood uppercase tracking-wider">{category.name}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryItems.map((item) => {
                const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
                return (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    onAddToCart={addToCart}
                    quantity={cartItem?.quantity || 0}
                    onUpdateQuantity={updateQuantity}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </main>
  );
};

export default Menu;