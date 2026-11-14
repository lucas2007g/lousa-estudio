import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const base=path.resolve('dist');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json'};
http.createServer(async(req,res)=>{try{const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.resolve(base,'.'+(name==='/'?'/index.html':name));if(file!==base&&!file.startsWith(base+path.sep)){res.writeHead(403);res.end();return}const data=await fs.readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(data)}catch{res.writeHead(404);res.end('Arquivo não encontrado')}}).listen(4173,'127.0.0.1',()=>console.log('Lousa em http://127.0.0.1:4173'));
