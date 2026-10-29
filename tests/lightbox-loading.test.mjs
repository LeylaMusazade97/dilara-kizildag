import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
const source = await readFile(new URL('../app/gallery/image-readiness.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { revealDecodedImage } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const deferred = () => { let resolve, reject; const promise = new Promise((a,b) => { resolve=a; reject=b; }); return { promise, resolve, reject }; };
const flush = () => new Promise(resolve => setImmediate(resolve));
const image = (pending, src='art-a.webp') => ({ currentSrc:src, src, complete:true, naturalWidth:1600, decode:()=>pending.promise });

test('the full image is revealed only after decoding finishes', async () => {
 const pending=deferred(); const shown=[];
 revealDecodedImage(image(pending), src=>shown.push(src));
 assert.deepEqual(shown,[]);
 pending.resolve(); await flush(); assert.deepEqual(shown,['art-a.webp']);
});
test('rapid navigation cancels the previous decode even if it finishes last', async () => {
 const first=deferred(), next=deferred(); const shown=[];
 const cancel=revealDecodedImage(image(first), src=>shown.push(src));
 cancel(); revealDecodedImage(image(next,'art-b.webp'), src=>shown.push(src));
 next.resolve(); await flush(); first.resolve(); await flush();
 assert.deepEqual(shown,['art-b.webp']);
});
test('an image candidate replaced during decoding cannot be revealed', async () => {
 const pending=deferred(); const target=image(pending); let shown=false;
 revealDecodedImage(target,()=>shown=true); target.currentSrc='larger-art-a.webp';
 pending.resolve(); await flush(); assert.equal(shown,false);
});
test('decode failure and broken images leave the preview visible', async () => {
 const pending=deferred(); let count=0;
 revealDecodedImage(image(pending),()=>count++); pending.reject(new Error('decode failed')); await flush();
 revealDecodedImage({src:'broken.webp',currentSrc:'broken.webp',complete:true,naturalWidth:0},()=>count++); await flush();
 assert.equal(count,0);
});
