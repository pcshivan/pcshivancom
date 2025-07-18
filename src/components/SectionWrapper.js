import React from 'react';

const SectionWrapper = ({ id, title, children, themeClasses }) => (
  <section id={id} className={`relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br ${themeClasses.themeBgStartClass} ${themeClasses.themeBgEndClass} text-${themeClasses.mainText} min-h-screen flex flex-col justify-center items-center overflow-hidden`}>
    {/* Subtle geometric background pattern for layering and depth */}
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
    <h2 className="relative z-10 text-5xl md:text-6xl font-extrabold mb-12 text-center text-theme-accent drop-shadow-lg font-cinzel tracking-wide animate-fade-in-up-slow">
      {title}
    </h2>
    <div className="relative z-10 max-w-6xl w-full">
      {children}
    </div>
  </section>
);

export default SectionWrapper;
