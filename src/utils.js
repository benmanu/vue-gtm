import pluginConfig from './config'

/**
 * Console log depending on config debug mode
 * @param {...*} message
 */
export const logDebug = function (message) {
  if (pluginConfig.debug) {
    console.log('VueGtm :', ...arguments)
  }
}

/**
 * Load GTM script tag
 * @param {String}  id  GTM ID
 */
export const loadScript = function (id, auth, preview, cookiesWin) {
  const win    = window,
        doc    = document,
        script = doc.createElement('script'),
        dl     = 'dataLayer'
  
  let src = `https://www.googletagmanager.com/gtm.js?id=${id}`;

  win[dl] = win[dl] || []

  win[dl].push({
    event      :'gtm.js',
    'gtm.start': new Date().getTime(),
  })

  script.async = true;

  if (typeof auth !== 'undefined') {
    src = src + `&gtm_auth=${auth}`
  }

  if (typeof preview !== 'undefined') {
    src = src + `&gtm_preview=${preview}`
  }

  if (typeof cookiesWin !== 'undefined') {
    src = src + `&gtm_cookies_win=${cookiesWin}`
  }

  script.src = src

  doc.body.appendChild(script)
}

/**
 * Check if GTM script is in the document
 * @return {boolean}
 */
export const hasScript = function () {
  return Array
    .from(document.getElementsByName('script'))
    .some(script => script.src.includes('googletagmanager'))
}
