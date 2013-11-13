# Audio51, a no-nonsense solution for Audio in HTML5

--- Audio51 is copyrighted by SpilGames and can only be used by us and our HTML5 partners, which we have given explicit permission to use it, and only for the purpose of creating games for SpilGames. ---

### Get Started

1. Current implementation requires the use of an [AMD compatible][1] library. The most popular one (as far as I can tell) would be [requirejs][2]. So, until Audio51 has been refactored, this is a requirement.

2. A second requirement is RSVP, which has been packaged in `liblocal`. This is not a recent version and does not need AMD. Simply include the `liblocal/rsvp.js`.

3. All you need to play audio-clips at this point is to require `audio51` (as defined in audio51.js). All other requirements are then pulled in. In code it would look something like this:
```
require(["audio51"], function(audio51) {
	audio51.loadSoundSet('sounds.json');
	audio51.play("thunder");
});
```

4. To create a 'sound set' this library makes use of a format generated by [audiosprite][3], which is an node-based tool. It is recommended to install `audiosprite` and then, from your project directory run the following command to generate a sound set: `audiosprite -p mp3,ogg,ac3 -o [destination] -e mp3,ogg,ac3 -c 2 [comma-separated list of sounds]`.

The above example is verry simplistic and will not work on mobile because unfortunately on mobile the audio needs to be 'unlocked' by user-interaction before it can be used. The audio51 code handles this transparently by simply unlocking your audio at the first user-interaction. However, depending on the audio-support available on the target device, playing audio before this has happend may lock your audio into silence.

The `unrestrict` module can be used to detect when the unlocking is executed, allowing you carefull control over your scripts. Simply create a listener using:
```
require(["unrestrict"], function(unrestrict) {
	unrestrict.on("userInteraction", function() {
		//place your code here...
	});
});
```

This document is intended to be an up to date affair, so check back often to see if any improvements to the library have made it even easier to use!

### Unit testing

Currently there are still some bugs in the WebAudio API implmentation. Some of these came up while attempting to create an easy to use unit-testing environment. Most notably:

1. Safari failed to fire `canPlay` event if the first audio would be generated by an AudioTag node.
2. After generating sound through an Oscillator Source, after stopping and disconnecting the Oscillator, the analyzer node registers a volume of up to 100, while it should be 0.

The first of these should be taken into account when testing AudioTag implementations and they fail only in Safari. The second can easily be prevented in our current API, we only intend to support playing sound from files...

[1]: https://github.com/amdjs/amdjs-api/wiki/AMD
[2]: http://requirejs.org/
[3]: https://github.com/tonistiigi/audiosprite