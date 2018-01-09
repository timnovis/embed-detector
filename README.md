# Embed Detector

Really simple package to return a URL for an iFrame for media content. Supports SoundCloud, Vimeo & YouTube links so far.

The regex could be a lot better, still very much a WIP.

```
npm install embed-detector
```

```
import EmbedDetector from 'embed-detector';

let iFrameUrl = EmbedDetector.detect('https://www.youtube.com/watch?v=mKq2nlV4DYk');
```

This package can also be used in the browser with a regular `<script>` tag.
