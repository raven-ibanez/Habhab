import React from 'react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative inline-block">
          {/* Banana Leaf Decoration */}
          <div className="absolute -left-12 -top-12 text-6xl opacity-40 animate-bounce-gentle">🍃</div>
          <div className="absolute -right-12 -bottom-12 text-6xl opacity-40 animate-bounce-gentle" style={{ animationDelay: '0.3s' }}>🍃</div>

          <h1 className="text-8xl sm:text-9xl font-script text-habhab-wood-dark mb-4 filter drop-shadow-lg">
            Hab Hab
          </h1>
        </div>

        <p className="text-2xl sm:text-3xl font-montserrat font-bold text-habhab-wood tracking-[0.2em] uppercase mb-8">
          Food Trays & Catering
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-medium text-habhab-wood-light">
          <div className="flex items-center gap-2">
            <span>📧</span> habhabbxu2019@gmail.com
          </div>
          <div className="flex items-center gap-2">
            <span>fb</span> HabHab Butuan
          </div>
          <div className="flex items-center gap-2">
            <span>📞</span> 09954599511 / 09070773452
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;