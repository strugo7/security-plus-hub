// src/pages/SimulationPage.tsx
// Cyber Attack Simulation — matches "Page 9 - cyber attack simulation" UX/UI design

import React, { useState, useRef } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { useNavigate } from 'react-router-dom';

const C = '#0da6f2';
const G = '#22c55e';

const ATTACKS = [
    { id: 'sql', name: 'SQL Injection', icon: 'database', color: '#f97316', difficulty: 'Easy', minutes: 20, topic: '2.3' },
    { id: 'xss', name: 'Cross-Site Scripting', icon: 'code', color: '#a855f7', difficulty: 'Medium', minutes: 25, topic: '2.3' },
    { id: 'mitm', name: 'Man-in-the-Middle', icon: 'wifi_2_bar', color: '#ef4444', difficulty: 'Hard', minutes: 35, topic: '2.2' },
    { id: 'phish', name: 'Phishing Simulation', icon: 'phishing', color: '#f59e0b', difficulty: 'Easy', minutes: 15, topic: '2.4' },
    { id: 'brute', name: 'Brute Force Attack', icon: 'lock', color: '#ec4899', difficulty: 'Medium', minutes: 20, topic: '4.1' },
];

const TOOLS = [
    { name: 'Nmap', code: `nmap -sV -sC -p 1-1000 target.local`, desc: 'Service/version detection scan' },
    { name: 'SQLMap', code: `sqlmap -u "http://target/page?id=1" --dbs`, desc: 'Automated SQL injection scanner' },
    { name: 'Metasploit', code: `use exploit/multi/handler\nset payload windows/x64/meterpreter/reverse_tcp\nrun`, desc: 'Exploitation framework' },
    { name: 'Hydra', code: `hydra -l admin -P wordlist.txt target ssh`, desc: 'Network login cracker' },
];

export default function SimulationPage() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(ATTACKS[0]);
    const [logs, setLogs] = useState<string[]>(['> System ready. Select an attack scenario and press Run Attack.']);
    const [running, setRunning] = useState(false);
    const logsRef = useRef<HTMLDivElement>(null);

    const runAttack = () => {
        if (running) return;
        setRunning(true);

        const steps: { delay: number; msg: string }[] = [
            { delay: 300, msg: `> [*] Initiating ${selected.name} scenario...` },
            { delay: 800, msg: `> [*] Scanning target: 192.168.1.100` },
            { delay: 1500, msg: `> [+] Port 80 open — HTTP service detected` },
            { delay: 2200, msg: `> [*] Searching for ${selected.name.toLowerCase()} vectors...` },
            { delay: 3000, msg: `> [!] Vulnerability found in user input field /api/data?id=1` },
            { delay: 3800, msg: `> [*] Crafting payload...` },
            { delay: 4500, msg: `> [+] Payload injected successfully` },
            { delay: 5200, msg: `> [*] Extracting database schema...` },
            { delay: 6000, msg: `> [+] FOUND: users (id, email, password_hash, role)` },
            { delay: 6800, msg: `> [+] 42 records dumped — simulation complete` },
            { delay: 7200, msg: `> [$] Attack simulation finished. View report for mitigation advice.` },
        ];

        steps.forEach(({ delay, msg }) => {
            setTimeout(() => {
                setLogs(l => [...l, msg]);
                setTimeout(() => {
                    if (logsRef.current) logsRef.current.scrollTop = logsRef.current.scrollHeight;
                }, 50);
            }, delay);
        });

        setTimeout(() => setRunning(false), 7500);
    };

    const reset = () => {
        setLogs(['> System ready. Select an attack scenario and press Run Attack.']);
        setRunning(false);
    };

    return (
        <AppLayout>
            {/* Header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                    <p className="text-xs font-mono mb-1" style={{ color: C }}>CYBERGUARD // SIMULATION LAB</p>
                    <h1 className="text-xl font-bold" style={{ color: '#e6edf3' }}>Cyber Attack Simulation</h1>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/simulations/sql/report')}
                        className="px-4 py-2 rounded-lg text-sm border border-solid transition-all"
                        style={{ borderColor: '#30363d', color: '#8b949e' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#e6edf3'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8b949e'; }}
                    >
                        View Reports
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Attack Library */}
                <div>
                    <h2 className="text-sm font-bold mb-3" style={{ color: '#e6edf3' }}>🎯 Attack Library</h2>
                    <div className="space-y-2">
                        {ATTACKS.map(attack => (
                            <button
                                key={attack.id}
                                onClick={() => setSelected(attack)}
                                className="w-full text-left p-4 rounded-xl border border-solid transition-all"
                                style={{
                                    background: selected.id === attack.id ? `${attack.color}12` : 'rgba(255,255,255,0.02)',
                                    borderColor: selected.id === attack.id ? `${attack.color}66` : '#30363d',
                                }}
                                onMouseEnter={e => { if (selected.id !== attack.id) { e.currentTarget.style.borderColor = '#8b949e'; } }}
                                onMouseLeave={e => { if (selected.id !== attack.id) { e.currentTarget.style.borderColor = '#30363d'; } }}
                            >
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="material-symbols-outlined text-lg" style={{ color: attack.color }}>{attack.icon}</span>
                                    <span className="font-semibold text-sm" style={{ color: '#e6edf3' }}>{attack.name}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs" style={{ color: '#8b949e' }}>
                                    <span className="px-1.5 py-0.5 rounded" style={{ background: `${attack.color}18`, color: attack.color }}>{attack.difficulty}</span>
                                    <span>~{attack.minutes} min</span>
                                    <span>Topic {attack.topic}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Toolbox + Terminal */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                    {/* Selected attack info */}
                    <div
                        className="rounded-xl border border-solid p-5"
                        style={{ background: `linear-gradient(135deg, ${selected.color}08, #161b22)`, borderColor: `${selected.color}44` }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <h2 className="font-bold text-base" style={{ color: '#e6edf3' }}>{selected.name}</h2>
                                <p className="text-xs mt-0.5" style={{ color: '#8b949e' }}>
                                    Difficulty: <span style={{ color: selected.color }}>{selected.difficulty}</span>
                                    {' · '} Est. {selected.minutes} min
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={reset} className="px-3 py-2 rounded-lg text-sm border border-solid transition-all" style={{ borderColor: '#30363d', color: '#8b949e' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#e6edf3'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8b949e'; }}
                                >Reset</button>
                                <button
                                    onClick={runAttack}
                                    disabled={running}
                                    className="px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
                                    style={{ background: running ? '#30363d' : selected.color, color: running ? '#8b949e' : '#0d1117' }}
                                >
                                    <span className="material-symbols-outlined text-base">{running ? 'hourglass_empty' : 'play_arrow'}</span>
                                    {running ? 'Running...' : 'Run Attack'}
                                </button>
                            </div>
                        </div>

                        {/* Toolbox */}
                        <h3 className="text-xs font-bold uppercase mb-2" style={{ color: '#64748b' }}>🔧 Toolbox</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {TOOLS.map(tool => (
                                <div key={tool.name} className="rounded-lg p-3 border border-solid" style={{ background: 'rgba(255,255,255,0.03)', borderColor: '#30363d' }}>
                                    <p className="text-xs font-bold mb-1" style={{ color: C }}>{tool.name}</p>
                                    <p className="text-[10px] font-mono mb-1" style={{ color: '#8b949e' }}>{tool.desc}</p>
                                    <pre className="text-[10px] font-mono overflow-x-auto" style={{ color: '#22c55e' }}>{tool.code}</pre>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Terminal */}
                    <div
                        className="rounded-xl border border-solid flex flex-col"
                        style={{ background: '#0a0f14', borderColor: '#1c2333', minHeight: '260px' }}
                    >
                        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-solid" style={{ borderColor: '#1c2333' }}>
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-80" />
                            <span className="text-[10px] font-mono ml-2" style={{ color: '#4b5563' }}>Server Query Logs</span>
                        </div>
                        <div ref={logsRef} className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-1" style={{ color: G, lineHeight: 1.8 }}>
                            {logs.map((line, i) => (
                                <div key={i} style={{ color: line.startsWith('> [+]') ? G : line.startsWith('> [!]') ? '#f59e0b' : line.startsWith('> [$]') ? C : '#22c55e' }}>
                                    {line}
                                </div>
                            ))}
                            {running && <div style={{ color: G }} className="blink">{'> _'}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
