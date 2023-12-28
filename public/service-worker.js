const CACHE_NAME_BASE = 'cache-v'
const pathItems = self.__WB_MANIFEST

const version = calcVersion(pathItems)
const CACHE_NAME = `${CACHE_NAME_BASE}-${version}`

self.addEventListener('install', function (event) {
  let files = pathItems.map(item => item.url)

  files = files.filter(path => path !== 'index.html')

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(files)
      })
      .then(() => {
        return self.skipWaiting()
      })
  )
})

function calcVersion (pathItems) {
  const str = pathItems
    .map(item => `${item.url}::${item.revision || ''}`)
    .join('::')
  return pathItems.length > 0
    ? String(hashCode(str))
    : String(new Date().getTime())
}

function hashCode (str) {
  let hash = 0
  for (let i = 0, len = str.length; i < len; i += 1) {
    const chr = str.charCodeAt(i)
    hash = (hash << 5) - hash + chr // eslint-disable-line no-bitwise
    hash |= 0 // eslint-disable-line no-bitwise
    // Convert to 32bit integer
  }
  return hash
}
