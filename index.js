const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')

const defaultOptions = {
  headerIndex: 0,
  bodyStart: 1,
}

/**
 *
 * @param {{html: string, url: string,selector: string, customHeaders: string[], options: defaultOptions}} param0
 *
 */

const jsonFromTable = async ({
  html,
  url,
  selector = 'table',
  customHeaders,
  options = defaultOptions,
}) => {
  let data
  let headers = []
  let json = []

  if (url) {
    const response = await fetch(url)
    data = await response.text()
  } else if (html) {
    data = html
  } else {
    return []
  }

  const { document } = new JSDOM(data).window

  const table = document.querySelector(selector)

  if (!table) return []

  let trs = Array.from(table.querySelectorAll('tr'))

  if (trs.length === 0) return []

  let headerIndex = options.headerIndex || 0

  if (customHeaders) {
    headers = customHeaders
  } else {
    trs[headerIndex].querySelectorAll('th, td').forEach(th => {
      headers.push(th.textContent.replace(/\n/g, '').trim())
    })
  }

  let bodyStart = options.bodyStart || headerIndex + 1

  if (customHeaders) {
    bodyStart = options.bodyStart
  }

  trs = trs.splice(bodyStart)

  trs.forEach((tr, i) => {
    const tds = Array.from(tr.querySelectorAll('th, td'))

    tds.forEach((td, j) => {
      json[i] = {
        ...json[i],
        [headers[j]]: td.textContent.replace(/\n/g, '').trim(),
      }
    })
  })

  return json
}

module.exports = jsonFromTable
