"use client";

import { useState, useRef, useEffect } from "react";

function FadeInSection({ children, direction = "up", threshold = 0.4 }) {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef(null);

    useEffect(() => {
        const element = domRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };

    }, [threshold]);

    const getTransform = () => {
        if (!isVisible) {
            switch (direction) {
                case "up":
                    return "translateY(40px)";
                case "down":
                    return "translateY(-40px)";
                case "left":
                    return "translateX(-40px)";
                case "right":
                    return "translateX(40px)";
                default:
                    return "translateY(40px)";
            }
        }
        return "translate(0,0)";
    }

    return (
        <div
            ref={domRef}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
        >
            {children}
        </div>
    );
}

export default FadeInSection;
