export const protocols={
recovery:{name:"Recuperação Física",duration:"12 min",description:"Para dias de fadiga, dores ou contexto de recuperação.",script:"Voz lenta. Frase-chave: Hoje seu corpo não precisa provar nada. Ele só precisa recuperar."},
nervous:{name:"Silenciar o Sistema Nervoso",duration:"14 min",description:"Para ansiedade, irritabilidade e mente acelerada.",script:"Respiração 4/6. Final: Seu corpo entendeu que está seguro agora."},
sleep:{name:"Preparar o Sono",duration:"10 min",description:"Para sono ruim e despertares noturnos.",script:"Poucas palavras, pausas longas, foco em peso no corpo."},
heat:{name:"Atravessar o Calorão",duration:"6 min",description:"Para calorões e suor noturno.",script:"Visualização de ar fresco no rosto e pescoço."},
focus:{name:"Clareza Mental",duration:"8 min",description:"Para brain fog e dificuldade de foco.",script:"Uma tarefa por vez. Apenas o próximo passo."}
};
export const signalLibrary=[
{title:"Acordei gripada",category:"Contexto",body:"Quando há sintomas gripais, febre ou mal-estar, a leitura pode refletir recuperação física e não apenas perimenopausa."},
{title:"Dores no corpo",category:"Dor",body:"Dores articulares, musculares e rigidez podem aparecer em períodos de baixa recuperação, sono ruim e sobrecarga."},
{title:"Calorões",category:"Vasomotor",body:"Calorões podem variar com sono, café, álcool, estresse e temperatura ambiente."},
{title:"Brain fog",category:"Cérebro",body:"Mente nublada pode piorar com sono ruim, excesso de estímulos e cansaço."},
{title:"Irritabilidade",category:"Humor",body:"Irritabilidade muitas vezes aparece quando o corpo está com baixa recuperação."}
];
export const sosProtocols={
"Acordei gripada":{first:"Hoje seu corpo pode estar lidando com recuperação física.",steps:["Priorize hidratação.","Evite treino intenso.","Faça refeições leves e nutritivas.","Observe febre, falta de ar ou piora."],safety:"Procure atendimento se houver febre persistente, falta de ar, dor no peito ou piora importante."},
"Dor no corpo":{first:"Dor pede escuta, não cobrança.",steps:["Mobilidade leve, sem forçar.","Calor local se ajudar.","Hidratação.","Evite treino pesado hoje."],safety:"Procure avaliação se houver dor forte, inchaço, febre, perda de força ou piora persistente."},
"Ansiedade":{first:"Seu corpo pode estar em hipervigilância.",steps:["Pés no chão.","Expire mais longo do que inspira.","Solte mandíbula e ombros.","Adie decisões por alguns minutos."],safety:"Procure ajuda imediata se houver desespero intenso ou pensamentos de autoagressão."},
"Calorão intenso":{first:"Vá para um local mais fresco.",steps:["Beba água em pequenos goles.","Ar fresco no rosto e pescoço.","Evite café e álcool agora."],safety:"Procure avaliação se for muito intenso, persistente ou diferente do padrão."},
"Insônia":{first:"Não transforme a madrugada em batalha.",steps:["Pouca luz.","Não pegue o celular por 10 minutos.","Evite olhar o relógio.","Respire lento."],safety:"Se isso se repetir por semanas, converse com um profissional."}
};