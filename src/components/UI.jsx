import React from"react";
export function Header(){return <header className="header"><div><div className="brand">◉ Radar</div><div className="tagline">Porque entender seu corpo muda tudo.</div></div><div className="pill">Perimenopausa</div></header>}
export function Card({children,className=""}){return <section className={`card ${className}`}>{children}</section>}
export function Button({children,variant="primary",...props}){return <button className={`btn ${variant}`} {...props}>{children}</button>}
export function Indicator({label,value}){const d=value>=75?"Estável.":value>=55?"Atenção leve.":value>=35?"Merece cuidado.":"Prioridade hoje.";return <div className="indicator"><div><strong>{label}</strong><span>{d}</span></div><b>{value}%</b></div>}
