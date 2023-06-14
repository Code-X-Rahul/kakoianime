import React from 'react'
import { useEffect, useRef } from "react";
import Hls from "hls.js";
import Artplayer from "artplayer";
const Player = ({ animeStreamInfo, option, getInstance, ...rest }) => {
    const artRef = useRef();

    function playM3u8(video, url, art) {
        if (Hls.isSupported()) {
            if (art.hls) art.hls.destroy();
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            art.hls = hls;
            art.on('destroy', () => hls.destroy());
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
        } else {
            art.notice.show = 'Unsupported playback format: m3u8';
        }
    }
    let select = []
    animeStreamInfo.sources.map((e) => {
        if(e.quality ==="backup" || e.quality==="default")return
        select.unshift({ html: e.quality, url : `https://m3u8-proxy-cors-lime.vercel.app/cors?url=${e.url}`,},)
    })

    useEffect(() => {

        var art = new Artplayer({
            container: artRef.current,
            url: `https://m3u8-proxy-cors-lime.vercel.app/cors?url=${animeStreamInfo?.sources[0]?.url}`,
            type: 'm3u8',
            autoPlayback: true,
            autoOrientation: true,
            customType: {
                m3u8: playM3u8,
            },
            setting: true,
            settings: [
                {
                    html: 'Quality',
                    width: 150,
                    tooltip: '360p',
                    selector: select,
                    onSelect: function (item, $dom, event) {
                        console.info(item, $dom, event);
                        art.switchQuality(item.url, item.html);
                        return item.html;
                    },
                },
            ],
            pip: true,
            screenshot: true,
            fullscreen: true,
            autoSize: true,
            loop: true,
            flip: true,

        });
        if (getInstance && typeof getInstance === 'function') {
            getInstance(art);
        }
        art.on('ready', () => {
            console.info(art.hls);
        });

        return () => {
            if (art && art.destroy) {
                art.destroy(false);
            }
        };
    }, []);

    return (
        <div className='w-[100%] h-auto'>
            <div ref={artRef} {...rest} className='w-full h-full aspect-video'></div>
        </div>
    )
}

export default Player