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
        "name": "1602/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.2db438cfd8de36f566e50f1014f1d4ce.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1602/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.a199e7aa5a7687fba92c8f6999d4a72c.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1603/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.da8b1886c9b6f2c3237a972166fa1e74.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1603/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.353b0fe17241932c159da94e8012d6b1.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1604/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.aa48e437784ed3272b5ab2854da7439a.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1604/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.7890df310e34dc800898e8f567043fac.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1605/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.f330eb5f1c80f6892632f37a424b75f1.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1605/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.6d7d0d48523de746e1c973b50fa425d6.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1606/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.488b6c51df82adcf33d5428e595b22b9.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1606/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.575b3d84cfaf4d56e6f34553728667ca.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1607/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.18e24c74c6f5babf2b2e05d9d28ea93c.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1607/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.88f356d62d8c651c62fa5c1dc3f2546a.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1608/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.d3f5916a3f1f157846112934b62d553b.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1608/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.aaed549a6f1f6be192b1a92a015076d2.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1609/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.7a1b93cb6203c72144a21ee66ce19b08.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1609/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.d29f730f5f75f0d83a30fe63a97857f3.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1610/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.80389b7f317b94c9eb7d18d697f945df.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1610/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.3b359819e12425e2c092056d01e91202.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1611/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.6db3b54d8880ffb01bf4b758dba190f1.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1611/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.7ab0e9e5adb02653fa286f96e4d66985.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1612/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.af0516d573e90c5d09a1a027e4250c3d.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1612/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.272dc950cdeb0978f7b231f79eab1eca.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1613/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.60185f2b9d6cf189da917919c3d5ee67.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1613/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.544300bc94226952f6826700e9624334.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1614/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.7cbcf2142731aeaa38d2b746306f7c5f.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1614/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.3af16b532944553ce35e3408c33b049b.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1615/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.7baec938c201247b7744b736db049d55.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1615/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.8df8440bb6a9383a7ef8cb6466284dec.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1616/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.abd65edcae40812c797a3361ef08be50.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1616/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.d12270574f2945c0538525c46b21d310.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1617/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.8ab11a18748f1ee71cb333760c2e7209.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1617/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.584bcbd2023dda9f8578d9caa4c90773.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1618/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.df4fed7e890bce5084526992f9d1860f.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1618/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.b336a688cf21d323de8fbf6861db5cd2.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1619/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.351a7691d0aec60047913d920a1cdbb6.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1619/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.189433d4e87c8020970feed96683a198.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1620/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.cf586f75d3383c44d85128d6fa0309cd.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1620/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.e4aeaa5284908106e9781c61fc47267b.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1621/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.3636f3254c4dfd9ee93ddb66a8ad4d2e.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1621/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.386779e4b123a7bc249e747939015dc2.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1622/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.49d3cec6a54b7a24e1b46592b927d42f.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1622/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.82cc4fd74ca1fc7fd8887c0d4207fa95.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1623/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.0da7c7765d28d118a7d5d56c4fe44101.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1623/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.1dcac765c50370bef787b488b4f2535c.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1624/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.dc5f5be4960302867d7ba4083e5c8625.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1624/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.970238bc843269366243be07e7d0d106.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1625/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.abf6d679569c8e5afb7c46d5168f901d.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1625/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.eac42bf057e1ebeca32062fbd46e0c7f.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1626/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.3b397030dc9a2b0926638ddf52254c55.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1626/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.a490668e534f17ad9f20aa78005a68d0.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1627/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.e3dfa5a8259c946339cab37c974f8d6d.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1627/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.357acd9ad02d402e4c76f2971e007161.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1628/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.2fe1c9ade3e83eefaada5bad0a719006.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1628/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.b56410efd9e44610499c5e106c08e755.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1629/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.cde04a26b29474c4eb3028d2da846bd4.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1629/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.97e4da1cfe42cc7bf619f9665ca40bb5.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1630/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.8b7db35de872bd6ef1981f00a29afbca.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1630/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.4c9b451aa33564d3891436b51af47345.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1631/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.712621f6878f465cc9284c5032e6af8e.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1631/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.e57d5408785b7f45b01c0be14adb1ac6.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1632/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.72ee1ded960eca7128e700f027c86c1d.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1632/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.2cb458e9068798cd3fe697662feaa2b8.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1633/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.1f60694d129a6ba37ea69bdd52bae7de.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1633/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.fe576c51f9568b148a683dcc42223572.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1634/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.f8a4a0ca9885e3fedcabb61255c02373.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1634/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.4c35aab80610c42fde12da4a54bb8a95.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1635/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.56eb259a0f9c604b51547d1b234d9e66.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1635/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.154a8be9ee2cd03958df0a6762674f81.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1636/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.28f9139dd6bfd960665f87c51aee6efc.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1636/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.e9e3e252abf6a5f4aea810953b72b896.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1637/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.b7f3f314eebfb32b041bba3a528fc831.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1637/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.084a69037f3ee217d331ce36ec4160d0.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1638/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.be7d15c7c9fadd29e88b420844829a48.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1638/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.984dfce875640a37bd672d2309d58f5b.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1639/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.f5a6a8267417d7f02f04452fe814d942.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1639/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.3ad37159412e8635f3d6454f5be55bfc.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1640/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.277e393ae1081a4779fdb397e027a064.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1640/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.16b95eef1455bcf9814030c469a949f0.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1641/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.234325ea126b85cce835b0c440b69c9f.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1641/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.e0a51051c5fae0dfecd9d37853aeac27.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1642/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.f99a89fb25cc0476fdf247649478a970.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1642/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.09412393756608137fabd05641b7a667.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1643/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.de63832e200c62da85a4c75059d0d1a1.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1643/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.5c51aa9538cd097209f888a180fbb74a.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1644/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.b51966b6fbdf1932ca900da80f985994.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1644/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.3b84a7921bb518a5a0536a52ab9eb847.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1645/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.7ab5812119140636a31d6f2e1d02bcab.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1645/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.f54c95d021a0aa8d26b579e1c85b88ab.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1646/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.684123ddd88ab33d94fb8db0d2982794.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1646/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.83714902507a61084abc6805963e3a36.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1647/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.6f4f1e3d0fc34cb4b36c4a700a8f4447.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1647/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.2e8cae99ab0a17d3205f5ecfef49e081.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1648/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.474dba1839338dea6018447e0b53191b.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1648/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.01beffdfdf1abc258b68450373052b8c.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1649/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.fb3bcec1e7328a03177a5489a342485e.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1649/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.e6dcba87f1bda9498bec146316fcc117.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1650/000", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.d57a0616cc9600f655dd74023443d578.mp3"
    }, 
    {
        "artist": "NICE", 
        "name": "1650/001", 
        "picture": "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg", 
        "url": "https://file01.fpt.ai/text2speech-v5/short/2021-09-15/lannhi.2.67808b61cd5e9e90c5fbcad8526db603.mp3"
    }
];
	

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
