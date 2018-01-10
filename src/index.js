export default class EmbedDetector {
  static get sources() {
    return [
      {
        type: 'youtube',
        url: 'http://www.youtube.com/embed/$1',
        pattern: /(?:https?:\/\/)?(?:i\.|www\.|img\.)?(?:youtu\.be\/|youtube\.com\/|ytimg\.com\/)(?:embed\/|v\/|vi\/|vi_webp\/|watch\?v=|watch\?.+&v=)((\w|-){11})(?:\S+)?/,
        matchIndex: 1,
      },
      {
        type: 'vimeo',
        url:
          'https://player.vimeo.com/video/$1?color=f4d807&portrait=0&badge=0',
        pattern: /https?:\/\/(?:vimeo\.com\/|player\.vimeo\.com\/)(?:video\/|(?:channels\/staffpicks\/|channels\/)|)((\w|-){7,9})/,
        matchIndex: 1,
      },
      {
        type: 'soundcloud',
        url:
          'https://w.soundcloud.com/player/?url=$1&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=true&amp;show_reposts=true&amp;show_teaser=true&amp;visual=true',
        pattern: /https?:\/\/(?:w\.|www\.|)(?:soundcloud\.com\/)(?:(?:player\/\?url=https\%3A\/\/api.soundcloud.com\/tracks\/)|)(((\w|-)[^A-z]{7})|([A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*(?!\/sets(?:\/|$))(?:\/[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*){1,2}))/,
        matchIndex: 0,
      },
    ];
  }
  static qualifySource(string) {
    // Test the string against each pattern defined in sources, returns true
    if (string && string.length > 0) {
      let isMediaSource = false;
      EmbedDetector.sources.forEach(source => {
        if (source.pattern.test(string)) {
          isMediaSource = true;
        }
      });
      return isMediaSource;
    }
  }
  static getSourceType(string) {
    // Returns the source type (e.g. 'soundcloud')
    if (string && string.length > 0) {
      let sourceType = null;
      EmbedDetector.sources.forEach(source => {
        if (source.pattern.test(string)) {
          sourceType = source.type;
        }
      });
      return sourceType;
    }
  }
  static detect(string) {
    // Return the iFrame URL for string
    if (string && string.length > 0) {
      let url = null;
      EmbedDetector.sources.forEach(source => {
        if (source.pattern.test(string) && string.indexOf(source.type) > -1) {
          url = source.url.replace(
            '$1',
            string.match(source.pattern)[source.matchIndex],
          );
        }
      });
      return url;
    }
  }
}
