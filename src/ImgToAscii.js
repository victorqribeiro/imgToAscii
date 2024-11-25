export default class ImgToAscii {

  static alphabet = {
    0: ["@", "%", "#", "*", "+", "=", "-", ":", ".", " "],
    1: [
      "$", "@", "B", "%", "8", "&", "W", "M", "#", "*", "o", "a", "h", "k",
      "b", "d", "p", "q", "w", "m", "Z", "O", "0", "Q", "L", "C", "J", "U",
      "Y", "X", "z", "c", "v", "u", "n", "x", "r", "j", "f", "t", "/", "\\",
      "|", "(", ")", "1", "{", "}", "[", "]", "?", "-", "_", "+", "~", "<",
      ">", "i", "!", "l", "I", ";", ":", ",", "\"", "^", "`", "'", ".", " "
    ]
  };

  constructor(image, size = 1, charType = 0) {
    this.size = size <= 0 || size > 1 ? 1 : size;
    this.charType = charType;
    this.string = "";
    this.stringColor = "";
    this.imageSrc = image;
    this.isBrowser = typeof window !== "undefined";
    this.loadImage = this.isBrowser
      ? this.loadImageBrowser()
      : this.loadImageNode();
  }

  loadImageBrowser() {
    return new Promise((resolve, reject) => {
      this.image = new Image();
      this.image.src = this.imageSrc;
      this.image.onload = () => {
        this.canvas = document.createElement("canvas");
        this.initCanvas(this.image);
        resolve();
      };
      this.image.onerror = reject;
    });
  }

  async loadImageNode() {
    const { createCanvas, loadImage } = await import("canvas");
    return new Promise(async (resolve, reject) => {
      try {
        this.image = await loadImage(this.imageSrc);
        this.canvas = createCanvas(
          this.image.width * this.size,
          this.image.height * this.size
        );
        this.initCanvas(this.image);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  initCanvas(image) {
    this.canvas.width = image.width * this.size;
    this.canvas.height = image.height * this.size;
    const c = this.canvas.getContext("2d");
    c.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
    const imageData = c.getImageData(0, 0, this.canvas.width, this.canvas.height);
    let grayStep = Math.ceil(255 / ImgToAscii.alphabet[this.charType].length);
    for (let i = 0; i < imageData.data.length; i += 4) {
      for (let j = 0; j < ImgToAscii.alphabet[this.charType].length; j++) {
        let r = imageData.data[i];
        let g = imageData.data[i + 1];
        let b = imageData.data[i + 2];
        if ((r * 0.2126) + (g * 0.7152) + (b * 0.0722) < (j + 1) * grayStep) {
          const char = ImgToAscii.alphabet[this.charType][j];
          this.string += char;
          this.stringColor += `<span style="color: rgb(${r},${g},${b});">${char.replace(" ", "&nbsp;")}</span>`;
          break;
        }
      }
      if (!((i / 4 + 1) % this.canvas.width)) {
        this.string += "\n";
        this.stringColor += "<br>";
      }
    }
  }

  getPreElement() {
    if (this.isBrowser) {
      const pre = document.createElement("pre");
      pre.style.fontFamily = "Courier, monospace";
      pre.style.lineHeight = "6px";
      pre.style.fontSize = "11px";
      pre.style.display = "inline-block";
      return pre;
    } else {
      return {
        textContent: "",
        style: {
          fontFamily: "Courier, monospace",
          lineHeight: "6px",
          fontSize: "11px",
          display: "inline-block"
        }
      };
    }
  }

  async display(appendToBody = true) {
    const pre = this.getPreElement();
    await this.loadImage;
    pre.textContent = this.string;
    if (this.isBrowser && appendToBody) {
      document.body.appendChild(pre);
    } else if (!this.isBrowser) {
      console.log(pre.textContent);
    }
    return pre.textContent;
  }

  async displayColor(bg) {
    if (this.isBrowser) {
      const pre = this.getPreElement();
      pre.style.backgroundColor = bg;
      await this.loadImage;
      pre.innerHTML = this.stringColor;
      document.body.appendChild(pre);
    } else {
      console.log("Colored ASCII art is not supported in Node.js terminal environments.");
    }
  }
}

