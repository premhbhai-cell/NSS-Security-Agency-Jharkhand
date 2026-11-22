(function(){
 var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
 var b=$('#burger'),n=$('#mainnav');
 function setMenu(o){n.classList.toggle('open',o);b.setAttribute('aria-expanded',o);document.body.classList.toggle('menu-open',o)}
 b&&b.addEventListener('click',function(){setMenu(!n.classList.contains('open'))});
 $$('.sub-toggle').forEach(function(t){t.addEventListener('click',function(e){e.preventDefault();t.parentNode.classList.toggle('open')})});
 n&&n.addEventListener('click',function(e){var a=e.target.closest('a');if(a&&!a.parentNode.classList.contains('has-sub')||a&&(a.getAttribute('href')||'').indexOf('#')>-1)setMenu(false)});
 document.addEventListener('click',function(e){if(document.body.classList.contains('menu-open')&&!n.contains(e.target)&&!b.contains(e.target))setMenu(false)});
 /* hero slider */
 var s=$$('.slide'),i=0,t,paused=false;
 function go(k){if(!s.length)return;s[i].classList.remove('on');i=(k+s.length)%s.length;s[i].classList.add('on')}
 function auto(){clearInterval(t);if(!paused)t=setInterval(function(){go(i+1)},5000)}
 var hp=$('#hprev'),hn=$('#hnext'),hz=$('#hpause');
 hp&&hp.addEventListener('click',function(){go(i-1);auto()});
 hn&&hn.addEventListener('click',function(){go(i+1);auto()});
 var PAUSE=hz?hz.innerHTML:'',PLAY='<svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z"/></svg>';
 hz&&hz.addEventListener('click',function(){paused=!paused;hz.innerHTML=paused?PLAY:PAUSE;hz.setAttribute('aria-label',paused?'Play':'Pause');auto()});
 if(s.length>1)auto();
 /* tabs */
 $$('.vtabs').forEach(function(v){var bt=$$('.tablist button',v),pn=$$('.tabpanel',v);bt.forEach(function(x,k){x.addEventListener('click',function(){bt.forEach(function(y){y.classList.remove('on')});pn.forEach(function(y){y.classList.remove('on')});x.classList.add('on');pn[k].classList.add('on')})})});
 /* back to top */
 var tt=$('.to-top');window.addEventListener('scroll',function(){tt&&tt.classList.toggle('show',window.scrollY>400)},{passive:true});
 /* counters */
 function count(el){var to=+el.getAttribute('data-count'),d=1200,st=null;function f(ts){st=st||ts;var p=Math.min((ts-st)/d,1);el.textContent=Math.round(to*p);if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
 if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){count(e.target);io.unobserve(e.target)}})},{threshold:.4});$$('.count').forEach(function(c){c.textContent='0';io.observe(c)})}
 /* lightbox */
 var lb=document.createElement('div');lb.className='lbox';lb.innerHTML='<button aria-label="Close">&times;</button><img alt="">';document.body.appendChild(lb);
 $$('a.lb').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();$('img',lb).src=a.getAttribute('href');lb.classList.add('on')})});
 lb.addEventListener('click',function(){lb.classList.remove('on')});
 /* social placeholders (blank for now) */
 $$('a[data-social]').forEach(function(a){a.addEventListener('click',function(e){if(a.getAttribute('href')==='#')e.preventDefault()})});
 /* forms -> WhatsApp */
 $$('.wa-form').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var m=f.getAttribute('data-prefix')||'',L=[];
  new FormData(f).forEach(function(v,k){if(v)L.push(k+': '+v)});
  window.open('https://wa.me/'+f.getAttribute('data-wa')+'?text='+m+encodeURIComponent(L.join('\n')),'_blank')})});
 /* search */
 var ov=$('#searchov'),inp=$('#sinput'),res=$('#sres');
 function openS(){ov.classList.add('on');setTimeout(function(){inp.focus()},50);render('')}
 function closeS(){ov.classList.remove('on')}
 function render(q){q=q.toLowerCase().trim();var D=window.NSS_SEARCH||[];var r=D.filter(function(x){return !q||(x[0]+' '+x[2]).toLowerCase().indexOf(q)>-1}).slice(0,8);
  res.innerHTML=r.length?r.map(function(x){return '<li><a href="'+x[1]+'"><b>'+x[0]+'</b><small>'+x[2]+'</small></a></li>'}).join(''):'<li style="padding:10px 6px">No results found</li>'}
 $('#searchbtn')&&$('#searchbtn').addEventListener('click',openS);$('#sclose')&&$('#sclose').addEventListener('click',closeS);
 inp&&inp.addEventListener('input',function(){render(inp.value)});
 $('#sform')&&$('#sform').addEventListener('submit',function(e){e.preventDefault();var a=$('#sres a');if(a)location.href=a.getAttribute('href')});
 ov&&ov.addEventListener('click',function(e){if(e.target===ov)closeS()});
 document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeS();lb.classList.remove('on')}});
})();
