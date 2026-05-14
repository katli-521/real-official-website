// @ts-nocheck
import { FlexGrow } from './flex-grow';

export const MinHScreen = () => {
  return (
    <>
      <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white font-sans selection:bg-accent selection:text-white transition-colors duration-0 flex flex-col">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="font-mono text-lg font-bold tracking-tighter">
              Yuri.WG
            </div>
            <div className="flex space-x-8">
              <button className="relative text-sm font-medium transition-colors duration-200 text-black dark:text-white">
                Home
                <div
                  className="absolute -bottom-6 left-0 right-0 h-0.5 bg-black dark:bg-white"
                  style={{
                    opacity: '1',
                  }}
                />
              </button>
              <button className="relative text-sm font-medium transition-colors duration-200 text-gray-500 hover:text-black dark:hover:text-white">
                AI Library
              </button>
              <button className="relative text-sm font-medium transition-colors duration-200 text-gray-500 hover:text-black dark:hover:text-white">
                Knowledge Base
              </button>
              <button className="relative text-sm font-medium transition-colors duration-200 text-gray-500 hover:text-black dark:hover:text-white">
                Data Viz
              </button>
            </div>
            <div className="w-20" />
          </div>
        </nav>
        <div className="fixed top-4 right-6 z-[60] flex items-center gap-3">
          <button className="text-xs font-mono border border-gray-200 dark:border-gray-800 px-2 py-1 hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black transition-colors uppercase bg-white/50 dark:bg-black/50 backdrop-blur-sm">
            DARK
          </button>
          <button className="text-xs font-mono border border-gray-200 dark:border-gray-800 px-2 py-1 hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black transition-colors uppercase bg-white/50 dark:bg-black/50 backdrop-blur-sm">
            EN
          </button>
        </div>
        <FlexGrow />
        <footer className="relative border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0033FF_1px,transparent_1px),linear-gradient(to_bottom,#0033FF_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-black dark:text-white">
                    CONNECT
                    <span className="text-accent">.</span>
                  </h3>
                  <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-light leading-relaxed max-w-md">
                    Interested in collaboration, AI workflows, or data
                    visualization? Reach out through social channels.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-accent mb-8 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    Channels
                  </div>
                  <div className="flex flex-col gap-6">
                    <a
                      href="mailto:wangyuli1991@hotmail.com"
                      className="group flex items-center gap-4 text-black dark:text-white hover:text-accent transition-all"
                    >
                      <div className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-mail"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </div>
                      <span className="font-bold text-lg tracking-tight">
                        Email
                      </span>
                    </a>
                    <a
                      href="https://github.com/YuriWg"
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-4 text-black dark:text-white hover:text-accent transition-all"
                    >
                      <div className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-github"
                        >
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                      </div>
                      <span className="font-bold text-lg tracking-tight">
                        Github
                      </span>
                    </a>
                    <a
                      href="https://x.com/yuli_wg?s=21"
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-4 text-black dark:text-white hover:text-accent transition-all"
                    >
                      <div className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-twitter"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                      </div>
                      <span className="font-bold text-lg tracking-tight">
                        Twitter
                      </span>
                    </a>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-8">
                    WeChat / ID
                  </div>
                  <div className="relative group">
                    <div className="w-full aspect-square bg-white border border-neutral-200 dark:border-neutral-800 p-4 overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <img
                        src="https://static.step1.dev/gxcfov/assets/172451178dcc.png"
                        alt="WeChat QR"
                        className="w-full h-full object-cover transition-all duration-700 opacity-90 group-hover:opacity-100"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                        Scan to follow
                      </span>
                      <div className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-8">
                    XiaoHongShu / ID
                  </div>
                  <div className="relative group">
                    <div className="w-full aspect-square bg-white border border-neutral-200 dark:border-neutral-800 p-4 overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <img
                        src="https://static.step1.dev/gxcfov/assets/048fda8597b9.png"
                        alt="XiaoHongShu QR"
                        className="w-full h-full object-cover transition-all duration-700 opacity-90 group-hover:opacity-100"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                        @游梨
                      </span>
                      <div className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-100 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-950/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto py-6 px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase font-mono tracking-[0.3em] text-neutral-400">
              <div className="flex items-center gap-4">
                <span>© 2026 YURI.WG</span>
                <span className="hidden md:inline text-neutral-200 dark:text-neutral-800">
                  |
                </span>
                <span>Inspired by minimalist aesthetics.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-accent" />
                DIGITAL CRAFTSMANSHIP
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
