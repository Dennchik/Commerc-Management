//* Task server
export function server() {
  $.browserSync.init({
    server: {
      baseDir: $.path.root,
    },
    notify: false,
    open: true,
    browser: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });
}
