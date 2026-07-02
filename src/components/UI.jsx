import React from "react";
export function Header(){return <header className="header"><div><div className="brand">◉ Radar</div><div className="tagline">Porque entender seu corpo muda tudo.</div></div><div className="pill">Perimenopausa</div></header>}
export function Card({children,className=""}){return <section className={`card ${className}`}>{children}</section>}
export function Button({children,variant="primary",...props}){return <button className={`btn ${variant}`} {...props}>{children}</button>}
export function Indicator({label,value}){const d=value>=75?"Seu ponto forte hoje.":value>=55?"Dentro do esperado para hoje.":value>=35?"Merece atenção.":"Prioridade de cuidado hoje.";return <div className="indicator"><div><strong>{label}</strong><span>{d}</span></div><b>{value}%</b></div>}
