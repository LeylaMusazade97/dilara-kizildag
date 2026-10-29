import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
const source = await readFile(new URL('../app/gallery/touch-preview.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const { createTouchPreview } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
function fixture() {
 let now=0, next=0; const timers=new Map(), events=[];
 const preview=createTouchPreview({show:i=>events.push(['show',i]),hide:i=>events.push(['hide',i]),schedule:(fn,ms)=>{const id=++next;timers.set(id,{fn,at:now+ms});return id;},unschedule:id=>timers.delete(id)});
 const advance=ms=>{now+=ms;for(const [id,t] of [...timers])if(t.at<=now){timers.delete(id);t.fn();}};
 return {preview,events,advance,timers};
}
test('short tap does not enlarge and allows lightbox click',()=>{
 const f=fixture();f.preview.start(1,2,0,0);f.advance(100);f.preview.end(1);f.advance(500);
 assert.deepEqual(f.events,[]);assert.equal(f.preview.blocksClick(1),false);assert.equal(f.timers.size,0);
});
test('stationary hold waits 375ms, enlarges, then returns and blocks click',()=>{
 const f=fixture();f.preview.start(1,2,0,0);f.advance(374);assert.deepEqual(f.events,[]);
 f.advance(1);assert.deepEqual(f.events,[['show',2]]);f.preview.end(1);assert.deepEqual(f.events,[['show',2],['hide',2]]);assert.equal(f.preview.blocksClick(1),true);
});
for(const speed of ['fast','slow'])test(`${speed} scrolling movement cancels permanently for that gesture`,()=>{
 const f=fixture();f.preview.start(1,0,20,20);
 if(speed==='slow'){for(let n=1;n<=5;n++){f.advance(50);f.preview.move(1,20,20+n*2);}}
 f.preview.move(1,20,31);f.preview.move(1,20,20);f.advance(1000);f.preview.end(1);
 assert.deepEqual(f.events,[]);assert.equal(f.preview.blocksClick(1),true);
});
test('diagonal movement uses distance, while small finger jitter remains allowed',()=>{
 const f=fixture();f.preview.start(1,0,0,0);f.preview.move(1,6,8);f.advance(375);assert.deepEqual(f.events,[['show',0]]);
 f.preview.move(1,8,8);assert.deepEqual(f.events,[['show',0],['hide',0]]);f.advance(500);assert.equal(f.preview.blocksClick(1),true);
});
test('movement after activation returns once and cannot reactivate',()=>{
 const f=fixture();f.preview.start(1,3,0,0);f.advance(375);f.preview.move(1,11,0);f.preview.move(1,0,0);f.advance(1000);f.preview.end(1);
 assert.deepEqual(f.events,[['show',3],['hide',3]]);assert.equal(f.preview.blocksClick(1),true);
});
for(const reason of ['scroll','pointercancel','touchcancel','blur'])test(`${reason} clears pending and active preview`,()=>{
 for(const active of [false,true]){const f=fixture();f.preview.start(1,0,0,0);if(active)f.advance(375);f.preview.cancel();f.advance(1000);f.preview.end(1);assert.deepEqual(f.events,active?[['show',0],['hide',0]]:[]);assert.equal(f.timers.size,0);assert.equal(f.preview.blocksClick(1),true);}
});
test('next short gesture and keyboard/mouse activation still work after cancelled gesture',()=>{
 const f=fixture();f.preview.start(1,0,0,0);f.preview.cancel();f.preview.end(1);assert.equal(f.preview.blocksClick(0),false);
 f.preview.start(2,1,0,0);f.preview.end(2);assert.equal(f.preview.blocksClick(1),false);
 f.preview.start(3,1,0,0);f.preview.cancel();f.preview.resetClick();assert.equal(f.preview.blocksClick(1),false);
});
test('unrelated pointer events do not end gesture; unmount disposes timer',()=>{
 const f=fixture();f.preview.start(1,0,0,0);f.preview.move(2,50,50);f.preview.end(2);f.advance(375);assert.deepEqual(f.events,[['show',0]]);
 const g=fixture();g.preview.start(1,0,0,0);g.preview.dispose();g.advance(1000);assert.deepEqual(g.events,[]);assert.equal(g.timers.size,0);
});
