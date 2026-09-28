const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
$('#y').textContent=new Date().getFullYear();
// Titre : mots qui montent un à un
let wi0=0;$$('#h1 .t').forEach(t=>{t.innerHTML=t.textContent.split(' ').map(w=>`<span class="w"><span style="--i:${wi0++}">${w}</span></span>`).join(' ')});
// Marquee infini
$('#track').innerHTML+=$('#track').innerHTML;
// Réseaux sociaux
const links={in:'LinkedIn',ig:'Instagram',fb:'Facebook'};
const socHTML=Object.entries(links).map(([k,v])=>`<a class="ib" href="#" aria-label="${v}">${k}</a>`).join('');
$$('.member').forEach(m=>{const d=document.createElement('div');d.className='soc';d.innerHTML=socHTML;m.append(d)});
$('#soc').innerHTML=socHTML;
// Pastille glissante
const pill=(box,el)=>{const p=$('.pillbg',box);if(!el){p.style.opacity=0;return}Object.assign(p.style,{opacity:1,left:el.offsetLeft+'px',top:el.offsetTop+'px',width:el.offsetWidth+'px',height:el.offsetHeight+'px'})};
// Filtres
const seg=$('#seg'),fb=$$('button',seg);
fb.forEach(b=>b.onclick=()=>{fb.forEach(x=>x.setAttribute('aria-pressed',x===b));pill(seg,b);
 $$('.card').forEach(c=>{const s=b.dataset.f==='all'||c.classList.contains(b.dataset.f);c.classList.toggle('hide',!s);if(s){c.style.animation='none';c.offsetWidth;c.style.animation=''}})});
addEventListener('load',()=>pill(seg,$('[aria-pressed=true]',seg)));
// Défilement : barre, menu actif, retour en haut
const nav=$('#nav'),nl=$$('a',nav),secs=nl.map(a=>$(a.getAttribute('href')));
const onScroll=()=>{const h=document.documentElement,y=scrollY;
 $('#bar').style.transform=`scaleX(${y/(h.scrollHeight-innerHeight||1)})`;
 $('#top').classList.toggle('show',y>600);
 let cur=null;secs.forEach((s,i)=>{if(s.getBoundingClientRect().top<innerHeight*.4)cur=nl[i]});
 nl.forEach(a=>a.classList.toggle('on',a===cur));pill(nav,cur)};
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);onScroll();
$('#top').onclick=()=>scrollTo({top:0});
// Apparition + compteurs
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');io.unobserve(e.target);
 $$('[data-n]',e.target).forEach(n=>{const t=+n.dataset.n,t0=performance.now();(function f(now){const p=Math.min((now-t0)/1400,1);n.textContent=Math.round(t*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)})}),{threshold:.15});
$$('.rv').forEach(el=>io.observe(el));
// Halo, inclinaison 3D, aimant, ondulation
document.addEventListener('pointermove',e=>{
 const g=e.target.closest('.glass,.card');
 if(g){const r=g.getBoundingClientRect();g.style.setProperty('--mx',e.clientX-r.left+'px');g.style.setProperty('--my',e.clientY-r.top+'px')}
 const t=e.target.closest('[data-tilt]');
 if(t&&matchMedia('(pointer:fine)').matches){const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.transform=`perspective(800px) rotateY(${x*12}deg) rotateX(${-y*12}deg) translateY(-6px)`}
 $$('[data-tilt]').forEach(o=>{if(o!==t)o.style.transform=''});
 const m=e.target.closest('[data-mag]');
 if(m){const r=m.getBoundingClientRect();m.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.22}px,${(e.clientY-r.top-r.height/2)*.3}px)`;m.style.setProperty('--x',e.clientX-r.left+'px');m.style.setProperty('--y',e.clientY-r.top+'px')}
 $$('[data-mag]').forEach(o=>{if(o!==m)o.style.transform=''});
 $('.hero').style.setProperty('--px',(e.clientX/innerWidth-.5).toFixed(2));$('.hero').style.setProperty('--py',(e.clientY/innerHeight-.5).toFixed(2));
});
document.addEventListener('pointerdown',e=>{const b=e.target.closest('.btn');if(!b)return;const r=b.getBoundingClientRect(),s=document.createElement('span');s.className='rip';s.style.left=e.clientX-r.left+'px';s.style.top=e.clientY-r.top+'px';b.append(s);setTimeout(()=>s.remove(),650)});
// Curseur lentille
const lens=$('#lens');let lx=0,ly=0,tx=0,ty=0;
document.addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;lens.style.opacity=1;lens.classList.toggle('big',!!e.target.closest('a,button,.chip,.card,input,textarea'))});
(function loop(){lx+=(tx-lx)*.18;ly+=(ty-ly)*.18;lens.style.transform=`translate(${lx}px,${ly}px)`;requestAnimationFrame(loop)})();
// Budget + envoi animé
const b=$('#b');b.oninput=()=>$('#bo').textContent=(+b.value).toLocaleString('fr-FR')+' FCFA';
$('#form').addEventListener('submit',e=>{e.preventDefault();const s=$('#send'),t=$('.t',s);s.classList.add('load');t.textContent='Envoi en cours';
 setTimeout(()=>{s.classList.replace('load','done');t.textContent='Message envoyé ✓';e.target.reset();b.oninput();
 setTimeout(()=>{s.classList.remove('done');t.textContent='Envoyer le message'},3000)},1500)});

// Accueil : chronomètre REC et mot qui change
let sec=0;setInterval(()=>{sec++;const p=n=>String(n).padStart(2,'0');$('#tc').textContent=`REC ${p(Math.floor(sec/3600))}:${p(Math.floor(sec/60)%60)}:${p(sec%60)}`},1000);
const words=['des clips musicaux','des spots publicitaires','des affiches percutantes','du contenu qui performe','vos campagnes digitales'];let wi=0;
setInterval(()=>{const s=$('#sw');s.classList.add('out');setTimeout(()=>{wi=(wi+1)%words.length;s.textContent=words[wi];s.classList.remove('out')},400)},2600);

// Widgets marketing digital : portée et j'aimes en direct, notifications
const fmt=n=>n.toLocaleString('fr-FR');let reach=128400,likes=2840;
setInterval(()=>{reach+=10+Math.floor(Math.random()*90);if(Math.random()<.6)likes++;$('#reach').textContent=fmt(reach);$('#likes').textContent=fmt(likes)},900);
const notes=["♥ Nouveau j'aime","+1 abonné","▶ 1,2K vues","Nouveau commentaire","Partagé 24 fois"];let ni=0;const T=$('.toasts');
setInterval(()=>{const d=document.createElement('div');d.className='toast glass';d.textContent=notes[ni++%notes.length];T.append(d);if(T.children.length>3)T.firstChild.remove();setTimeout(()=>d.remove(),3700)},1800);