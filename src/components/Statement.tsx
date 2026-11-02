import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { statement } from "../data/content";
import "./Statement.css";

type Photo = { src: string; alt: string; caption: string; focus?: string };

/** Маленькое окошко с фото внутри фразы: само листает снимки, по наведению/нажатию увеличивается. */
function InlinePhoto({
  photos,
  offset,
  run,
}: {
  photos: Photo[];
  offset: number;
  run: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!run || photos.length < 2) return;
    let timer: number;
    const start = window.setTimeout(() => {
      timer = window.setInterval(
        () => setIndex((i) => (i + 1) % photos.length),
        statement.holdMs,
      );
    }, offset);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, [run, photos.length, offset]);

  // На телефоне окошко раскрывается по нажатию — закрываем нажатием в стороне
  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    window.addEventListener("scroll", close, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", close);
      window.removeEventListener("scroll", close);
    };
  }, [open]);

  return (
    <button
      ref={ref}
      type="button"
      className={`stmt__photo${open ? " is-open" : ""}`}
      aria-expanded={open}
      aria-label={`Enlarge photo: ${photos[index].caption}`}
      onClick={() => setOpen((v) => !v)}
    >
      {photos.map((p, i) => (
        <img
          key={p.src}
          src={p.src}
          alt=""
          loading="lazy"
          draggable={false}
          className={i === index ? "is-active" : ""}
          style={{ objectPosition: p.focus ?? "50% 50%" }}
        />
      ))}
    </button>
  );
}

export default function Statement() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "0px 0px -15% 0px" });
  const live = useInView(rootRef, { margin: "100px" }); // листаем фото, только пока блок на экране

  const words = useMemo(() => statement.text.split(" "), []);
  // индекс слова, после которого стоит окошко: позиция в процентах × число слов
  const slotAfter = useMemo(() => {
    const map = new Map<number, number>();
    statement.slots.forEach((slot, s) =>
      map.set(
        Math.min(words.length - 1, Math.round((slot.at / 100) * words.length)),
        s,
      ),
    );
    return map;
  }, [words.length]);

  return (
    <section className="stmt" aria-label="About Paradai">
      <div className="stmt__inner" ref={rootRef}>
        <p className="stmt__text">
          {words.map((word, i) => (
            <span key={i}>
              <motion.span
                className="stmt__word"
                initial={reduce ? false : { opacity: 0, y: "0.45em" }}
                animate={inView || reduce ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.6,
                  delay: i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>{" "}
              {slotAfter.has(i) && (
                <>
                  <motion.span
                    className="stmt__slot"
                    initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                    animate={
                      inView || reduce ? { opacity: 1, scale: 1 } : undefined
                    }
                    transition={{
                      duration: 0.6,
                      delay: i * 0.04 + 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <InlinePhoto
                      photos={statement.slots[slotAfter.get(i)!].photos}
                      offset={slotAfter.get(i)! * 800}
                      run={live && !reduce}
                    />
                  </motion.span>{" "}
                </>
              )}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
