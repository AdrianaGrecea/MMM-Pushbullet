Module.register("MMM-Pushbullet",{
    new_notification: false,
    // Default module config.
    defaults: {
        api_key: '',
        no_message_text: 'No new notifications',
        message_read_time: 5000,
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
/*
        // Create the table
        var notification_area = document.createElement("table");
        notification_area.className = "small normal";

        // Create the table header then append it to the table
        notification_header = document.createElement("th");
        notification_header.innerHTML = "Notifications";
        notification_area.appendChild(notification_header);

        // Create the table row and cell
        notification_row = document.createElement("tr");
        notification_area.appendChild(notification_row);

        notification_cell = document.createElement("td");
        notification_area.appendChild(notification_cell);
        notification_cell.innerHTML = this.title;

        // Set some defaults.  If we don't have any messages
        // then set the css accordingly
        if (this.title === this.config.no_message_text) {
            notification_cell.className = "dimmed";
        }else{
            notification_cell.className = "bright";
        }

        // Set the value of the notification area back to default after
        // this.config.message_read_time amount of time.
        if (this.title !== this.config.no_message_text) {
            setTimeout(function() {
                console.log('reset');
                notification_cell.innerHTML = this.config.no_message_text;
                notification_cell.className = "normal";
            }, this.config.message_read_time);
        }
*/
        var wrapper = document.createElement("div");
        var header = document.createElement("header");
        header.classList.add("align-left");

        var logo = document.createElement("i");
        logo.classList.add("fa", "fa-bell-o", "logo");
        header.appendChild(logo);

        var name = document.createElement("span");
        name.innerHTML = this.translate("NOTIFICATIONS");
        header.appendChild(name);
        wrapper.appendChild(header);

        var text = document.createElement("div");
        text.classList.add("dimmed", "light", "small");
        if (this.new_notification === false) {
            text.innerHTML = this.config.no_message_text;
            wrapper.appendChild(text);
         }else{
            text.innerHTML = this.title;
            wrapper.appendChild(text);
            setTimeout(function() {
                //this.new_notification = false;
                //this.updateDom(1000);
                text.innerHTML = this.config.no_message_text;
            }, this.config.message_read_time);
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
            this.title = payload
            this.new_notification = true;
            this.updateDom(1000);
        }
    },

});