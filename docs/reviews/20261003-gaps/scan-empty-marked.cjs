const fs=require('fs'),{marked}=require('/Users/aresx/Ares-X.github.io/node_modules/marked/lib/marked.cjs');marked.setOptions({mangle:false});
const dir='/tmp/vulwiki-gaps-20261003',repo='/Users/aresx/Ares-X.github.io/source/wiki/VulWiki';
const inputs=fs.readFileSync(dir+'/before-articles.jsonl','utf8').trimEnd().split('\n').map(JSON.parse),issues=[];
for(const row of inputs){const text=fs.readFileSync(repo+'/'+row.path,'utf8');let ordinal=0;marked.walkTokens(marked.lexer(text.replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/,'')),t=>{if(t.type==='code'){ordinal++;if(!t.text.trim())issues.push({path:row.path,ordinal,raw:t.raw});}});}
fs.writeFileSync(dir+'/empty-marked-after.json',JSON.stringify({articles:inputs.length,empty_blocks:issues.length,issues},null,2)+'\n');console.log(JSON.stringify({articles:inputs.length,empty_blocks:issues.length,paths:[...new Set(issues.map(r=>r.path))]}));
