Module.register("MMM-Pushbullet",{
    new_notification: false,
    // Default module config.
    defaults: {
        api_key: '',
        no_message_text: 'No new notifications',
        message_read_time: 30000,
        message_length: 10,
        show_message_body: true,
    },

   start: function() {
        self = this;
        Log.info('Starting module: ' + this.name);
        this.sendSocketNotification('Starting node_helper');
        this.sendSocketNotification('INIT', this.config.api_key);
        this.title = this.config.no_message_text;
        setTimeout(function() {
            self.updateDom();
        }, 1000);
    },

    // Override dom generator.
    getDom: function(){
        no_message_text = this.config.no_message_text;

        var wrapper = document.createElement("div");
        var header = document.createElement("header");
        header.classList.add("align-left");

        var logo = document.createElement("i");
        logo.classList.add("fa", "fa-bell-o", "logo");
        header.appendChild(logo);

        var banner = document.createElement("span");
        banner.innerHTML = this.translate("NOTIFICATIONS");
        header.appendChild(banner);
        wrapper.appendChild(header);

        var message_from = document.createElement("div");
        message_from.classList.add("dimmed", "light", "small");

        if (this.new_notification === false) {
            message_from.innerHTML = this.config.no_message_text;
            wrapper.appendChild(message_from);
         }else{
            message_from.classList.add("bright");
            message_from.innerHTML = this.payload.title;
            wrapper.appendChild(message_from);

            // Show the body if we set it to true
            if (this.config.show_message_body === true) {
                var i = this.payload.message;
                var message_body_wrapper = document.createElement("div");
                message_body_wrapper.setAttribute("id", "message_body_wrapper");
                var message_body;
                var regexp = /\d+ new messages/gi;
                i.split('\n').forEach(function(j) {
                    // If an element matches the string 'new messages' then skip it.
                    if (! j.match(regexp)) {
                        message_body = document.createElement("div");
                        message_body.classList.add("dimmed", "light", "xsmall", "address" );
                        message_body.innerHTML = j;
                        message_body_wrapper.appendChild(message_body);
                    }
                });
                wrapper.appendChild(message_body_wrapper);
            }

            // Remove notifications after n milliseconds if option is non-zero
            if (this.config.message_read_time !== 0) {
                that = this;
                setTimeout(function() {
                    message_from.classList.remove("bright");
                    message_from.innerHTML = no_message_text;
                    if (that.config.show_message_body === true) {
                        var element = document.getElementById("message_body_wrapper");
                        if (element !== null) {
                            element.parentNode.removeChild(element);
                        }
                    }
                }, this.config.message_read_time);
             }
         }

        //return notification_area;
        return wrapper;
    },

    // Define required scripts.
    getStyles: function() {
        return ["MMM-Pushbullet.css", "font-awesome.css"];
    },

    getTranslations: function () {
        return {
            en: "translations/en.json",
        };
    },

    // Socket reponse
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'PUSH') {
            console.log('Recieved push notification.');
            this.payload = payload
            this.new_notification = true;
            this.updateDom(1000);
        }
    },

});