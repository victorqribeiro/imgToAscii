# imgToAscii

A JavaScript implementation of a image to ascii converter.

## How to use

Include the imgToAscii.js file
```
<script src="src/imgToAscii.js"></script>
```
or
```
<script src="https://cdn.rawgit.com/victorqribeiro/imgToAscii/v1.1/src/imgToAscii.js"></script>

```
then just create a new imgToAscii object with the image address and optionaly the alphabet: (0 - simpler shades, 1 - more complex shades) - default is 0

```
<script>
let ele = new imgToAscii('elefante.png');
ele.display();
</script>
```

You can also resize your image passing a second parameter between 0 and 1 as percentage. e.g.: 0.5 = 50% - Will reduce the size of your image in 50% both vertical and horizontal (width, height).

```
<script>
let eu = new imgToAscii('eu.png',0.5);
eu.display();
</script>
```

To display the ASCII image with color just call the method displayColor(). You can set the background color of your image passing a color parameter to the method. e.g.: gray, white, black, #fff, rgb(10,10,10). Default is transparent.

```
<script>
let euColor = new imgToAscii('eu.png',0.5);
euColor.displayColor('gray');
</script>
```

## Important

The ascii art depends on a monospace font to work properly. You should consider that 1 pixel in your image is going to be translated to 1 char in Ascii. e.g.: if a image is 100 pixels wide, it's going to take 100 chars of space on your page, unless you do something about it.

The imgToAscii should work with remote images:
```
let img = new imgToAscii('http://site.com/image.png');
```
but it might not because of cross-origin settings. Keep that in mind.

----

A similar code is running on my [photoEditor](https://victorribeiro.com/photoEditor) to generate a image of the ascii code (what?!)

![result](img/ele.png)

![result](img/eu-ascii.png)

![result](img/eu-ascii-color.png)

[![Open Source Helpers](https://www.codetriage.com/victorqribeiro/imgtoascii/badges/users.svg)](https://www.codetriage.com/victorqribeiro/imgtoascii)
