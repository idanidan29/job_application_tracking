'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { algorithms } from '../data/algorithms';

interface Section {
  id: string;
  title: string;
  icon: string;
}

interface TableOfContentsProps {
  sections: Section[];
  activeSection: string;
  setActiveSection: (section: string) => void;
}

// Contents View Component
const ContentsView = ({ sections, activeSection, scrollToSection }: {
  sections: Section[];
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}) => (
  <div className="space-y-1">
    {sections.map((section) => (
      <button
        key={section.id}
        onClick={() => scrollToSection(section.id)}
        className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 ${
          activeSection === section.id
            ? 'bg-purple-600 text-white'
            : 'text-gray-300 hover:bg-gray-700'
        }`}
      >
        <span className="text-lg">{section.icon}</span>
        <span className="font-medium">{section.title}</span>
      </button>
    ))}
  </div>
);

// Algorithms View Component
const AlgorithmsView = ({ setIsMobileMenuOpen }: {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Get unique categories from all algorithms
  const allCategories = Array.from(new Set(algorithms.flatMap(alg => alg.categories)));

  // Category to emoji mapping
  const categoryEmojis: { [key: string]: string } = {
    'supervised': '📚',
    'unsupervised': '🔍',
    'classification': '🏷️',
    'regression': '📈',
    'clustering': '🎯',
    'ensemble': '🌳'
  };

  // Get current pathname
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  // Filter out the current algorithm and apply category filter
  const filteredAlgorithms = algorithms
    .filter(alg => alg.path !== currentPath)
    .filter(alg => !selectedCategory || alg.categories.includes(selectedCategory));

  return (
    <div className="space-y-3">
      {/* Category Dropdown */}
      <div className="relative">
        <motion.button
          onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
          className="w-full flex items-center justify-between px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors duration-200"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          aria-expanded={isCategoryDropdownOpen}
          aria-haspopup="true"
        >
          <span className="flex items-center space-x-2">
            <span className="text-lg">🏷️</span>
            <span className="font-medium">
              {selectedCategory ? `Category: ${selectedCategory}` : 'All Categories'}
            </span>
          </span>
          <motion.svg
            className="w-5 h-5"
            animate={{ rotate: isCategoryDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>

        <AnimatePresence>
          {isCategoryDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-full mt-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden"
            >
              <div className="max-h-60 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <motion.button
                  onClick={() => {
                    setSelectedCategory(null);
                    setIsCategoryDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 flex items-center space-x-2 ${
                    selectedCategory === null
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg">🌟</span>
                  <span>All Categories</span>
                </motion.button>
                {allCategories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsCategoryDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 flex items-center space-x-2 ${
                      selectedCategory === category
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg">{categoryEmojis[category] || '📑'}</span>
                    <span>{category}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Algorithms List */}
      <div className="space-y-2">
        {filteredAlgorithms.map((algorithm, index) => (
          <motion.div
            key={algorithm.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <Link href={algorithm.path}>
              <motion.div
                className="group px-4 py-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-all duration-200 border border-gray-600/50 hover:border-purple-500/50"
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-start space-x-3">
                  <motion.span 
                    className="text-xl flex-shrink-0 mt-0.5"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {algorithm.icon}
                  </motion.span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white group-hover:text-purple-400 transition-colors duration-200 truncate">
                      {algorithm.name}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 overflow-hidden leading-relaxed" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {algorithm.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {algorithm.categories.map(category => (
                        <span 
                          key={category} 
                          className="text-xs text-purple-400 bg-purple-900/30 px-1.5 py-0.5 rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <motion.svg
                    className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors duration-200 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Tab Button Component
const TabButton = ({ tab, label, icon, activeTab, setActiveTab }: {
  tab: 'contents' | 'algorithms';
  label: string;
  icon: string;
  activeTab: 'contents' | 'algorithms';
  setActiveTab: (tab: 'contents' | 'algorithms') => void;
}) => (
  <motion.button
    onClick={() => setActiveTab(tab)}
    className={`flex-1 flex items-center justify-center space-x-1.5 px-2 py-2 rounded-lg transition-all duration-200 relative ${
      activeTab === tab
        ? 'text-white'
        : 'text-gray-400 hover:text-gray-300'
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {activeTab === tab && (
      <motion.div
        layoutId="activeTab"
        className="absolute inset-0 bg-purple-600 rounded-lg"
        initial={false}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    <span className="relative text-base">{icon}</span>
    <span className="relative font-medium text-sm whitespace-nowrap">{label}</span>
  </motion.button>
);

export default function TableOfContents({ sections, activeSection, setActiveSection }: TableOfContentsProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'contents' | 'algorithms'>('contents');

  // Add Intersection Observer to track visible sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Only update active section if we're on the contents tab
        if (activeTab === 'contents') {
          const visibleEntry = entries.find(entry => entry.isIntersecting);
          if (visibleEntry) {
            setActiveSection(visibleEntry.target.id);
          }
        }
      },
      {
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
      }
    );

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      // Cleanup observer on unmount
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sections, setActiveSection, activeTab]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Table of Contents Button */}
      <motion.button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed bottom-6 right-6 z-50 lg:hidden bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          rotate: isMobileMenuOpen ? 45 : 0,
          backgroundColor: isMobileMenuOpen ? '#7c3aed' : '#9333ea'
        }}
        transition={{ duration: 0.2 }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </motion.button>

      {/* Mobile Table of Contents Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-[calc(100vh-4rem)] w-72 bg-gray-800 shadow-xl mt-16"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="h-full flex flex-col">
                {/* Header with Tabs */}
                <div className="p-4 border-b border-gray-700">
                  <div className="flex bg-gray-700 rounded-lg p-1">
                    <TabButton tab="contents" label="Contents" icon="📋" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton tab="algorithms" label="Algorithms" icon="🤖" activeTab={activeTab} setActiveTab={setActiveTab} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                  <AnimatePresence mode="wait">
                    {activeTab === 'contents' ? (
                      <ContentsView sections={sections} activeSection={activeSection} scrollToSection={scrollToSection} />
                    ) : (
                      <AlgorithmsView isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Table of Contents */}
      <div className="hidden lg:block fixed top-24 left-4 w-72 h-[calc(100vh-6rem)]">
        <motion.div 
          className="bg-gray-800 rounded-xl shadow-xl h-full flex flex-col"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header with Tabs */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex bg-gray-700 rounded-lg p-1">
              <TabButton tab="contents" label="Contents" icon="📋" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton tab="algorithms" label="Algorithms" icon="🤖" activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <AnimatePresence mode="wait">
              {activeTab === 'contents' ? (
                <ContentsView sections={sections} activeSection={activeSection} scrollToSection={scrollToSection} />
              ) : (
                <AlgorithmsView isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
} 