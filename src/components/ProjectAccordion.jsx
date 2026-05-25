import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';

export default function ProjectAccordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 py-12">
      <div className="flex flex-col border-t border-gray-300">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={item.title}
              className="border-b border-gray-300 overflow-hidden group pointer-events-auto transition-colors"
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              tabIndex={0}
            >
              <div className="relative">
                {/* Collapsed State Header (always visible, but hidden when active) */}
                <motion.div
                  animate={{ height: isActive ? 0 : 'auto', opacity: isActive ? 0 : 1 }}
                  className="w-full bg-[#f0f2f5] overflow-hidden"
                >
                  <div className="w-full py-6 px-4 md:px-8 flex items-center cursor-pointer">
                    <div className="bg-[#120F17] text-white p-1 md:p-1.5 rounded-sm mr-4 md:mr-6 transition-transform group-hover:-translate-y-1">
                      <ArrowUpRight size={24} weight="bold" />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#120F17]">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>

                {/* Expanded State Content */}
                <motion.div
                  initial={false}
                  animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                  className="w-full bg-white overflow-hidden"
                >
                  <div className="w-full flex flex-col md:flex-row py-10 px-4 md:px-8 gap-8 justify-between">
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-[#120F17] text-white w-12 h-12 flex items-center justify-center rounded-sm shrink-0">
                          {item.icon ? React.createElement(item.icon, { size: 28, weight: "bold" }) : index + 1}
                        </div>
                        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#120F17]">
                          {item.title}
                        </h2>
                      </div>
                      
                      <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-4">
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="px-8 py-2 md:py-3 border-2 border-[#120F17] rounded-full font-bold text-[#120F17] hover:bg-[#120F17] hover:text-white transition-colors uppercase tracking-wider text-sm md:text-base cursor-pointer pointer-events-auto shadow-[4px_4px_0px_transparent] hover:shadow-[4px_4px_0px_#120F17] transition-all"
                          >
                            GitHub
                          </a>
                        )}
                        {(item.demoLink || item.link) && (
                          <a
                            href={item.demoLink || item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="px-8 py-2 md:py-3 border-2 border-[#120F17] rounded-full font-bold text-[#120F17] hover:bg-[#120F17] hover:text-white transition-colors uppercase tracking-wider text-sm md:text-base cursor-pointer pointer-events-auto shadow-[4px_4px_0px_transparent] hover:shadow-[4px_4px_0px_#120F17] transition-all"
                          >
                            View
                          </a>
                        )}
                      </div>
                    </div>
                    {item.media && (
                      <div className="w-full md:w-1/2 flex items-center justify-center rounded-2xl overflow-hidden bg-gray-100 shadow-md">
                        {item.media.type === 'video' ? (
                          <video 
                            src={item.media.url} 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            className="w-full h-auto object-cover max-h-[400px]"
                          />
                        ) : (
                          <img 
                            src={item.media.url} 
                            alt={item.title} 
                            className="w-full h-auto object-cover max-h-[400px]"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
