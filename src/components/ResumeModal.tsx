/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { X, Download, Printer, Award, BookOpen, Briefcase, Mail, Phone, MapPin, ExternalLink, Cpu } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, EDUCATION_LIST, EXPERIENCES, SKILLS, CERTIFICATIONS } from '../data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export default function ResumeModal({ isOpen, onClose, darkMode }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border ${
          darkMode ? 'bg-[#0f172a] border-violet-500/30' : 'bg-white border-slate-200'
        } shadow-2xl relative flex flex-col`}
      >
        {/* Header toolbar */}
        <div className={`p-4 border-b flex items-center justify-between sticky top-0 z-10 ${
          darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50/95 border-slate-150'
        } backdrop-blur`}>
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-violet-500" />
            <span className={`font-display font-bold text-sm tracking-wide ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              GEDELA_KUSUMA_RESUME.pdf
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className={`p-2 rounded-lg border transition-all flex items-center space-x-1.5 text-xs font-semibold ${
                darkMode
                  ? 'border-white/10 hover:border-violet-500 bg-white/5 text-slate-350 hover:text-white'
                  : 'border-slate-200 hover:border-violet-600 bg-white text-slate-650 hover:text-slate-850'
              }`}
              title="Print Resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print CV</span>
            </button>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2 rounded-lg bg-gradient-to-r from-violet-600 to-sky-500 hover:from-violet-500 hover:to-sky-400 text-white transition-all text-xs font-semibold flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Direct Hire / Email</span>
            </a>

            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-all border ${
                darkMode
                  ? 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                  : 'border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-800'
              }`}
              title="Close Panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className={`p-8 sm:p-12 print:p-0 ${darkMode ? 'text-slate-100' : 'text-slate-800'} print:bg-white print:text-black`}>
          <div id="resume-printable-area" className="space-y-8 max-w-3xl mx-auto">
            {/* CV Title Header */}
            <div className="border-b pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-display font-extrabold tracking-tight text-gradient">
                  {PERSONAL_INFO.name}
                </h1>
                <p className={`text-sm font-semibold mt-1 uppercase tracking-wider ${darkMode ? 'text-sky-400' : 'text-violet-600'}`}>
                  {PERSONAL_INFO.role}
                </p>
                <p className={`text-xs opacity-70 mt-2 max-w-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {PERSONAL_INFO.tagline}
                </p>
              </div>

              <div className="text-xs space-y-1.5 shrink-0">
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-violet-500" />
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline">{PERSONAL_INFO.email}</a>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-violet-500" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ExternalLink className="w-3.5 h-3.5 text-violet-500" />
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn Connection</a>
                </div>
              </div>
            </div>

            {/* Grid 2-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column: Education & Experience */}
              <div className="md:col-span-8 space-y-8">
                {/* Experiences */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 border-b pb-2">
                    <Briefcase className="w-4 h-4 text-violet-500" />
                    <h2 className="text-sm font-bold uppercase tracking-wider">Professional Internships</h2>
                  </div>

                  <div className="space-y-5">
                    {EXPERIENCES.map((exp, index) => (
                      <div key={exp.id} className="relative pl-4 border-l border-violet-500/20">
                        <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-violet-600" />
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <h3 className="text-sm font-bold">{exp.company}</h3>
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-violet-500/10 text-violet-400">
                            {exp.duration}
                          </span>
                        </div>
                        <p className={`text-xs font-semibold ${darkMode ? 'text-sky-400' : 'text-violet-600'}`}>
                          {exp.role}
                        </p>
                        <p className="text-[11px] opacity-75 mt-1.5 leading-relaxed">
                          {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mt-2">
                          {exp.skillsLearned.map((sk) => (
                            <span
                              key={sk}
                              className="text-[9px] px-1.5 py-0.5 rounded bg-slate-500/10 text-slate-400 border border-slate-500/5"
                            >
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 border-b pb-2">
                    <BookOpen className="w-4 h-4 text-violet-500" />
                    <h2 className="text-sm font-bold uppercase tracking-wider">Education</h2>
                  </div>

                  <div className="space-y-4">
                    {EDUCATION_LIST.map((edu, index) => (
                      <div key={index} className="relative pl-4 border-l border-sky-500/20">
                        <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-sky-500" />
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <h3 className="text-xs font-bold">{edu.degree}</h3>
                          <span className="text-[10px] opacity-60 font-mono">{edu.duration}</span>
                        </div>
                        <p className="text-xs opacity-80">{edu.school}</p>
                        <p className="text-[11px] font-bold text-violet-500 mt-0.5">
                          {edu.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Skills & Certifications */}
              <div className="md:col-span-4 space-y-8">
                {/* Tech Skills List */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 border-b pb-2">
                    <Cpu className="w-4 h-4 text-violet-500" />
                    <h2 className="text-sm font-bold uppercase tracking-wider text-gradient">Tech Stack Summary</h2>
                  </div>

                  <div className="space-y-3 text-xs">
                    {/* Filter categories */}
                    <div>
                      <h4 className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mb-1">
                        Languages & Web
                      </h4>
                      <p className="opacity-80">Python, Java, C, HTML/CSS, JavaScript, ES6, React, TypeScript</p>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mb-1">
                        AI & Databases
                      </h4>
                      <p className="opacity-80">Generative AI, Prompt Engineering, NLP, MySQL</p>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mb-1">
                        IDEs & Git
                      </h4>
                      <p className="opacity-80">VS Code, Eclipse IDE, GitHub, Git Versioning</p>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mb-1">
                        Competencies
                      </h4>
                      <p className="opacity-80">Problem Solving, Creative UI Design, Fluent English Presentation</p>
                    </div>
                  </div>
                </div>

                {/* Accomplishments & Signups */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 border-b pb-2">
                    <Award className="w-4 h-4 text-violet-500" />
                    <h2 className="text-sm font-bold uppercase tracking-wider">Achievements</h2>
                  </div>

                  <div className="space-y-3">
                    {CERTIFICATIONS.map((cert, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-white/5 border border-white/5">
                        <p className="text-xs font-bold">{cert.title}</p>
                        <p className="text-[10px] opacity-60">{cert.issuer} • {cert.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Endorsement note */}
                <div className="p-3.5 rounded-xl border border-violet-500/20 bg-violet-600/5 text-[10px] leading-relaxed">
                  <span className="font-bold text-violet-400">RECRUITER NOTE: </span>
                  Gedela Kusuma maintains a strong academic progress score (9.07 CGPA) and is ready for full-time junior positions or senior internships. Contact immediately.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer sticky bar */}
        <div className={`p-4 border-t text-center text-[10px] ${
          darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-205'
        }`}>
          © 2026 Gedela Kusuma portfolio • Generated directly on Cloud System.
        </div>
      </motion.div>
    </div>
  );
}
