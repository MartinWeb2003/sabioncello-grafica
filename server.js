import express from 'express'

const app  = express()
const PORT = 3001

/* ── Facebook credentials — set these in .env ──────────────────
   FB_PAGE_ID    : numeric page ID (find it in Page → About → Page ID)
   FB_PAGE_TOKEN : long-lived Page Access Token from
                   https://developers.facebook.com/tools/explorer/
                   Permissions needed: pages_read_engagement, pages_show_list
   ──────────────────────────────────────────────────────────────── */
const PAGE_ID    = process.env.FB_PAGE_ID    || ''
const PAGE_TOKEN = process.env.FB_PAGE_TOKEN || ''
const API_VER    = 'v19.0'
const CACHE_TTL  = 15 * 60 * 1000   /* 15 min */

let cache     = null
let cacheTime = 0

/* Fallback posts shown when no credentials are configured */
const FALLBACK = [
  {
    id: 'f1',
    message: 'Grafički dizajn, tisak i brendiranje vozila — sve na jednom mjestu. Posjetite nas u Orebićima na Pelješcu!',
    full_picture: null,
    created_time: new Date(Date.now() - 1 * 86_400_000).toISOString(),
    permalink_url: 'https://www.facebook.com/share/18EMT6khbJ/',
  },
  {
    id: 'f2',
    message: 'Novi radovi su stigli! Pogledajte naše najnovije radove brendiranja vozila i oslikavanja fasada.',
    full_picture: null,
    created_time: new Date(Date.now() - 4 * 86_400_000).toISOString(),
    permalink_url: 'https://www.facebook.com/share/18EMT6khbJ/',
  },
  {
    id: 'f3',
    message: 'Svjetleće reklame za vaš poslovni prostor — LED, neonski natpisi i kanalna slova po mjeri.',
    full_picture: null,
    created_time: new Date(Date.now() - 8 * 86_400_000).toISOString(),
    permalink_url: 'https://www.facebook.com/share/18EMT6khbJ/',
  },
  {
    id: 'f4',
    message: 'Vez na tekstilu — uniforme, majice i suveniri s vašim logotipom. Idealno za hotele, restorane i tvrtke.',
    full_picture: null,
    created_time: new Date(Date.now() - 12 * 86_400_000).toISOString(),
    permalink_url: 'https://www.facebook.com/share/18EMT6khbJ/',
  },
  {
    id: 'f5',
    message: 'Dvadeset godina iskustva u grafičkom dizajnu i tisku. Vaš brand zaslužuje najboljeg partnera!',
    full_picture: null,
    created_time: new Date(Date.now() - 16 * 86_400_000).toISOString(),
    permalink_url: 'https://www.facebook.com/share/18EMT6khbJ/',
  },
]

app.get('/api/fb-posts', async (req, res) => {
  /* Serve from cache if fresh */
  if (cache && Date.now() - cacheTime < CACHE_TTL) {
    return res.json(cache)
  }

  /* No credentials — return fallback immediately */
  if (!PAGE_ID || !PAGE_TOKEN) {
    return res.json({ posts: FALLBACK, pagePhoto: null })
  }

  try {
    const [postsRes, picRes] = await Promise.all([
      fetch(
        `https://graph.facebook.com/${API_VER}/${PAGE_ID}/posts` +
        `?fields=message,full_picture,created_time,permalink_url&limit=5` +
        `&access_token=${PAGE_TOKEN}`
      ),
      fetch(
        `https://graph.facebook.com/${API_VER}/${PAGE_ID}/picture` +
        `?type=normal&redirect=false&access_token=${PAGE_TOKEN}`
      ),
    ])

    const postsData = await postsRes.json()
    const picData   = await picRes.json()

    if (postsData.error) throw new Error(postsData.error.message)

    const result = {
      posts:     postsData.data || FALLBACK,
      pagePhoto: picData.data?.url || null,
    }

    cache     = result
    cacheTime = Date.now()
    res.json(result)
  } catch (err) {
    console.error('Facebook API error:', err.message)
    res.json({ posts: FALLBACK, pagePhoto: null })
  }
})

app.listen(PORT, () =>
  console.log(`✓  FB proxy running at http://localhost:${PORT}`)
)
