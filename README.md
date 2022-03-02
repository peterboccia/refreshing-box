# The refreshing-box widget
A simple jquery UI widget to create a switch to enable a polling process. It's designed to work inside **bootstrap** base styles (where it' best use is inside a container div) but also as a simple HTML table. The style can be changed with a parameter in the option.
The refreshing-box is used to create a pretty switch to start or stop the call to a periodic function, that we can decide at startup.
The technology behind this widget is a simple JS Interval.

## For what we have created?
This little plugin was created to have a user friendly interface to let the user start or stop periodic/automatic function inside the page.
For instance: we need to refresh a grid periodically and we won't to bring inside our project a p2p new fashionable library (that it can be the best nowadays :laughing:) we choose a quick polling using the refreshing box, binding on the **onRefresh** function our async call to refresh the grid.


# Use
Using the widget is simple.
The first thing is to arrange a container div

```HTML
<div class="container refreshing-box"></div>
```
Then we bind the widget:

```javascript
$('.refreshing-box').refreshingBox({
  description: 'Update automatically',
  delay: 3000,
  onRefresh: function() {
    console.log('refresh function!');
  }
});
```

And we should have this result :thumbsup:  

![Rendering of refreshingBox](https://raw.githubusercontent.com/peterboccia/refreshing-box/master/docs/refreshingBox_simple.png)  

And here a [simple demo](https://peterboccia.github.io/refreshing-box/).

# Default Options
There are some option that can personalize the behaviour:

| Option | Type | Default value | Description |
| --- | --- | --- | --- |
| `checked` | boolean | **true** | Defines if the switch is on or off (in other words if the hidden checkbox is checked or not). **Remember that if true, the `onStart` function will be called and the time interval will start immediately.** |
| `interval` | int | **3000** | This parameter marks after how many milliseconds must be called the onRefresh function after the Interval start. |
| `inputName` | string | *empty* | This parameter is aimed to give to the hidden checkbox input the `name` parameter. |
| `inputId` | string | *random_refreshing-box* | This parameter is aimed to give to the hidden checkbox input the `id` parameter. |
| `table` | boolean | **false** | With this parameter to `true` the widget will be created using a table with a responsive layout. If it set to `false` it will be created using div with bootstrap classes to keep a responsive layout. |
| `onRefresh` | function() | *empty* | This function is called every time the internal timer tick. |
| `onStart` | function() | *empty* | This function is called when the switch get turned on (when the input was checked). |
| `onRefresh` | function() | *empty* | This function is called when the switch get turned disabled (when the input was unchecked). |


# Changing Styles
The styles of the plugin is based on bootstrap and is responsive. The styles canbe changed to a tabular one, that can be used inside any framework.
