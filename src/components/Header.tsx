import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onMenuClick }) => {
  const { loading } = useSiteSettings();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-habhab-wood-light/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={onMenuClick}
            className="flex items-center space-x-3 text-habhab-wood-dark hover:text-habhab-leaf transition-colors duration-200"
          >
            {loading ? (
              <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse" />
            ) : (
              <h1 className="text-2xl font-script">
                Hab Hab
              </h1>
            )}
            <span className="hidden sm:block text-xs font-montserrat font-bold tracking-widest uppercase opacity-60 pt-1">
              Food Trays
            </span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={onCartClick}
              className="relative p-2 text-habhab-wood-dark hover:text-habhab-leaf hover:bg-habhab-leaf/10 rounded-full transition-all duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-habhab-leaf text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center animate-bounce-gentle">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;