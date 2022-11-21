"use strict";
let bedsConstructror;

$(function () {
    bedsConstructror = function () {
        let self = this;

        self.canvas_toSave = $("#toSave")[0];
        self.ctx_toSave = self.canvas_toSave.getContext("2d");
        self.canvas_bg = $("#background-layer")[0];
        self.ctx_bg = self.canvas_bg.getContext("2d");
        self.canvas_b1 = $("#b1-layer")[0];
        self.ctx_b1 = self.canvas_b1.getContext("2d");
        self.canvas_b2 = $("#b2-layer")[0];
        self.ctx_b2 = self.canvas_b2.getContext("2d");
        // self.canvas_b3 = $("#b3-layer")[0];
        // self.ctx_b3 = self.canvas_b3.getContext("2d");

        self.b1_list = ["img/1.png", "img/2.png", "img/3.png", "img/4.png"];
        self.b2_list = ["img/11.png", "img/22.png", "img/33.png", "img/44.png"];

        self.bgImage = ko.observable();
        self.bgImage.subscribe(function(newValue) {
            self.ctx_bg.clearRect(0,0, self.canvas_bg.width, self.canvas_bg.height);
            self.ctx_bg.drawImage(newValue.img, 0, 0);
        });

        self.b1_listImages = ko.observableArray();

        self.b2_listImages = ko.observableArray();

        self.selected_b1 = ko.observable();
        self.selected_b1.subscribe(function(newValue) {
            self.ctx_b1.clearRect(0,0, self.canvas_b1.width, self.canvas_b1.height);
            self.ctx_b1.drawImage(newValue.img, 184, 10);
        });

        self.selected_b2 = ko.observable();
        self.selected_b2.subscribe(function(newValue) {
            self.ctx_b2.clearRect(0,0, self.canvas_b2.width, self.canvas_b2.height);
            self.ctx_b2.drawImage(newValue.img, 354, 331);
        });

        init();

         function init() {
             self.b1_listImages.subscribe(function(changes) {
                 if (changes[0].status === 'added' && changes[0].index === 0)
                 {
                     self.selected_b1(self.b1_listImages()[0]);
                 }
             }, null, "arrayChange");
             self.b2_listImages.subscribe(function(changes) {
                 if (changes[0].status === 'added' && changes[0].index === 0)
                 {
                     self.selected_b2(self.b2_listImages()[0]);
                 }
             }, null, "arrayChange");

             let tempBgImg = new Image();
             tempBgImg.src = "img/def.jpg";
             tempBgImg.onload = function() {
                 self.bgImage({img: tempBgImg, name: tempBgImg.src});
             }

             self.b1_list.forEach(el => {
                 let tempImg = new Image();
                 tempImg.src = el;

                 tempImg.onload = function() {
                     self.b1_listImages.push({img: tempImg, name: el});
                 }
             });

             self.b2_list.forEach(el => {
                 let tempImg = new Image();
                 tempImg.src = el;

                 tempImg.onload = function() {
                     self.b2_listImages.push({img: tempImg, name: el});
                 }
             });

             // self.selected_b1(self.b2_listImages[0]);
             // self.selected_b2(0);
        }

        self.selectB1 = function () {
            self.selected_b1(this);
        }
        self.selectB2 = function () {
            self.selected_b2(this);
        }

        self.save = function() {
            self.ctx_toSave.drawImage(self.bgImage().img, 0, 0);

            self.ctx_toSave.drawImage(self.selected_b1().img, 184, 10);
            self.ctx_toSave.drawImage(self.selected_b2().img, 354, 331);

            let imageData = self.canvas_toSave.toDataURL();
            let image = new Image();
            image.src = imageData;
            let link = document.createElement("a");

            link.setAttribute("href", image.src);
            link.setAttribute("download", "canvasImage");
            link.click();
        }
    }

    const element = $('.page-bed-constructor');
    let viewModel = new bedsConstructror();
    ko.applyBindings(viewModel, element.get(0));
});