import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {useRef} from "react";

export default function SecondVideo() {
    const videoRef = useRef<null | HTMLVideoElement>(null);
    useGSAP(() => {
        gsap.set(".lucia", {marginTop: "-60vh", opacity: 0});
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".lucia",
                start: "top top",
                end: "bottom top",
                scrub: 2,
                pin: true,
            },
        });
        tl.to(".lucia", {
            opacity: 1,
            duration: 1,
            ease: "power1.inOut",
        });
        if (videoRef && videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
                if (!videoRef.current) return;
                tl.to(
                    videoRef.current,
                    {currentTime: videoRef.current.duration, duration: 3, ease: "power1.inOut"},
                    "< "
                );
            };
        }
    });

    return (
        <div className="lucia">
            <div className="h-dvh">
                <video
                    ref={videoRef}
                    className="size-full object-cover second-vd"
                    style={{objectPosition: "15% 0%"}}
                    src="/videos/output2.mp4"
                    muted
                    playsInline
                    preload="auto"
                ></video>
            </div>
        </div>
    );
}
