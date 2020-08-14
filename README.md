# imgToAscii

A JavaScript implementation of a image to ascii converter.

[Live example](https://victorqribeiro.github.io/imgToAscii/)

## How to use

Include the imgToAscii.js file
```html
<script src="src/imgToAscii.js"></script>
```
or
```html
<script src="https://raw.githubusercontent.com/victorqribeiro/imgToAscii/v1.3/src/imgToAscii.js"></script>

```
then just create a new imgToAscii object with the image address and optionaly the alphabet: (0 - simpler shades, 1 - more complex shades) - default is 0

```javascript
let ele = new imgToAscii('elefante.png');
ele.display();
```

You can also resize your image passing a second parameter between 0 and 1 as percentage. e.g.: 0.5 = 50% - Will reduce the size of your image in 50% both vertical and horizontal (width, height).

```javascript
let eu = new imgToAscii('eu.png',0.5);
eu.display();
```

To display the ASCII image with color just call the method displayColor(). You can set the background color of your image passing a color parameter to the method. e.g.: gray, white, black, #fff, rgb(10,10,10). Default is transparent.

```javascript
eu.displayColor('gray');
```

Note that on the code above the same 'eu' image was used. Once you load an image, you can display it with or without color, without the need to reload the image data.

## Important

The ascii art depends on a monospace font to work properly. You should consider that 1 pixel in your image is going to be translated to 1 char in Ascii. e.g.: if a image is 100 pixels wide, it's going to take 100 chars of space on your page, unless you do something about it.

The imgToAscii should work with remote images:
```javascript
let img = new imgToAscii('http://site.com/image.png');
```
but it might not because of cross-origin settings. Keep that in mind.

----

A similar code is running on my [photoEditor](https://victorribeiro.com/photoEditor) to generate a image of the ascii code (what?!)

![result](img/ele.png)

![result](img/eu-ascii.png)

![result](img/eu-ascii-color.png)

[![Open Source Helpers](https://www.codetriage.com/victorqribeiro/imgtoascii/badges/users.svg)](https://www.codetriage.com/victorqribeiro/imgtoascii)

[![Donations](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=victorqribeiro%40gmail%2ecom&lc=BR&item_name=Victor%20Ribeiro&item_number=donation&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted)
