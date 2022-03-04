#bin/sh

echo "Compiling sources with browserify version..."
browserify --version

LIB="lib"

browserify -r @jaames/iro --standalone iro -o $LIB/iro.min.js
browserify -r tinycolor2 --standalone tinycolor -o $LIB/tinycolor-min.js
browserify -r rgbquant --standalone RgbQuant -o $LIB/rgbquant.js
browserify -r nedb --standalone nedb -o $LIB/nedb.js