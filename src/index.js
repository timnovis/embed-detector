export default class EmbedDetector {
  static get pattern() {
    return /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([\w\-]{10,12})(?:&feature)?(?:[\w\-]{0})?|https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)|(http|https)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/;
  }
  static get sources() {
    return [
      {
        type: 'youtube',
        url: 'http://www.youtube.com/embed/$1',
        matchIndex: 1,
      },
      {
        type: 'vimeo',
        url:
          'https://player.vimeo.com/video/$1?color=f4d807&portrait=0&badge=0',
        matchIndex: 7,
      },
      {
        type: 'soundcloud',
        url:
          'https://w.soundcloud.com/player/?url=$1&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=true&amp;show_reposts=true&amp;show_teaser=true&amp;visual=true',
        matchIndex: 0,
      },
    ];
  }
  static detect(string) {
    if (string && string.length > 0 && EmbedDetector.pattern.test(string)) {
      let url = '';
      EmbedDetector.sources.forEach(source => {
        if (string.indexOf(source.type) > -1) {
          url = source.url.replace(
            '$1',
            string.match(EmbedDetector.pattern)[source.matchIndex],
          );
        }
      });
      return url;
    }
  }
}
