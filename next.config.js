const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // A stray lockfile in the home directory makes Turbopack mis-infer the
  // workspace root; pin it to this project explicitly.
  turbopack: {
    root: path.join(__dirname),
  },
}

module.exports = nextConfig
