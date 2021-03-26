const RGB_MAX = 255
const HUE_MAX = 360
const SV_MAX = 100

function _normalizeAngle (degrees) {
    return (degrees % 360 + 360) % 360;
}

function RGBtoHSV(r, g, b) {
    if (typeof r === 'object') {
      const args = r
      r = args.r; g = args.g; b = args.b;
    }
  
    // It converts [0,255] format, to [0,1]
    r = (r === RGB_MAX) ? 1 : (r % RGB_MAX / parseFloat(RGB_MAX))
    g = (g === RGB_MAX) ? 1 : (g % RGB_MAX / parseFloat(RGB_MAX))
    b = (b === RGB_MAX) ? 1 : (b % RGB_MAX / parseFloat(RGB_MAX))
  
    var max = Math.max(r, g, b)
    var min = Math.min(r, g, b)
    var h, s, v = max
  
    var d = max - min
  
    s = max === 0 ? 0 : d / max
  
    if (max === min) {
      h = 0 // achromatic
    } else {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }
  
    return {
      h: Math.round(h * HUE_MAX),
      s: Math.round(s * SV_MAX),
      v: Math.round(v * SV_MAX)
    }
  }

  function HSVtoRGB(h, s, v) {
    if (typeof h === 'object') {
      const args = h
      h = args.h; s = args.s; v = args.v;
    }
  
    h = _normalizeAngle(h)
    h = (h === HUE_MAX) ? 1 : (h % HUE_MAX / parseFloat(HUE_MAX) * 6)
    s = (s === SV_MAX) ? 1 : (s % SV_MAX / parseFloat(SV_MAX))
    v = (v === SV_MAX) ? 1 : (v % SV_MAX / parseFloat(SV_MAX))
  
    var i = Math.floor(h)
    var f = h - i
    var p = v * (1 - s)
    var q = v * (1 - f * s)
    var t = v * (1 - (1 - f) * s)
    var mod = i % 6
    var r = [v, q, p, p, t, v][mod]
    var g = [t, v, v, q, p, p][mod]
    var b = [p, p, t, v, v, q][mod]
  
    return {
      r: Math.floor(r * RGB_MAX),
      g: Math.floor(g * RGB_MAX),
      b: Math.floor(b * RGB_MAX),
    }
  }
  
  function brightness(r, g, b) {
    val_1 = 0.299 * r * r;
    val_2 = 0.587 * g * g;
    val_3 = 0.114 * b * b;
  
    return Math.sqrt(val_1 + val_2 + val_3);
  }
  
  function RGBToHex(rgbColor) {
    r = Math.floor(rgbColor.r).toString(16);
    g = Math.floor(rgbColor.g).toString(16);
    b = Math.floor(rgbColor.b).toString(16);
  
    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
  
    return "#" + r + g + b;
  }

 function HEXtoRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
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
  
    return { r: r3, g: g3, b: b3 };
  }
  
  function rgb(r, g, b) {
    return ["rgb(", r, ",", g, ",", b, ")"].join("");
  }
  
  function hsv(h, s, v) {
    return "hsv(" + h + "," + s + "%," + v + "%)";
  }
  
  function ColorWheel(containerElement) {
    // Elements
    this.parentElement = document.getElementById(containerElement);
    this.colorGradient = this.parentElement.querySelector(".colorWheel");
    this.hueSlider = this.parentElement.querySelector(".hue_slider");
    this.saturationSlider = this.parentElement.querySelector(
      ".saturation_slider"
    );
    this.valueSlider = this.parentElement.querySelector(".value_slider");
    this.selectedColorDiv = this.parentElement.querySelector(".selected_color");
    this.hexDisplay = this.parentElement.querySelector(".hex_display");
  
    // Drawing
    this.context = this.colorGradient.getContext("2d");
    this.x = this.colorGradient.width / 2;
    this.y = this.colorGradient.height / 2;
    this.radius = 50;
  
    // State vars
    this.color = 'white';
    this.previewColor = 'white';
  
    this.drawCircle = function () {
      for (var angle = 0; angle <= 360; angle += 1) {
        var startAngle = ((angle - 2) * Math.PI) / 180;
        var endAngle = (angle * Math.PI) / 180;
        this.context.beginPath();
        this.context.arc(
          this.x,
          this.y,
          this.radius,
          startAngle,
          endAngle,
          false
        );
        this.context.lineWidth = this.radius;
        var saturation = this.saturationSlider.value;
        var value = this.valueSlider.value;
        this.context.strokeStyle = RGBToHex(HSVtoRGB(angle, saturation, value));
        this.context.stroke();
      }
    };
  
    this.drawColor = function (x, y) {
      var imgData = this.context.getImageData(x, y, 1, 1).data;
      rgbColor = {r: imgData[0], g: imgData[1], b: imgData[2]};
      if (rgbColor.r != 0 || rgbColor.g != 0 || rgbColor.b != 0) {
        this.previewColor = RGBToHex(rgbColor);
      } 
      this.context.fillStyle = this.previewColor;
      this.context.fillRect(0, 0, 50, 50);
    };
  
    // Events
  
    this.hueSlidverValueChange = function () {
      var newRGB = HSVtoRGB(this.hueSlider.value, this.saturationSlider.value, this.valueSlider.value);
      this.color = RGBToHex(newRGB);
      this.selectedColorDiv.style.backgroundColor = this.color;
      this.hexDisplay.value = this.color;
      this.drawCircle();
      if (this.colorChange) {
          this.colorChange(this.color);
      }
    };
  
    this.colorGradientMouseMoveEventListener = function (e) {
      var cRect = this.colorGradient.getBoundingClientRect(); // Gets CSS pos, and width/height
      var canvasX = Math.round(e.clientX - cRect.left); // Subtract the 'left' of the canvas
      var canvasY = Math.round(e.clientY - cRect.top); // from the X/Y positions to make
      this.context.clearRect(
        0,
        0,
        this.colorGradient.width,
        this.colorGradient.height
      );
      this.drawCircle();
  
      this.drawColor(canvasX, canvasY);
    };
  
    this.colorGradientClickEvent = function (e) {
      this.color = this.previewColor;
      var colorValues = HEXtoRGB(this.color);
      var hsvColor = RGBtoHSV(colorValues);
      this.hueSlider.value = hsvColor.h;
      this.saturationSlider.value = hsvColor.s;
      this.valueSlider.value = hsvColor.v;
      this.selectedColorDiv.style.backgroundColor = this.color;
      this.hexDisplay.value = this.color;
      if (this.colorChange) {
        this.colorChange(this.color);
      }
    };
  
    // Event Bindings
    this.colorGradient.addEventListener(
      "mousemove",
      this.colorGradientMouseMoveEventListener.bind(this)
    );
    this.colorGradient.addEventListener(
      "click",
      this.colorGradientClickEvent.bind(this)
    );
    this.hueSlider.addEventListener(
      "input",
      this.hueSlidverValueChange.bind(this)
    );
    this.saturationSlider.addEventListener("input", this.hueSlidverValueChange.bind(this));
    this.valueSlider.addEventListener("input", this.hueSlidverValueChange.bind(this));
  
    // Setup
  
    this.drawCircle();
    this.selectedColorDiv.style.backgroundColor = this.color;

    // Color Change Events

    this.colorChange = null;
  }
  