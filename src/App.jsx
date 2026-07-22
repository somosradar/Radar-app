import React,{useEffect,useMemo,useState}from"react";
import{Home,ClipboardList,HeartPulse,LineChart,BookOpen,MessageCircle,Sparkles,ChevronLeft,ChevronRight,Check,Clock3,Brain,Flame,Moon,Activity,Leaf,ShieldCheck,TrendingUp,CalendarDays}from"lucide-react";
import{questions}from"./data/questions";
import{prescriptions,sosProtocols,library}from"./data/content";
import{buildReading,buildMemoryInsights}from"./utils/radarEngine";
import{Header,Card,Button,ScoreOrb,MetricBar,MiniChart,EmptyState}from"./components/UI";

const safeRead=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch{return fallback}};
const todayLabel=()=>new Intl.DateTimeFormat("pt-BR",{weekday:"long",day:"numeric",month:"long"}).format(new Date());

export default function App(){
 const[screen,setScreen]=useState("home");
 const[context,setContext]=useState("");
 const[bodyPhrase,setBodyPhrase]=useState("");
 const[answers,setAnswers]=useState({});
 const[step,setStep]=useState(0);
 const[reading,setReading]=useState(()=>safeRead("radarCommercialReading",null));
 const[history,setHistory]=useState(()=>safeRead("radarCommercialHistory",[]));
 const[processing,setProcessing]=useState(false);

 function start(){setContext("");setBodyPhrase("");setAnswers({});setStep(0);setScreen("context")}
 function finish(){
   const result=buildReading(answers,context,bodyPhrase,history);
   setProcessing(true);setScreen("processing");
   setTimeout(()=>{setReading(result);localStorage.setItem("radarCommercialReading",JSON.stringify(result));
     const next=[result,...history].slice(0,120);setHistory(next);localStorage.setItem("radarCommercialHistory",JSON.stringify(next));
     setProcessing(false);setScreen("radar")},1300)
 }
 const noNav=["context","conversation","phrase","processing"].includes(screen);
 return <div className="app-shell"><div className="app">
   <Header onHome={()=>setScreen("home")}/>
   <main>
    {screen==="home"&&<HomeScreen reading={reading} history={history} onStart={start} onNav={setScreen}/>}
    {screen==="context"&&<Context value={context} setValue={setContext} onBack={()=>setScreen("home")} onNext={()=>setScreen("conversation")}/>}
    {screen==="conversation"&&<Conversation step={step} setStep={setStep} answers={answers} setAnswers={setAnswers} onBack={()=>step?setStep(step-1):setScreen("context")} onDone={()=>setScreen("phrase")}/>}
    {screen==="phrase"&&<Phrase value={bodyPhrase} setValue={setBodyPhrase} onBack={()=>setScreen("conversation")} onDone={finish}/>}
    {screen==="processing"&&<Processing/>}
    {screen==="radar"&&<Radar reading={reading} onNav={setScreen}/>}
    {screen==="prescription"&&<Prescription reading={reading}/>}
    {screen==="sos"&&<SOS/>}
    {screen==="library"&&<Library/>}
    {screen==="memory"&&<Memory history={history}/>}
    {screen==="talk"&&<Talk reading={reading} history={history}/>}
   </main>
   {!noNav&&<BottomNav current={screen} onNav={setScreen} onStart={start}/>}
 </div></div>
}

function HomeScreen({reading,history,onStart,onNav}){
 const has=!!reading;
 return <>
  <section className="hero-panel">
   <div className="hero-glow"/>
   <div className="kicker"><Sparkles size={14}/> Radar Perimenopausa</div>
   <p className="date">{todayLabel()}</p>
   <h1>{has?"Seu corpo deixou pistas. Vamos conectá-las.":"Entenda o que seu corpo está tentando contar."}</h1>
   <p className="hero-copy">{has?"Sua leitura de hoje está pronta. Veja os sinais que merecem atenção e escolha um ritmo mais gentil para o dia.":"Um check-in de dois minutos transforma sintomas soltos em uma leitura clara, prática e pessoal."}</p>
   <Button onClick={has?()=>onNav("radar"):onStart}>{has?"Ver minha Leitura Radar":"Começar meu check-in"} <ChevronRight size={18}/></Button>
   <div className="trust"><ShieldCheck size={15}/><span>Informação de apoio. Sem diagnóstico e sem julgamento.</span></div>
  </section>

  {has&&<Card className="today-card">
    <div className="section-head"><div><span className="eyebrow">Estado de hoje</span><h2>{reading.profile}</h2></div><span className={`state-dot ${reading.tone}`}/></div>
    <div className="today-grid"><ScoreOrb value={reading.frequency} tone={reading.tone}/><div><p className="body-quote">“{reading.bodySays}”</p><p>{reading.interpretation}</p></div></div>
    <Button variant="secondary" onClick={()=>onNav("radar")}>Abrir leitura completa</Button>
  </Card>}

  <div className="section-title"><div><span className="eyebrow">Sua Radar</span><h2>Clareza que melhora com o tempo</h2></div></div>
  <div className="feature-grid">
   <button className="feature-card" onClick={onStart}><span className="icon-wrap coral"><ClipboardList size={21}/></span><strong>Nova leitura</strong><span>Registre os sinais de hoje.</span></button>
   <button className="feature-card" onClick={()=>onNav("memory")}><span className="icon-wrap plum"><LineChart size={21}/></span><strong>Memória do Corpo</strong><span>{history.length?`${history.length} registros conectados.`:"Descubra seus padrões."}</span></button>
   <button className="feature-card" onClick={()=>onNav("talk")}><span className="icon-wrap sage"><MessageCircle size={21}/></span><strong>Conversa Radar</strong><span>Pergunte sobre o seu dia.</span></button>
   <button className="feature-card" onClick={()=>onNav("sos")}><span className="icon-wrap sand"><HeartPulse size={21}/></span><strong>SOS Radar</strong><span>Apoio rápido para agora.</span></button>
  </div>
  <Card className="insight-teaser">
   <div className="insight-icon"><TrendingUp size={20}/></div>
   <div><span className="eyebrow">Radar aprende com você</span><h3>{history.length>=3?"Seus primeiros padrões já estão aparecendo.":"Cada registro torna a leitura mais pessoal."}</h3><p>{history.length>=3?buildMemoryInsights(history)[0]:"Com três ou mais leituras, a Radar começa a relacionar sono, energia, clareza e outros sinais."}</p></div>
  </Card>
 </>}

function Context({value,setValue,onBack,onNext}){return <FlowShell step="1 de 3" progress={10} onBack={onBack}>
 <div className="question-icon"><CalendarDays size={26}/></div><span className="eyebrow">Contexto do dia</span>
 <h1>Antes dos sintomas, o que aconteceu com você?</h1><p>Uma noite curta, um conflito ou um resfriado podem mudar a leitura. Conte só o que fizer sentido.</p>
 <textarea value={value} onChange={e=>setValue(e.target.value)} placeholder="Ex.: Dormi apenas 4 horas. Estou menstruando. Tive um dia emocionalmente difícil."/>
 <div className="button-row"><Button variant="ghost" onClick={onNext}>Pular</Button><Button onClick={onNext}>Continuar <ChevronRight size={18}/></Button></div>
 </FlowShell>}

function Conversation({step,setStep,answers,setAnswers,onBack,onDone}){
 const q=questions[step],selected=answers[q.key],progress=15+((step+1)/questions.length)*70;
 function choose(v){if(q.multi){const arr=selected||[];const next=v==="Nenhum"?["Nenhum"]:arr.includes(v)?arr.filter(x=>x!==v):[...arr.filter(x=>x!=="Nenhum"),v];setAnswers({...answers,[q.key]:next})}else setAnswers({...answers,[q.key]:v})}
 function next(){if(selected===undefined)return;step<questions.length-1?setStep(step+1):onDone()}
 return <FlowShell step={`${step+1} de ${questions.length}`} progress={progress} onBack={onBack}>
  <div className="question-icon">{iconFor(q.key)}</div><span className="eyebrow">{q.group}</span><p className="microcopy">{q.intro}</p><h1>{q.label}</h1>
  <div className="options">{q.options.map(opt=>{const label=q.multi?opt:opt[0],value=q.multi?opt:opt[1],active=q.multi?(selected||[]).includes(value):selected===value;
   return <button key={label} className={`option ${active?"active":""}`} onClick={()=>choose(value)}><span>{label}</span><span className="option-check">{active&&<Check size={16}/>}</span></button>})}</div>
  <Button disabled={selected===undefined} onClick={next}>{step===questions.length-1?"Continuar":"Próximo"} <ChevronRight size={18}/></Button>
 </FlowShell>
}
function iconFor(key){if(["sleep","wake"].includes(key))return <Moon size={26}/>;if(["heat"].includes(key))return <Flame size={26}/>;if(["clarity","memory"].includes(key))return <Brain size={26}/>;return <Activity size={26}/>}

function Phrase({value,setValue,onBack,onDone}){return <FlowShell step="3 de 3" progress={96} onBack={onBack}>
 <div className="question-icon"><MessageCircle size={26}/></div><span className="eyebrow">Sua percepção também importa</span>
 <h1>Se seu corpo pudesse resumir o dia em uma frase...</h1><p>O que ele diria? Essa resposta ajuda a Radar a preservar sua própria voz na leitura.</p>
 <textarea value={value} onChange={e=>setValue(e.target.value)} placeholder="Ex.: Hoje preciso ir mais devagar."/>
 <Button onClick={onDone}>Gerar minha Leitura Radar <Sparkles size={18}/></Button>
 </FlowShell>}

function Processing(){return <section className="processing"><div className="radar-animation"><span/><span/><span/><div><Sparkles size={28}/></div></div><span className="eyebrow">Conectando seus sinais</span><h1>A Radar está montando a leitura do seu dia.</h1><div className="scan-list"><span><Check size={15}/>Sono e recuperação</span><span><Check size={15}/>Energia e clareza</span><span><Check size={15}/>Calor, dor e humor</span><span><Check size={15}/>Contexto informado</span></div></section>}

function Radar({reading,onNav}){
 if(!reading)return <EmptyState title="Sua leitura ainda não existe" body="Faça o check-in para transformar seus sinais em clareza."/>
 const p=prescriptions[reading.prescriptionKey],top=reading.topSignals||[];
 return <>
  <section className={`result-hero tone-${reading.tone}`}><span className="eyebrow">Leitura Radar · {reading.date}</span><div className="result-top"><div><span className={`status ${reading.tone}`}>{reading.profile}</span><h1>{reading.bodySays}</h1><p>{reading.interpretation}</p></div><ScoreOrb value={reading.frequency} tone={reading.tone}/></div></section>
  <Card>
   <div className="section-head"><div><span className="eyebrow">O que mais pesou hoje</span><h2>Os sinais dominantes</h2></div></div>
   <div className="signal-cards">{top.map((x,i)=><div className="signal-card" key={x.label}><span className="signal-rank">0{i+1}</span><strong>{x.label}</strong><p>{x.explanation}</p></div>)}</div>
   {reading.context.note&&<div className="context-note"><Sparkles size={18}/><div><strong>{reading.context.label}</strong><p>{reading.context.note}</p></div></div>}
  </Card>
  <Card>
   <span className="eyebrow">Seu mapa de hoje</span><h2>Não é um diagnóstico. É uma fotografia do momento.</h2>
   <div className="metrics">{Object.entries(reading.dimensions).map(([k,v])=><MetricBar key={k} label={k} value={v}/>)}</div>
  </Card>
  <Card className="plan-card"><span className="eyebrow">Plano Radar</span><h2>Três prioridades. Nada além disso.</h2>
   <div className="plan-list">{reading.mission.map((x,i)=><div key={x}><span>{i+1}</span><p>{x}</p></div>)}</div>
  </Card>
  <Card><span className="eyebrow">Como o dia pode evoluir</span><h2>Previsão contextual</h2>{reading.forecast.map(x=><div className="forecast-row" key={x}><Clock3 size={18}/><p>{x}</p></div>)}</Card>
  <Card className="practice-card"><div className="practice-icon"><Leaf size={24}/></div><div><span className="eyebrow">Recurso recomendado</span><h2>{p.title}</h2><p>{p.duration} · {p.type}</p><p>{p.description}</p></div><Button onClick={()=>onNav("prescription")}>Abrir recurso <ChevronRight size={18}/></Button></Card>
  <Card className="discovery-card"><Sparkles size={22}/><div><span className="eyebrow">Radar descobriu</span><h3>{reading.discovered}</h3></div></Card>
 </>}

function Prescription({reading}){const p=prescriptions[reading?.prescriptionKey||"calm"];return <><section className="audio-hero"><span className="eyebrow">Recurso do dia</span><div className="audio-orb"><Leaf size={32}/></div><h1>{p.title}</h1><p>{p.duration} · {p.type}</p><p>{p.description}</p><Button>▶ Começar agora</Button></section><Card><h3>Por que a Radar escolheu isso?</h3><p>Este recurso conversa com o sinal que mais pediu atenção na sua leitura de hoje. Use como apoio, sem transformar a prática em mais uma obrigação.</p></Card></>}

function Memory({history}){
 const insights=useMemo(()=>buildMemoryInsights(history),[history]);
 if(!history.length)return <EmptyState icon={<LineChart/>} title="Sua memória começa no primeiro registro" body="Faça sua primeira leitura para começar a enxergar tendências ao longo do tempo."/>
 const chronological=[...history].reverse().slice(-14);
 const dims=["Sono","Energia","Clareza mental","Humor"];
 return <>
  <section className="memory-hero"><span className="eyebrow">Memória do Corpo</span><h1>Seu histórico, transformado em contexto.</h1><p>{history.length} leituras registradas. Quanto mais consistente o registro, mais confiáveis ficam as relações observadas.</p></section>
  <Card><div className="section-head"><div><span className="eyebrow">Últimos registros</span><h2>Como seus sinais oscilaram</h2></div><span className="period-pill">14 leituras</span></div>
   <div className="chart-legend">{dims.map((d,i)=><span key={d}><i className={`legend-${i}`}/>{d}</span>)}</div>
   <MiniChart history={chronological} dimensions={dims}/>
  </Card>
  <Card className="pattern-card"><span className="eyebrow">Padrões observados</span><h2>O que seus próprios dados sugerem</h2><div className="insights-list">{insights.map((x,i)=><div key={x}><span>{i+1}</span><p>{x}</p></div>)}</div></Card>
  <Card><span className="eyebrow">Linha do tempo</span><h2>Seus dias mais recentes</h2><div className="timeline">{history.slice(0,8).map((h,i)=><div key={`${h.date}-${i}`}><span className={`timeline-dot ${h.tone}`}/><div><strong>{h.date} · {h.profile}</strong><p>{h.bodyPhrase?`“${h.bodyPhrase}”`:h.bodySays}</p></div><b>{h.frequency}</b></div>)}</div></Card>
 </>}

function SOS(){const[open,setOpen]=useState(null);if(!open)return <><section className="sos-hero"><span className="eyebrow">SOS Radar</span><h1>O que está acontecendo agora?</h1><p>Escolha a situação mais próxima do que você está vivendo. Você receberá passos simples e sinais de segurança.</p></section><div className="sos-grid">{Object.keys(sosProtocols).map(k=><button className="sos-card" key={k} onClick={()=>setOpen(k)}><HeartPulse size={21}/><span>{k}</span><ChevronRight size={17}/></button>)}</div></>;const s=sosProtocols[open];return <><button className="back-link" onClick={()=>setOpen(null)}><ChevronLeft size={17}/>Voltar</button><Card className="sos-open"><span className="eyebrow">Apoio para agora</span><h1>{open}</h1><p>{s.intro}</p></Card><Card><h2>Faça nesta ordem</h2><div className="plan-list">{s.steps.map((x,i)=><div key={x}><span>{i+1}</span><p>{x}</p></div>)}</div></Card><Card className="safety-card"><ShieldCheck size={22}/><div><h3>Quando buscar ajuda</h3><p>{s.safety}</p></div></Card></>}

function Library(){return <><section className="library-hero"><span className="eyebrow">Biblioteca Radar</span><h1>Informação curta. Sem alarmismo.</h1><p>Conteúdos para entender sinais comuns da transição hormonal e conversar melhor com profissionais de saúde.</p></section><div className="article-list">{library.map((i,n)=><Card key={i.title} className="article-card"><span className="article-number">{String(n+1).padStart(2,"0")}</span><div><span className="eyebrow">{i.category}</span><h2>{i.title}</h2><p>{i.body}</p></div></Card>)}</div></>}

function Talk({reading,history}){const[q,setQ]=useState(""),[answer,setAnswer]=useState("");
 function ask(){const t=q.toLowerCase();let a="Posso ajudar a organizar o que você registrou hoje. Para sintomas novos, intensos ou persistentes, a avaliação de um profissional continua sendo importante.";
 if(/café|cafe/.test(t))a=reading&&reading.dimensions.Sono<60?"Seu sono apareceu como prioridade hoje. Reduzir cafeína — especialmente depois do início da tarde — pode ser um teste útil. Observe também se ela coincide com palpitações, ansiedade ou calorões.":"Sua leitura não mostra uma restrição clara. Ainda assim, vale observar se café coincide com calorões, palpitações, ansiedade ou piora do sono.";
 else if(/trein|exerc|musculação|musculacao/.test(t))a=reading&&reading.dimensions.Dor<60?"Dor apareceu entre os sinais dominantes. Hoje pode fazer mais sentido escolher mobilidade ou movimento leve e interromper se houver piora.":"Sua leitura sugere espaço para movimento leve ou moderado, respeitando energia, dor e orientações profissionais que você já tenha.";
 else if(/calorão|calorao/.test(t))a="Calorões podem variar com ambiente, álcool, café, refeições, estresse e sono. O mais útil é registrar intensidade, horário e possíveis gatilhos para identificar seu padrão.";
 else if(/médic|medic|consulta/.test(t))a=`Leve frequência, intensidade, duração e impacto dos sinais. Você já tem ${history.length} registros na Memória do Corpo, que podem ajudar a tornar a conversa mais objetiva.`;
 setAnswer(a)}
 return <><section className="talk-hero"><span className="eyebrow">Conversa Radar</span><h1>Uma pergunta de cada vez.</h1><p>A resposta usa sua leitura atual como contexto, mas não substitui diagnóstico ou acompanhamento profissional.</p></section><Card><textarea value={q} onChange={e=>setQ(e.target.value)} placeholder="Ex.: Por que minha energia caiu tanto hoje?"/><Button disabled={!q.trim()} onClick={ask}>Perguntar à Radar <ChevronRight size={18}/></Button></Card>{answer&&<Card className="answer-card"><div className="answer-avatar"><Sparkles size={19}/></div><div><span className="eyebrow">Radar responde</span><p>{answer}</p></div></Card>}</>}

function FlowShell({children,step,progress,onBack}){return <section className="flow"><div className="flow-top"><button onClick={onBack}><ChevronLeft size={20}/></button><span>{step}</span></div><div className="progress"><span style={{width:`${progress}%`}}/></div>{children}</section>}

function BottomNav({current,onNav,onStart}){const items=[["home","Início",Home],["read","Check-in",ClipboardList],["memory","Memória",LineChart],["talk","Conversa",MessageCircle],["sos","SOS",HeartPulse],["library","Aprender",BookOpen]];return <nav className="bottom">{items.map(([k,l,I])=><button key={k} className={current===k?"active":""} onClick={()=>k==="read"?onStart():onNav(k)}><I size={19}/><span>{l}</span></button>)}</nav>}
