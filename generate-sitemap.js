import fs from "fs"
import path from "path"

const pages = [
  "",
  "services",
  "portfolio",
  "drones",
  "contact",
]

const domain = "https://www.cineflightstudio.nl"

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${domain}/${page}</loc>
    <changefreq>monthly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("")}
</urlset>`

fs.writeFileSync(path.resolve("./public/sitemap.xml"), sitemap)
console.log("✅ sitemap.xml generated!")
