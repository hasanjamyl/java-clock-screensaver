
import React, { useEffect, useState } from 'react';
import { ClockState } from '../types';
import { Syntax } from './JavaSyntax';

interface ClockClassProps {
  state: ClockState;
}

const ClockClass: React.FC<ClockClassProps> = ({ state }) => {
  const [pulse, setPulse] = useState({ s: false, m: false, h: false, d: false });

  useEffect(() => setPulse(p => ({ ...p, s: true })), [state.second]);
  useEffect(() => setPulse(p => ({ ...p, m: true })), [state.minute]);
  useEffect(() => setPulse(p => ({ ...p, h: true })), [state.hour]);
  useEffect(() => setPulse(p => ({ ...p, d: true })), [state.day]);

  useEffect(() => {
    const timer = setTimeout(() => setPulse({ s: false, m: false, h: false, d: false }), 400);
    return () => clearTimeout(timer);
  }, [pulse.s, pulse.m, pulse.h, pulse.d]);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex flex-col xl:flex-row gap-8 max-w-7xl w-full px-6 animate-in fade-in zoom-in duration-700">
      {/* Abstraction: Interface Definition */}
      <div className="hidden xl:flex flex-col w-64 shrink-0 gap-4">
        <div className="bg-[#161b22] border-2 border-[#30363d] rounded-xl p-4 shadow-xl opacity-80 scale-95">
          <div className="text-[10px] uppercase font-black text-orange-400 mb-2 tracking-tighter">Interface Definition</div>
          <pre className="text-[10px] font-mono leading-relaxed text-gray-400">
            <Syntax type="keyword">public interface</Syntax> <Syntax type="type">Ticking</Syntax> {"{"}<br/>
            &nbsp;&nbsp;<Syntax type="type">void</Syntax> <Syntax type="method">tick</Syntax>();<br/>
            &nbsp;&nbsp;<Syntax type="type">String</Syntax> <Syntax type="method">toString</Syntax>();<br/>
            {"}"}
          </pre>
        </div>
        
        <div className="bg-[#161b22] border-2 border-[#30363d] rounded-xl p-4 shadow-xl">
           <div className="text-[10px] uppercase font-black text-blue-400 mb-2 tracking-tighter">Memory Allocation</div>
           <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[62%] animate-pulse"></div>
           </div>
           <div className="mt-2 font-mono text-[9px] text-gray-500">Heap: 0x7FA2...0x8E11</div>
        </div>
      </div>

      {/* Encapsulation: Main Class implementation */}
      <div className="flex-grow bg-[#0d1117] border-2 border-[#30363d] rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden">
        <div className="bg-[#161b22] border-b border-[#30363d] flex items-center px-4 h-14 shrink-0">
          <div className="flex gap-2 mr-8">
            <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="flex items-center gap-1 bg-[#0d1117] px-4 h-full border-x border-[#30363d] text-xs font-bold text-blue-400">
            <span className="text-orange-500">©</span> SystemClock.java
          </div>
        </div>

        <div className="flex flex-grow font-mono">
          <div className="w-12 bg-[#0d1117] border-r border-[#30363d] pt-6 text-right pr-4 text-[10px] text-gray-600 select-none">
            {Array.from({ length: 32 }).map((_, i) => <div key={i} className="leading-6">{i + 1}</div>)}
          </div>

          <div className="p-8 flex-grow overflow-x-auto text-sm md:text-base leading-6 text-gray-100">
            <Syntax type="keyword">public class</Syntax> <Syntax type="type">SystemClock</Syntax> <Syntax type="keyword">implements</Syntax> <Syntax type="type">Ticking</Syntax> {"{"}<br/>
            <br/>
            &nbsp;&nbsp;<Syntax type="comment">// Encapsulation: Temporal state</Syntax><br/>
            &nbsp;&nbsp;<Syntax type="keyword">private int</Syntax> <Syntax type="variable">hour</Syntax>, <Syntax type="variable">minute</Syntax>, <Syntax type="variable">second</Syntax>;<br/>
            &nbsp;&nbsp;<Syntax type="keyword">private int</Syntax> <Syntax type="variable">day</Syntax>, <Syntax type="variable">month</Syntax>, <Syntax type="variable">year</Syntax>;<br/>
            &nbsp;&nbsp;<Syntax type="keyword">private String</Syntax> <Syntax type="variable">dayOfWeek</Syntax>;<br/>
            &nbsp;&nbsp;<Syntax type="keyword">private boolean</Syntax> <Syntax type="variable">isLeapYear</Syntax>;<br/>
            <br/>
            &nbsp;&nbsp;<Syntax type="keyword">@Override</Syntax><br/>
            &nbsp;&nbsp;<Syntax type="keyword">public void</Syntax> <Syntax type="method">tick</Syntax>() {"{"}<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<Syntax type="keyword">this</Syntax>.<Syntax type="variable">hour</Syntax> <Syntax type="operator">=</Syntax> <span className={`transition-all duration-300 inline-block px-1 rounded-sm ${pulse.h ? 'bg-purple-500/30 text-white shadow-[0_0_15px_purple]' : 'text-purple-400'}`}>{state.hour}</span>;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<Syntax type="keyword">this</Syntax>.<Syntax type="variable">minute</Syntax> <Syntax type="operator">=</Syntax> <span className={`transition-all duration-300 inline-block px-1 rounded-sm ${pulse.m ? 'bg-purple-500/30 text-white shadow-[0_0_15px_purple]' : 'text-purple-400'}`}>{state.minute}</span>;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<Syntax type="keyword">this</Syntax>.<Syntax type="variable">second</Syntax> <Syntax type="operator">=</Syntax> <span className={`transition-all duration-300 inline-block px-1 rounded-sm ${pulse.s ? 'bg-purple-500/30 text-white shadow-[0_0_15px_purple]' : 'text-purple-400'}`}>{state.second}</span>;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<Syntax type="keyword">this</Syntax>.<Syntax type="variable">day</Syntax> <Syntax type="operator">=</Syntax> <span className="text-purple-400">{state.day}</span>;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<Syntax type="keyword">this</Syntax>.<Syntax type="variable">month</Syntax> <Syntax type="operator">=</Syntax> <span className="text-purple-400">{state.month}</span>;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<Syntax type="keyword">this</Syntax>.<Syntax type="variable">year</Syntax> <Syntax type="operator">=</Syntax> <span className="text-purple-400">{state.year}</span>;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<Syntax type="keyword">this</Syntax>.<Syntax type="variable">dayOfWeek</Syntax> <Syntax type="operator">=</Syntax> <Syntax type="string">"{state.dayOfWeek}"</Syntax>;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<Syntax type="keyword">this</Syntax>.<Syntax type="variable">isLeapYear</Syntax> <Syntax type="operator">=</Syntax> <Syntax type="value">{state.isLeapYear ? 'true' : 'false'}</Syntax>;<br/>
            &nbsp;&nbsp;{"}"}<br/>
            <br/>
            &nbsp;&nbsp;<Syntax type="keyword">@Override</Syntax><br/>
            &nbsp;&nbsp;<Syntax type="keyword">public</Syntax> <Syntax type="type">String</Syntax> <Syntax type="method">toString</Syntax>() {"{"}<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<Syntax type="keyword">return</Syntax> <Syntax type="string">String.format</Syntax>(<Syntax type="string">"%s, %04d-%02d-%02d %02d:%02d:%02d"</Syntax>, <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Syntax type="variable">dayOfWeek</Syntax>, <Syntax type="variable">year</Syntax>, <Syntax type="variable">month</Syntax>, <Syntax type="variable">day</Syntax>, <Syntax type="variable">hour</Syntax>, <Syntax type="variable">minute</Syntax>, <Syntax type="variable">second</Syntax>);<br/>
            &nbsp;&nbsp;{"}"}<br/>
            {"}"}
          </div>
        </div>

        <div className="bg-[#161b22] border-t border-[#30363d] h-10 flex items-center justify-between px-6 text-xs text-gray-500 font-mono">
          <div className="flex items-center gap-6">
            <span className="text-green-500 flex items-center gap-2 font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Runtime: Running
            </span>
            <span className="hidden sm:inline">Thread: Main-0</span>
          </div>
          <div className="flex items-center gap-4 text-blue-400/80">
            <span>JVM 21.0.1</span>
            <span className="bg-gray-800 px-2 py-0.5 rounded text-[10px] text-gray-300">UTF-8</span>
          </div>
        </div>
      </div>

      {/* Polymorphism: Live Object Instance */}
      <div className="flex flex-col w-full xl:w-80 shrink-0 gap-6">
        <div className="bg-[#0d1117] border-2 border-[#30363d] rounded-2xl p-6 shadow-2xl">
          <div className="text-[11px] uppercase font-black text-purple-400 mb-5 border-b border-[#30363d] pb-3 tracking-widest flex items-center gap-2">
             <div className="w-2 h-4 bg-purple-500 rounded-sm"></div>
             Live Instance Data
          </div>
          <div className="font-mono text-xs space-y-4">
            <div className="flex justify-between items-center bg-white/5 p-2 rounded">
              <span className="text-blue-300 text-[10px]">instance</span>
              <span className="text-gray-500 text-[10px]">@0x9F8B2</span>
            </div>
            <div className="space-y-2 pl-2 overflow-y-auto max-h-[300px] scrollbar-hide">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-gray-400 text-[10px]">hour</span>
                <span className="text-white font-bold">{pad(state.hour)}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-gray-400 text-[10px]">minute</span>
                <span className="text-white font-bold">{pad(state.minute)}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-gray-400 text-[10px]">second</span>
                <span className={`text-white font-bold transition-all ${pulse.s ? 'scale-110 text-purple-400' : ''}`}>{pad(state.second)}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-gray-400 text-[10px]">day</span>
                <span className="text-white font-bold">{state.day}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-gray-400 text-[10px]">month</span>
                <span className="text-white font-bold">{state.month}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-gray-400 text-[10px]">year</span>
                <span className="text-white font-bold">{state.year}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-gray-400 text-[10px]">dayOfWeek</span>
                <span className="text-green-400 font-bold">"{state.dayOfWeek}"</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-gray-400 text-[10px]">leapYear</span>
                <span className="text-orange-400 font-bold">{state.isLeapYear ? 'true' : 'false'}</span>
              </div>
              <div className="pt-2 flex flex-col gap-1">
                <span className="text-gray-500 text-[10px]">toString()</span>
                <span className="text-green-400 bg-green-400/5 border border-green-500/20 px-2 py-2 rounded text-[10px] text-center font-bold break-all">
                  "{state.dayOfWeek}, {state.year}-{pad(state.month)}-{pad(state.day)} {pad(state.hour)}:{pad(state.minute)}:{pad(state.second)}"
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0d1117] border-2 border-[#30363d] rounded-2xl p-6 shadow-2xl flex-grow max-h-48 overflow-hidden relative">
          <div className="text-[11px] uppercase font-black text-gray-500 mb-4 tracking-widest">Compiler Log</div>
          <div className="font-mono text-[10px] text-gray-500 space-y-2 opacity-60">
            <div className="text-blue-500">[INFO] Compiling SystemClock.java...</div>
            <div className="text-green-500">[OK] Class loaded into Metaspace.</div>
            <div className="text-gray-400">[JVM] Instance created at 0x9F8B2</div>
            <div className="text-gray-400 italic">[LOG] Tick event @ {state.timestamp}</div>
            <div className="animate-pulse text-blue-500 font-bold">_</div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default ClockClass;
