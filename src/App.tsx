/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  User,
  Cpu,
  BookOpen,
  Briefcase,
  Terminal,
  Award,
  FileText,
  Mail,
  MapPin,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle,
  Database,
  Grid,
  Code,
  Github,
  Linkedin,
  Clock,
  Send,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO, PROJECTS, EDUCATION_LIST, EXPERIENCES, SKILLS, CERTIFICATIONS } from './data';
import PageLoader from './components/PageLoader';
import GlowCursor from './components/GlowCursor';
import Navbar from './components/Navbar';
import NetworkBackground from './components/NetworkBackground';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [projectFilter, setProjectFilter] = useState('all');
  const [typedRole, setTypedRole] = useState('a Future AI Engineer');
  const [resumeOpen, setResumeOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState<'all' | 'programming' | 'web' | 'ai' | 'tool'>('all');
  const [currentTime, setCurrentTime] = useState('');

  // Typing effect for the hero subtitle
  useEffect(() => {
    const roles = ['an AI Student', 'a Web Developer', 'a Future AI Engineer', 'a Generative AI Practitioner'];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const tick = () => {
      const currentRole = roles[roleIdx];
      if (isDeleting) {
        setTypedRole(currentRole.substring(0, charIdx - 1));
        charIdx--;
      } else {
        setTypedRole(currentRole.substring(0, charIdx + 1));
        charIdx++;
      }

      let speed = 100;
      if (isDeleting) speed /= 2;

      if (!isDeleting && charIdx === currentRole.length) {
        speed = 2000; // Stay at full word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        charIdx = 0;
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        speed = 500;
      }

      timeoutId = setTimeout(tick, speed);
    };

    tick();
    return () => clearTimeout(timeoutId);
  }, []);

  // Update real world digital clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 5000);
  };

  const filteredProjects = PROJECTS.filter((proj) => {
    if (projectFilter === 'all') return true;
    if (projectFilter === 'ai') return proj.category.toLowerCase().includes('ai');
    if (projectFilter === 'ecommerce') return proj.category.toLowerCase().includes('commerce') || proj.title === 'SNAPBUY';
    return true;
  });

  const filteredSkills = SKILLS.filter((sk) => {
    if (activeSkillCategory === 'all') return true;
    return sk.category === activeSkillCategory;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 relative select-none font-sans overflow-x-hidden ${
      darkMode ? 'bg-[#0B1120] text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      {/* Page boot loader animation */}
      <PageLoader />

      {/* Advanced hover glow cursor backdrop */}
      <GlowCursor />

      {/* Network Background vector system */}
      <div className="absolute inset-0 max-h-[100vh] overflow-hidden pointer-events-none">
        <NetworkBackground darkMode={darkMode} />
      </div>

      {/* Top sticky Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Hero Header Space */}
      <header id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 relative overflow-hidden">
        {/* Glow backdrop shapes */}
        <div className="absolute top-1/4 left-1/10 w-[450px] h-[450px] rounded-full bg-violet-600/10 blur-[130px] pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/10 w-[400px] h-[400px] rounded-full bg-cyan-400/10 blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '3s' }} />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status indicator badge */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-cyan-400 absolute" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-violet-400 uppercase">
                AVAILABLE FOR INTERNSHIPS & ROLES
              </span>
            </div>
            {/* Main Typographical Headings */}
            <div className="space-y-3">
              <h1 className="text-sm font-semibold tracking-[0.25em] text-cyan-400 font-mono uppercase">
                SYSTEM PORTFOLIO OF
              </h1>
              <h2 className="text-5xl sm:text-7xl font-display font-extrabold tracking-tight leading-[1.]">
                {PERSONAL_INFO.name}
              </h2>
              
              {/* Animated text loop */}
              <div className="h-10 sm:h-12 flex items-center">
                <span className="text-xl sm:text-2xl font-semibold opacity-85 mr-2">I am</span>
                <span className="text-xl sm:text-2xl font-bold text-gradient font-display uppercase tracking-wide">
                  {typedRole}
                </span>
                <span className="w-1.5 h-6 sm:h-8 bg-cyan-400 animate-pulse ml-1 shrink-0" />
              </div>

              <p className={`text-base max-w-xl leading-relaxed mt-4 ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {PERSONAL_INFO.tagline}
              </p>
            </div>

            {/* Quick Digital Clock block - Minimal elegant */}
            <div className={`inline-flex items-center space-x-3.5 px-4 py-2.5 rounded-xl text-xs font-mono border ${
              darkMode ? 'bg-white/5 border-white/5 text-slate-300' : 'bg-white border-slate-200 text-slate-650'
            }`}>
              <Clock className="w-4 h-4 text-violet-400" />
              <span>CURRENT WORLD SYSTEM TIME: <span className="font-bold text-cyan-400">{currentTime}</span></span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-violet-600 to-sky-500 text-white shadow-lg hover:shadow-violet-500/30 transition-all flex items-center space-x-2.5"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setResumeOpen(true)}
                className={`px-6 py-3.5 rounded-xl font-bold text-sm border flex items-center space-x-2.5 transition-all ${
                  darkMode
                    ? 'border-white/10 hover:border-violet-500 bg-white/5 text-white'
                    : 'border-slate-250 hover:border-violet-600 bg-white text-slate-700'
                }`}
              >
                <FileText className="w-4 h-4 text-violet-400" />
                <span>Download & View CV</span>
              </button>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-6 py-3.5 rounded-xl font-bold text-sm border flex items-center space-x-2 transition-all ${
                  darkMode
                    ? 'border-white/5 hover:bg-white/10 text-slate-300'
                    : 'border-slate-200 hover:bg-slate-100 text-slate-650'
                }`}
              >
                <span>Hire Me</span>
              </a>
            </div>

            {/* Interactive Social Connections Block */}
            <div className="pt-6 flex items-center space-x-4">
              <span className="text-[10px] font-mono tracking-widest uppercase opacity-40">
                SECURE LINK PORTS
              </span>
              <div className="h-[1px] w-12 bg-slate-500/35" />
              <div className="flex space-x-1.5">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-2.5 rounded-lg border transition-all ${
                    darkMode
                      ? 'border-white/10 bg-white/5 hover:border-blue-400 text-slate-355 hover:text-white'
                      : 'border-slate-200 bg-white hover:border-blue-600 text-slate-600'
                  }`}
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-2.5 rounded-lg border transition-all ${
                    darkMode
                      ? 'border-white/10 bg-white/5 hover:border-violet-500 text-slate-355 hover:text-white'
                      : 'border-slate-200 bg-white hover:border-violet-600 text-slate-600'
                  }`}
                  title="Review on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className={`p-2.5 rounded-lg border transition-all ${
                    darkMode
                      ? 'border-white/10 bg-white/5 hover:border-orange-400 text-slate-355 hover:text-white'
                      : 'border-slate-200 bg-white hover:border-orange-600 text-slate-600'
                  }`}
                  title="Email Directly"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Interactive AI dashboard mockup card */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Ambient decorative glowing frames */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-violet-600 via-sky-400 to-fuchsia-500 rounded-2xl blur-md opacity-20 group-hover:opacity-100 transition duration-1000" />
            
            <div className={`p-6 rounded-2xl border relative overflow-hidden shadow-2xl ${
              darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'
            }`}>
              {/* Card top bar */}
              <div className="flex items-center justify-between border-b pb-4 mb-4" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-[10px] font-mono tracking-widest opacity-40 uppercase">
                  ACTIVE_STUDENT_INTELLIGENCE.sh
                </div>
              </div>



              {/* Grid content summarizing key metrics */}
              <div className="space-y-4">
                {/* Metric 1 */}
                <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                  darkMode ? 'bg-white/5 border-white/5 hover:border-violet-500/20' : 'bg-slate-50 border-slate-200'
                } transition-all`}>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-violet-600/10 text-violet-400">
                      <BookOpen className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-[10px] opacity-50 uppercase font-bold tracking-wider">ACADEMIC EXCELLENCE</p>
                      <p className="text-sm font-extrabold font-display">B.Tech CS & Artificial Intelligence</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-gradient font-display">9.07</span>
                    <p className="text-[9px] opacity-40 font-mono">CGPA</p>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                  darkMode ? 'bg-white/5 border-white/5 hover:border-cyan-500/20' : 'bg-slate-50 border-slate-200'
                } transition-all`}>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400">
                      <Briefcase className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-[10px] opacity-50 uppercase font-bold tracking-wider">KNOWLEDGE DISCIPLINE</p>
                      <p className="text-sm font-extrabold font-display">Generative AI Intern</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-cyan-400 font-mono">JJH Global</span>
                    <p className="text-[9px] opacity-40 font-mono">ACTIVE Intern</p>
                  </div>
                </div>

                {/* Simulated visual radar or neural line bar */}
                <div className={`p-4 rounded-xl border ${
                  darkMode ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex justify-between text-[10px] tracking-wider mb-2 font-mono">
                    <span className="opacity-55 uppercase">COGNITIVE COMPUTES SCORE</span>
                    <span className="text-cyan-400 font-bold">95.4%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden flex space-x-0.5">
                    <div className="h-full bg-violet-600 w-[60%] rounded-l-full" />
                    <div className="h-full bg-cyan-400 w-[25%]" />
                    <div className="h-full bg-fuchsia-400 w-[10.4%] rounded-r-full" />
                  </div>
                  <div className="flex justify-between text-[8px] opacity-40 mt-1 font-mono">
                    <span>AI MODULES</span>
                    <span>FULLSTACK ENG</span>
                    <span>PROBLEM WORK</span>
                  </div>
                </div>

                {/* Prompt recruiter advice */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-violet-600/10 to-sky-500/10 border border-violet-500/15 flex items-start space-x-3">
                  <Sparkles className="w-4.5 h-4.5 text-violet-400 shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <h4 className="text-[11px] font-bold tracking-wide text-white uppercase">Recruiter Copilot Recommendation</h4>
                    <p className="text-[11px] opacity-75 mt-0.5 leading-relaxed">
                      "Gedela has successfully completed 3 separate professional internships across AI models, Machine learning, and Java Full-Stack architecture."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative border-t border-slate-200/5">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Section banner heading */}
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 py-1 px-3 rounded-full bg-violet-600/10 border border-violet-600/15 text-xs text-violet-400 font-mono font-bold tracking-wider uppercase">
              COGNITIVE BIO
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              About Gedela Kusuma
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-violet-600 to-sky-400 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side text with beautiful grid summary */}
            <div className="lg:col-span-7 space-y-6">
              <p className={`text-base sm:text-lg leading-relaxed ${
                darkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {PERSONAL_INFO.aboutText}
              </p>

              {/* Mentioned pillars explicitly */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className={`p-4 rounded-xl border flex items-start space-x-3.5 transition-all hover:scale-101 ${
                  darkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-slate-200 hover:shadow-md'
                }`}>
                  <div className="p-2.5 rounded-lg bg-violet-600/10 text-violet-400 font-bold shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Artificial Intelligence</h4>
                    <p className="text-xs opacity-70 mt-1">Deep learning foundations, Generative AI models, Prompt workflows.</p>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border flex items-start space-x-3.5 transition-all hover:scale-101 ${
                  darkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-slate-200 hover:shadow-md'
                }`}>
                  <div className="p-2.5 rounded-lg bg-cyan-400/10 text-cyan-400 font-bold shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Frontend Development</h4>
                    <p className="text-xs opacity-70 mt-1">Modern interface building, responsive custom responsive layouts, interactive elements.</p>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border flex items-start space-x-3.5 transition-all hover:scale-101 ${
                  darkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-slate-200 hover:shadow-md'
                }`}>
                  <div className="p-2.5 rounded-lg bg-fuchsia-400/10 text-fuchsia-400 font-bold shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Generative AI Internship</h4>
                    <p className="text-xs opacity-70 mt-1">Real world product generation, API configurations, system tuning.</p>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border flex items-start space-x-3.5 transition-all hover:scale-101 ${
                  darkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-slate-200 hover:shadow-md'
                }`}>
                  <div className="p-2.5 rounded-lg bg-emerald-400/10 text-emerald-400 font-bold shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Modern Full Stack</h4>
                    <p className="text-xs opacity-70 mt-1">Object oriented paradigms, robust databases (MySQL), complete end-to-end setups.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side stats blocks */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className={`p-6 rounded-2xl border text-center space-y-2 relative overflow-hidden ${
                darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200 shadow-md'
              }`}>
                {/* Glowing decorative indicator */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-violet-600" />
                <span className="text-5xl font-black font-display text-gradient block">9.07</span>
                <span className="text-xs font-mono tracking-wider opacity-60 uppercase block">B.Tech CSAI CGPA</span>
              </div>

              <div className={`p-6 rounded-2xl border text-center space-y-2 relative overflow-hidden ${
                darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-400" />
                <span className="text-5xl font-black font-display text-gradient block">03</span>
                <span className="text-xs font-mono tracking-wider opacity-60 uppercase block">Completed Internships</span>
              </div>

              <div className={`p-6 rounded-2xl border text-center space-y-2 relative overflow-hidden ${
                darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-orange-500" />
                <span className="text-5xl font-black font-display text-gradient block">03+</span>
                <span className="text-xs font-mono tracking-wider opacity-60 uppercase block">Featured Projects</span>
              </div>

              <div className={`p-6 rounded-2xl border text-center space-y-2 relative overflow-hidden ${
                darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-emerald-400" />
                <span className="text-5xl font-black font-display text-gradient block">97%</span>
                <span className="text-xs font-mono tracking-wider opacity-60 uppercase block">Academic MPC Score</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Timeline Section */}
      <section id="education" className="py-24 px-6 relative border-t border-slate-200/5 bg-slate-950/20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 py-1 px-3 rounded-full bg-cyan-400/10 border border-cyan-400/15 text-xs text-cyan-400 font-mono font-bold tracking-wider uppercase">
              ACADEMIC TIMELINE
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Educational Qualifications
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-violet-600 to-sky-400 mx-auto" />
          </div>

          {/* Timeline alignment */}
          <div className="max-w-3xl mx-auto relative pl-6 sm:pl-10 space-y-10 border-l-2 border-slate-800">
            {EDUCATION_LIST.map((edu, idx) => (
              <div key={idx} className="relative group">
                {/* Glowing circular connector point */}
                <span className="absolute left-[calc(-24px-6px)] sm:left-[calc(-40px-6px)] top-1 w-3 h-3 rounded-full bg-violet-600 border border-sky-400 group-hover:scale-150 transition-transform duration-300" />

                <div className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                  darkMode ? 'bg-slate-900/60 border-white/5 hover:border-violet-500/20' : 'bg-white border-slate-200'
                }`}>
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-semibold block mb-2">
                    {edu.duration}
                  </span>
                  
                  <h3 className="text-lg sm:text-xl font-display font-bold">
                    {edu.degree}
                  </h3>
                  
                  <p className={`text-sm opacity-85 mt-1.5 ${darkMode ? 'text-slate-350' : 'text-slate-600'}`}>
                    {edu.school}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-4 border-t border-slate-200/5">
                    <span className="text-xs px-3 py-1 bg-violet-650/15 rounded-full border border-violet-500/20 text-violet-400 font-bold">
                      {edu.detail}
                    </span>
                    <span className="text-xs opacity-50 flex items-center space-x-1 font-mono">
                      <MapPin className="w-3 h-3 text-red-400" />
                      <span>{edu.location}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Skill Category Grid Cards */}
      <section id="skills" className="py-24 px-6 relative border-t border-slate-200/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 py-1 px-3 rounded-full bg-violet-600/10 border border-violet-600/15 text-xs text-violet-400 font-mono font-bold tracking-wider uppercase">
              COGNITIVE CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Skills & Expertise
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-violet-600 to-sky-400 mx-auto" />
          </div>

          {/* Filter menu tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'ALL SKILLS' },
              { id: 'programming', label: 'Languages' },
              { id: 'web', label: 'Web Tech' },
              { id: 'ai', label: 'AI & ML' },
              { id: 'tool', label: 'Tools & IDEs' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSkillCategory(tab.id as any)}
                className={`px-4.5 py-2 rounded-xl text-xs font-bold font-mono tracking-wider transition-all border ${
                  activeSkillCategory === tab.id
                    ? 'bg-gradient-to-r from-violet-600 to-sky-500 border-violet-500 text-white shadow-md shadow-violet-500/20'
                    : darkMode
                      ? 'border-white/5 hover:border-violet-500/40 bg-white/5 text-slate-300'
                      : 'border-slate-200 hover:border-violet-600 bg-white text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Skill cards container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSkills.map((sk) => (
              <div
                key={sk.name}
                className={`p-4.5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  darkMode ? 'bg-slate-900 border-white/5 hover:border-violet-500/30' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono opacity-50 uppercase tracking-widest">{sk.category}</span>
                  <span className="text-xs font-bold text-sky-400 font-mono">{sk.level}%</span>
                </div>
                <h3 className="text-sm font-bold font-display uppercase tracking-wide">{sk.name}</h3>
                
                {/* Glowing Progress bar */}
                <div className="w-full h-1.5 bg-slate-800/80 rounded-full mt-3.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-sky-400"
                    style={{ width: `${sk.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Chronology section */}
      <section id="experience" className="py-24 px-6 relative border-t border-slate-200/5 bg-slate-950/20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 py-1 px-3 rounded-full bg-cyan-400/10 border border-cyan-400/15 text-xs text-cyan-400 font-mono font-bold tracking-wider uppercase">
              CAREER STATS
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Professional Internship Experience
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-violet-600 to-sky-400 mx-auto" />
          </div>

          {/* Grid layout cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className={`p-6.5 rounded-2xl border relative overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl ${
                  darkMode ? 'bg-slate-905 border-white/5 hover:border-violet-500/30 bg-slate-900/80' : 'bg-white border-slate-200'
                }`}
              >
                {/* Decorative border bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-600 to-sky-400" />

                <div className="space-y-4">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase opacity-40">
                      {exp.duration}
                    </span>
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-violet-500/15 text-violet-400 border border-violet-500/10">
                      INTERNSHIP
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-extrabold tracking-tight">{exp.company}</h3>
                    <p className="text-xs text-cyan-400/90 font-semibold font-mono tracking-wide mt-1 uppercase">
                      {exp.role}
                    </p>
                  </div>

                  <p className={`text-xs leading-relaxed opacity-80 ${darkMode ? 'text-slate-300' : 'text-slate-750'}`}>
                    {exp.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/5 space-y-2">
                  <span className="text-[9px] font-mono tracking-wider uppercase opacity-40 block">Pillars Learned:</span>
                  <div className="flex flex-wrap gap-1">
                    {exp.skillsLearned.map((sk) => (
                      <span
                        key={sk}
                        className="text-[9px] px-2 py-0.5 rounded bg-slate-500/10 text-slate-400 border border-slate-500/5"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section id="projects" className="py-24 px-6 relative border-t border-slate-200/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 py-1 px-3 rounded-full bg-violet-600/10 border border-violet-600/15 text-xs text-violet-400 font-mono font-bold tracking-wider uppercase">
              PRACTICAL CONSTRUCTS
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Featured Project Showcases
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-violet-600 to-sky-400 mx-auto" />
          </div>

          {/* Project Filtering capabilities */}
          <div className="flex items-center justify-center space-x-2">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'ai', label: 'AI Recommendation / Analysis' },
              { id: 'ecommerce', label: 'E-Commerce Platforms' }
            ].map((filt) => (
              <button
                key={filt.id}
                onClick={() => setProjectFilter(filt.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  projectFilter === filt.id
                    ? 'bg-gradient-to-r from-violet-600 to-sky-500 border-violet-500 text-white'
                    : darkMode
                      ? 'border-white/5 bg-white/5 text-slate-350 hover:bg-white/10'
                      : 'border-slate-200 bg-white text-slate-650 hover:bg-slate-100'
                }`}
              >
                {filt.label}
              </button>
            ))}
          </div>

          {/* Grid results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-2xl relative ${
                  darkMode ? 'bg-slate-900 border-white/5 hover:border-violet-500/20' : 'bg-white border-slate-200'
                }`}
              >
                {/* Tech preview mockup visual background */}
                <div className="h-44 bg-gradient-to-tr from-violet-950 via-slate-900 to-sky-950 p-6 flex flex-col justify-between relative overflow-hidden">
                  {/* Decorative glowing gradient sphere inside preview block */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-violet-600/25 blur-3xl pointer-events-none group-hover:scale-125 transition-transform" />
                  
                  <div className="flex justify-between items-start z-10">
                    <span className="text-[9px] font-mono tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-full uppercase">
                      {proj.category}
                    </span>
                    <Cpu className="w-4 h-4 text-violet-400/60" />
                  </div>

                  <h3 className="text-xl font-display font-extrabold text-white tracking-tight z-10">
                    {proj.title}
                  </h3>
                </div>

                <div className="p-6 space-y-4">
                  <p className={`text-xs leading-relaxed opacity-80 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {proj.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[9px] font-mono tracking-wider uppercase opacity-40 block">Features Highlights:</span>
                    <ul className="space-y-1">
                      {proj.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="text-[10px] opacity-75 flex items-start space-x-1.5">
                          <span className="text-cyan-400 font-bold shrink-0">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1 pt-2">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] px-2 py-0.5 rounded-md bg-violet-650/15 text-violet-300 border border-violet-500/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card CTA links */}
                <div className={`p-4 border-t flex items-center justify-between ${
                  darkMode ? 'bg-slate-950/40 border-white/5' : 'bg-slate-50 border-slate-100'
                }`}>
                  <button
                    onClick={() => setResumeOpen(true)}
                    className="text-[11px] font-bold text-violet-400 hover:text-violet-300 flex items-center space-x-1"
                  >
                    <span>View spec architecture</span>
                    <ArrowRight className="w-3 h-3 text-sky-400" />
                  </button>

                  {proj.demoUrl ? (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      referrerPolicy="no-referrer"
                      className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-violet-650 to-sky-500/90 text-white font-mono font-bold text-[10px] tracking-wide hover:shadow-md transition-all flex items-center space-x-1.5"
                    >
                      <span>LAUNCH APP</span>
                      <ExternalLink className="w-3 h-3 text-white" />
                    </a>
                  ) : (
                    <a
                      href="#contact"
                      className="text-[11px] font-bold text-slate-400 hover:text-slate-200"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Request Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-24 px-6 relative border-t border-slate-200/5 bg-slate-950/20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 py-1 px-3 rounded-full bg-cyan-400/10 border border-cyan-400/15 text-xs text-cyan-400 font-mono font-bold tracking-wider uppercase">
              SYSTEM VERIFICATIONS
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Professional Certifications
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-violet-600 to-sky-400 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.title}
                className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 ${
                  darkMode ? 'bg-slate-900 border-white/5 hover:border-violet-500/25' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                {/* Visual Accent glow line */}
                <div className="absolute left-0 top-0 bottom-0 w-[4px]" style={{ backgroundColor: cert.badgeAccent }} />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Award className="w-5 h-5 text-violet-400 animate-float" />
                    <span className="text-[10px] font-mono tracking-wide text-cyan-400 font-semibold uppercase">
                      {cert.year}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold leading-tight uppercase">
                    {cert.title}
                  </h3>

                  <p className="text-xs opacity-70">
                    Authority: <span className="font-bold underline">{cert.issuer}</span>
                  </p>

                  <div className="pt-2 border-t border-slate-200/5 text-right">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5">
                      AUTHORIZED
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Combined Resume preview block on the page section 8 */}
      <section id="cv-section" className="py-24 px-6 relative border-t border-slate-200/5">
        <div className="max-w-7xl mx-auto">
          <div className={`p-8 sm:p-12 rounded-3xl border relative overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 ${
            darkMode ? 'bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 border-white/5' : 'bg-white border-slate-200'
          }`}>
            <div className="space-y-4 max-w-xl text-left">
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight leading-tight">
                Review & Print Gedela's Comprehensive Resume
              </h2>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-650'}`}>
                Access the official structured curriculum vitae detailing complete GPA score, modules finished, internship timelines, and certification hashes in a cleanly printable format.
              </p>
              <div className="flex items-center space-x-4 text-xs font-mono">
                <span className="text-cyan-400 font-bold">• 9.07 B.Tech CGPA</span>
                <span className="text-violet-400 font-bold">• 3 Verified Internships</span>
              </div>
            </div>

            <button
              onClick={() => setResumeOpen(true)}
              className="px-6 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-violet-500 to-sky-400 text-white font-bold text-sm shadow-xl hover:shadow-violet-550/20 transition-all flex items-center space-x-2 shrink-0"
            >
              <FileText className="w-5 h-5 animate-bounce" />
              <span>Launch Interactive CV</span>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 px-6 relative border-t border-slate-200/5 bg-slate-950/20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 py-1 px-3 rounded-full bg-violet-600/10 border border-violet-600/15 text-xs text-violet-400 font-mono font-bold tracking-wider uppercase">
              TRANSMIT COMMUNICATE
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Get In Touch
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-violet-600 to-sky-400 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
            {/* Left channel: Quick cards, details */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-xl font-display font-bold">Secure Contact Nodes</h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-650'}`}>
                Feel free to trigger messages to discuss project architecture, hiring placement offers, or academic collaborations.
              </p>

              <div className="space-y-4 pt-2">
                <div className={`p-4 rounded-xl border flex items-center space-x-3.5 ${
                  darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'
                }`}>
                  <Mail className="w-5 h-5 text-violet-400 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest block">EMAIL DISPATCH</span>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs font-bold font-mono text-cyan-400 hover:underline">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border flex items-center space-x-3.5 ${
                  darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'
                }`}>
                  <MapPin className="w-5 h-5 text-sky-400 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest block">PHYSICAL NODE</span>
                    <span className="text-xs font-bold font-display leading-tight">{PERSONAL_INFO.location}</span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border flex items-center space-x-3.5 ${
                  darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'
                }`}>
                  <Cpu className="w-5 h-5 text-fuchsia-400 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest block">SYSTEM DISCORD / CHANNELS</span>
                    <span className="text-xs font-bold font-mono">Available via LinkedIn Link Ports</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right channel: Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleContactSubmit} className={`p-6 sm:p-8 rounded-2xl border space-y-4 relative overflow-hidden ${
                darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200 shadow-lg'
              }`}>
                
                {/* Form submit notification feedback */}
                <AnimatePresence>
                  {formSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6 text-center"
                    >
                      <CheckCircle className="w-12 h-12 text-green-400 animate-bounce mb-3" />
                      <h4 className="text-lg font-display font-bold">Message Transmitted Cleanly!</h4>
                      <p className="text-xs text-slate-350 max-w-sm mt-1">
                        Thank you for reaching out. Gedela Kusuma's secure console system has received your transmission details and will reply shortly.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider opacity-60 uppercase">Sender Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Recruit Director"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                        darkMode
                          ? 'bg-slate-955 bg-black/40 border-white/5 focus:border-violet-500 focus:bg-slate-900 text-white'
                          : 'bg-slate-50 border-slate-200 focus:border-purple-600 focus:bg-white text-slate-800'
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider opacity-60 uppercase">Email Protocol</label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. recruit@hq.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                        darkMode
                          ? 'bg-slate-955 bg-black/40 border-white/5 focus:border-violet-500 focus:bg-slate-900 text-white'
                          : 'bg-slate-50 border-slate-200 focus:border-purple-600 focus:bg-white text-slate-800'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider opacity-60 uppercase">Transmission Core Content</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your invitation or open junior job specifications in detail..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border transition-all resize-none ${
                      darkMode
                        ? 'bg-slate-955 bg-black/40 border-white/5 focus:border-violet-500 focus:bg-slate-900 text-white'
                        : 'bg-slate-50 border-slate-200 focus:border-purple-600 focus:bg-white text-slate-800'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-violet-500 to-sky-400 text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-violet-500/15 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Secure Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Unified clean footer design */}
      <footer className={`py-12 border-t text-xs ${
        darkMode ? 'bg-[#070B14] border-white/5 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left select-none">
          <div className="space-y-1">
            <p className="font-extrabold font-display uppercase tracking-wider text-gradient">
              GEDELA KUSUMA PORTFOLIO
            </p>
            <p className="text-[10px] opacity-50">
              © 2026 Designed and coded by Gedela Kusuma. Built with Intelligence.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 font-mono text-[10px] uppercase tracking-widest">
            <span>Duvvada, Visakhapatnam</span>
            <span>Secure Port</span>
            <span>9.07 CGPA Standard</span>
          </div>
        </div>
      </footer>

      {/* Resume modal triggers */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        darkMode={darkMode}
      />
    </div>
  );
}
