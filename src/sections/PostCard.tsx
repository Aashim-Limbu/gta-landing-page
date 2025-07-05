import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {useRef} from "react";

export default function PostCard() {
    const videoRef = useRef<null | HTMLVideoElement>(null);
    useGSAP(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".post-card",
                start: "top center",
                end: "bottom center",
                scrub: true,
            },
        });
        if (videoRef && videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
                if (!videoRef.current) return;
                timeline.to(
                    videoRef.current,
                    {currentTime: videoRef.current.duration, duration: 3, ease: "power1.inOut"},
                    "< "
                );
            };
        }
    });
    return (
        <section className="post-card">
            <div className="animated-gradient-bg" />
            <div className="post-card-wrapper group hover:rotate-1 hover:-[1.02] transition duration-700">
                <img src="/images/overlay.webp" alt="post" />
                <video ref={videoRef} muted playsInline preload="auto" src="/videos/postcard-vd.mp4" />
                <button className="group-hover:bg-yellow transition duration-700">Explore Leonida</button>
            </div>
        </section>
    );
}
