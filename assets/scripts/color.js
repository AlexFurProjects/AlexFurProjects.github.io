const RGB_MAX = 255
const HUE_MAX = 360
const SV_MAX = 100
  
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
  this.color = tinycolor('#ff00ff');
  this.previewColor = tinycolor('#ff00ff');

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
      this.context.strokeStyle = tinycolor({h: angle, s: saturation, v: value}).toHexString();
      this.context.stroke();
    }
  };

  this.drawColor = function (x, y) {
    var imgData = this.context.getImageData(x, y, 1, 1).data;
    rgbColor = {r: imgData[0], g: imgData[1], b: imgData[2]};
    if (rgbColor.r != 0 || rgbColor.g != 0 || rgbColor.b != 0) {
      this.previewColor = tinycolor(rgbColor);
    } 
    this.context.fillStyle = this.previewColor;
    this.context.fillRect(0, 0, 50, 50);
  };

  // Events

  this.hexDisplayChange = function() {
    var hex = this.hexDisplay.value;
    var regex = "#[0-9a-fA-F]{6}";
    var found = hex.match(regex);
    if (found && found.length > 0) {
      this.color = tinycolor(found[0]);
      this.updateDisplay();
    }
  }

  this.hueSlidverValueChange = function () {
    this.color = tinycolor({h: this.hueSlider.value, s: this.saturationSlider.value, v: this.valueSlider.value});;
    this.selectedColorDiv.style.backgroundColor = this.color;
    this.hexDisplay.value = this.color.toHexString();
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
    console.log(this.previewColor);
    this.updateDisplay();
    if (this.colorChange) {
      this.colorChange(this.color);
    }
  };

  this.updateDisplay = function() {
    var hsvColor = this.color.toHsv();
    this.hueSlider.value = hsvColor.h;
    this.saturationSlider.value = hsvColor.s * 100;
    this.valueSlider.value = hsvColor.v * 100;
    this.selectedColorDiv.style.backgroundColor = this.color;
    this.hexDisplay.value = this.color.toHexString();
    if (this.colorChange) {
      this.colorChange(this.color);
    }
  }

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
  this.hexDisplay.addEventListener("input", this.hexDisplayChange.bind(this));

  // Setup

  this.drawCircle();
  this.selectedColorDiv.style.backgroundColor = this.color;
  this.updateDisplay();

  // Color Change Events

  this.colorChange = null;
}
  