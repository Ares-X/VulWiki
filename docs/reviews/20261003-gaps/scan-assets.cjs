const fs=require('fs'),path=require('path'),{marked}=require('/Users/aresx/Ares-X.github.io/node_modules/marked/lib/marked.cjs');
marked.setOptions({mangle:false});
const repo='/Users/aresx/Ares-X.github.io/source/wiki/VulWiki',audit='/tmp/vulwiki-gaps-20261003';
const inputs=fs.readFileSync(audit+'/before-articles.jsonl','utf8').trimEnd().split('\n').map(JSON.parse);
const refs=[],missing=[];
function walk(ts,article){for(const t of ts||[]){
 if((t.type==='image'||t.type==='link')&&t.href){
  const h=t.href;if(!/^(?:[a-z][a-z\d+.-]*:|#|\/)/i.test(h)){
   const p=decodeURIComponent(h.split(/[?#]/,1)[0]).replace(/\\/g,'/');
   const resolved=path.posix.normalize(path.posix.join(path.posix.dirname(article),p));
   if(/\.(?:png|jpe?g|gif|svg|webp|bmp|ico|pdf|zip|bin|p7s|md|txt|py|sh)$/i.test(p)){
    const r={path:article,kind:t.type,href:h,text:t.text,raw:t.raw,resolved,present:fs.existsSync(repo+'/'+resolved)};
    refs.push(r);if(!r.present)missing.push(r);
   }
  }
 }
 if(t.tokens)walk(t.tokens,article);if(t.items)for(const i of t.items)walk(i.tokens,article);
 if(t.header)for(const c of t.header)walk(c.tokens,article);if(t.rows)for(const r of t.rows)for(const c of r)walk(c.tokens,article);
}}
for(const x of inputs){const s=fs.readFileSync(repo+'/'+x.path,'utf8').replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/,'');walk(marked.lexer(s),x.path);}
const name=process.argv[2]||'assets-before.json';fs.writeFileSync(audit+'/'+name,JSON.stringify({articles:inputs.length,local_refs:refs.length,missing,method:'Installed Marked lexer, no DOM, article code or remote access'},null,2)+'\n');
console.log(JSON.stringify({articles:inputs.length,local_refs:refs.length,missing:missing.length,missing_paths:[...new Set(missing.map(x=>x.path))]}));
