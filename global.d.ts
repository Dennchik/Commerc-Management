declare module 'postcss-sort-media-queries' {
  import { Plugin } from 'postcss';
  function sortMediaQueries(): Plugin;
  export default sortMediaQueries;
}

declare module 'gulp-data';
declare module 'gulp-pugbem';
declare module 'gulp-webp';

declare module 'gulp-notify' {
  import type { PluginError } from 'gulp-util';

  interface NotifyOptions {
    title?: string;
    message?: string | ((file: any) => string);
    sound?: boolean | string;
    icon?: string;
    onLast?: boolean;
    wait?: boolean;
  }

  interface Notify {
    (options?: NotifyOptions): NodeJS.ReadWriteStream;
    onError(
      options?: string | NotifyOptions | ((error: PluginError) => string)
    ): (error: PluginError) => void;
  }

  const notify: Notify;
  export default notify;
}
