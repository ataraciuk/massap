/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        $('#go').click(function(e){
            e.preventDefault();
            var vibrateT = parseInt($('#vibrateT').val(),10) * 1000;
            var waitT = parseInt($('#waitT').val(),10) * 1000;
            if(vibrateT > 0 && waitT > 0) {
                app.vibrateInterval = setInterval(function(){
                    navigator.notification.vibrate(vibrateT);
                }, vibrateT + waitT);
                var wakeT = parseInt($("#restT").val(),10) * 60000;
                app.remaining = wakeT;
                if(wakeT > 0) app.wakeTimeout = setTimeout(app.reset, wakeT);
                $(".remainingMsg").toggle(wakeT > 0);
                var intTime = 10000;
                app.setInfo();
                app.wakeInterval = setInterval(function(){
                    app.remaining -= intTime;
                    app.setInfo();
                }, intTime);
                $('.menu, .onMassage').toggle();
            }
            else {
                if(vibrateT <= 0 || isNaN(vibrateT)) $('#vibrateT').addClass('error');
                if(waitT <= 0 || isNaN(waitT)) $('#waitT').addClass('error');
            }
        });
        $('#stop').click(function(e){
            e.preventDefault();
            app.reset();
        })
        $('input[type="text"]').focus(function(e){
            $(this).removeClass('error');
        });
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },
    reset: function() {
        console.log('reset');
        window.clearInterval(app.vibrateInterval);
        window.clearTimeout(app.wakeTimeout);
        window.clearInterval(app.wakeInterval);
        app.vibrateInterval = null;
        app.wakeTimeout = null;
        app.wakeInterval = null;
        remaining = null;
        $('.menu, .onMassage').toggle();
    },
    setInfo: function() {
        $('#minRemaining').html(Math.floor(app.remaining / 60000));
        $(".currentDate").html(new Date());
    },
    vibrateInterval: null,
    wakeTimeout: null,
    wakeInterval: null,
    remaining: null
};
