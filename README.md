# AdafruitIO-JQuery
Seamlessly integrate AdafruitIO into your own Web Apps OR Website by using JQuery.

# Demo
https://msadafruitio.000webhostapp.com/

# Documentation

<div class="row mb-3">

<div class="col-md-12 mb-3">

#### Initialization

`msAdafruitIO(AIO_username,AIO_key)` is the function which constructs msAdafruitIO class.

*   `AIO_username` : Enter your username
*   `AIO_key` : Enter your AIO secret key

Make sure to create new class before calling any library function

</div>

<div class="col-md-12 mb-3">

#### Connection to Cloud

`msaio_connect(handlers)` is the function which connects to the AdafruitIOs Cloud.

`handlers:` is the object which take the name of the callback function.

*   `onConnect` : Event is triggered when connection is successfully established.
*   `onMessageArrived` : Event is triggered when messgae from any feed is arrived.
*   `onConnectionLost` : Event is triggered when connection is lost with cloud.

Make sure to call this function before calling any library function

</div>

<div class="col-md-12">

#### Functions available

`msaio_connect(handlers)` is the function which connects to the AdafruitIOs Cloud.

Make sure to call `msaio_connect(handlers)` function before calling any of these library function

*   `get_API_version()` : Returns API verison of AdafruitIO.
*   `get_Username()` : Get current users username.
*   `feed_monitored_now()` : Get this list of current feed you are monitoring.
    *   Returns
        *   array of **feed key**.
*   `monitor_feed(feed_key)` : Set feed in monitoring mode.
    *   Parameters
        *   `feed_key` is the key you want to monitor
        *   **NOTE** : No wildcard allowed.
*   `stop_monitor_feed(feed_key)` : Set feed in monitoring mode.
    *   Parameters
        *   `feed_key` is the key you want to monitor
        *   leave empty to stop monitoring all the feed.
*   `msaio_disconnect()` to disconnect from the AdafruitIOs server.
*   `get_user_info(callback)` this function returns information related to current username.
    *   Parameters
        *   `callback [OPTIONAL]` is the callback function which is called if the request has completed.
    *   Returns
        *   `JSON Object` it returns JSON object containing user information.
*   `get_feed(feed_key, callback)` this returns feed information.
    *   Parameters
        *   `feed_key [OPTIONAL]` is the feed key for which the information if to be retrived.
            *   **NOTE** : Pass `null` if want to retrive all the feed information.
        *   `callback [OPTIONAL]` is the callback function which is called if the request has completed.
    *   Returns
        *   `JSON Object` it returns JSON object containing feed information.
*   `create_feed(feed_name,feed_key,feed_description,callback)` this will create feed and call the callback function.
    *   Parameters
        *   `feed_name` sets feed name.
        *   `feed_key` sets feed key.
        *   `feed_description` sets feed description.
        *   `callback [OPTIONAL]` is the callback function which is called if the request has completed.
    *   Returns
        *   `JSON Object` it returns JSON object containing feed information.
*   `replace_feed(replace_key,feed_name,feed_key,feed_description,callback)` this will replace feed and calls the callback function.
    *   Parameters
        *   `replace_key` key of the feed to be replaced.
        *   `feed_name` sets feed name.
        *   `feed_key` sets feed key.
        *   `feed_description` sets feed description.
        *   `callback [OPTIONAL]` is the callback function which is called if the request has completed.
    *   Returns
        *   `JSON Object` it returns JSON object containing feed information.
*   `delete_feed(feed_key,callback)` this will delete feed and call the callback function.
    *   Parameters
        *   `feed_key` sets feed key to delete.
        *   `callback [OPTIONAL]` is the callback function which is called if the request has completed.
    *   Returns
        *   `JSON Object` it returns JSON object containing feed information.
*   `get_feed_data(feed_key,session,callback)` this will get feed and call the callback function.
    *   Parameters
        *   `feed_key` sets feed key.
        *   `session` its data to be retrived. it takes string and following param
            *   `null` pass null to retrive history for the `feed_key`
            *   `"previous"` Get the previously processed data point in the feed.
            *   `"next"` Get the next newest data point in the feed.
            *   `"last"` Get the most recent data point in the feed.
            *   `"first"` Get the oldest data point in the feed.
            *   `"retain"` Get the most recent data point in the feed in an MQTT compatible CSV format: `value,lat,lon,ele`
            *   `"{data_id}"` Get data by {data_id}.
        *   `callback [OPTIONAL]` is the callback function which is called if the request has completed.
    *   Returns
        *   `JSON Object` it returns JSON object containing feed information.
*   `send_feed_data(feed_key,options,callback)` this will get feed and call the callback function.
    *   Parameters
        *   `feed_key` sets feed key.
        *   `options` its the object containing data to be sent. It has following property.
            *   `"value"` value to be sent
            *   `"created_at"` timestamp
            *   `"lat" [OPTIONAL]` Sets the latitude.
            *   `"lon" [OPTIONAL]` Sets the longitude.
        *   `callback [OPTIONAL]` is the callback function which is called if the request has completed.
    *   Returns
        *   `JSON Object` it returns JSON object containing feed information.

</div>

</div>

All the documentation is provided on the site https://msadafruitio.000webhostapp.com/documentation.html
