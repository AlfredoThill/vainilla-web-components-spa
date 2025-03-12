import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [customHtmlTemplatePlugin(), createHtmlPlugin({ minify: true })],
});

function customHtmlTemplatePlugin() {
  return {
    name: 'html-template-bundler',
    transformIndexHtml(html) {
      const htmlFilePaths = drillForHtmlFiles();
      const templates = htmlFilePaths.map((path) => buildTemplateWithStyles(path));
      return html.replace('<templates />', templates.join(''));
    },
  };
}

function buildTemplateWithStyles(path) {
  const baseTemplate = fs.readFileSync(path, 'utf-8').trim();
  const cssFile = path.replace('.html', '.css');
  if (fs.existsSync(cssFile)) {
    const css = fs.readFileSync(cssFile, 'utf-8').trim();
    return baseTemplate.replace('<styles />', `<style>${css}</style>`);
  }
  return baseTemplate;
}

function drillForHtmlFiles() {
  const htmlFiles = [];
  const pathList = [];
  pathList.push('./src');
  while (pathList.length > 0) {
    const currentPath = pathList.pop();
    const files = fs.readdirSync(currentPath);
    files.forEach((file) => {
      const filePath = path.join(currentPath, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        pathList.push(filePath);
      } else {
        if (file.endsWith('.html')) {
          htmlFiles.push(filePath);
        }
      }
    });
  }
  return htmlFiles;
}
