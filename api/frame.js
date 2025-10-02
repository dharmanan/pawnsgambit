export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta property="og:title" content="Pawn's Gambit" />
    <meta property="og:image" content="https://pawnsgambit.vercel.app/og-image.png" />
    <meta name="fc:frame" content="vNext" />
    <meta name="fc:frame:image" content="https://pawnsgambit.vercel.app/og-image.png" />
    <meta name="fc:frame:button:1" content="Play Now" />
    <meta name="fc:frame:button:1:action" content="link" />
    <meta name="fc:frame:button:1:target" content="https://pawnsgambit.vercel.app" />
  </head>
  <body></body>
</html>`);
}
