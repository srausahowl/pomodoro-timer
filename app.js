const modes={work:25*60,short:5*60,long:15*60};
let currentMode='work',timeLeft=modes.work,totalTime=modes.work,running=false,interval=null,sessions=0,focusMinutes=0;
const timerText=document.getElementById('timerText'),progressRing=document.getElementById('progressRing'),startBtn=document.getElementById('startBtn'),resetBtn=document.getElementById('resetBtn'),circumference=2*Math.PI*90;
progressRing.style.strokeDasharray=circumference;

function updateDisplay(){const m=Math.floor(timeLeft/60),s=timeLeft%60;timerText.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;const offset=circumference*(1-timeLeft/totalTime);progressRing.style.strokeDashoffset=offset}

function toggle(){if(running){clearInterval(interval);running=false;startBtn.textContent='Start';startBtn.classList.remove('running')}else{running=true;startBtn.textContent='Pause';startBtn.classList.add('running');interval=setInterval(()=>{timeLeft--;updateDisplay();if(timeLeft<=0){clearInterval(interval);running=false;startBtn.textContent='Start';startBtn.classList.remove('running');if(currentMode==='work'){sessions++;focusMinutes+=25;document.getElementById('sessionsCount').textContent=sessions;document.getElementById('totalTime').textContent=focusMinutes>=60?Math.floor(focusMinutes/60)+'h '+(focusMinutes%60)+'m':focusMinutes+'m'}playSound();timeLeft=modes[currentMode];totalTime=modes[currentMode];updateDisplay()}},1000)}}

function playSound(){try{const ctx=new(window.AudioContext||window.webkitAudioContext)(),o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.value=800;g.gain.value=0.3;o.start();setTimeout(()=>{o.frequency.value=1000},200);setTimeout(()=>{o.stop()},400)}catch(e){}}

document.querySelectorAll('.mode-btn').forEach(btn=>{btn.addEventListener('click',()=>{document.querySelector('.mode-btn.active').classList.remove('active');btn.classList.add('active');currentMode=btn.dataset.mode;clearInterval(interval);running=false;startBtn.textContent='Start';startBtn.classList.remove('running');timeLeft=modes[currentMode];totalTime=modes[currentMode];updateDisplay()})});
startBtn.addEventListener('click',toggle);
resetBtn.addEventListener('click',()=>{clearInterval(interval);running=false;startBtn.textContent='Start';startBtn.classList.remove('running');timeLeft=modes[currentMode];totalTime=modes[currentMode];updateDisplay()});
updateDisplay();