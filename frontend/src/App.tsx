import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './index.css';


        
        
        

        // --- Shared Components ---

        const TopNavBar = () => {
            const location = useLocation();
            const isActive = (path) => location.pathname === path;

            return (
                <header className="fixed top-0 w-full z-50 bg-surface border-b border-surface-border flex justify-between items-center px-margin-desktop h-16">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="font-headline-md text-headline-md font-bold text-primary">SegmentML</Link>
                        <nav className="hidden md:flex gap-6">
                            <Link 
                                className={`${isActive('/') ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'} pb-1 font-body-md text-body-md transition-colors duration-200`} 
                                to="/"
                            >Overview</Link>
                            <Link 
                                className={`${isActive('/analysis') ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'} pb-1 font-body-md text-body-md transition-colors duration-200`} 
                                to="/analysis"
                            >Analysis</Link>
                            <Link 
                                className={`${isActive('/developer') ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'} pb-1 font-body-md text-body-md transition-colors duration-200`} 
                                to="/developer"
                            >Developer</Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => alert('Help center opened')} className="material-symbols-outlined text-on-surface-variant hover:text-primary">help</button>
                        <button onClick={() => alert('Model run initiated!')} className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-lg font-label-md text-label-md hover:opacity-80 active:scale-95 transition-all">Run Model</button>
                    </div>
                </header>
            );
        };

        const SideNavBar = () => {
            const location = useLocation();
            const isActive = (path) => location.pathname === path;

            return (
                <aside className="hidden md:flex flex-col h-[calc(100vh-64px)] w-64 fixed left-0 top-16 bg-surface-container border-r border-surface-border py-base z-40">
                    <div className="px-6 py-4">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-headline-md text-headline-md font-bold text-on-surface">SegmentML</span>
                        </div>
                        <p className="text-on-surface-variant font-label-sm text-label-sm">Precision Analytics</p>
                    </div>
                    <nav className="flex-1 px-2 space-y-1 mt-4">
                        <Link to="/" className={`flex items-center gap-3 px-4 py-3 transition-all ${isActive('/') ? 'text-primary font-bold border-r-2 border-primary bg-surface-container-high' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
                            <span className="material-symbols-outlined">dashboard</span>
                            <span className="font-label-md text-label-md">Project Overview</span>
                        </Link>
                        <Link to="/analysis" className={`flex items-center gap-3 px-4 py-3 transition-all ${isActive('/analysis') ? 'text-primary font-bold border-r-2 border-primary bg-surface-container-high' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
                            <span className="material-symbols-outlined">analytics</span>
                            <span className="font-label-md text-label-md">Model Analysis</span>
                        </Link>
                        <Link to="/developer" className={`flex items-center gap-3 px-4 py-3 transition-all ${isActive('/developer') ? 'text-primary font-bold border-r-2 border-primary bg-surface-container-high' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
                            <span className="material-symbols-outlined">account_circle</span>
                            <span className="font-label-md text-label-md">About Developer</span>
                        </Link>
                    </nav>
                    <div className="px-4 py-4 space-y-1 border-t border-surface-border">
                        <button onClick={() => alert('Documentation opened')} className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-secondary font-label-sm text-label-sm">
                            <span className="material-symbols-outlined text-[18px]">description</span>
                            <span>Documentation</span>
                        </button>
                        <button onClick={() => alert('Settings opened')} className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-secondary font-label-sm text-label-sm">
                            <span className="material-symbols-outlined text-[18px]">settings</span>
                            <span>Settings</span>
                        </button>
                    </div>
                    <div className="p-4">
                        <button onClick={() => alert('Report exporting...')} className="w-full py-2 bg-outline-variant text-on-surface rounded font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all">Export Report</button>
                    </div>
                </aside>
            );
        };

        const Footer = ({ marginLeft = true }) => (
            <footer className={`w-full py-8 bg-surface-container-lowest border-t border-surface-border mt-auto ${marginLeft ? 'md:pl-64' : ''}`}>
                <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop gap-4">
                    <div className="flex items-center gap-4">
                        <span className="font-label-md text-label-md font-bold text-on-surface">SegmentML</span>
                        <span className="text-on-surface-variant font-label-sm text-label-sm">© 2024 SegmentML Analytics. Precision at Scale.</span>
                    </div>
                    <div className="flex gap-6">
                        <a className="text-on-surface-variant hover:text-secondary underline transition-all font-label-sm text-label-sm" href="#">Documentation</a>
                        <a className="text-on-surface-variant hover:text-secondary underline transition-all font-label-sm text-label-sm" href="#">GitHub</a>
                        <a className="text-on-surface-variant hover:text-secondary underline transition-all font-label-sm text-label-sm" href="#">Privacy Policy</a>
                        <a className="text-on-surface-variant hover:text-secondary underline transition-all font-label-sm text-label-sm" href="#">Terms of Service</a>
                    </div>
                </div>
            </footer>
        );

        // --- Main Screen Components ---

        const OverviewPage = () => {
            const scatterDots = useMemo(() => {
                const clusters = [
                    { color: 'bg-data-indigo', x: '10%', y: '10%' },
                    { color: 'bg-data-teal', x: '70%', y: '20%' },
                    { color: 'bg-tertiary', x: '20%', y: '70%' },
                    { color: 'bg-primary', x: '60%', y: '60%' }
                ];
                return Array.from({ length: 60 }).map((_, i) => {
                    const cluster = clusters[Math.floor(Math.random() * 4)];
                    const offsetX = (Math.random() * 20) - 10;
                    const offsetY = (Math.random() * 20) - 10;
                    const size = Math.random() * 8 + 4;
                    return { cluster, offsetX, offsetY, size, id: i };
                });
            }, []);

            return (
                <main className="flex-1 bg-background overflow-x-hidden pt-16">
                    <section className="relative px-margin-desktop py-16 overflow-hidden border-b border-surface-border">
                        <div className="absolute inset-0 opacity-20 data-grid-pattern pointer-events-none"></div>
                        <div className="relative z-10 max-w-4xl">
                            <span className="inline-block px-3 py-1 rounded-full border border-primary text-primary font-label-sm text-label-sm mb-6 uppercase tracking-wider">Unsupervised Learning</span>
                            <h1 className="font-display-lg text-display-lg text-on-surface mb-6 leading-tight">Customer Segmentation</h1>
                            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8">
                                AI-driven insights to uncover patterns in purchasing and spending.
                            </p>
                            <div className="flex gap-4">
                                <Link to="/analysis" className="px-6 py-3 bg-primary text-on-primary rounded-lg font-headline-md text-body-md font-bold hover:scale-[1.02] transition-transform inline-block">Explore Insights</Link>
                                <button onClick={() => alert('Opening Jupyter Notebook...')} className="px-6 py-3 border border-surface-border text-on-surface rounded-lg font-headline-md text-body-md hover:bg-surface-container transition-colors">View Notebook</button>
                            </div>
                        </div>
                    </section>
                    
                    <section className="px-margin-desktop py-12">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
                            <div className="glass-card p-6 rounded-xl">
                                <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-primary">cleaning_services</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md mb-3">Preprocessing</h3>
                                <p className="text-on-surface-variant font-body-md text-body-md mb-4">Meticulous data hygiene ensuring model integrity across disparate data sources.</p>
                                <ul className="space-y-2 text-on-surface font-label-md text-label-md">
                                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span> Missing Value Imputation</li>
                                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span> StandardScaler Normalization</li>
                                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span> Outlier Detection & Removal</li>
                                </ul>
                            </div>
                            <div className="glass-card p-6 rounded-xl">
                                <div className="w-12 h-12 rounded bg-secondary/10 flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-secondary">analytics</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md mb-3">Feature Selection</h3>
                                <p className="text-on-surface-variant font-body-md text-body-md mb-4">Targeted variables optimized for maximizing cluster silhouette scores.</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="p-3 bg-surface-container-lowest rounded border border-surface-border"><p className="font-label-sm text-label-sm text-on-surface-variant">Total Spend</p></div>
                                    <div className="p-3 bg-surface-container-lowest rounded border border-surface-border"><p className="font-label-sm text-label-sm text-on-surface-variant">Items Bought</p></div>
                                    <div className="p-3 bg-surface-container-lowest rounded border border-surface-border"><p className="font-label-sm text-label-sm text-on-surface-variant">Avg Rating</p></div>
                                    <div className="p-3 bg-surface-container-lowest rounded border border-surface-border"><p className="font-label-sm text-label-sm text-on-surface-variant">Recency (Days)</p></div>
                                </div>
                            </div>
                            <div className="glass-card p-6 rounded-xl flex flex-col justify-between">
                                <div>
                                    <h3 className="font-headline-md text-headline-md mb-6">Technical Stack</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {["Python", "KMeans", "Scikit-learn", "Pandas", "Seaborn", "Matplotlib"].map(tech => (
                                            <span key={tech} className="px-3 py-1 bg-surface-container-highest text-on-surface rounded font-label-md text-label-md">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-8 pt-6 border-t border-surface-border">
                                    <div className="flex items-center justify-between">
                                        <span className="text-on-surface-variant font-label-sm text-label-sm">Model Accuracy</span>
                                        <span className="text-tertiary font-label-md text-label-md">0.82 Silhouette</span>
                                    </div>
                                    <div className="w-full bg-surface-container-lowest h-1.5 rounded-full mt-2">
                                        <div className="bg-tertiary h-full rounded-full" style={{width: '82%'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="px-margin-desktop py-12">
                        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">Segment Identification (k=4)</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
                            {[
                                { id: '01', name: 'Power Users', val: '12%', color: 'data-indigo', desc: 'Highest total spend and frequency. These are the core brand advocates.' },
                                { id: '02', name: 'Value Seekers', val: '45%', color: 'data-teal', desc: 'High item count but lower average item price. Sensitive to promotions.' },
                                { id: '03', name: 'At Risk', val: '18%', color: 'tertiary', desc: 'High historical spend but low recent activity (90+ days since last buy).' },
                                { id: '04', name: 'Rising Stars', val: '25%', color: 'primary', desc: 'Recent first purchases with high initial cart value and high ratings.' }
                            ].map(seg => (
                                <div key={seg.id} className="bg-surface-card border border-surface-border rounded-xl p-6 relative group overflow-hidden transition-all duration-300 hover:-translate-y-1">
                                    <div className={`absolute -right-4 -top-4 w-16 h-16 bg-${seg.color} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                                    <p className={`font-label-sm text-label-sm text-${seg.color} mb-2 uppercase`}>Segment {seg.id}</p>
                                    <h4 className="font-headline-md text-headline-md text-on-surface mb-4">{seg.name}</h4>
                                    <div className="text-display-lg text-on-surface mb-4">{seg.val}</div>
                                    <p className="text-on-surface-variant font-body-md text-body-md">{seg.desc}</p>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-12 w-full h-[450px] rounded-2xl glass-card border border-surface-border p-4 md:p-8 flex relative">
                            {/* Y axis label */}
                            <div className="w-12 flex items-center justify-center shrink-0">
                                <p className="-rotate-90 font-label-md text-label-md text-on-surface-variant whitespace-nowrap">Principal Component 2 (Average Spending)</p>
                            </div>
                            
                            <div className="flex-1 flex flex-col min-w-0">
                                {/* Chart Area */}
                                <div className="flex-1 relative border-l border-b border-surface-border overflow-hidden bg-surface-container-lowest/50 rounded-tr-lg">
                                    <div className="absolute inset-0 opacity-10 data-grid-pattern"></div>
                                    <div className="absolute inset-0">
                                        {scatterDots.map(dot => (
                                            <div 
                                                key={dot.id}
                                                className={`absolute rounded-full ${dot.cluster.color} opacity-60`}
                                                style={{
                                                    left: `calc(${dot.cluster.x} + ${dot.offsetX}%)`,
                                                    top: `calc(${dot.cluster.y} + ${dot.offsetY}%)`,
                                                    width: `${dot.size}px`,
                                                    height: `${dot.size}px`
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                
                                {/* X axis label */}
                                <div className="h-12 flex items-center justify-center shrink-0">
                                    <p className="font-label-md text-label-md text-on-surface-variant whitespace-nowrap">Principal Component 1 (Purchase Frequency)</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            );
        };

        const AnalysisPage = () => {
            const [spend, setSpend] = useState(2450);
            const [items, setItems] = useState(12);
            const [age, setAge] = useState(340);
            const [clusterResult, setClusterResult] = useState(0);
            
            const analysisScatterDots = useMemo(() => {
                const clusters = [
                    { color: 'bg-tertiary', x: 15, y: 85 },   // Occasional: low spend (x), low items (y -> high percent)
                    { color: 'bg-error', x: 45, y: 55 },      // Potential
                    { color: 'bg-secondary', x: 15, y: 25 },  // Frequent Low Value: low spend (x), high items (y -> low percent)
                    { color: 'bg-primary', x: 80, y: 20 }     // Big Spenders: high spend (x), high items (y -> low percent)
                ];
                return Array.from({ length: 150 }).map((_, i) => {
                    const cluster = clusters[i % 4];
                    const offsetX = (Math.random() + Math.random() + Math.random() - 1.5) * 15;
                    const offsetY = (Math.random() + Math.random() + Math.random() - 1.5) * 15;
                    const size = Math.random() * 4 + 4;
                    return { cluster, offsetX, offsetY, size, id: i };
                });
            }, []);

            useEffect(() => {
                const getCluster = async () => {
                    try {
                        const res = await fetch('http://127.0.0.1:5002/predict', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ Total_Spend: spend, Items_Purchased: items, Days_Since_Last_Purchase: age })
                        });
                        const data = await res.json();
                        setClusterResult(data.cluster);
                    } catch (e) {}
                };
                getCluster();
            }, [spend, items, age]);


            const segments = [
                { name: "Occasional Buyers", color: "text-tertiary", bg: "bg-tertiary-container/20", borderColor: "border-tertiary/30" },
                { name: "Potential Loyalists", color: "text-error", bg: "bg-error-container/20", borderColor: "border-error/30" },
                { name: "Frequent Low-Value", color: "text-secondary", bg: "bg-secondary-container/20", borderColor: "border-secondary/30" },
                { name: "Big Spenders", color: "text-primary", bg: "bg-primary-container/20", borderColor: "border-primary/30" }
            ];

            const currentSegment = useMemo(() => {
                if (spend > 6000) return segments[3];
                if (spend > 2500 || items > 40) return segments[1];
                if (items > 15) return segments[2];
                return segments[0];
            }, [spend, items]);
            const displaySegment = segments[clusterResult] || segments[0];

            const xPos = (spend / 10000) * 100;
            const yPos = 100 - ((items / 100) * 100);

            return (
                <main className="pt-24 pb-12 px-6 md:px-margin-desktop min-h-screen">
                    <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <p className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-2">Model Workspace</p>
                            <h1 className="font-headline-lg text-headline-lg text-on-surface">Customer Segmentation Analysis</h1>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-gutter">
                        <section className="col-span-12 lg:col-span-4 space-y-gutter">
                            <div className="bg-surface-card border border-surface-border rounded-xl p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="material-symbols-outlined text-primary">tune</span>
                                    <h3 className="font-headline-md text-headline-md text-on-surface">Inference Simulator</h3>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="font-label-md text-label-md text-on-surface-variant">Total Spend ($)</label>
                                        </div>
                                        <input className="w-full bg-surface-container-high border border-surface-border rounded px-3 py-2 text-on-surface focus:border-primary focus:outline-none" type="number" min="0" value={spend} onChange={e => setSpend(parseInt(e.target.value) || 0)} />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="font-label-md text-label-md text-on-surface-variant">Items Purchased</label>
                                        </div>
                                        <input className="w-full bg-surface-container-high border border-surface-border rounded px-3 py-2 text-on-surface focus:border-primary focus:outline-none" type="number" min="1" value={items} onChange={e => setItems(parseInt(e.target.value) || 0)} />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="font-label-md text-label-md text-on-surface-variant">Account Age (Days)</label>
                                        </div>
                                        <input className="w-full bg-surface-container-high border border-surface-border rounded px-3 py-2 text-on-surface focus:border-primary focus:outline-none" type="number" min="1" value={age} onChange={e => setAge(parseInt(e.target.value) || 0)} />
                                    </div>
                                    <div className={`mt-8 p-4 ${displaySegment.bg} border ${displaySegment.borderColor} rounded-lg flex items-center gap-4 transition-all duration-500`}>
                                        <div className="p-3 bg-primary-container rounded-full">
                                            <span className="material-symbols-outlined text-on-primary-container">person_search</span>
                                        </div>
                                        <div>
                                            <p className="font-label-sm text-label-sm text-on-primary-container opacity-80">Predicted Segment</p>
                                            <h4 className={`font-headline-md text-headline-md ${displaySegment.color}`}>{displaySegment.name}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="col-span-12 lg:col-span-8">
                            <div className="bg-surface-card border border-surface-border rounded-xl p-6 h-full flex flex-col">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h3 className="font-headline-md text-headline-md text-on-surface">Customer Distribution Cluster</h3>
                                        <p className="font-body-md text-body-md text-on-surface-variant">Total Spend vs. Items Purchased (Seaborn Style)</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => alert('Zoom action triggered')} className="p-2 bg-surface-container rounded border border-surface-border transition-colors hover:bg-surface-container-high"><span className="material-symbols-outlined text-on-surface-variant">zoom_in</span></button>
                                        <button onClick={() => alert('Filter action triggered')} className="p-2 bg-surface-container rounded border border-surface-border transition-colors hover:bg-surface-container-high"><span className="material-symbols-outlined text-on-surface-variant">filter_list</span></button>
                                    </div>
                                </div>
                                <div className="flex-1 relative bg-surface-container-lowest rounded-lg border border-surface-border/50 p-8 min-h-[400px]">
                                    <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 pointer-events-none opacity-20">
                                        {Array.from({length:25}).map((_, i) => <div key={i} className="border border-surface-border/20"></div>)}
                                    </div>
                                    <div className="relative w-full h-full">
                                        {/* Dynamic point cluster mapped from analysisScatterDots */}
                                        {analysisScatterDots.map(dot => (
                                            <div 
                                                key={dot.id}
                                                className={`absolute rounded-full ${dot.cluster.color} opacity-60 transition-transform duration-300 hover:scale-150 hover:opacity-100 z-10`}
                                                style={{
                                                    left: `calc(${dot.cluster.x}% + ${dot.offsetX}%)`,
                                                    top: `calc(${dot.cluster.y}% + ${dot.offsetY}%)`,
                                                    width: `${dot.size}px`,
                                                    height: `${dot.size}px`
                                                }}
                                            />
                                        ))}
                                        
                                        <div 
                                            className="absolute w-6 h-6 border-4 border-white rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-30 transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2"
                                            style={{ top: `${Math.max(5, Math.min(95, yPos))}%`, left: `${Math.max(5, Math.min(95, xPos))}%` }}
                                        >
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-surface px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap">YOU</div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-surface-container/80 p-3 rounded-lg border border-surface-border flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-xs font-label-md"><span className="w-2 h-2 rounded-full bg-primary"></span> Big Spenders</div>
                                        <div className="flex items-center gap-2 text-xs font-label-md"><span className="w-2 h-2 rounded-full bg-secondary"></span> Frequent Low-Value</div>
                                        <div className="flex items-center gap-2 text-xs font-label-md"><span className="w-2 h-2 rounded-full bg-tertiary"></span> Occasional Buyers</div>
                                        <div className="flex items-center gap-2 text-xs font-label-md"><span className="w-2 h-2 rounded-full bg-error"></span> Potential Loyalists</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            );
        };

        const DeveloperPage = () => {
            return (
                <main className="pt-24 px-margin-mobile md:px-margin-desktop pb-12">
                    <div className="max-w-container-max mx-auto">
                        <section className="grid grid-cols-12 gap-gutter mb-gutter">
                            <div className="col-span-12 lg:col-span-8 glass-card rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center overflow-hidden relative">
                                <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary opacity-10 blur-[100px]"></div>
                                <div className="relative group">
                                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden border-2 border-primary/20 transition-transform duration-500 group-hover:scale-[1.02]">
                                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxnXRw7fanZmCtGKZ_m1AmdxmKt7Gq7itQB8IH7k4GZbr2Wm-7NhHVfKj1aCk3-vqueaPw9r7a2kpDAYs6amUWV1AfOdMban71eNXSVwf4cV2E87GJ4qzFGbK5FMBAEKtyFSEZC3Xb6x_XvyTkh64cPiOt1vlKmckyjKsS1PgvI0Jc0GIMJXESpZmLBxrFJQPgtH9QgwpEABPCtWhFZZyMXB-SJnGX7yMniTNtTH_mYObwamDzYcY2pc1lQLQWDB1s2A" />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 bg-primary text-on-primary p-2 rounded-lg shadow-lg">
                                        <span className="material-symbols-outlined text-[20px]">verified</span>
                                    </div>
                                </div>
                                <div className="flex-grow text-center md:text-left">
                                    <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-2 block">Developer Profile</span>
                                    <h1 className="font-display-lg text-display-lg mb-2 text-glow">Saad Hussain Zaidi</h1>
                                    <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 max-w-xl">
                                        ML & Web Architect building precision-focused analytical tools.
                                    </p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                        <a className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-all active:scale-[0.98]" href="https://saad-hussain-zaidi-beryl.vercel.app/" target="_blank">
                                            <span className="material-symbols-outlined">link</span> Portfolio
                                        </a>
                                        <div className="flex gap-2">
                                            <button onClick={() => alert('Email client opened')} className="p-3 glass-card rounded-lg hover:border-primary transition-all text-primary"><span className="material-symbols-outlined">mail</span></button>
                                            <button onClick={() => alert('Profile shared')} className="p-3 glass-card rounded-lg hover:border-primary transition-all text-primary"><span className="material-symbols-outlined">share</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
                                <div className="glass-card rounded-xl p-6 flex-grow flex flex-col justify-center border-l-4 border-l-secondary">
                                    <span className="font-label-md text-label-md text-on-surface-variant mb-1">Precision Mindset</span>
                                    <h3 className="font-headline-md text-headline-md">Analytical Rigor</h3>
                                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">Designing systems that prioritize scalability and accuracy above all.</p>
                                </div>
                                <div className="glass-card rounded-xl p-6 flex-grow flex flex-col justify-center border-l-4 border-l-primary">
                                    <span className="font-label-md text-label-md text-on-surface-variant mb-1">Experience</span>
                                    <h3 className="font-headline-md text-headline-md">ML Specialist</h3>
                                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">Expertise in supervised learning and deep data segmentation.</p>
                                </div>
                            </div>
                        </section>

                        <section className="grid grid-cols-12 gap-gutter mb-gutter">
                            <div className="col-span-12 md:col-span-6 glass-card rounded-xl p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="material-symbols-outlined text-primary">psychology</span>
                                    <h2 className="font-headline-md text-headline-md">Machine Learning</h2>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between mb-2"><span className="font-label-md text-label-md">Predictive Modeling</span><span className="font-label-sm text-label-sm text-primary">Advanced</span></div>
                                        <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden"><div className="bg-primary h-full w-[92%]"></div></div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-2"><span className="font-label-md text-label-md">Data Segmentation</span><span className="font-label-sm text-label-sm text-primary">Expert</span></div>
                                        <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden"><div className="bg-primary h-full w-[95%]"></div></div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-4">
                                        {['Scikit-Learn', 'PyTorch', 'Pandas', 'K-Means'].map(sk => <span key={sk} className="px-3 py-1 bg-surface-container-highest border border-surface-border text-on-surface-variant text-label-sm rounded-full">{sk}</span>)}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 glass-card rounded-xl p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="material-symbols-outlined text-secondary">terminal</span>
                                    <h2 className="font-headline-md text-headline-md">Web Engineering</h2>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between mb-2"><span className="font-label-md text-label-md">Python (Backend)</span><span className="font-label-sm text-label-sm text-secondary">Advanced</span></div>
                                        <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden"><div className="bg-secondary h-full w-[88%]"></div></div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-2"><span className="font-label-md text-label-md">UI/UX Design</span><span className="font-label-sm text-label-sm text-secondary">Professional</span></div>
                                        <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden"><div className="bg-secondary h-full w-[85%]"></div></div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-4">
                                        {['FastAPI', 'React', 'Tailwind CSS', 'PostgreSQL'].map(sk => <span key={sk} className="px-3 py-1 bg-surface-container-highest border border-surface-border text-on-surface-variant text-label-sm rounded-full">{sk}</span>)}
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </main>
            );
        };

        // --- Main App Wrapper ---

        const App = () => {
            return (
                <Router>
                    <div className="flex flex-col min-h-screen">
                        <TopNavBar />
                        <div className="flex flex-1">
                            <Routes>
                                <Route path="/" element={<OverviewPage />} />
                                <Route path="/analysis" element={<AnalysisPage />} />
                                <Route path="/developer" element={<DeveloperPage />} />
                            </Routes>
                        </div>
                        <Footer marginLeft={false} />
                    </div>
                </Router>
            );
        };

        
    
export default App;
