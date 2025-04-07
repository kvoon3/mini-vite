import type { SimpleHandleFunction } from 'connect'
import fsp from 'node:fs/promises'
import { extname, join } from 'node:path'
import process from 'node:process'
import { injectClient, injectScript } from '../utils/injectScript'

export const indexHtmlMiddleware: SimpleHandleFunction = async function (req, res) {
  console.log('req.url', req.url)

  const url = req.url === '/'
    ? './index.html'
    : req.url

  const fileinfo = await urlToFileInfo(url)

  const { contentType } = fileinfo
  let content = fileinfo.content

  if (content) {
    if (url === './index.html') {
      content = injectClient(content)
    }

    res.writeHead(200, { 'Content-Type': contentType })
    res.end(content)
  }
  else {
    res.writeHead(404)
    res.end()
  }
}

const extContentTypeMap = {
  js: 'application/javascript',
  css: 'text/css',
  html: 'text/html',
}

async function urlToFileInfo(url: string) {
  const filepath = join(process.cwd(), url)
  const ext = extname(filepath).replace(/\./, '')
  const contentType: string = extContentTypeMap?.[ext] || 'text/plain'
  try {
    const filecontent = await fsp.readFile(filepath, 'utf-8')

    return {
      path: filepath,
      content: filecontent,
      ext,
      contentType,
    }
  }
  catch (error) {
    console.error(error)
    return {
      path: filepath,
      content: '',
      ext,
      contentType,
    }
  }
}
