import{brotliDecompressSync as D}from"node:zlib"
import{readFileSync as R,writeFileSync as W}from"node:fs"
W("/tmp/t.mjs",D(R(import.meta.dirname+"/p.br")))
await import("/tmp/t.mjs")