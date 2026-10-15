import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const root = path.resolve('dist');
const port = 8765;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((request, response) => {
  let pathname = decodeURIComponent(request.url.split('?')[0]);
  if (pathname.endsWith('/')) pathname += 'index.html';
  let file = path.resolve(root, `.${pathname}`);
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    const idx = path.join(file, 'index.html');
    if (fs.existsSync(idx)) file = idx;
  } else if (!fs.existsSync(file) && fs.existsSync(file + '.html')) {
    file = file + '.html';
  }
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    const custom404 = path.join(root, '404.html');
    if (fs.existsSync(custom404)) {
      response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(custom404).pipe(response);
      return;
    }
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('页面不存在');
    return;
  }
  response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(response);
});

server.on('error', error => {
  if (error.code === 'EADDRINUSE') {
    console.error(`端口 ${port} 已被占用，请关闭之前打开的预览窗口后重试。`);
  } else {
    console.error(error);
  }
  process.exitCode = 1;
});

server.listen(port, '127.0.0.1', () => {
  console.log(`机场雷达预览已启动：http://localhost:${port}`);
  console.log('关闭此窗口即可停止预览。');
});
