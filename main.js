// 服务模块
const http = require('http');

// 加载文件模块
const fs = require("fs");
// 域名
const hostname = '127.0.0.1';
// 端口
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/html');
  // 根据请求路径确定文件路径和内容类型
  let filePath, contentType;
  if (req.url === '/' || req.url === '/index.html') {
    // 处理HTML请求
    filePath = './index.html';
    contentType = 'text/html';
  } else if (req.url.startsWith('/img/')) {
    // 处理图片请求（假设图片存放在项目根目录的img文件夹下）
    filePath = `.${req.url}`;  // 将请求路径转换为本地文件路径（如 /img/photo.jpg → ./img/photo.jpg）
    contentType = 'image/jpeg';  // JPG图片的MIME类型，若有PNG图片需改为image/png
  } else {
    // 其他路径返回404
    res.statusCode = 404;
    res.end('Not Found');
    return;
  }

 // 读取文件并响应
 fs.readFile(filePath,(err, data)=>{
  if(err){
    res.statusCode = 404;
    res.end('Not Found');
    return;
  }
  res.setHeader('Content-Type', contentType);
  res.statusCode = 200;
  res.end(data);
 })
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});