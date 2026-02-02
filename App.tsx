
import React, { useState, useEffect, useCallback } from 'react';
import { ClockState } from './types';
import ClockClass from './components/ClockClass';

const App: React.FC = () => {
  const [timeState, setTimeState] = useState<ClockState | null>(null);
  const [isIdle, setIsIdle] = useState(true);
  const [booting, setBooting] = useState(true);
  const [showExitHint, setShowExitHint] = useState(false);

  const updateClock = useCallback(() => {
    const now = new Date();
    const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    
    const newState: ClockState = {
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds(),
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      dayOfWeek: now.toLocaleDateString('en-US', { weekday: 'long' }),
      isLeapYear: isLeapYear(now.getFullYear()),
      timestamp: Date.now(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    setTimeState(newState);
  }, []);

  useEffect(() => {
    updateClock();
    const interval = setInterval(updateClock, 1000);
    
    const bootTimer = setTimeout(() => {
      setBooting(false);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(bootTimer);
    };
  }, [updateClock]);

  useEffect(() => {
    let idleTimer: any;
    const handleActivity = () => {
      setIsIdle(false);
      setShowExitHint(true);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setIsIdle(true);
        setShowExitHint(false);
      }, 5000);
    };

    window.addEventListener('mousemove', handleActivity, { passive: true });
    window.addEventListener('keydown', handleActivity, { passive: true });
    window.addEventListener('mousedown', handleActivity, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('mousedown', handleActivity);
      clearTimeout(idleTimer);
    };
  }, []);

  if (!timeState) return <div className="bg-[#010409] w-screen h-screen"></div>;

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-[#010409] overflow-hidden select-none cursor-none text-white transition-opacity duration-1000">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10" 
             style={{ 
               backgroundImage: 'linear-gradient(#58a6ff 1px, transparent 1px), linear-gradient(90deg, #58a6ff 1px, transparent 1px)', 
               backgroundSize: '80px 80px',
               maskImage: 'radial-gradient(circle, black 30%, transparent 80%)'
             }}>
        </div>
        
        {/* Scrolling Code Particles - Fixed Escaping */}
        <div className="absolute inset-0 opacity-[0.08] font-mono text-[10px] text-blue-300">
          {Array.from({length: 8}).map((_, i) => (
            <div key={i} className="absolute whitespace-nowrap animate-[drift_120s_linear_infinite]" 
                 style={{ 
                   top: `${i * 15}%`, 
                   left: i % 2 === 0 ? '-10%' : '100%', 
                   animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
                   animationDelay: `${i * -15}s`
                 }}>
              public class Logic {"{"} private final int id = {i}; @Override public void run() {"{"} System.out.println("Executing thread: " + id); {"}"} {"}"}
              &nbsp;&nbsp;&nbsp;&nbsp;
              interface Temporal {"{"} long getTimestamp(); {"}"}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 transition-all duration-1000 transform ${isIdle ? 'screensaver-float scale-100' : 'scale-90 opacity-40 blur-sm'}`}>
        {!booting && <ClockClass state={timeState} />}
      </div>

      {/* Booting Loader */}
      {booting && (
        <div className="fixed inset-0 z-[100] bg-[#010409] flex flex-col items-center justify-center animate-out fade-out duration-1000 delay-1000 fill-mode-forwards">
          <div className="w-80 space-y-6">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-blue-500 font-black tracking-widest">BOOTING CLOCK_V3</span>
              <span className="text-gray-600">STABLE_BUILD</span>
            </div>
            <div className="h-1 w-full bg-gray-900 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-blue-500 transition-all duration-1500 ease-in-out shadow-[0_0_15px_#3b82f6]" 
                   style={{ width: '100%' }}></div>
            </div>
            <div className="text-center font-mono text-[10px] text-gray-700 uppercase animate-pulse">
              Allocating Object Space...
            </div>
          </div>
        </div>
      )}

      {/* Exit Prompt */}
      <div className={`absolute bottom-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${showExitHint ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="bg-black/60 border-2 border-white/10 text-gray-300 px-12 py-4 rounded-3xl text-xs font-mono font-black backdrop-blur-2xl shadow-2xl flex items-center gap-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shadow-[0_0_10px_red]"></div>
          EXIT VIA MOUSE OR KEYBOARD
        </div>
      </div>

      {/* CRT Line Effect */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.02] bg-[length:100%_4px] bg-repeat" 
           style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,1) 50%)' }}></div>
    </div>
  );
};

export default App;
