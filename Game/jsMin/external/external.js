var FaUtils = {
    createInputPlaceholder: function (c, b, a) {
        if ($("#" + c).val() == "" || $("#" + c).val() == b) {
            $("#" + c).val(b);
            $("#" + c).addClass("placeholder");
            if (a) {
                $("#" + c).attr("type", "text")
            }
        }
        $("#" + c).on("focus", function (d) {
            var e = $(d.target);
            if (e.hasClass("placeholder")) {
                e.val("");
                e.removeClass("placeholder");
                if (a) {
                    $("#" + c).attr("type", "password")
                }
            }
        });
        $("#" + c).on("blur", function (d) {
            var e = $(d.target);
            if (e.val() == "") {
                e.val(b);
                e.addClass("placeholder");
                if (a) {
                    $("#" + c).attr("type", "text")
                }
            }
        })
    },
    createDropdown: function (b, a) {
        $("#" + a).addClass("hidden");
        $("#" + b).on("click", function (c) {
            $("#" + a).toggleClass("hidden")
        })
    }
};
var FaExternalHome = {
    placeholderSupported: false,
    translations: new Object(),
    preload: new Array(),
    artworks: new Array(),
    artworksCount: 0,
    screenshots: new Array(),
    screenshotsCount: 0,
    videos: new Array(),
    videosCount: 0,
    player: null,
    wallpaper: new Array(),
    wallpaperCount: 0,
    homeScreenshotsInitialized: false,
    homeScreenshotsCurrent: 0,
    mediaVideosInitialized: false,
    mediaVideosCurrent: 0,
    mediaScreenshotsInitialized: false,
    mediaScreenshotsCurrent: 0,
    mediaArtworksInitialized: false,
    mediaArtworksCurrent: 0,
    mediaWallpaperInitialized: false,
    mediaWallpaperCurrent: 0,
    tourInitialized: false,
    tourCount: 0,
    tourCurrent: 0,
    layerScreenshotsInitialized: false,
    layerScreenshotsCurrent: 0,
    layerArtworksInitialized: false,
    layerArtworksCurrent: 0,
    layerVideoInitialized: false,
    layerSupportInitialized: false,
    layerCancelationInitialized: false,
    layerAccountCenterInitialized: false,
    otherLayerCloser: false,
    init: function () {
        this.initAnimations();
        this.initLanguageSwitch();
        this.checkPlaceholderSupport();
        this.initPlaceholders();
        this.fixContentPosition();
        this.initNavButtons();
        this.fixInstPlayPosition();
        this.initHomeScreenshots();
        this.setValidation()
    },
    setValidation: function () {
        $("#bgc_signup_container form").on("submit", function (a) {
            $("#bgc_signup_form_password").focus();
            $("#bgc_signup_form_username").focus()
        });
        $(".bgcdw_login_container_form form").on("submit", function (a) {
            $("#bgcdw_login_form_username").toggleClass("bgcdw_errors");
            $("#bgcdw_login_form_username").toggleClass("bgcdw_errors")
        })
    },
    preloadImages: function () {
        for (i in this.preload) {
            var b = this.preload[i];
            var a = new Image();
            a.src = b
        }
    },
    stopFlashObject: function (b) {
        try {
            window[b].StopPlay();
            return true
        } catch (a) {}
        try {
            document.getElementById(b).StopPlay();
            return true
        } catch (a) {}
        return false
    },
    startFlashObject: function (b) {
        try {
            window[b].Play();
            return true
        } catch (a) {}
        try {
            document.getElementById(b).Play();
            return true
        } catch (a) {}
        return false
    },
    unloadAnimations: function (a) {
        $(a).filter('[id^="swf-"]').each(function (c, b) {
            FaExternalHome.stopFlashObject($(b).children().attr("id"))
        })
    },
    initAnimations: function () {
        var a = {};
        var c = {
            wmode: "transparent",
            play: "false"
        };
        var b = {};
        $("#flash-a-aaah div").each(function (f, e) {
            var h = $(e).attr("id");
            var d = "swf-" + h;
            var g = $(e).data("src");
            $(e).wrap('<div id="' + d + '"/>');
            swfobject.embedSWF(g, h, $(e).data("w"), $(e).data("h"), "9.0.0", "expressInstall.swf", a, c, b)
        })
    },
    loadAnimation: function (a) {
        this.unloadAnimations($("#flash-a-aaah div"));
        FaExternalHome.startFlashObject(a)
    },
    setTourCount: function (a) {
        this.tourCount = a
    },
    setTranslation: function (a, b) {
        this.translations[a] = b
    },
    addPreload: function (a) {
        this.preload.push(a)
    },
    addArtwork: function (c, a) {
        var b = new Object();
        b.small = c;
        b.big = a;
        this.artworks.push(b);
        this.artworksCount = this.artworks.length
    },
    addScreenshot: function (c, d, a) {
        var b = new Object();
        b.small = c;
        b.thumbnail = d;
        b.big = a;
        this.screenshots.push(b);
        this.screenshotsCount = this.screenshots.length
    },
    addVideo: function (c, a) {
        var b = new Object();
        b.small = c;
        b.big = a;
        this.videos.push(b);
        this.videosCount = this.videos.length
    },
    addWallpaper: function (c, a) {
        var b = new Object();
        b.small = c;
        b.big = a;
        this.wallpaper.push(b);
        this.wallpaperCount = this.wallpaper.length
    },
    checkPlaceholderSupport: function () {
        var a = document.createElement("input");
        if ("placeholder" in a) {
            this.placeholderSupported = true
        }
    },
    initPlaceholders: function () {
        if (this.placeholderSupported) {
            return
        }
        FaUtils.createInputPlaceholder("bgcdw_login_form_username", this.translations.username, false);
        FaUtils.createInputPlaceholder("bgcdw_login_form_password", this.translations.password, true)
    },
    initLanguageSwitch: function () {
        FaUtils.createDropdown("languageSwitchButton", "languageSwitchToggle")
    },
    fixInstPlayPosition: function () {
        if (!$("#instplay")) {
            return
        }
        var a = 0;
        $("div.bgc_signup_container_form").each(function (b) {
            a = $(this).height()
        });
        if (a > 0) {
            $("#instplay").css("top", (a - 14) + "px")
        }
    },
    fixContentPosition: function () {
        var a = 0;
        $("div.bgc_signup_container_form").each(function (b) {
            a = $(this).height()
        });
        if (a > 0) {
            $("#content").css("top", (216 + a) + "px")
        }
    },
    hideAllContentBoxes: function () {
        $("#boxesHome").addClass("hidden");
        $("#story-inner").addClass("hidden");
        $("#boxesTour").addClass("hidden");
        $("#boxesMedia").addClass("hidden");
        $("#boxesNews").addClass("hidden");
        $("#boxesCommunity").addClass("hidden")
    },
    unactiveAllNavButtons: function () {
        $("#btnNavHome").parent().removeClass("active");
        $("#btnNavTour").parent().removeClass("active");
        $("#btnNavMedia").parent().removeClass("active");
        $("#btnNavNews").parent().removeClass("active");
        $("#btnNavCommunity").parent().removeClass("active")
    },
    initNavButtons: function () {
        $("#btnNavHome").on("click", function () {
            FaExternalHome.unactiveAllNavButtons();
            FaExternalHome.unloadAnimations($("#flash-a-aaah div"));
            $("#btnNavHome").parent().addClass("active");
            FaExternalHome.hideAllContentBoxes();
            $("#boxesHome").removeClass("hidden");
            $("#story-inner").removeClass("hidden")
        });
        $("#btnNavTour").on("click", function () {
            FaExternalHome.unactiveAllNavButtons();
            FaExternalHome.loadAnimation("elephant_cart");
            $("#btnNavTour").parent().addClass("active");
            FaExternalHome.hideAllContentBoxes();
            $("#boxesTour").removeClass("hidden");
            FaExternalHome.initTour()
        });
        $("#btnNavMedia").on("click", function () {
            FaExternalHome.unactiveAllNavButtons();
            FaExternalHome.loadAnimation("cow");
            $("#btnNavMedia").parent().addClass("active");
            FaExternalHome.hideAllContentBoxes();
            $("#boxesMedia").removeClass("hidden");
            FaExternalHome.initMediaVideos();
            FaExternalHome.initMediaScreenshots();
            FaExternalHome.initMediaArtworks();
            FaExternalHome.initMediaWallpaper()
        });
        $("#btnNavNews").on("click", function () {
            window.open($(this).attr("x-href"))
        });
        $("#btnNavCommunity").on("click", function () {
            FaExternalHome.unactiveAllNavButtons();
            FaExternalHome.loadAnimation("beaver_squirrel");
            $("#btnNavCommunity").parent().addClass("active");
            FaExternalHome.hideAllContentBoxes();
            $("#boxesCommunity").removeClass("hidden")
        })
    },
    initHomeScreenshots: function () {
        if (this.homeScreenshotsInitialized) {
            return
        }
        if (this.screenshotsCount == 0) {
            return
        }
        $("#home-screenshots-slider").empty();
        for (var a in this.screenshots) {
            var b = $("<div />");
            b.addClass("item");
            b.attr("item-index", a);
            b.append($("<div />").addClass("img").css("background-image", "url(" + this.screenshots[a]["small"] + ")"));
            b.append($("<div />").addClass("zoom").on("click", function () {
                FaExternalHome.showLayerScreenshots(parseInt($(this).parent().attr("item-index")))
            }));
            $("#home-screenshots-slider").append(b)
        }
        this.setHomeScreenshot(0, false);
        $("#home-screenshots-left").on("click", function () {
            FaExternalHome.setHomeScreenshot(FaExternalHome.homeScreenshotsCurrent - 1, true)
        });
        $("#home-screenshots-right").on("click", function () {
            FaExternalHome.setHomeScreenshot(FaExternalHome.homeScreenshotsCurrent + 1, true)
        });
        this.homeScreenshotsInitialized = true
    },
    setHomeScreenshot: function (c, b) {
        if (this.screenshots[c] == undefined) {
            return
        }
        var a = (c * 365) * -1;
        if (b) {
            $("#home-screenshots-slider").animate({
                left: a
            }, 1500)
        } else {
            $("#home-screenshots-slider").css("left", a + "px")
        }
        this.homeScreenshotsCurrent = c;
        var e = this.homeScreenshotsCurrent - 1;
        if (e < 0) {
            $("#home-screenshots-left").addClass("hidden")
        } else {
            $("#home-screenshots-left").removeClass("hidden")
        }
        var d = this.homeScreenshotsCurrent + 1;
        if (d >= this.screenshotsCount) {
            $("#home-screenshots-right").addClass("hidden")
        } else {
            $("#home-screenshots-right").removeClass("hidden")
        }
    },
    initMediaVideos: function () {
        if (this.mediaVideosInitialized) {
            return
        }
        if (this.videosCount == 0) {
            return
        }
        $("#media-videos-slider").empty();
        for (i in this.videos) {
            var a = $("<div />");
            a.addClass("item");
            a.attr("item-index", i);
            a.append($("<div />").addClass("img").css("background-image", "url(" + this.videos[i]["small"] + ")"));
            a.append($("<div />").addClass("play").on("click", function () {
                FaExternalHome.showLayerVideo(parseInt($(this).parent().attr("item-index")))
            }));
            $("#media-videos-slider").append(a)
        }
        this.setMediaVideo(0, false);
        $("#media-videos-left").on("click", function () {
            FaExternalHome.setMediaVideo(FaExternalHome.mediaVideosCurrent - 1, true)
        });
        $("#media-videos-right").on("click", function () {
            FaExternalHome.setMediaVideo(FaExternalHome.mediaVideosCurrent + 1, true)
        });
        this.mediaVideosInitialized = true
    },
    setMediaVideo: function (c, b) {
        if (this.videos[c] == undefined) {
            return
        }
        var a = (c * 265) * -1;
        if (b) {
            $("#media-videos-slider").animate({
                left: a
            }, 1500)
        } else {
            $("#media-videos-slider").css("left", a + "px")
        }
        this.mediaVideosCurrent = c;
        var e = this.mediaVideosCurrent - 1;
        if (e < 0) {
            $("#media-videos-left").addClass("hidden")
        } else {
            $("#media-videos-left").removeClass("hidden")
        }
        var d = this.mediaVideosCurrent + 1;
        if (d >= this.videosCount - 2) {
            $("#media-videos-right").addClass("hidden")
        } else {
            $("#media-videos-right").removeClass("hidden")
        }
    },
    initMediaScreenshots: function () {
        if (this.mediaScreenshotsInitialized) {
            return
        }
        if (this.screenshotsCount == 0) {
            return
        }
        $("#media-screenshots-slider").empty();
        for (i in this.screenshots) {
            var a = $("<div />");
            a.addClass("item");
            a.attr("item-index", i);
            a.append($("<div />").addClass("img").css("background-image", "url(" + this.screenshots[i]["thumbnail"] + ")"));
            a.append($("<div />").addClass("zoom").on("click", function () {
                FaExternalHome.showLayerScreenshots(parseInt($(this).parent().attr("item-index")))
            }));
            $("#media-screenshots-slider").append(a)
        }
        this.setMediaScreenshot(0, false);
        $("#media-screenshots-left").on("click", function () {
            FaExternalHome.setMediaScreenshot(FaExternalHome.mediaScreenshotsCurrent - 1, true)
        });
        $("#media-screenshots-right").on("click", function () {
            FaExternalHome.setMediaScreenshot(FaExternalHome.mediaScreenshotsCurrent + 1, true)
        });
        this.mediaScreenshotsInitialized = true
    },
    setMediaScreenshot: function (c, b) {
        if (this.screenshots[c] == undefined) {
            return
        }
        var a = (c * 265) * -1;
        if (b) {
            $("#media-screenshots-slider").animate({
                left: a
            }, 1500)
        } else {
            $("media-screenshots-slider").css("left", a + "px")
        }
        this.mediaScreenshotsCurrent = c;
        var e = this.mediaScreenshotsCurrent - 1;
        if (e < 0) {
            $("#media-screenshots-left").addClass("hidden")
        } else {
            $("#media-screenshots-left").removeClass("hidden")
        }
        var d = this.mediaScreenshotsCurrent + 1;
        if (d >= this.screenshotsCount - 2) {
            $("#media-screenshots-right").addClass("hidden")
        } else {
            $("#media-screenshots-right").removeClass("hidden")
        }
    },
    initMediaArtworks: function () {
        if (this.mediaArtworksInitialized) {
            return
        }
        if (this.artworksCount == 0) {
            return
        }
        $("#media-artworks-slider").empty();
        for (i in this.artworks) {
            var a = $("<div />");
            a.addClass("item");
            a.attr("item-index", i);
            a.append($("<div />").addClass("img").css("background-image", "url(" + this.artworks[i]["small"] + ")"));
            a.append($("<div />").addClass("zoom").on("click", function () {
                FaExternalHome.showLayerArtworks(parseInt($(this).parent().attr("item-index")))
            }));
            $("#media-artworks-slider").append(a)
        }
        this.setMediaArtwork(0, false);
        $("#media-artworks-left").on("click", function () {
            FaExternalHome.setMediaArtwork(FaExternalHome.mediaArtworksCurrent - 1, true)
        });
        $("#media-artworks-right").on("click", function () {
            FaExternalHome.setMediaArtwork(FaExternalHome.mediaArtworksCurrent + 1, true)
        });
        this.mediaArtworksInitialized = true
    },
    setMediaArtwork: function (c, b) {
        if (this.artworks[c] == undefined) {
            return
        }
        var a = (c * 265) * -1;
        if (b) {
            $("#media-artworks-slider").animate({
                left: a
            }, 1500)
        } else {
            $("media-artworks-slider").css("left", a + "px")
        }
        this.mediaArtworksCurrent = c;
        var e = this.mediaArtworksCurrent - 1;
        if (e < 0) {
            $("#media-artworks-left").addClass("hidden")
        } else {
            $("#media-artworks-left").removeClass("hidden")
        }
        var d = this.mediaArtworksCurrent + 1;
        if (d >= this.artworksCount - 2) {
            $("#media-artworks-right").addClass("hidden")
        } else {
            $("#media-artworks-right").removeClass("hidden")
        }
    },
    initMediaWallpaper: function () {
        if (this.mediaWallpaperInitialized) {
            return
        }
        if (this.wallpapersCount == 0) {
            return
        }
        $("#media-wallpaper-slider").empty();
        for (i in this.wallpaper) {
            var a = $("<div />");
            a.addClass("item");
            a.append($("<img />").attr("src", this.wallpaper[i]["small"]));
            a.append($("<span />").append($("<a />").attr("href", this.wallpaper[i]["big"]).attr("target", "_blank").text(this.translations.download)));
            $("#media-wallpaper-slider").append(a)
        }
        this.setMediaWallpaper(0, false);
        $("#media-wallpaper-left").on("click", function () {
            FaExternalHome.setMediaWallpaper(FaExternalHome.mediaWallpaperCurrent - 1, true)
        });
        $("#media-wallpaper-right").on("click", function () {
            FaExternalHome.setMediaWallpaper(FaExternalHome.mediaWallpaperCurrent + 1, true)
        });
        this.mediaWallpaperInitialized = true
    },
    setMediaWallpaper: function (c, b) {
        if (this.wallpaper[c] == undefined) {
            return
        }
        var a = (c * 265) * -1;
        if (b) {
            $("#media-wallpaper-slider").animate({
                left: a
            }, 1500)
        } else {
            $("media-wallpaper-slider").css("left", a + "px")
        }
        this.mediaWallpaperCurrent = c;
        var e = this.mediaWallpaperCurrent - 1;
        if (e < 0) {
            $("#media-wallpaper-left").addClass("hidden")
        } else {
            $("#media-wallpaper-left").removeClass("hidden")
        }
        var d = this.mediaWallpaperCurrent + 1;
        if (d >= this.wallpaperCount - 2) {
            $("#media-wallpaper-right").addClass("hidden")
        } else {
            $("#media-wallpaper-right").removeClass("hidden")
        }
    },
    initTour: function () {
        if (this.tourInitialized) {
            return
        }
        if (this.tourCount == 0) {
            return
        }
        this.setTour(0, false);
        $("#tour-left").on("click", function () {
            FaExternalHome.setTour(FaExternalHome.tourCurrent - 1, true)
        });
        $("#tour-right").on("click", function () {
            FaExternalHome.setTour(FaExternalHome.tourCurrent + 1, true)
        });
        this.tourInitialized = true
    },
    setTour: function (c, b) {
        if (c < 0 || c >= this.tourCount) {
            return
        }
        var a = (c * 820) * -1;
        if (b) {
            $("#tour-slider").animate({
                left: a
            }, 1500)
        } else {
            $("#tour-slider").css("left", a + "px")
        }
        this.tourCurrent = c;
        $("#tour-page").text(this.tourCurrent + 1);
        var e = this.tourCurrent - 1;
        if (e < 0) {
            $("#tour-left").addClass("hidden")
        } else {
            $("#tour-left").removeClass("hidden")
        }
        var d = this.tourCurrent + 1;
        if (d >= this.tourCount) {
            $("#tour-right").addClass("hidden")
        } else {
            $("#tour-right").removeClass("hidden")
        }
    },
    initLayerScreenshots: function (a) {
        if (this.layerScreenshotsInitialized) {
            return
        }
        if (this.screenshotsCount == 0) {
            return
        }
        this.setLayerScreenshot(a);
        $("#layer-screenshots-left").on("click", function () {
            FaExternalHome.setLayerScreenshot(FaExternalHome.layerScreenshotsCurrent - 1)
        });
        $("#layer-screenshots-right").on("click", function () {
            FaExternalHome.setLayerScreenshot(FaExternalHome.layerScreenshotsCurrent + 1)
        });
        $("#layer-screenshots-close").on("click", function () {
            FaExternalHome.closeLayerScreenshots()
        });
        this.layerScreenshotsInitialized = true
    },
    setLayerScreenshot: function (a) {
        if (this.screenshots[a] == undefined) {
            return
        }
        $("#layer-screenshots-item").attr("src", this.screenshots[a]["big"]);
        this.layerScreenshotsCurrent = a;
        var c = this.layerScreenshotsCurrent - 1;
        if (c < 0) {
            $("#layer-screenshots-left").addClass("hidden")
        } else {
            $("#layer-screenshots-left").removeClass("hidden")
        }
        var b = this.layerScreenshotsCurrent + 1;
        if (b >= this.screenshotsCount) {
            $("#layer-screenshots-right").addClass("hidden")
        } else {
            $("#layer-screenshots-right").removeClass("hidden")
        }
    },
    showLayerScreenshots: function (a) {
        if (a == undefined || a == null) {
            a = 0
        }
        this.initLayerScreenshots(a);
        if (this.layerScreenshotsCurrent != a) {
            this.setLayerScreenshot(a)
        }
        if (this.otherLayerCloser) {
            this.otherLayerCloser()
        }
        this.otherLayerCloser = FaExternalHome.closeLayerScreenshots;
        $("#layer-screenshots").removeClass("hidden")
    },
    closeLayerScreenshots: function () {
        $("#layer-screenshots").addClass("hidden")
    },
    initLayerArtworks: function (a) {
        if (this.layerArtworksInitialized) {
            return
        }
        if (this.artworksCount == 0) {
            return
        }
        this.setLayerArtwork(a);
        $("#layer-artworks-left").on("click", function () {
            FaExternalHome.setLayerArtwork(FaExternalHome.layerArtworksCurrent - 1)
        });
        $("#layer-artworks-right").on("click", function () {
            FaExternalHome.setLayerArtwork(FaExternalHome.layerArtworksCurrent + 1)
        });
        $("#layer-artworks-close").on("click", function () {
            FaExternalHome.closeLayerArtworks()
        });
        this.layerArtworksInitialized = true
    },
    setLayerArtwork: function (a) {
        if (this.artworks[a] == undefined) {
            return
        }
        $("#layer-artworks-item").attr("src", this.artworks[a]["big"]);
        this.layerArtworksCurrent = a;
        var c = this.layerArtworksCurrent - 1;
        if (c < 0) {
            $("#layer-artworks-left").addClass("hidden")
        } else {
            $("#layer-artworks-left").removeClass("hidden")
        }
        var b = this.layerArtworksCurrent + 1;
        if (b >= this.artworksCount) {
            $("#layer-artworks-right").addClass("hidden")
        } else {
            $("#layer-artworks-right").removeClass("hidden")
        }
    },
    showLayerArtworks: function (a) {
        if (a == undefined || a == null) {
            a = 0
        }
        this.initLayerArtworks(a);
        if (this.layerArtworksCurrent != a) {
            this.setLayerArtwork(a)
        }
        if (this.otherLayerCloser) {
            this.otherLayerCloser()
        }
        this.otherLayerCloser = FaExternalHome.closeLayerArtworks;
        $("#layer-artworks").removeClass("hidden")
    },
    closeLayerArtworks: function () {
        $("#layer-artworks").addClass("hidden")
    },
    initLayerVideo: function () {
        if (this.layerVideoInitialized) {
            return
        }
        $("#layer-video-close").on("click", function () {
            FaExternalHome.closeLayerVideo()
        });
        this.layerVideoInitialized = true
    },
    setLayerVideo: function (a) {
        if (this.videos[a] == undefined) {
            return
        }
        if (FaExternalHome.playVideo) {
            FaExternalHome.playVideo(a);
            return
        }
        var b = [];
        $.each(FaExternalHome.videos, function (d, f) {
            b.push(f.big)
        });
        FaExternalHome.player = new YT.Player("layer-video-player", {
            width: "800",
            height: "450",
            events: {
                onReady: function c(d) {
                    FaExternalHome.stopVideo = function () {
                        d.target.stopVideo()
                    };
                    FaExternalHome.playVideo = function (e) {
                        d.target.playVideoAt(e);
                        d.target.playVideo()
                    };
                    FaExternalHome.playVideo(a)
                }
            },
            playerVars: {
                playlist: b.join(","),
                autoplay: 1,
                loop: 1,
                controls: 2,
                rel: 0,
                modestbranding: 1
            }
        })
    },
    showLayerVideo: function (a) {
        if (a == undefined || a == null) {
            a = 0
        }
        if (this.otherLayerCloser && FaExternalHome.closeLayerVideo !== FaExternalHome.closeLayerVideo) {
            this.otherLayerCloser()
        }
        this.initLayerVideo();
        this.setLayerVideo(a);
        this.otherLayerCloser = FaExternalHome.closeLayerVideo;
        $("#layer-video").removeClass("hidden")
    },
    closeLayerVideo: function () {
        $("#layer-video").addClass("hidden");
        if (FaExternalHome.stopVideo) {
            FaExternalHome.stopVideo()
        }
    },
    initLayerPwRecover: function () {
        if (this.layerPwRecoverInitialized) {
            return
        }
        $("#layer-pwrecover-close").on("click", function () {
            FaExternalHome.closeLayerPwRecover()
        });
        $("#layer-pwrecover-iframe").attr("src", "/?action=externalPwRecover");
        this.layerPwRecoverInitialized = true
    },
    showLayerPwRecover: function () {
        this.initLayerPwRecover();
        if (this.otherLayerCloser) {
            this.otherLayerCloser()
        }
        this.otherLayerCloser = FaExternalHome.closeLayerPwRecover;
        $("#layer-pwrecover").removeClass("hidden")
    },
    closeLayerPwRecover: function () {
        $("#layer-pwrecover").addClass("hidden")
    },
    initLayerSupport: function () {
        if (this.layerSupportInitialized) {
            return
        }
        $("#layer-support-close").on("click", function () {
            FaExternalHome.closeLayerSupport()
        });
        $("#layer-support-iframe").attr("src", "/?action=iframeSupport");
        this.layerSupportInitialized = true
    },
    showLayerSupport: function () {
        this.initLayerSupport();
        if (this.otherLayerCloser) {
            this.otherLayerCloser()
        }
        this.otherLayerCloser = FaExternalHome.closeLayerSupport;
        $("#layer-support").removeClass("hidden")
    },
    closeLayerSupport: function () {
        $("#layer-support").addClass("hidden")
    },
    initLayerCancelation: function () {
        if (this.layerCancelationInitialized) {
            return
        }
        $("#layer-cancelation-close").on("click", function () {
            FaExternalHome.closeLayerCancelation()
        });
        $("#layer-cancelation-iframe").attr("src", "/?action=iframeCancelation");
        this.layerCancelationInitialized = true
    },
    showLayerCancelation: function () {
        this.initLayerCancelation();
        if (this.otherLayerCloser) {
            this.otherLayerCloser()
        }
        this.otherLayerCloser = FaExternalHome.closeLayerCancelation;
        $("#layer-cancelation").removeClass("hidden")
    },
    closeLayerCancelation: function () {
        $("#layer-cancelation").addClass("hidden")
    },
    initLayerAccountCenter: function () {
        if (this.layerAccountCenterInitialized) {
            return
        }
        $("#layer-accountCenter-close").on("click", function () {
            FaExternalHome.closeLayerAccountCenter()
        });
        this.layerAccountCenterInitialized = true
    },
    showLayerAccountCenter: function () {
        this.initLayerAccountCenter();
        if (this.otherLayerCloser) {
            this.otherLayerCloser()
        }
        this.otherLayerCloser = FaExternalHome.closeLayerAccountCenter;
        $("#layer-accountCenter").removeClass("hidden")
    },
    closeLayerAccountCenter: function () {
        $("#layer-accountCenter").addClass("hidden")
    }
};