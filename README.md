# MMM-Pushbullet
> This is an extension to the [MagicMirror](https://github.com/MichMich/MagicMirror) project.  Connect to a Pushbullet stream to display notifications.

## Installation
Run these commands at the root of your magic mirror install.

```shell
cd modules
git clone https://github.com/mjtice/MMM-Pushbullet
cd MMM-Pushbullet
npm install
```

## Using the module
To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
{
    module: 'MMM-Pushbullet',
    config: {
        // See below for configurable options
    }
}
```

### Configuration options
#### api_key
Type: `String` Default value: `''`

API key from Pushbullet.
#### message_read_time
Type: `Integer` Default value: `5000`

Time in ms that notifications are displayed.
