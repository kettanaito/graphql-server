// @flow
import urlUtils from 'url'

type ParsedUrl = {
  path: string,
  href: string,
  pathname: string,
  host: string,
  hostname: string,
  protocol?: string,
  search?: string,
  query?: Object,
}

export default function getThumbnailUrl({
  originUrl,
  size,
  quality = 'bb',
}: {
  originUrl: string,
  size: string,
  quality: string,
}): string {
  const expectedDimensions = `${size}x${size}${quality}`
  const parsedUrl: ParsedUrl = urlUtils.parse(originUrl)

  return parsedUrl.href.replace(/(?!=\/)(\w+)(?=\.\w+$)/gi, expectedDimensions)
}
