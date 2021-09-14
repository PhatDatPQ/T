$(function () {
    var playerTrack = $("#player-track");
    var bgArtwork = $('#bg-artwork');
    var bgArtworkUrl;
    var albumName = $('#album-name');
    var trackName = $('#track-name');
    var albumArt = $('#album-art'),
        sArea = $('#s-area'),
        seekBar = $('#seek-bar'),
        trackTime = $('#track-time'),
        insTime = $('#ins-time'),
        sHover = $('#s-hover'),
        playPauseButton = $("#play-pause-button"),
        i = playPauseButton.find('i'),
        tProgress = $('#current-time'),
        tTime = $('#track-length'),
        seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
        buffInterval = null, tFlag = false;

    var playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;
    var playInfoSpeed = $('#play-speed');
    var playbackRateV = $('#play-backRate');
    var songs = [
    {
        "artist": "NICE", 
        "name": "1594/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-14/lannhi.2.0ba492bcb2a1095cd1eb209f84279acf.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1594/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-14/lannhi.2.7a19ca3bccbe26a28643f49b883d1d69.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1595/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-14/lannhi.2.ee74cd1f970a94dc715eaa446472170c.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1595/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-14/lannhi.2.e43b439c8ee4e4787df95e8ae21f9570.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1596/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-14/lannhi.2.6bec18276817d485df8d5d38a725ad78.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1596/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-14/lannhi.2.a81456ccbd8f2e1cd5d60359500f6f9c.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1597/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-14/lannhi.2.dec1d257b88932de867cc8ed169a51a1.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1597/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-14/lannhi.2.0bc969014184c624b487f6d83c6c2170.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1598/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-14/lannhi.2.596045f6945ed9953ef730291b6d8ac1.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1598/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-14/lannhi.2.6dbd78b1aec30e118c9ca5cd379c3e46.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1599/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-14/lannhi.2.2bdd79777ff512278125d72c208d60d6.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1599/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-14/lannhi.2.5b10a06990a44ca1db06438a65a5ad5e.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1600/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-14/lannhi.2.9ae56f9a26d64f10188481faa861a584.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1600/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-14/lannhi.2.58a01f4a53bc6c5720ac5be6efb18419.mp3"
    }];
	

    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
    //songs = shuffle(songs);

    function playPause() {
        setTimeout(function () {
            if (audio.paused) {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class', 'fas fa-pause');
                audio.play();
            }
            else {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class', 'fas fa-play');
                audio.pause();
            }
        }, 300);
    }

    function showHover(event) {
        seekBarPos = sArea.offset();
        seekT = event.clientX - seekBarPos.left;
        seekLoc = audio.duration * (seekT / sArea.outerWidth());

        sHover.width(seekT);

        cM = seekLoc / 60;

        ctMinutes = Math.floor(cM);
        ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

        if ((ctMinutes < 0) || (ctSeconds < 0))
            return;

        if ((ctMinutes < 0) || (ctSeconds < 0))
            return;

        if (ctMinutes < 10)
            ctMinutes = '0' + ctMinutes;
        if (ctSeconds < 10)
            ctSeconds = '0' + ctSeconds;

        if (isNaN(ctMinutes) || isNaN(ctSeconds))
            insTime.text('--:--');
        else
            insTime.text(ctMinutes + ':' + ctSeconds);

        insTime.css({ 'left': seekT, 'margin-left': '-21px' }).fadeIn(0);

    }

    function hideHover() {
        sHover.width(0);
        insTime.text('00:00').css({ 'left': '0px', 'margin-left': '0px' }).fadeOut(0);
    }

    function playFromClickedPos() {
        audio.currentTime = seekLoc;
        seekBar.width(seekT);
        hideHover();
    }

    function updateCurrTime() {
        nTime = new Date();
        nTime = nTime.getTime();

        if (!tFlag) {
            tFlag = true;
            trackTime.addClass('active');
        }

        curMinutes = Math.floor(audio.currentTime / 60);
        curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

        durMinutes = Math.floor(audio.duration / 60);
        durSeconds = Math.floor(audio.duration - durMinutes * 60);

        playProgress = (audio.currentTime / audio.duration) * 100;

        if (curMinutes < 10)
            curMinutes = '0' + curMinutes;
        if (curSeconds < 10)
            curSeconds = '0' + curSeconds;

        if (durMinutes < 10)
            durMinutes = '0' + durMinutes;
        if (durSeconds < 10)
            durSeconds = '0' + durSeconds;

        if (isNaN(curMinutes) || isNaN(curSeconds))
            tProgress.text('00:00');
        else
            tProgress.text(curMinutes + ':' + curSeconds);

        if (isNaN(durMinutes) || isNaN(durSeconds))
            tTime.text('00:00');
        else
            tTime.text(durMinutes + ':' + durSeconds);

        if (isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds))
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');


        seekBar.width(playProgress + '%');

        if (playProgress == 100) {
            i.attr('class', 'fa fa-play');
            seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
            selectTrack(1);
        }
    }

    function checkBuffering() {
        clearInterval(buffInterval);
        buffInterval = setInterval(function () {
            if ((nTime == 0) || (bTime - nTime) > 1000)
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        }, 100);
    }

    function selectTrack(flag) {
        if (flag == 0 || flag == 1)
            ++currIndex;
        else
            --currIndex;

        if ((currIndex > -1) && (currIndex < songs.length)) {
            if (flag == 0)
                i.attr('class', 'fa fa-play');
            else {
                albumArt.removeClass('buffering');
                i.attr('class', 'fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');

            currAlbum = songs[currIndex].name;
            currTrackName = songs[currIndex].artist;
            currArtwork = songs[currIndex].picture;

            audio.src = songs[currIndex].url;

            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if (flag != 0) {
                audio.play();
                playerTrack.addClass('active');
                albumArt.addClass('active');

                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            $('#album-art img').prop('src', bgArtworkUrl);
        }
        else {
            if (flag == 0 || flag == 1)
                --currIndex;
            else
                ++currIndex;
        }
    }

    function initPlayer() {
        audio = new Audio();

        selectTrack(0);

        audio.loop = false;

        playPauseButton.on('click', playPause);

        sArea.mousemove(function (event) { showHover(event); });

        sArea.mouseout(hideHover);

        sArea.on('click', playFromClickedPos);

        $(audio).on('timeupdate', updateCurrTime);

        playPreviousTrackButton.on('click', function () { selectTrack(-1); });
        playNextTrackButton.on('click', function () { selectTrack(1); });
        playInfoSpeed.on('click', function () { alert("Tốc Độ Hiện Tại: " + audio.playbackRate); });
        playbackRateV.on('click', function () { 
            var retVal = prompt("Tốc Độ: ", "1.5");
            audio.playbackRate = retVal; 
        });
    }
    initPlayer();
});
