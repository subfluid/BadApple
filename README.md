# bad-apple

plays Bad Apple!! animation using a basic unicode palette, either to console or to Discord

## dependencies

[discord.js 12.5.1](https://www.npmjs.com/package/discord.js) </br> 
[opencv4nodejs 5.6.0](https://www.npmjs.com/package/opencv4nodejs) </br>

## running

1. run `npm install` (should this fail, the aforementioned links contain proper installation instructions)

2. then run `npm start`, which converts the given video to several jpegs dumped in ./frames, then reading and printing them to console (same thing as running `node video-convert` and then `node index`)

## discord

edit ./token.js to contain your discord user id and bot token </br>
un-comment all code related to discord in ./index.js
