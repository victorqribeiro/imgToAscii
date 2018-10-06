/*
Copyright (c) 2018 Victor Ribeiro - victorqribeiro@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

https://github.com/victorqribeiro/imgToAscii

*/

class imgToAscii {
	constructor(image,size,charType){
		this.size = ( size <= 0 || size > 1 ? 1 : size) || 1;
		this.charType = charType || 0;
		this.alphabet = {
			0: ["@","%","#","*","+","=","-",":","."," "],
			1: ["$","@","B","%","8","&","W","M","#","*","o","a","h","k","b","d","p","q","w","m","Z","O",
					"0","Q","L","C","J","U","Y","X","z","c","v","u","n","x","r","j","f","t","/","\\","|","(",
					")","1","{","}","[","]","?","-","_","+","~","\<","\>","i","!","l","I",";",":",",","\"","^",
					"`","'","."," "]
		}
		this.string = "";
		this.stringColor = "";
		this.canvas;
		this.context;
		this.imageData;
		this.grayPixels;
		this.image;
		this.imageSrc = image;
	}
	
	async loadImage(){
		return new Promise( resolve =>{
			this.image = new Image();
			this.image.src = this.imageSrc;
			this.image.onload = ()=> resolve()
		})
	}
	
	async loadPixels(){
		return new Promise( resolve => {
			this.canvas = document.createElement('canvas');
			this.canvas.width = this.image.width * this.size;
			this.canvas.height = this.image.height * this.size;
			this.context = this.canvas.getContext('2d');
			this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
			this.imageData = this.context.getImageData(0,0,this.canvas.width,this.canvas.height);
			this.grayPixels = new Uint8Array(this.canvas.width * this.canvas.height);
			for(let i = 0, j = 0; i < this.imageData.data.length; i+=4,j++){
				this.grayPixels[j] = (this.imageData.data[i] * 0.2126) + 
														 (this.imageData.data[i+1] * 0.7152) + 
														 (this.imageData.data[i+2] * 0.0722);
			}
			resolve();
		})
	}
	
	async display(){
		let pre = document.createElement('pre');
		pre.style.fontFamily = "Courier, monospace";
		pre.style.lineHeight = "6px";
		pre.style.fontSize = "11px";
		pre.style.color = "#000";
		document.body.appendChild(pre);
		if( !this.image )
			await this.loadImage();
		if( !this.grayPixels )
			await this.loadPixels();
		let grayStep = Math.ceil( 255 / this.alphabet[this.charType].length );
		for(let i = 0; i < this.grayPixels.length; i++){
			for(let j = 0; j < this.alphabet[this.charType].length; j++){
				if( this.grayPixels[i] < (j*grayStep)+grayStep ){
					this.string += this.alphabet[this.charType][j];
					break;
				}
			}
			if( !((i+1) % this.canvas.width) ){
				this.string += "\n";
			}
		}
		pre.innerText = this.string;
	}
	
	async displayColor(bg){
		bg = bg || 'transparent';
		let pre = document.createElement('pre');
		pre.style.fontFamily = "Courier, monospace";
		pre.style.lineHeight = "6px";
		pre.style.fontSize = "11px";
		document.body.appendChild(pre);
		if( !this.image )
			await this.loadImage();
		if( !this.grayPixels )
			await this.loadPixels();
		let grayStep = Math.ceil( 255 / this.alphabet[this.charType].length );
		for(let i = 0, c = 0; i < this.grayPixels.length; i++, c+=4){
			for(let j = 0; j < this.alphabet[this.charType].length; j++){
				if( this.grayPixels[i] < (j*grayStep)+grayStep ){
					let r = this.imageData.data[c];
					let g = this.imageData.data[c+1];
					let b = this.imageData.data[c+2];
					this.stringColor += "<span style=\"background-color: "+bg+"; color: rgb("+r+","+g+","+b+"); \">" 
													 +this.alphabet[this.charType][j]
													 +"</span>";
					break;
				}
			}
			if( !((i+1) % this.canvas.width) ){
				this.stringColor += "<br>";
			}
		}
		pre.innerHTML = this.stringColor;
	}

}
