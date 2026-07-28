export function publicUrl(path: string, base = import.meta.env.BASE_URL) {
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  return `${normalizedBase}${path.replace(/^\/+/, '')}`
}

export const logoUrl = publicUrl('media/wordswave-logo.jpg')
export const productVideoUrl = publicUrl('media/wordswave-product-demo.mp4')
export const workspaceUrl =
  import.meta.env.VITE_WORKSPACE_URL?.trim() || publicUrl('product')
