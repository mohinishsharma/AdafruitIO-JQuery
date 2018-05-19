function msAdafruitIO(aIO_USERNAME,aIO_KEY) {
    this.API_V = "v2";
    this.AIO_USERNAME = aIO_USERNAME;
    this.AIO_KEY = aIO_KEY;
    this.sub_feed = [];
    this.AIO_content_type = "application/json";
    this.API_URL = "https://io.adafruit.com/api/"+ this.API_V +"/"+ this.AIO_USERNAME;
    this.get_API_version = function () {return this.API_V};
    this.get_Username = function () {return this.AIO_USERNAME};
    this.feed_monitored_now = function() {return this.sub_feed};
    this.monitor_feed = function(feed_key){
        if(feed_key == "#")
        {
            throw "Cannot monitor all feed at once";
            return null;
        }
        msAIOClient.subscribe(this.AIO_USERNAME+"/feeds/"+feed_key);
        this.sub_feed.push(feed_key);
        return "Monitoring feed ("+feed_key+")";
    }

    this.stop_monitor_feed = function(feed_key = "#"){
        if(feed_key == "#")
        {
            this.sub_feed.forEach(element => {
                msAIOClient.unsubscribe(this.AIO_USERNAME+"/feeds/"+element);
                this.sub_feed.splice($.inArray(element, this.sub_feed),1);
            });
            return "Not Monitoring anything";
        }
        msAIOClient.unsubscribe(this.AIO_USERNAME+"/feeds/"+feed_key);
        this.sub_feed.splice($.inArray(feed_key, this.sub_feed),1);
        return "Not Monitoring feed ("+feed_key+")";
    }


    this.msaio_connect = function (handlers = {"onConnectionLost":onConnectionLost,"onMessageArrived":onMessageArrived,"onConnect":onConnect}) {
        var location = {
            hostname:"io.adafruit.com",
            port: 443
        }
        msAIOClient = new Paho.MQTT.Client(location.hostname, Number(location.port), "msAdafruitIO_"+ Math.random().toString);
         // set callback handlers
         msAIOClient.onConnectionLost = (handlers.onConnectionLost == null)?this.AIO_conc_lost:handlers.onConnectionLost;
         msAIOClient.onMessageArrived = (handlers.onMessageArrived == null)?this.AIO_feed_note:handlers.onMessageArrived;
         
         msAIOClient.connect({
             onSuccess:(handlers.onConnect == null)?this.AIO_onConnect:handlers.onConnect,
            userName:this.AIO_USERNAME,
            password:this.AIO_KEY
        });
    };


    this.msaio_disconnect = function(){
        msAIOClient.disconnect();
    }


    this.get_user_info = function(callback = this.AIO_def_callback){
        var feedreq = new XMLHttpRequest();
        feedreq.onreadystatechange = function() {
            var data
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.responseText);
                callback(data);
            } else if(this.readyState == 4 && this.status == 404)
            {
                data = null;
                callback(data);
            };
        };
        feedreq.open("GET", "https://io.adafruit.com/api/"+this.API_V+"/user", true);
        feedreq.setRequestHeader("X-AIO-Key", this.AIO_KEY);
        feedreq.setRequestHeader("content-type", this.AIO_content_type);
        feedreq.send();
    }
    this.get_feed = function (feed_key = null,callback = this.AIO_def_callback) {
        var feedreq = new XMLHttpRequest();
        feedreq.onreadystatechange = function() {
            var data
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.responseText);
                callback(data);
            } else if(this.readyState == 4 && this.status == 404)
            {
                data = null;
                callback(data);
            }
        };
        var feed_key =  (feed_key != null)?("/"+feed_key):"";
        feedreq.open("GET", this.API_URL+"/feeds"+ feed_key, true);
        feedreq.setRequestHeader("X-AIO-Key", this.AIO_KEY);
        feedreq.setRequestHeader("content-type", this.AIO_content_type);
        feedreq.send();
    }

    this.create_feed = function (feed_name,feed_key,feed_description,callback = this.AIO_def_callback) {
        var body = JSON.stringify({"name":feed_name,"key":feed_key,"description":feed_description ,"license":"msAdafruitIO_"+ Math.random()});
        var feedreq = new XMLHttpRequest();
        feedreq.onreadystatechange = function() {
            var data
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.responseText);
                callback(data);
            } else if(this.readyState == 4 && this.status == 404)
            {
                data = null;
                callback(data);
            }
        };
        feedreq.open("POST", this.API_URL+"/feeds", true);
        feedreq.setRequestHeader("X-AIO-Key", this.AIO_KEY);
        feedreq.setRequestHeader("content-type", this.AIO_content_type);
        feedreq.send(body);
    }

    this.replace_feed = function (replace_key,feed_name,feed_key,feed_description,callback = this.AIO_def_callback) {
        var body = JSON.stringify({"name":feed_name,"key":feed_key,"description":feed_description ,"license":"msAdafruitIO_"+ Math.random()});
        var feedreq = new XMLHttpRequest();
        feedreq.onreadystatechange = function() {
            var data;
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.responseText);
                callback(data);
            } else if(this.readyState == 4 && this.status == 404)
            {
                data = null;
                callback(data);
            }
        };
        var replace_key =  (replace_key != null)?("/"+replace_key):"";
        feedreq.open("PUT", this.API_URL+"/feeds"+replace_key, true);
        feedreq.setRequestHeader("X-AIO-Key", this.AIO_KEY);
        feedreq.setRequestHeader("content-type", this.AIO_content_type);
        feedreq.send(body);
    }

    this.delete_feed = function (feed_key,callback = this.AIO_def_callback) {
        var feedreq = new XMLHttpRequest();
        feedreq.onreadystatechange = function() {
            var data;
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.responseText);
                callback(data);
            } else if(this.readyState == 4 && this.status == 404)
            {
                data = null;
                callback(data);
            }
        };
        feedreq.open("DELETE", this.API_URL+"/feeds/"+ feed_key, true);
        feedreq.setRequestHeader("X-AIO-Key", this.AIO_KEY);
        feedreq.setRequestHeader("content-type", this.AIO_content_type);
        feedreq.send();
    }

    this.get_feed_data = function (feed_key,session = null,callback = this.AIO_def_callback) {
        var feedreq = new XMLHttpRequest();
        feedreq.onreadystatechange = function() {
            var data;
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.responseText);
                callback(data);
            } else if(this.readyState == 4 && this.status == 404)
            {
                data = null;
                callback(data);
            }
        };
        var session =  (session != null)?("/"+session):"";
        feedreq.open("GET", this.API_URL+"/feeds/"+ feed_key+"/data" + session, true);
        feedreq.setRequestHeader("X-AIO-Key", this.AIO_KEY);
        feedreq.setRequestHeader("content-type", this.AIO_content_type);
        feedreq.send();
    }

    this.send_feed_data = function (feed_key,options={"value":value,"created_at":created_at,"lat": lat =null,"lon": lon=null,"ele": ele=null,"epoch": epoch=0},callback = this.AIO_def_callback) {
        var feedreq = new XMLHttpRequest();
        feedreq.onreadystatechange = function() {
            var data;
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.responseText);
                callback(data);
                
            } else if(this.readyState == 4 && this.status == 404)
            {
                data = null;
                callback(data);
            }

            
        };
        feedreq.open("POST", this.API_URL+"/feeds/"+ feed_key+"/data", true);
        feedreq.setRequestHeader("X-AIO-Key", this.AIO_KEY);
        feedreq.setRequestHeader("content-type", this.AIO_content_type);
        feedreq.send(JSON.stringify(options));
    }

    this.AIO_def_callback = function(data){console.log(data); return JSON.stringify(data);}
    this.AIO_onConnect = function(){console.log("Connected")};

    this.AIO_conc_lost = function(responseObject){
        if (responseObject.errorCode !== 0) 
            {
            console.log("onConnectionLost:"+responseObject.errorMessage);
            }
    };

    this.AIO_feed_note = function(message){
        var feed = message.destinationName.split("/")[2];
        var value = message.payloadString;
        console.log({"feed_key":feed,"value":value});
    }
}