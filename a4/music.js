let titleMusicPlayer = null;
let titleMusicReady = false;
let titleMusicVolume = 100;

function onYouTubeIframeAPIReady() {
    titleMusicPlayer = new YT.Player("titleMusicPlayer", {
        videoId: "3wmn1YdHZCM",

        playerVars: {
            autoplay: 0,
            controls: 0,
            loop: 1,
            playlist: "3wmn1YdHZCM"
        },

        events: {
            onReady: function (event) {
                titleMusicReady = true;
                event.target.setVolume(titleMusicVolume);
            }
        }
    });
}

window.music = {
    start: function () {
        if (!titleMusicReady || !titleMusicPlayer) return;

        titleMusicPlayer.setVolume(titleMusicVolume);
        titleMusicPlayer.playVideo();
    },

    stop: function () {
        if (!titleMusicReady || !titleMusicPlayer) return;

        titleMusicPlayer.pauseVideo();
    },

    playing: function () {
        if (!titleMusicReady || !titleMusicPlayer) return false;

        return titleMusicPlayer.getPlayerState() === YT.PlayerState.PLAYING;
    },

    volume: function (vol) {
        titleMusicVolume = Math.max(0, Math.min(100, vol * 100));

        if (titleMusicReady && titleMusicPlayer) {
            titleMusicPlayer.setVolume(titleMusicVolume);
        }
    }
};

window.addEventListener("eagTitleMusic", function (e) {
    if (e.detail.playing) {
        window.music.start();
    } else {
        window.music.stop();
    }

    window.music.volume(e.detail.volume);
});
