import React from"react";
export function Header(){return <header className="header"><div><div className="brand">◉ Radar</div><div className="tagline">Entenda os sinais da perimenopausa.</div></div><div className="pill">1.0</div></header>}
export function Card({children,className=""}){return <section className={`card ${className}`}>{children}</section>}
export function Button({children,variant="primary",...props}){return <button className={`btn ${variant}`} {...props}>{children}</button>}
export function FrequencyRing({value}){const deg=Math.round(value*3.6);return <div className="ringWrap"><div className="ring" style={{background:`conic-gradient(#C08B5C ${deg}deg,#EFE7DF ${deg}deg)`}}><div className="ringInner"><strong>{value}</strong><span>Frequência do Corpo™</span></div></div></div>}
export function Indicator({label,value}){const t=value>=75?"estável":value>=55?"atenção leve":value>=35?"merece cuidado":"prioridade";return <div className="indicator"><div><strong>{label}</strong><span>{t}</span></div><b>{value}%</b></div>}
