# imgToAscii

A JavaScript implementation of a image to ascii converter.

## How to use

Include the imgToAscii.js file
```
<script src="src/imgToAscii.js"></script>
```
then just create a new imgToAscii object with the image address and optionaly the alphabet: (0 - simpler shades, 1 - more complex shades) - default is 0

```
<script>
let ele = new imgToAscii('elefante.png');
ele.display();
</script>
```
----

A similar code is running on my [photoEditor](https://victorribeiro.com/photoEditor) to generate a image of the ascii code (what?!)

![result](ele.png)

![result](eu-ascii.png)
