/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Sparkles, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onOpenResume: () => void;
}

export default function Navbar({ darkMode, setDarkMode, onOpenResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? darkMode
              ? 'bg-[#0B1120]/80 border-b border-violet-500/15 shadow-lg backdrop-blur-md py-4'
              : 'bg-white/85 border-b border-slate-200/65 shadow-md backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo with futuristic glow */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className="flex items-center space-x-2.5 font-sans font-bold text-lg select-none group"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-sky-400 text-white shadow-md">
              <span className="text-sm">GK</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-violet-600 to-sky-400 blur-sm opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <span
              className={`tracking-wider font-semibold bg-gradient-to-r ${
                darkMode ? 'from-white to-slate-300' : 'from-slate-900 to-slate-700'
              } bg-clip-text text-transparent`}
            >
              Gedela Kusuma
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-7">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-sans text-sm font-medium transition-colors hover:text-violet-500 ${
                  darkMode ? 'text-slate-300' : 'text-slate-650'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Action Row */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Color Mode Trigger */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-all border ${
                darkMode
                  ? 'border-white/10 hover:border-violet-500 bg-white/5 text-amber-300 hover:text-amber-200'
                  : 'border-slate-200 hover:border-violet-500 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              className="flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-sky-500 hover:from-violet-500 hover:to-sky-400 text-white transition-all duration-300 shadow-md hover:shadow-violet-500/20"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-all border ${
                darkMode
                  ? 'border-white/10 bg-white/5 text-amber-300'
                  : 'border-slate-200 bg-slate-50 text-slate-705'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-all border ${
                darkMode
                  ? 'border-white/10 text-slate-300 hover:text-white bg-white/5'
                  : 'border-slate-200 text-slate-700 bg-slate-50'
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-[72px] left-0 right-0 z-39 border-b shadow-2xl p-6 flex flex-col space-y-4 md:hidden ${
              darkMode
                ? 'bg-[#0B1120] border-white/15 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex flex-col space-y-3.5">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-base font-semibold py-1.5 transition-all block ${
                    darkMode ? 'text-slate-300 hover:text-violet-400' : 'text-slate-700 hover:text-violet-600'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200/20">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-sky-500 text-white font-semibold text-sm hover:from-violet-500 hover:to-sky-400 transition-all"
              >
                <FileText className="w-5 h-5" />
                <span>View & Download Resume</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
