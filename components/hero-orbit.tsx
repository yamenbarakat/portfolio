import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

type Satellite = { angle: number; icon?: IconType };

const orbits: {
  size: string;
  duration: string;
  reverse?: boolean;
  dashed?: boolean;
  satellites: Satellite[];
}[] = [
  {
    size: "60%",
    duration: "70s",
    satellites: [
      { angle: 300, icon: SiReact },
      { angle: 125, icon: SiTypescript },
      { angle: 210 },
    ],
  },
  {
    size: "80%",
    duration: "95s",
    reverse: true,
    dashed: true,
    satellites: [
      { angle: 40, icon: SiNextdotjs },
      { angle: 235, icon: SiSupabase },
    ],
  },
  {
    size: "100%",
    duration: "130s",
    satellites: [
      { angle: 165, icon: SiNodedotjs },
      { angle: 335, icon: SiTailwindcss },
      { angle: 80 },
    ],
  },
];

/** Amber "eclipse" with the tech stack slowly orbiting behind the portrait. */
export function HeroOrbit() {
  return (
    <div className="hero-orbit" aria-hidden="true">
      <div className="hero-sun" />
      <div className="hero-corona" />

      {orbits.map((orbit) => (
        <div
          key={orbit.size}
          className={`orbit ${orbit.reverse ? "is-reverse" : ""} ${orbit.dashed ? "is-dashed" : ""}`}
          style={
            {
              width: orbit.size,
              "--orbit-duration": orbit.duration,
            } as CSSProperties
          }
        >
          {orbit.satellites.map(({ angle, icon: Icon }) => (
            <div
              key={angle}
              className="orbit-slot"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <span
                className="orbit-pin"
                style={{ transform: `rotate(${-angle}deg)` }}
              >
                <span className="orbit-upright">
                  {Icon ? (
                    <span className="orbit-chip">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                  ) : (
                    <span className="orbit-dot" />
                  )}
                </span>
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
