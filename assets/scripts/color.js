function RGBtoHSV(r, g, b) {
    var _r = r / 255;
    var _g = g / 255;
    var _b = b / 255;

    var h, s, v;

    var minVal = Math.min(_r, _g, _b);
	var maxVal = Math.max(_r, _g, _b);
    var delta = maxVal - minVal;
    
    v = maxVal;

    if (delta == 0) {
        h = 0;
        s = 0;
    } else {
        s = delta / maxVal;
        var del_R = (((maxVal - _r) / 6) + (delta / 2)) / delta;
		var del_G = (((maxVal - _g) / 6) + (delta / 2)) / delta;
        var del_B = (((maxVal - _b) / 6) + (delta / 2)) / delta;
        
        if (_r == maxVal) {
            h = del_B - del_G;
        } else if (_g == maxVal) {
            h = (1 / 3) + del_R - del_B;
        } else if (_b == maxVal) {
            h = (2 / 3) + del_G - del_R;
        }

        if (h < 0) {
            h += 1;
        }
        if (h > 1) {
            h -= 1;
        }
    }
    h *= 360;
    s *= 100;
    v *= 100;

    return { h : h, s : s, v : v };
}

function HSVtoRGB (h, s, v) {
    var _h = h / 360; 
    var _s = s / 100; 
    var _v = v / 100;

    var r, g, b;

	if (_s == 0) {
		r = _v * 255;
		g = _v * 255;
		b = _v * 255;
	} else {
		var_h = _h * 6;
		var_i = Math.floor(var_h);
		var_1 = _v * (1 - _s);
		var_2 = _v * (1 - _s * (var_h - var_i));
		var_3 = _v * (1 - _s * (1 - (var_h - var_i)));
		
        if (var_i == 0) {
            r = _v; 
            g = var_3; 
            b = var_1;
        } else if (var_i == 1) {
            r = var_2; 
            g = _v; 
            b = var_1;
        } else if (var_i == 2) {
            r = var_1; 
            g = _v; 
            b = var_3; 
        } else if (var_i == 3) {
            r = var_1; 
            g = var_2; 
            b = _v;
        } else if (var_i == 4) { 
            r = var_3; 
            g = var_1; 
            b = _v;
        } else {
            r = _v; 
            g = var_1; 
            b = var_2;
        }
        
        r *= 255;
        g *= 255;
        b *= 255;
    }
    return { r : r, g : g, b : b};
}

function brightness(r, g, b) {
    val_1 = 0.299 * r * r;
    val_2 = 0.587 * g * g;
    val_3 = 0.114 * b * b;

    return Math.sqrt(val_1 + val_2 + val_3);
}

function convertRGBtoOBJ(colorString)
{
  var rgbKeys = ['r', 'g', 'b', 'a'];
  var rgbObj = {};
  var color = colorString.replace(/^rgba?\(|\s+|\)$/g,'').split(',');

  for (i in rgbKeys)
    rgbObj[rgbKeys[i]] = color[i] || 1;

  return rgbObj;
}

function RGBToHex(r,g,b) {
    r = Math.floor(r).toString(16);
    g = Math.floor(g).toString(16);
    b = Math.floor(b).toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }

  function midColor(r1, g1, b1, r2, g2, b2, fraction) {
      var val_1 = r1 - r2;
      var val_2 = g1 - g2;
      var val_3 = b1 - b2;

      var r3 = r1 - val_1 * fraction;
      var g3 = g1 - val_2 * fraction;
      var b3 = b1 - val_3 * fraction;

      r3 = r3 % 255;
      g3 = g3 % 255;
      b3 = b3 % 255;

      return {r : r3, g: g3, b: b3};
  }