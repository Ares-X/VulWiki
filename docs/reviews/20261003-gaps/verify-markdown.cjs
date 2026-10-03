const fs=require('fs'),crypto=require('crypto'),zlib=require('zlib'),assert=require('assert');
const {marked}=require('/Users/aresx/Ares-X.github.io/node_modules/marked/lib/marked.cjs');marked.setOptions({mangle:false});
const audit='/tmp/vulwiki-gaps-20261003',repo='/Users/aresx/Ares-X.github.io/source/wiki/VulWiki';
const rows=zlib.gunzipSync(fs.readFileSync(audit+'/article-edit-ledger.jsonl.gz')).toString().trimEnd().split('\n').map(JSON.parse);
const sha=v=>crypto.createHash('sha256').update(v).digest('hex');
const body=s=>s.replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/,'');
function values(ts,o={code:[],codespan:[],image:[],link:[],html:[]}){for(const t of ts||[]){
 if(['code','codespan','html'].includes(t.type))o[t.type].push(t.text);
 if(['image','link'].includes(t.type))o[t.type].push(JSON.stringify({href:t.href,text:t.type==='image'?t.text:undefined,title:t.title}));
 if(t.tokens)values(t.tokens,o);if(t.items)for(const i of t.items)values(i.tokens,o);
 if(t.header)for(const c of t.header)values(c.tokens,o);if(t.rows)for(const r of t.rows)for(const c of r)values(c.tokens,o);
}return o;}
function subset(a,b,label){let m=new Map();for(const v of b)m.set(v,(m.get(v)||0)+1);for(const v of a){assert((m.get(v)||0)>0,label+': '+v);m.set(v,m.get(v)-1);}}
let code=0,restored=0,references=0,proseArtifacts=0,oldImages=0,results=[];
for(const r of rows){const current=fs.readFileSync(repo+'/'+r.path,'utf8');assert.equal(sha(current),r.final_sha256);
 const a=values(marked.lexer(body(r.before_text))),b=values(marked.lexer(body(current)));
 const fuzzing=r.operations.some(o=>o.kind==='labeled_reference_code');
 let artifactCount=0;
 const nonempty=a.code.filter(x=>{
  if(!x.trim())return false;
  if(r.operations.some(o=>o.kind==='malformed_empty_list_cleanup')&&x==='  \n- ```')return false;
  if(fuzzing){
   assert(x.includes('下载tiff-4.0.4')||x.includes('##### 2.FUZZING')||x.startsWith('#####   \n##### 1. 基本信息'),r.path+' unexpected code artifact');
   for(const line of x.split('\n'))if(line.trim()&&line.trim()!=='> ```')assert(current.includes(line),r.path+' swallowed prose retained: '+line);
   artifactCount++;return false;
  }
  return true;
 });
 if(fuzzing)assert.equal(artifactCount,3);proseArtifacts+=artifactCount;
 subset(nonempty,b.code,r.path+' original code');code+=nonempty.length;
 subset(a.codespan,b.codespan,r.path+' original inline literals');subset(a.html,b.html,r.path+' original HTML');
 for(const op of r.operations)if(op.kind==='source_restoration'){
  const restoredCode=values(marked.lexer(op.new_text)).code;assert.equal(restoredCode.length,1);assert(restoredCode[0].trim());subset(restoredCode,b.code,r.path+' new source block');restored++;
 }
 for(const op of r.operations)if(op.kind==='labeled_reference_code'){
  const reference=values(marked.lexer(op.new_text)).code;assert.equal(reference.length,1);subset(reference,b.code,r.path+' new reference block');
  const primary=fs.readFileSync(audit+'/fuzzing-primary-Readme.md','utf8');assert.equal(sha(primary),op.evidence.source_sha256);
  for(const line of reference[0].split('\n'))if(line.trim())assert(primary.includes(line),r.path+' official reference line');references++;
 }
 const control=r.operations.filter(o=>o.kind==='literal_imported_copy_control');
 const priorImages=a.image.filter(i=>!(control.length&&JSON.parse(i).href==='http://common.cnblogs.com/images/copycode.gif'));
 const priorLinks=a.link.filter(i=>!(control.length&&JSON.parse(i).href==='javascript:void(0);')&&!(r.path.includes('/Piciorgros ')&&JSON.parse(i).href==='att-8/smime_p7s.bin'));
 if(!r.path.includes('/OSSN/'))subset(priorImages,b.image,r.path+' original image');
 else{assert.equal(a.image.length,15);assert.equal(b.image.length,9);for(const op of r.operations.filter(o=>o.kind==='missing_image_literal_record'))assert(b.codespan.map(v=>v.replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&#39;/g,"'" )).includes(op.old_text));}
 subset(priorLinks,b.link,r.path+' original link');
 for(const op of control)assert(b.codespan.map(v=>v.replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&#39;/g,"'" )).includes(op.old_text));
 oldImages+=a.image.length;
 results.push({path:r.path,original_nonempty_code_blocks_preserved:nonempty.length,restored_code_blocks:r.operations.filter(o=>o.kind==='source_restoration').length,new_official_reference_blocks:r.operations.filter(o=>o.kind==='labeled_reference_code').length,swallowed_prose_artifacts_retained:artifactCount,original_inline_literals:a.codespan.length,old_images:a.image.length,new_images:b.image.length,copy_control_literals:control.length,remaining_empty_code_blocks:b.code.filter(x=>!x.trim()).length});
}
assert.equal(restored,14);assert.equal(results.reduce((n,r)=>n+r.remaining_empty_code_blocks,0),0);
assert.equal(references,3);
fs.writeFileSync(audit+'/markdown-preservation.json',JSON.stringify({article_count:rows.length,original_nonempty_code_blocks_preserved:code,source_blocks_restored:restored,new_official_reference_blocks:references,swallowed_prose_artifacts_retained:proseArtifacts,original_image_tokens:oldImages,exceptions:'OSSN15 missing refs now complete literal records plus9 separate source figures; 8 imported copy controls now complete inline literals; signature link now absolute with old href retained; Fuzzing101 three original lexer code tokens were prose/images swallowed by mismatched quote fences: every non-fence text line retained, original bytes recoverable through inverse ledger.',method:'Installed Marked static lexer only; no DOM, HTML, PoC or sample target execution',results},null,2)+'\n');
console.log(JSON.stringify({articles:rows.length,original_nonempty_code_blocks_preserved:code,restored_source_blocks:restored,new_official_reference_blocks:references,empty_blocks:0}));
