import fetch from 'node-fetch';
import Downloader from 'nodejs-file-downloader';

const espacio = [];

fetch('https://memegen-link-examples-upleveled.netlify.app/')
  .then((res) => res.text())
  .then((text) => {
    const urlRegex = /https:[\/][\/]memecomplete((.)+)/gi;
    text.replace(urlRegex, function (url) {
      espacio.push(
        url
          .trim()
          .replace(`"`, '')
          .replace(`https://memecomplete.com/edit/`, ''),
      );
    });
    espacio.length = 10;
    console.log(espacio);
    console.log(typeof soloDiez);

    for (let i = 0; i < 10; i++) {
      (async () => {
        // Wrapping the code with an async function, just for the sake of example.

        const downloader = new Downloader({
          url: espacio[i], // If the file name already exists, a new file with the name 200MB1.zip is created.
          directory: './memes', // This folder will be created, if it doesn't exist.
          onProgress: function (percentage, chunk, remainingSize) {
            // Gets called with each chunk.
            console.log('% ', percentage);
            console.log('Current chunk of data: ', chunk);
            console.log('Remaining bytes: ', remainingSize);
          },
        });
        try {
          await downloader.download(); // Downloader.download() returns a promise.

          console.log('All done');
        } catch (error) {
          // IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
          // Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
          console.log('Download failed', error);
        }
      })();
    }
  });
