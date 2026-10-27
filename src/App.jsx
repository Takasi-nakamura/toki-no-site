
import { useEffect, useState } from "react";
import "./App.css";

const images = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
];

export default function ImageSlider() {
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const changeSlide = (step) => {
    setIndex((current) =>
      (current + step + images.length) % images.length
    );
  };

  return (
    <main className="time-site">
      <div className="backgrounds" aria-hidden="true">
        {images.map((src, i) => (
          <div
            key={src}
            className={`background-slide ${
              i === index ? "is-active" : ""
            }`}
            style={{ backgroundImage: `url("${src}")` }}
          />
        ))}
      </div>

      <div className="background-overlay" />

      <header className="site-header">
        <h1>時のサイト.com</h1>
      </header>

      <section className="clock-section">
        <p className="clock-label">現在の時刻</p>
        <time className="clock-time">
          {time.toLocaleTimeString("ja-JP", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </time>
        <p className="clock-date">
          {time.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          })}
        </p>
      </section>

      <nav className="slider-controls" aria-label="背景画像の切り替え">
        <button
          className="slider-button"
          onClick={() => changeSlide(-1)}
          aria-label="前の背景画像"
        >
          ←
        </button>

        <span className="slide-count" aria-live="polite">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </span>

        <button
          className="slider-button"
          onClick={() => changeSlide(1)}
          aria-label="次の背景画像"
        >
          →
        </button>
      </nav>
    </main>
  );
}
