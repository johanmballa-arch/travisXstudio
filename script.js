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
let tk=0;addEventListener('scroll',()=>{if(tk)return;tk=1;requestAnimationFrame(()=>{tk=0;onScroll()})},{passive:true});addEventListener('resize',onScroll);onScroll();
$('#top').onclick=()=>scrollTo({top:0});
// Apparition + compteurs
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');io.unobserve(e.target)}),{threshold:.15});
$$('.rv').forEach(el=>io.observe(el));
// Halo, inclinaison 3D, aimant, ondulation
document.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;
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
document.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;tx=e.clientX;ty=e.clientY;lens.style.opacity=1;lens.classList.toggle('big',!!e.target.closest('a,button,.chip,.card,input,textarea'))});
(function loop(){lx+=(tx-lx)*.18;ly+=(ty-ly)*.18;lens.style.transform=`translate(${lx}px,${ly}px)`;requestAnimationFrame(loop)})();
// Budget + envoi animé
const b=$('#b');b.oninput=()=>$('#bo').textContent=(+b.value).toLocaleString('fr-FR')+' FCFA';
$('#form').addEventListener('submit',e=>{e.preventDefault();const s=$('#send'),t=$('.t',s);s.classList.add('load');t.textContent='Envoi en cours';
 setTimeout(()=>{s.classList.replace('load','done');t.textContent='Message envoyé ✓';e.target.reset();b.oninput();
 setTimeout(()=>{s.classList.remove('done');t.textContent='Envoyer le message'},3000)},1500)});

// Chronomètre REC
let sec=0;setInterval(()=>{sec++;const p=n=>String(n).padStart(2,'0');$('#tc').textContent=`REC ${p(Math.floor(sec/3600))}:${p(Math.floor(sec/60)%60)}:${p(sec%60)}`},1000);

// ===== MOBILE =====
(()=>{
const mob=matchMedia('(max-width:760px)'),vib=n=>navigator.vibrate&&navigator.vibrate(n);
// Dock de navigation avec bouton Devis central
const S=p=>`<svg viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
const items=[['#services','Services','<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7z"/>'],['#portfolio','Réalisations','<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M10 9l5 3-5 3z"/>'],['#apropos','À propos','<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.5-4 2.8-6 7-6s6.5 2 7 6"/>'],['#contact','Contact','<path d="M4 5h16v14H4z"/><path d="M4 7l8 6 8-6"/>']];
const dock=document.createElement('nav');dock.className='dock glass';dock.setAttribute('aria-label','Navigation mobile');
dock.innerHTML='<span class="pillbg"></span>'+items.map(([h,t,p])=>`<a href="${h}">${S(p)}<small>${t}</small></a>`).join('')+`<a class="dock-quote" href="#contact">${S('<path d="M4 4h16v12H8l-4 4z"/><path d="M8 9h8M8 12h5"/>')}<small>Devis</small></a>`;
document.body.append(dock);
const dl=$$('a:not(.dock-quote)',dock),ds=dl.map(a=>$(a.getAttribute('href')));
const upd=()=>{if(!mob.matches)return;let cur=null,best=-1e9;
 dl.forEach((a,i)=>{const t=ds[i].getBoundingClientRect().top;if(t<innerHeight*.5&&t>best){best=t;cur=a}});
 dl.forEach(a=>a.classList.toggle('on',a===cur));pill(dock,cur);
 document.body.classList.toggle('past-hero',scrollY>innerHeight*.9)};
let tu=0;addEventListener('scroll',()=>{if(tu)return;tu=1;requestAnimationFrame(()=>{tu=0;upd()})},{passive:true});addEventListener('resize',upd);addEventListener('load',upd);upd();
// Retour haptique + goutte de verre sous le doigt
document.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch')return;
 if(e.target.closest('.btn,.ib,.chip,.dock a,.seg button,.badge'))vib(10);
 const d=document.createElement('i');d.className='drop';d.style.left=e.clientX+'px';d.style.top=e.clientY+'px';document.body.append(d);setTimeout(()=>d.remove(),700)},{passive:true});
// Reflets du verre pilotés par l'inclinaison du téléphone
const tilt=e=>{const x=Math.max(-30,Math.min(30,e.gamma||0)),y=Math.max(-30,Math.min(30,(e.beta||0)-40));
 document.documentElement.style.setProperty('--mx',(50+x*1.6)+'%');document.documentElement.style.setProperty('--my',(50+y*1.6)+'%');
 $('.hero').style.setProperty('--px',(x/60).toFixed(2));$('.hero').style.setProperty('--py',(y/60).toFixed(2))};
if(matchMedia('(pointer:coarse)').matches)addEventListener('click',()=>{const go=()=>addEventListener('deviceorientation',tilt);
 if(window.DeviceOrientationEvent&&DeviceOrientationEvent.requestPermission)DeviceOrientationEvent.requestPermission().then(r=>r==='granted'&&go()).catch(()=>{});else go()},{once:true});
// Carrousels : le plus proche du centre est mis en avant, points de repère
function carousel(el){const d=document.createElement('div');d.className='dots';el.after(d);let last=-1;
 const u=()=>{const ks=[...el.children].filter(k=>k.offsetParent),c=el.scrollLeft+el.clientWidth/2;let best=0,bd=1e9;
  ks.forEach((k,i)=>{const dist=Math.abs(k.offsetLeft+k.offsetWidth/2-c),f=Math.min(dist/el.clientWidth,1);if(dist<bd){bd=dist;best=i}k.style.scale=(1-f*.12).toFixed(3);k.style.opacity=(1-f*.45).toFixed(2)});
  if(d.children.length!==ks.length)d.innerHTML=ks.map(()=>'<i></i>').join('');[...d.children].forEach((x,i)=>x.classList.toggle('on',i===best));
  if(best!==last){if(last>-1)vib(6);last=best}};
 let t=0;el.addEventListener('scroll',()=>{if(t)return;t=1;requestAnimationFrame(()=>{t=0;u()})},{passive:true});addEventListener('resize',u);u();return u}
if(mob.matches){
 const gu=carousel($('.grid'));carousel($('.team'));carousel($('.side'));
 $$('#seg button').forEach(b=>b.addEventListener('click',()=>setTimeout(()=>{$('.grid').scrollTo({left:0});gu()},60)));
}
})();

// Partenaires : deux bandes qui défilent en sens inverse
$$('.ptrack').forEach(t=>{const h=t.innerHTML;t.innerHTML=h+h;const n=t.children.length/2;[...t.children].slice(n).forEach(c=>c.setAttribute('aria-hidden','true'))});