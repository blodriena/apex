const cv=document.getElementById('bg'),cx=cv.getContext('2d');
let W,H,pts=[];
function rsz(){W=cv.width=innerWidth;H=cv.height=innerHeight;}
function iP(){pts=[];for(let i=0;i<70;i++)pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:Math.random()*1.2+.2,a:Math.random()*.4+.1,c:['rgba(108,71,255','rgba(255,45,120','rgba(0,212,170'][Math.floor(Math.random()*3)]});}
function draw(){cx.clearRect(0,0,W,H);
cx.strokeStyle='rgba(108,71,255,0.03)';cx.lineWidth=1;
for(let x=0;x<W;x+=80){cx.beginPath();cx.moveTo(x,0);cx.lineTo(x,H);cx.stroke();}
for(let y=0;y<H;y+=80){cx.beginPath();cx.moveTo(0,y);cx.lineTo(W,y);cx.stroke();}
pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;cx.beginPath();cx.arc(p.x,p.y,p.r,0,Math.PI*2);cx.fillStyle=p.c+`,${p.a})`;cx.fill();});
pts.forEach((p,i)=>pts.slice(i+1).forEach(q=>{const d=Math.hypot(p.x-q.x,p.y-q.y);if(d<130){cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.strokeStyle=`rgba(108,71,255,${(1-d/130)*.06})`;cx.lineWidth=.5;cx.stroke();}}));
requestAnimationFrame(draw);}
rsz();iP();draw();window.addEventListener('resize',()=>{rsz();iP();});

 function sp(n){document.querySelectorAll('.page').forEach(p=>p.classList.remove('on'));document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('on'));document.getElementById('ph'.replace('home','ph').replace('markets','pm').replace('dashboard','pd').replace('pricing','pp'));
const map={home:'ph',markets:'pm',dashboard:'pd',pricing:'pp'};
document.getElementById(map[n]).classList.add('on');
document.getElementById('nl-'+n).classList.add('on');
scrollTo(0,0);
if(n==='dashboard')initDash();
if(n==='markets')initMarkets();
if(n==='home')initHome();}
 
const COINS=[
  {rank:1,name:'Bitcoin',sym:'BTC',icon:'₿',color:'#f7931a',bg:'rgba(247,147,26,.12)',price:'$67,420.00',chg:'+2.4%',up:1,cap:'$1.32T',vol:'$28.4B',tag:'none'},
  {rank:2,name:'Ethereum',sym:'ETH',icon:'Ξ',color:'#627eea',bg:'rgba(98,126,234,.12)',price:'$3,521.80',chg:'+1.8%',up:1,cap:'$423B',vol:'$14.2B',tag:'none'},
  {rank:3,name:'Solana',sym:'SOL',icon:'◎',color:'#9945ff',bg:'rgba(153,69,255,.12)',price:'$182.45',chg:'+6.2%',up:1,cap:'$82.4B',vol:'$4.1B',tag:'gainers'},
  {rank:4,name:'BNB',sym:'BNB',icon:'B',color:'#f3ba2f',bg:'rgba(243,186,47,.12)',price:'$412.30',chg:'-0.9%',up:0,cap:'$61.3B',vol:'$1.8B',tag:'losers'},
  {rank:5,name:'XRP',sym:'XRP',icon:'✕',color:'#00aae4',bg:'rgba(0,170,228,.12)',price:'$0.6234',chg:'+3.1%',up:1,cap:'$34.2B',vol:'$1.2B',tag:'gainers'},
  {rank:6,name:'Cardano',sym:'ADA',icon:'♦',color:'#0033ad',bg:'rgba(0,51,173,.12)',price:'$0.4812',chg:'-1.4%',up:0,cap:'$17.1B',vol:'$0.6B',tag:'losers'},
  {rank:7,name:'Dogecoin',sym:'DOGE',icon:'Ð',color:'#c2a633',bg:'rgba(194,166,51,.12)',price:'$0.1834',chg:'+8.7%',up:1,cap:'$26.4B',vol:'$2.8B',tag:'gainers'},
  {rank:8,name:'Avalanche',sym:'AVAX',icon:'A',color:'#e84142',bg:'rgba(232,65,66,.12)',price:'$41.20',chg:'+4.3%',up:1,cap:'$17.2B',vol:'$0.9B',tag:'gainers'},
  {rank:9,name:'Polkadot',sym:'DOT',icon:'●',color:'#e6007a',bg:'rgba(230,0,122,.12)',price:'$8.44',chg:'+0.5%',up:1,cap:'$11.6B',vol:'$0.4B',tag:'none'},
  {rank:10,name:'Polygon',sym:'MATIC',icon:'▲',color:'#8247e5',bg:'rgba(130,71,229,.12)',price:'$0.9201',chg:'-2.1%',up:0,cap:'$9.1B',vol:'$0.5B',tag:'losers'},
  {rank:11,name:'Chainlink',sym:'LINK',icon:'⬡',color:'#2a5ada',bg:'rgba(42,90,218,.12)',price:'$18.72',chg:'+5.9%',up:1,cap:'$11B',vol:'$0.7B',tag:'new'},
  {rank:12,name:'Uniswap',sym:'UNI',icon:'🦄',color:'#ff007a',bg:'rgba(255,0,122,.12)',price:'$9.84',chg:'-3.2%',up:0,cap:'$5.9B',vol:'$0.3B',tag:'new'},
];
 
let mF='all';
const miniCharts={};
 
function setMF(f,btn){mF=f;document.querySelectorAll('.mf-btn').forEach(b=>b.classList.remove('on'));btn.classList.add('on');renderCoins();}
 
function renderCoins(){
  const q=(document.getElementById('msearch')?.value||'').toLowerCase();
  const list=COINS.filter(c=>(mF==='all'||c.tag===mF)&&(!q||c.name.toLowerCase().includes(q)||c.sym.toLowerCase().includes(q)));
  const g=document.getElementById('coins-grid');
  if(!g)return;
  g.innerHTML=list.map((c,i)=>`
    <div class="coin-card" style="animation:fadeUp 0.5s ease ${i*0.04}s both;">
      <div class="cc-top">
        <div class="cc-coin"><div class="cc-icon" style="background:${c.bg};color:${c.color}">${c.icon}</div><div><div class="cc-name">${c.name}</div><div class="cc-sym">${c.sym}</div></div></div>
        <div class="cc-badge ${c.up?'up':'dn'}">${c.chg}</div>
      </div>
      <div class="cc-price">${c.price}</div>
      <div class="cc-chart"><canvas id="cc-${c.sym}"></canvas></div>
      <div class="cc-footer">
        <div class="cc-cap">Mkt Cap: ${c.cap}</div>
        <button class="cc-trade">Trade →</button>
      </div>
    </div>`).join('');
  setTimeout(()=>{list.forEach(c=>{const el=document.getElementById('cc-'+c.sym);if(!el)return;const vals=Array.from({length:20},(_,i)=>{const base=50;return base+Math.sin(i*0.5)*15+Math.random()*10;});if(miniCharts[c.sym])miniCharts[c.sym].destroy();miniCharts[c.sym]=new Chart(el,{type:'line',data:{labels:vals.map((_,i)=>i),datasets:[{data:vals,borderColor:c.up?'#00e676':'#ff3d6b',borderWidth:1.5,pointRadius:0,fill:true,backgroundColor:ctx=>{const g=ctx.chart.ctx.createLinearGradient(0,0,0,52);g.addColorStop(0,c.up?'rgba(0,230,118,0.15)':'rgba(255,61,107,0.15)');g.addColorStop(1,'rgba(0,0,0,0)');return g;},tension:0.4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{enabled:false}},scales:{x:{display:false},y:{display:false}}}});});},50);}
 
function initMarkets(){renderCoins();}
 
let heroBtcChart=null;
function initHome(){
  const el=document.getElementById('hero-chart-btc');
  if(el&&!heroBtcChart){
    const vals=[61000,63500,62000,65000,67000,64500,66000,68240,65800,67420];
    heroBtcChart=new Chart(el,{type:'line',data:{labels:vals.map((_,i)=>i),datasets:[{data:vals,borderColor:'#6c47ff',borderWidth:2,pointRadius:0,fill:true,backgroundColor:ctx=>{const g=ctx.chart.ctx.createLinearGradient(0,0,0,60);g.addColorStop(0,'rgba(108,71,255,0.25)');g.addColorStop(1,'rgba(108,71,255,0)');return g;},tension:0.4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{enabled:false}},scales:{x:{display:false},y:{display:false}}}});}
}
 
let mainC=null;
function initDash(){
  const bg=document.getElementById('bento-grid');
  if(!bg)return;
  bg.innerHTML=`
    <div class="bc bc-1 anim">
      <div class="bc-label">💰 Total Portfolio</div>
      <div class="bc-val">$284,940</div>
      <div class="bc-sub up">↑ +$12,841 (+4.72%) today</div>
      <div class="chart-wrap cw-180"><canvas id="main-chart"></canvas></div>
    </div>
    <div class="bc bc-2 anim">
      <div class="bc-label">📈 Holdings</div>
      <div class="asset-rows" id="asset-rows"></div>
    </div>
    <div class="bc bc-3 anim">
      <div class="bc-label">⚡ Quick Trade</div>
      <div class="tw">
        <div class="tw-tabs"><button class="tw-t buy on" onclick="setTW('buy',this)">Buy</button><button class="tw-t sell" onclick="setTW('sell',this)">Sell</button></div>
        <div class="tw-field"><label class="tw-label">Asset</label><div class="tw-inp"><input type="text" value="BTC"><span class="tw-suf">SYM</span></div></div>
        <div class="tw-field"><label class="tw-label">Amount</label><div class="tw-inp"><input type="number" id="ta" placeholder="0.00"><span class="tw-suf">USD</span></div></div>
        <div class="tw-pcts"><button class="tw-p" onclick="sA(25)">25%</button><button class="tw-p" onclick="sA(50)">50%</button><button class="tw-p" onclick="sA(75)">75%</button><button class="tw-p" onclick="sA(100)">MAX</button></div>
        <button class="tw-btn" id="tw-btn" onclick="eT()">Execute Buy Order</button>
      </div>
    </div>
    <div class="bc bc-4 anim">
      <div class="bc-label">🕐 Recent Transactions</div>
      <div class="txn-list" id="txn-list"></div>
    </div>
    <div class="bc bc-5 anim">
      <div class="bc-label">👁️ Watchlist</div>
      <div class="wl-list" id="wl-list"></div>
    </div>
    <div class="bc bc-6 anim">
      <div class="bc-label">🏆 Best Performer</div>
      <div class="bc-val" style="color:#00e676;font-size:2.5rem;">SOL</div>
      <div class="bc-sub up">↑ +18.4% this week</div>
    </div>
    <div class="bc bc-7 anim">
      <div class="bc-label">💸 Total Return</div>
      <div class="bc-val" style="color:#6c47ff;">+$84.2K</div>
      <div class="bc-sub up">↑ +41.9% all time</div>
    </div>
    <div class="bc bc-8 anim">
      <div class="bc-label">⚖️ Risk Score</div>
      <div class="bc-val" style="font-size:2.5rem;">6.2<span style="font-size:1rem;color:var(--gray2)">/10</span></div>
      <div class="bc-sub neutral">Moderate Growth</div>
    </div>`;
 
  setTimeout(()=>{
    const mc=document.getElementById('main-chart');
    if(mc&&!mainC){
      const labels=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const data=[180000,195000,188000,215000,228000,242000,238000,258000,272000,265000,278000,284940];
      mainC=new Chart(mc,{type:'line',data:{labels,datasets:[{data,borderColor:'#6c47ff',borderWidth:2,pointRadius:4,pointBackgroundColor:'#6c47ff',pointBorderColor:'#050507',pointBorderWidth:2,fill:true,backgroundColor:ctx=>{const g=ctx.chart.ctx.createLinearGradient(0,0,0,180);g.addColorStop(0,'rgba(108,71,255,0.2)');g.addColorStop(1,'rgba(108,71,255,0)');return g;},tension:0.4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#0f0f1a',borderColor:'#6c47ff',borderWidth:1,callbacks:{label:c=>' $'+c.parsed.y.toLocaleString()}}},scales:{x:{grid:{color:'rgba(255,255,255,0.03)'},ticks:{color:'#3a3a50',font:{family:'JetBrains Mono',size:9}}},y:{grid:{color:'rgba(255,255,255,0.03)'},ticks:{color:'#3a3a50',font:{family:'JetBrains Mono',size:9},callback:v=>'$'+(v/1000).toFixed(0)+'K'}}}}});}
 
    const assets=[
      {name:'Bitcoin',sym:'BTC',icon:'₿',color:'#f7931a',bg:'rgba(247,147,26,.15)',val:'$142.8K',amt:'2.12 BTC',pct:'+2.4%',up:1},
      {name:'Ethereum',sym:'ETH',icon:'Ξ',color:'#627eea',bg:'rgba(98,126,234,.15)',val:'$84.5K',amt:'24.0 ETH',pct:'+1.8%',up:1},
      {name:'Solana',sym:'SOL',icon:'◎',color:'#9945ff',bg:'rgba(153,69,255,.15)',val:'$36.5K',amt:'200 SOL',pct:'+6.2%',up:1},
      {name:'Cash',sym:'USD',icon:'$',color:'#00d4aa',bg:'rgba(0,212,170,.12)',val:'$21.1K',amt:'Stablecoin',pct:'0.00%',up:1},
    ];
    const ar=document.getElementById('asset-rows');
    if(ar)ar.innerHTML=assets.map(a=>`<div class="ar"><div class="ar-icon" style="background:${a.bg};color:${a.color}">${a.icon}</div><div style="flex:1"><div class="ar-name">${a.name}</div><div class="ar-amt">${a.amt}</div></div><div><div class="ar-val">${a.val}</div><div class="ar-pct ${a.up?'up':'dn'}">${a.pct}</div></div></div>`).join('');
 
    const txns=[{t:'Bought BTC',d:'Today 14:32',a:'+0.012 BTC',s:'buy'},{t:'Sold ETH',d:'Today 09:11',a:'-$5,283',s:'sell'},{t:'Bought SOL',d:'Yesterday',a:'+10 SOL',s:'buy'},{t:'Bought BNB',d:'Dec 18',a:'+2 BNB',s:'buy'},{t:'Sold ADA',d:'Dec 15',a:'-500 ADA',s:'sell'}];
    const tl=document.getElementById('txn-list');
    if(tl)tl.innerHTML=txns.map(t=>`<div class="txr"><div class="txr-icon ${t.s}">${t.s==='buy'?'↓':'↑'}</div><div style="flex:1"><div class="txr-t">${t.t}</div><div class="txr-d">${t.d}</div></div><div class="txr-a ${t.s}">${t.a}</div></div>`).join('');
 
    const wl=document.getElementById('wl-list');
    if(wl)wl.innerHTML=COINS.slice(0,6).map(c=>`<div class="wlr"><div class="wlr-icon" style="background:${c.bg};color:${c.color}">${c.icon}</div><div style="flex:1"><div class="wlr-name">${c.name}</div><div style="font-family:'JetBrains Mono',monospace;font-size:0.58rem;color:var(--gray2)">${c.sym}</div></div><div style="text-align:right"><div class="wlr-p">${c.price}</div><div class="wlr-c ${c.up?'up':'dn'}">${c.chg}</div></div></div>`).join('');
  },100);
}
 
function setTW(t,btn){document.querySelectorAll('.tw-t').forEach(b=>b.classList.remove('on'));btn.classList.add('on');const b=document.getElementById('tw-btn');if(b){if(t==='buy'){b.style.background='linear-gradient(135deg,#6c47ff,#ff2d78)';b.textContent='Execute Buy Order';}else{b.style.background='linear-gradient(135deg,#ff2d78,#ff6b9d)';b.textContent='Execute Sell Order';}}}
function sA(p){const el=document.getElementById('ta');if(el)el.value=(284940*p/100).toFixed(2);}
function eT(){const a=document.getElementById('ta')?.value;if(!a){alert('Enter an amount');return;}alert('✅ Order placed: $'+parseFloat(a).toLocaleString());}
 
initHome();