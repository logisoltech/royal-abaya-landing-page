"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const slides = [
  {
    id: "summer",
    kind: "video",
    src: "/1stban.mp4",
    title: "Elegant abaya edit",
    dotLabel: "Elegant abaya edit",
    durationMs: 6000,
  },
  {
    id: "artisan",
    kind: "video",
    src: "/2ndcomp.mp4",
    title: "Artisanal modest collection",
    dotLabel: "Artisanal modest collection",
    durationMs: 6000,
  },
  {
    id: "season",
    kind: "video",
    src: "/abayas/abaya-hero-video.mp4",
    title: "New season abayas",
    dotLabel: "New season abayas",
  },
];

const IMAGE_SLIDE_MS = 3000;
const VIDEO_SLIDE_MS = 10000;

/** Pixels from top where hero-style transparent navbar applies */
const SCROLL_TOP_EPS = 16;

const categoryStrip = [
  { src: "/abayas/abaya-cat1.jpg", label: "Abayas", href: "#" },
  { src: "/abayas/abaya-cat2.jpg", label: "Hijabs", href: "#" },
  { src: "/abayas/abaya-cat3.jpg", label: "Kaftans", href: "#" },
  { src: "/abayas/abaya-cat4.jpg", label: "Modest sets", href: "#" },
  { src: "/abayas/abaya-cat5.jpg", label: "Inner dresses", href: "#" },
  { src: "/abayas/abaya-cat6.jpg", label: "Accessories", href: "#" },
];

const focusProducts = [
  {
    id: "p1",
    img: "/abayas/abaya-product1.jpg",
    name: "Essential black abaya",
    fit: "Relaxed fit | Women",
    price: "SAR 129",
    swatches: ["#1c1c1c", "#7a9ab8"],
  },
  {
    id: "p2",
    img: "/abayas/abaya-product2.jpg",
    name: "Embroidered abaya",
    fit: "A-line | Women",
    price: "SAR 229",
    swatches: ["#111111", "#c9a962"],
  },
  {
    id: "p3",
    img: "/abayas/abaya-product3.jpg",
    name: "Open front abaya",
    fit: "Layered | Women",
    priceWas: "SAR 249",
    price: "SAR 119",
    savePct: "51%",
    swatches: ["#2a2a2a"],
  },
  {
    id: "p4",
    img: "/abayas/abaya-product4.jpg",
    name: "Premium crepe abaya",
    fit: "Flowing | Women",
    price: "SAR 289",
    swatches: ["#3d3d3d", "#e8e8e8"],
  },
  {
    id: "p5",
    img: "/abayas/abaya-product5.jpg",
    name: "Daily wear abaya",
    fit: "Easy care | Women",
    price: "SAR 349",
    swatches: ["#2d3142", "#5c4033"],
  },
];

const mustHaveSlides = [
  { id: "mh-s1", src: "/abayas/abaya-product6.jpg" },
  { id: "mh-s2", src: "/abayas/abaya-product7.jpg" },
  { id: "mh-s3", src: "/abayas/abaya-product8.jpg" },
  { id: "mh-s4", src: "/abayas/abaya-product9.jpg" },
  { id: "mh-s5", src: "/abayas/abaya-product10.jpg" },
];

const topsCarouselTabs = [
  { id: "abayas", label: "ABAYAS" },
  { id: "hijabs", label: "HIJABS" },
  { id: "kaftans", label: "KAFTANS" },
  { id: "modestsets", label: "MODEST SETS" },
  { id: "accessories", label: "ACCESSORIES" },
];

const topsCarouselProducts = [
  {
    id: "top-1",
    img: "/abayas/abaya-product11.jpg",
    name: "Nida wrap abaya",
    fit: "Relaxed fit | Women",
    price: "SAR 229",
    swatches: ["#1a1a1a", "#7a9ab8"],
  },
  {
    id: "top-2",
    img: "/abayas/abaya-product12.jpg",
    name: "Chiffon layered abaya",
    fit: "Flowing | Women",
    price: "SAR 149",
    swatches: ["#3d4a3a"],
  },
  {
    id: "top-3",
    img: "/abayas/abaya-product13.jpg",
    name: "Belted kimono abaya",
    fit: "Tailored | Women",
    price: "SAR 129",
    swatches: ["#1c1c1c", "#7a9ab8"],
  },
  {
    id: "top-4",
    img: "/abayas/abaya-product14.jpg",
    name: "Pleated sleeve abaya",
    fit: "Classic | Women",
    price: "SAR 169",
    swatches: ["#f4f4f4", "#1e2a4a"],
  },
  {
    id: "top-5",
    img: "/abayas/abaya-product15.jpg",
    name: "Soft jersey inner dress",
    fit: "Essential | Women",
    price: "SAR 169",
    swatches: ["#eaeaea", "#1a1a1a"],
  },
  {
    id: "top-6",
    img: "/abayas/abaya-product16.jpg",
    name: "Linen blend abaya",
    fit: "Breathable | Women",
    price: "SAR 119",
    swatches: ["#2a2a2a"],
  },
  {
    id: "top-7",
    img: "/abayas/abaya-product17.jpg",
    name: "Evening drape abaya",
    fit: "Occasion | Women",
    price: "SAR 289",
    swatches: ["#3d3d3d", "#e8e8e8"],
  },
  {
    id: "top-8",
    img: "/abayas/abaya-product18.jpg",
    name: "Minimal closed abaya",
    fit: "Streamlined | Women",
    price: "SAR 349",
    swatches: ["#2d3142", "#5c4033"],
  },
];

const footwearCarouselProducts = [
  {
    id: "fw-1",
    img: "/abayas/abaya-product19.jpg",
    name: "Silk square hijab",
    fit: "Women",
    price: "SAR 89",
    swatches: ["#1a1a1a", "#f5f5f5"],
  },
  {
    id: "fw-2",
    img: "/abayas/abaya-product20.jpg",
    name: "Structured leather tote",
    fit: "Women",
    price: "SAR 599",
    swatches: ["#1c1c1c", "#b89aa0"],
  },
  {
    id: "fw-3",
    img: "/abayas/abaya-product21.jpg",
    name: "Undercap set",
    fit: "Women",
    price: "SAR 45",
    swatches: ["#d4c4b0", "#c9a88a"],
  },
  {
    id: "fw-4",
    img: "/abayas/abaya-product22.jpg",
    name: "Chain strap crossbody",
    fit: "Women",
    price: "SAR 199",
    swatches: ["#c8c8c8", "#4a5a3a", "#1e2a4a"],
  },
  {
    id: "fw-5",
    img: "/abayas/abaya-product23.jpg",
    name: "Chiffon hijab duo",
    fit: "Women",
    price: "SAR 99",
    swatches: ["#121212", "#eaeaea"],
  },
  {
    id: "fw-6",
    img: "/abayas/abaya-product24.jpg",
    name: "Evening clutch",
    fit: "Women",
    price: "SAR 269",
    swatches: ["#2a2a2a", "#8a8a8a"],
  },
  {
    id: "fw-7",
    img: "/abayas/abaya-product25.jpg",
    name: "Minimal leather belt",
    fit: "Women",
    price: "SAR 109",
    swatches: ["#1a1a1a", "#d8d8d8"],
  },
  {
    id: "fw-8",
    img: "/abayas/abaya-product26.jpg",
    name: "Pearl accent brooch",
    fit: "Women",
    price: "SAR 69",
    swatches: ["#2d3142", "#e8e8e8"],
  },
];

const newTrendingProducts = [
  {
    id: "nt-1",
    img: "/abayas/new-trending-01.jpg",
    name: "Classic black abaya",
    fit: "Relaxed fit | Women",
    price: "SAR 129",
    swatches: ["#1a1a1a", "#f5f5f5"],
  },
  {
    id: "nt-2",
    img: "/abayas/new-trending-02.jpg",
    name: "Embroidered open abaya",
    fit: "Layered | Women",
    price: "SAR 269",
    swatches: ["#7eb8d9", "#5c4033"],
  },
  {
    id: "nt-3",
    img: "/abayas/new-trending-03.jpg",
    name: "Satin modest set",
    fit: "Co-ord | Women",
    price: "SAR 199",
    swatches: ["#1e3d2f", "#121212"],
  },
  {
    id: "nt-4",
    img: "/abayas/new-trending-04.jpg",
    name: "Crepe daily abaya",
    fit: "Easy care | Women",
    price: "SAR 199",
    swatches: ["#ffffff", "#1e3d2f"],
  },
  {
    id: "nt-5",
    img: "/abayas/new-trending-05.jpg",
    name: "Luxury kaftan",
    fit: "Occasion | Women",
    price: "SAR 249",
    swatches: ["#1a2744", "#5c4033"],
  },
  {
    id: "nt-6",
    img: "/abayas/new-trending-06.jpg",
    name: "Hijab set",
    fit: "Women",
    price: "SAR 189",
    swatches: ["#c4b8a8", "#2a2a2a"],
  },
  {
    id: "nt-7",
    img: "/abayas/new-trending-07.jpg",
    name: "Nida fabric abaya",
    fit: "Tailored | Women",
    price: "SAR 289",
    swatches: ["#3d4f6b", "#8b7355"],
  },
  {
    id: "nt-8",
    img: "/abayas/new-trending-08.jpg",
    name: "Beaded evening abaya",
    fit: "Evening | Women",
    price: "SAR 139",
    swatches: ["#e8e4dc", "#1c1c1c"],
  },
  {
    id: "nt-9",
    img: "/abayas/new-trending-09.jpg",
    name: "Linen layered abaya",
    fit: "Breathable | Women",
    price: "SAR 189",
    swatches: ["#8fa3b0", "#f0ebe3"],
  },
];

const instagramCommunityItems = [
  {
    id: "ig-1",
    main: "/abayas/abaya-ig1.jpg",
    badge1: "/abayas/abaya-ig2.jpg",
    badge2: "/abayas/abaya-ig3.jpg",
  },
  {
    id: "ig-2",
    main: "/abayas/abaya-ig2.jpg",
    badge1: "/abayas/abaya-ig3.jpg",
    badge2: "/abayas/abaya-ig4.jpg",
  },
  {
    id: "ig-3",
    main: "/abayas/abaya-ig3.jpg",
    badge1: "/abayas/abaya-ig4.jpg",
    badge2: "/abayas/abaya-ig5.jpg",
  },
  {
    id: "ig-4",
    main: "/abayas/abaya-ig4.jpg",
    badge1: "/abayas/abaya-ig5.jpg",
    badge2: "/abayas/abaya-ig1.jpg",
  },
  {
    id: "ig-5",
    main: "/abayas/abaya-ig5.jpg",
    badge1: "/abayas/abaya-ig1.jpg",
    badge2: "/abayas/abaya-ig2.jpg",
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = slides.length;
  const heroVideoElsRef = useRef({});
  const focusScrollRef = useRef(null);
  const mustHavesScrollRef = useRef(null);
  const topsScrollRef = useRef(null);
  const footwearScrollRef = useRef(null);
  const newTrendingScrollRef = useRef(null);
  const igCommunityScrollRef = useRef(null);
  const [topsTab, setTopsTab] = useState("abayas");

  const lastScrollY = useRef(0);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [navHidden, setNavHidden] = useState(false);
  const [navSolid, setNavSolid] = useState(false);

  const updateNavOnScroll = useCallback(() => {
    const y = window.scrollY;
    const prev = lastScrollY.current;
    const atTop = y < SCROLL_TOP_EPS;

    setScrollY(y);
    setIsAtTop(atTop);

    if (atTop) {
      setScrollDirection(null);
      setNavHidden(false);
      setNavSolid(false);
      lastScrollY.current = y;
      return;
    }

    const delta = y - prev;
    if (Math.abs(delta) >= 2) {
      setScrollDirection(delta > 0 ? "down" : "up");
      if (delta > 0) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
        setNavSolid(true);
      }
    }

    lastScrollY.current = y;
  }, []);

  useLayoutEffect(() => {
    const y = typeof window !== "undefined" ? window.scrollY : 0;
    lastScrollY.current = y;
    setScrollY(y);
    if (y < SCROLL_TOP_EPS) {
      setIsAtTop(true);
      setScrollDirection(null);
      setNavHidden(false);
      setNavSolid(false);
    } else {
      setIsAtTop(false);
      setScrollDirection(null);
      setNavHidden(false);
      setNavSolid(true);
    }
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateNavOnScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [updateNavOnScroll]);

  useEffect(() => {
    const current = slides[activeIndex];
    const delay =
      typeof current.durationMs === "number"
        ? current.durationMs
        : current.kind === "video"
          ? VIDEO_SLIDE_MS
          : IMAGE_SLIDE_MS;
    const id = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount);
    }, delay);
    return () => clearTimeout(id);
  }, [activeIndex, slideCount]);

  useEffect(() => {
    slides.forEach((slide, i) => {
      if (slide.kind !== "video") return;
      const v = heroVideoElsRef.current[i];
      if (!v) return;
      if (activeIndex === i) {
        const playPromise = v.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } else {
        v.pause();
      }
    });
  }, [activeIndex]);

  useEffect(() => {
    const el = focusScrollRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const prev = el.scrollLeft;
      const raw = prev + e.deltaY;
      if (raw < 0 && prev <= 0) return;
      if (raw > max && prev >= max) return;
      el.scrollLeft = Math.max(0, Math.min(max, raw));
      e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const el = mustHavesScrollRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const prev = el.scrollLeft;
      const raw = prev + e.deltaY;
      if (raw < 0 && prev <= 0) return;
      if (raw > max && prev >= max) return;
      el.scrollLeft = Math.max(0, Math.min(max, raw));
      e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const el = topsScrollRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const prev = el.scrollLeft;
      const raw = prev + e.deltaY;
      if (raw < 0 && prev <= 0) return;
      if (raw > max && prev >= max) return;
      el.scrollLeft = Math.max(0, Math.min(max, raw));
      e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const el = footwearScrollRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const prev = el.scrollLeft;
      const raw = prev + e.deltaY;
      if (raw < 0 && prev <= 0) return;
      if (raw > max && prev >= max) return;
      el.scrollLeft = Math.max(0, Math.min(max, raw));
      e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const el = newTrendingScrollRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const prev = el.scrollLeft;
      const raw = prev + e.deltaY;
      if (raw < 0 && prev <= 0) return;
      if (raw > max && prev >= max) return;
      el.scrollLeft = Math.max(0, Math.min(max, raw));
      e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const el = igCommunityScrollRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const prev = el.scrollLeft;
      const raw = prev + e.deltaY;
      if (raw < 0 && prev <= 0) return;
      if (raw > max && prev >= max) return;
      el.scrollLeft = Math.max(0, Math.min(max, raw));
      e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const trackTransform = `translateX(calc(-${activeIndex} * 100% / ${slideCount}))`;

  const heroNavClassName = [
    "hero-nav",
    isAtTop ? "hero-nav--at-top" : "",
    !isAtTop && navSolid && !navHidden ? "hero-nav--solid" : "",
    !isAtTop && navHidden ? "hero-nav--hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main className="home-layout">
      <header
        className={heroNavClassName}
        data-scroll-y={scrollY}
        data-scroll-dir={scrollDirection ?? ""}
      >
        <div className="hero-nav__start">
          <button
            type="button"
            className="hero-nav__icon-btn"
            aria-label="Open menu"
          >
            <span className="hero-nav__burger" aria-hidden="true" />
          </button>
          <a className="hero-nav__brand" href="/">
            <span className="hero-nav__logo-stack">
              <span className="hero-nav__logo-word">Royal Abayas</span>
              {/* <span className="hero-nav__logo-tag">EST. 1996</span> */}
            </span>
          </a>
        </div>

        <nav className="hero-nav__center" aria-label="Shop categories">
          <ul className="hero-nav__links">
            <li>
              <a href="#" className="hero-nav__link hero-nav__link--active">
                Abayas
              </a>
            </li>
            <li>
              <a href="#" className="hero-nav__link">
                Hijabs
              </a>
            </li>
            <li>
              <a href="#" className="hero-nav__link">
                Kaftans
              </a>
            </li>
          </ul>
        </nav>

        <div className="hero-nav__end">
          <a href="#" className="hero-nav__search" aria-label="Search">
            <svg
              className="hero-nav__search-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M16.5 16.5 21 21"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <span className="hero-nav__search-label">Search</span>
          </a>
          <a href="#" className="hero-nav__icon-btn" aria-label="Account">
            <svg
              className="hero-nav__glyph"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M5 20a7 7 0 0 1 14 0"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </a>
          <a href="#" className="hero-nav__icon-btn" aria-label="Shopping bag">
            <svg
              className="hero-nav__glyph"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 8h12l-1 12H7L6 8Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <path
                d="M9 8V6a3 3 0 0 1 6 0v2"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </div>
      </header>

      <section
        className="hero hero--parallax"
        aria-roledescription="carousel"
        aria-label="Featured collections"
      >
      <div className="hero__carousel" aria-hidden="true">
        <div
          className="hero__carousel-track"
          style={{
            width: `${slideCount * 100}%`,
            transform: trackTransform,
          }}
        >
          {slides.map((slide, slideIndex) => (
            <div
              key={slide.id}
              className="hero__carousel-slide"
              style={{ flex: `0 0 ${100 / slideCount}%` }}
            >
              {slide.kind === "video" ? (
                <video
                  ref={(el) => {
                    if (el) heroVideoElsRef.current[slideIndex] = el;
                    else delete heroVideoElsRef.current[slideIndex];
                  }}
                  className="hero__carousel-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  controls={false}
                  aria-hidden
                >
                  <source src={slide.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={slide.src}
                  alt=""
                  className="hero__carousel-image"
                  draggable={false}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero-nav-spacer" aria-hidden="true" />

      <div className="hero__main" aria-live="polite" aria-atomic="true">
        <h1 className="hero__title" key={slides[activeIndex].id}>
          {slides[activeIndex].title}
        </h1>
      </div>

      <div className="hero__dots" role="tablist" aria-label="Hero slides">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            className={
              "hero__dot" + (i === activeIndex ? " hero__dot--active" : "")
            }
            onClick={() => setActiveIndex(i)}
            aria-label={`Show slide: ${slide.dotLabel}`}
          />
        ))}
      </div>
    </section>

      <section className="category-strip" aria-labelledby="category-strip-heading">
        <h2 id="category-strip-heading" className="category-strip__heading">
          Shop by category
        </h2>
        <div className="category-strip__scroll">
          <ul className="category-strip__grid">
            {categoryStrip.map((cat) => (
              <li key={cat.label} className="category-strip__item">
                <a className="category-strip__link" href={cat.href}>
                  <img
                    src={cat.src}
                    alt=""
                    className="category-strip__img"
                    width={480}
                    height={640}
                    draggable={false}
                  />
                  <span className="category-strip__label">{cat.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="focus-section"
        aria-labelledby="focus-section-title"
      >
        <div className="focus-section__inner">
          <div className="focus-section__col-editorial">
            <img
              src="/abayas/abaya-editorial-focus.jpg"
              alt=""
              className="focus-section__editorial-img"
              width={600}
              height={1000}
              draggable={false}
            />
          </div>

          <div className="focus-section__col-main">
            <div
              className="focus-section__product-scroll"
              ref={focusScrollRef}
              tabIndex={0}
              role="region"
              aria-label="Featured products"
            >
              <ul className="focus-section__product-row">
                {focusProducts.map((p) => (
                  <li key={p.id} className="focus-section__card">
                    <a className="focus-section__card-link" href="#">
                      <div className="focus-section__card-visual">
                        <img
                          src={p.img}
                          alt=""
                          className="focus-section__card-img"
                          width={400}
                          height={520}
                          draggable={false}
                        />
                        <span
                          className="focus-section__card-overlay"
                          aria-hidden="true"
                        >
                          <span className="focus-section__card-overlay-label">
                            Add to Basket
                          </span>
                          <svg
                            className="focus-section__card-overlay-icon"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M6 8h12l-1 12H7L6 8Z"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9 8V6a3 3 0 0 1 6 0v2"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="focus-section__card-body">
                        <p className="focus-section__card-name">{p.name}</p>
                        <p className="focus-section__card-fit">{p.fit}</p>
                        {p.priceWas ? (
                          <p className="focus-section__card-price">
                            <span className="focus-section__price-was">
                              {p.priceWas}
                            </span>{" "}
                            <strong className="focus-section__price-now">
                              {p.price}
                            </strong>
                            {p.savePct ? (
                              <span className="focus-section__price-save">
                                {" "}
                                -{p.savePct}
                              </span>
                            ) : null}
                          </p>
                        ) : (
                          <p className="focus-section__card-price">
                            <strong>{p.price}</strong>
                          </p>
                        )}
                        <div
                          className="focus-section__swatches"
                          aria-hidden="true"
                        >
                          {p.swatches.map((c) => (
                            <span
                              key={c}
                              className="focus-section__swatch"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="focus-section__footer">
              <div className="focus-section__footer-left">
                <h2 id="focus-section-title" className="focus-section__title">
                  CATEGORIES IN FOCUS
                </h2>
                <nav
                  className="focus-section__nav"
                  aria-label="Categories in focus"
                >
                  <ul>
                    <li>
                      <a
                        href="#"
                        className="focus-section__nav-link focus-section__nav-link--active"
                      >
                        Abayas &amp; Hijabs
                      </a>
                    </li>
                    <li>
                      <a href="#" className="focus-section__nav-link">
                        Kaftans
                      </a>
                    </li>
                    <li>
                      <a href="#" className="focus-section__nav-link">
                        Modest Sets
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <a href="#" className="focus-section__cta">
                Shop all
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        className="denim-editorial"
        aria-labelledby="denim-editorial-heading"
      >
        <div className="denim-editorial__inner">
          <div className="denim-editorial__copy">
            <h2 id="denim-editorial-heading" className="denim-editorial__title">
              ABAYA
            </h2>
            <p className="denim-editorial__text">
              WHEN WE THINK ABOUT ABAYAS, WE THINK ABOUT ELEGANCE, COMFORT, AND
              MODEST BEAUTY. EACH PIECE IS DESIGNED WITH FLOWING SILHOUETTES,
              PREMIUM FABRICS, AND TIMELESS DETAILS FOR WOMEN WHO WANT CONFIDENCE,
              GRACE, AND EVERYDAY STYLE.
            </p>
            <a href="#" className="denim-editorial__cta">
              VIEW ALL →
            </a>
          </div>
        </div>
        <div className="denim-editorial__visual">
          <img
            src="/abayas/abaya-editorial-banner.jpg"
            alt=""
            className="denim-editorial__img"
            width={2400}
            height={900}
            draggable={false}
          />
        </div>
      </section>

      <section className="shop-style" aria-labelledby="shop-style-heading">
        <div className="shop-style__grid">
          <div className="shop-style__cell">
            <img
              src="/abayas/abaya-shop1.jpg"
              alt=""
              className="shop-style__img"
              width={480}
              height={640}
              draggable={false}
            />
          </div>
          <div className="shop-style__cell">
            <img
              src="/abayas/abaya-shop2.jpg"
              alt=""
              className="shop-style__img"
              width={480}
              height={640}
              draggable={false}
            />
          </div>
          <div className="shop-style__cell">
            <img
              src="/abayas/abaya-shop3.jpg"
              alt=""
              className="shop-style__img"
              width={480}
              height={640}
              draggable={false}
            />
          </div>
          <div className="shop-style__cell">
            <img
              src="/abayas/abaya-shop4.jpg"
              alt=""
              className="shop-style__img"
              width={480}
              height={640}
              draggable={false}
            />
          </div>
        </div>
        <div className="shop-style__inner">
          <div className="shop-style__copy">
            <h2 id="shop-style-heading" className="shop-style__title">
              SHOP THE STYLE
            </h2>
            <p className="shop-style__text">
              LOOKS THAT SPEAK GRACE. FLOWING LAYERS, CLEAN SILHOUETTES, AND
              EFFORTLESS MODEST ELEGANCE.
            </p>
            <a href="#" className="shop-style__cta">
              VIEW ALL →
            </a>
          </div>
        </div>
      </section>

      <section className="must-haves" aria-labelledby="must-haves-heading">
        <div
          className="must-haves__scroll"
          ref={mustHavesScrollRef}
          tabIndex={0}
          role="region"
          aria-label="Must-haves"
        >
          <ul className="must-haves__row">
            {mustHaveSlides.map((item) => (
              <li key={item.id} className="must-haves__card">
                <a href="#" className="must-haves__card-link">
                  <div className="must-haves__visual">
                    <img
                      src={item.src}
                      alt=""
                      className="must-haves__img"
                      width={480}
                      height={640}
                      draggable={false}
                    />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="must-haves__inner">
          <div className="must-haves__copy">
            <h2 id="must-haves-heading" className="must-haves__title">
              MUST-HAVES
            </h2>
            <p className="must-haves__text">
              CURATED ABAYA AND MODEST ESSENTIALS — SOFT DRAPES, REFINED
              DETAILING, AND VERSATILE PIECES MADE FOR PRAYER, WORK, AND EVERYDAY
              GRACE.
            </p>
          </div>
        </div>
      </section>

      <section className="tops-carousel" aria-label="Abayas and modest essentials">
        <div className="tops-carousel__inner">
          <nav className="tops-carousel__tabs" aria-label="Shop categories">
            <ul className="tops-carousel__tabs-list">
              {topsCarouselTabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    type="button"
                    className={
                      "tops-carousel__tab" +
                      (topsTab === tab.id ? " tops-carousel__tab--active" : "")
                    }
                    onClick={() => setTopsTab(tab.id)}
                    aria-pressed={topsTab === tab.id}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div
            className="tops-carousel__scroll"
            ref={topsScrollRef}
            tabIndex={0}
            role="region"
            aria-label="Product carousel"
          >
            <ul className="tops-carousel__row">
              {topsCarouselProducts.map((p) => (
                <li key={p.id} className="tops-carousel__card">
                  <a className="tops-carousel__card-link" href="#">
                    <div className="tops-carousel__card-visual">
                      <img
                        src={p.img}
                        alt=""
                        className="tops-carousel__card-img"
                        width={440}
                        height={560}
                        draggable={false}
                      />
                      <span
                        className="tops-carousel__card-overlay"
                        aria-hidden="true"
                      >
                        <span className="tops-carousel__card-overlay-label">
                          Add to Basket
                        </span>
                        <svg
                          className="tops-carousel__card-overlay-icon"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M6 8h12l-1 12H7L6 8Z"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 8V6a3 3 0 0 1 6 0v2"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="tops-carousel__card-body">
                      <p className="tops-carousel__card-name">{p.name}</p>
                      <p className="tops-carousel__card-fit">{p.fit}</p>
                      <p className="tops-carousel__card-price">
                        <strong>{p.price}</strong>
                      </p>
                      <div
                        className="tops-carousel__swatches"
                        aria-hidden="true"
                      >
                        {p.swatches.map((c) => (
                          <span
                            key={c}
                            className="tops-carousel__swatch"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="tops-carousel__footer">
            <a href="#" className="tops-carousel__view-all" aria-label="View all products">
              <span className="tops-carousel__view-all-text">VIEW ALL</span>
              <span className="tops-carousel__view-all-arrow" aria-hidden="true">
                <svg
                  className="tops-carousel__view-all-icon"
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 4h10.5M9.5 0.5 13 4l-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section
        className="footwear-editorial"
        aria-labelledby="footwear-editorial-heading"
      >
        <div className="footwear-editorial__inner">
          <div className="footwear-editorial__copy">
            <h2 id="footwear-editorial-heading" className="footwear-editorial__title">
              ACCESSORIES
            </h2>
            <p className="footwear-editorial__text">
              ELEVATE YOUR MODEST WARDROBE WITH HIJABS, BAGS, AND TIMELESS
              ACCESSORIES DESIGNED FOR EVERYDAY ELEGANCE.
            </p>
            <a href="#" className="footwear-editorial__cta">
              VIEW ALL →
            </a>
          </div>
        </div>
        <div className="footwear-editorial__visual">
          <img
            src="/abayas/abaya-accessories-banner.jpg"
            alt=""
            className="footwear-editorial__img"
            width={2400}
            height={1000}
            draggable={false}
          />
          <div className="footwear-editorial__scrim" aria-hidden="true" />
          <div className="footwear-editorial__overlay">
            <p className="footwear-editorial__overlay-title" aria-hidden="true">
              ACCESSORIES
            </p>
          </div>
        </div>
      </section>

      <section className="footwear-carousel" aria-label="Accessories products">
        <div
          className="footwear-carousel__scroll"
          ref={footwearScrollRef}
          tabIndex={0}
          role="region"
          aria-label="Accessories carousel"
        >
          <ul className="footwear-carousel__row">
            {footwearCarouselProducts.map((p) => (
              <li key={p.id} className="footwear-carousel__card">
                <a className="footwear-carousel__card-link" href="#">
                  <div className="footwear-carousel__card-visual">
                    <img
                      src={p.img}
                      alt=""
                      className="footwear-carousel__card-img"
                      width={440}
                      height={560}
                      draggable={false}
                    />
                    <span
                      className="footwear-carousel__card-overlay"
                      aria-hidden="true"
                    >
                      <span className="footwear-carousel__card-overlay-label">
                        Add to Basket
                      </span>
                      <svg
                        className="footwear-carousel__card-overlay-icon"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 8h12l-1 12H7L6 8Z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 8V6a3 3 0 0 1 6 0v2"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="footwear-carousel__card-body">
                    <p className="footwear-carousel__card-name">{p.name}</p>
                    <p className="footwear-carousel__card-fit">{p.fit}</p>
                    <p className="footwear-carousel__card-price">
                      <strong>{p.price}</strong>
                    </p>
                    <div
                      className="footwear-carousel__swatches"
                      aria-hidden="true"
                    >
                      {p.swatches.map((c) => (
                        <span
                          key={c}
                          className="footwear-carousel__swatch"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="new-trending"
        aria-labelledby="new-trending-heading"
      >
        <div className="new-trending__inner">
          <div className="new-trending__copy">
            <h2 id="new-trending-heading" className="new-trending__title">
              NEW &amp; TRENDING ABAYAS
            </h2>
            <p className="new-trending__text">
              JUST LAUNCHED ABAYAS AND MODEST SETS INSPIRED BY WHAT&apos;S ELEVATED
              NOW — CRAFTED FOR WOMEN WHO LOVE STAYING AHEAD WITH GRACE AND
              REFINEMENT.
            </p>
            <a href="#" className="new-trending__cta">
              VIEW ALL →
            </a>
          </div>
        </div>
        <div
          className="new-trending__scroll"
          ref={newTrendingScrollRef}
          tabIndex={0}
          role="region"
          aria-label="New and trending products"
        >
          <ul className="new-trending__row">
            {newTrendingProducts.map((p) => (
              <li key={p.id} className="new-trending__card">
                <a className="new-trending__card-link" href="#">
                  <div className="new-trending__card-visual">
                    <img
                      src={p.img}
                      alt=""
                      className="new-trending__card-img"
                      width={900}
                      height={1125}
                      draggable={false}
                    />
                    <span
                      className="new-trending__card-overlay"
                      aria-hidden="true"
                    >
                      <span className="new-trending__card-overlay-label">
                        Add to Basket
                      </span>
                      <svg
                        className="new-trending__card-overlay-icon"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 8h12l-1 12H7L6 8Z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 8V6a3 3 0 0 1 6 0v2"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="new-trending__card-body">
                    <p className="new-trending__card-name">{p.name}</p>
                    <p className="new-trending__card-fit">{p.fit}</p>
                    <p className="new-trending__card-price">
                      <strong>{p.price}</strong>
                    </p>
                    <div
                      className="new-trending__swatches"
                      aria-hidden="true"
                    >
                      {p.swatches.map((c) => (
                        <span
                          key={c}
                          className="new-trending__swatch"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="last-chance-banner"
        aria-labelledby="last-chance-heading"
      >
        <div className="last-chance-banner__visual">
          <img
            src="mul.png"
            alt=""
            className="last-chance-banner__img"
            width={2400}
            height={800}
            draggable={false}
          />
          <div className="last-chance-banner__scrim" aria-hidden="true" />
          <div className="last-chance-banner__overlay">
            <h2 id="last-chance-heading" className="last-chance-banner__title">
              LAST CHANCE
            </h2>
            <p className="last-chance-banner__sub">
              ABAYAS UP TO 50% OFF*
            </p>
          </div>
        </div>
      </section>

      <section
        className="ig-community"
        aria-labelledby="ig-community-heading"
      >
        <header className="ig-community__header">
          <h2 id="ig-community-heading" className="ig-community__title">
            EXPLORE HOW OUR COMMUNITY STYLES IT
          </h2>
          <a
            href="https://www.instagram.com/"
            className="ig-community__cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            INSTAGRAM →
          </a>
        </header>
        <div
          className="ig-community__scroll"
          ref={igCommunityScrollRef}
          tabIndex={0}
          role="region"
          aria-label="Community style gallery"
        >
          <ul className="ig-community__row">
            {instagramCommunityItems.map((item) => (
              <li key={item.id} className="ig-community__card">
                <a
                  href="https://www.instagram.com/"
                  className="ig-community__card-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="ig-community__visual">
                    <img
                      src={item.main}
                      alt=""
                      className="ig-community__img"
                      width={560}
                      height={900}
                      draggable={false}
                    />
                    <div
                      className="ig-community__gradient"
                      aria-hidden="true"
                    />
                    <div className="ig-community__badges" aria-hidden="true">
                      <div className="ig-community__badge-pill">
                        <span className="ig-community__avatar">
                          <img
                            src={item.badge1}
                            alt=""
                            width={64}
                            height={64}
                            draggable={false}
                          />
                        </span>
                        <span className="ig-community__avatar">
                          <img
                            src={item.badge2}
                            alt=""
                            width={64}
                            height={64}
                            draggable={false}
                          />
                        </span>
                        <span className="ig-community__more">+1</span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="split-banner" aria-label="Abaya and hijab collections">
        <div className="split-banner__grid">
          <a className="split-banner__cell" href="#">
            <div className="split-banner__media">
              <img
                className="split-banner__img"
                src="/abayas/abaya-split-women.jpg"
                alt=""
                width={1200}
                height={1600}
                draggable={false}
              />
              <div
                className="split-banner__hover-dim"
                aria-hidden="true"
              />
            </div>
            <div className="split-banner__overlay">
              <span className="split-banner__label">ABAYA COLLECTION</span>
            </div>
          </a>
          <a className="split-banner__cell" href="#">
            <div className="split-banner__media">
              <img
                className="split-banner__img"
                src="/abayas/abaya-split-hijab.jpg"
                alt=""
                width={1200}
                height={1600}
                draggable={false}
              />
              <div
                className="split-banner__hover-dim"
                aria-hidden="true"
              />
            </div>
            <div className="split-banner__overlay">
              <span className="split-banner__label">HIJAB COLLECTION</span>
            </div>
          </a>
        </div>
      </section>

      <div className="home-scroll-pad" aria-hidden="true" />

      <footer className="site-footer">
        <section
          className="site-footer__newsletter"
          aria-labelledby="site-footer-newsletter-heading"
        >
          <div className="site-footer__newsletter-inner">
            <h2
              id="site-footer-newsletter-heading"
              className="site-footer__newsletter-headline"
            >
              BE THE FIRST TO KNOW
            </h2>
            <div className="site-footer__newsletter-form-wrap">
              <p className="site-footer__newsletter-sub">
                GET AN UPDATE OF ALL OUR LATEST COLLECTIONS, DISCOUNTS &amp;
                FEATURES COMING UP
              </p>
              <form
                className="site-footer__form"
                onSubmit={(e) => e.preventDefault()}
              >
                <label className="site-footer__label" htmlFor="footer-email">
                  ENTER YOUR EMAIL
                </label>
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  className="site-footer__input"
                  autoComplete="email"
                  placeholder=""
                />
                <button type="submit" className="site-footer__submit">
                  SIGN ME UP!
                </button>
              </form>
            </div>
          </div>
        </section>

        <div className="site-footer__dark">
          <div className="site-footer__dark-inner">
            <div className="site-footer__dark-row">
              <a href="/" className="site-footer__brand">
                <span className="hero-nav__logo-stack">
                  <span className="hero-nav__logo-word">Royal Abayas</span>
                  {/* <span className="hero-nav__logo-tag">EST. 1996</span> */}
                </span>
              </a>
              <div className="site-footer__links">
                <ul>
                  <li>
                    <a href="#">Shopping Guide</a>
                  </li>
                  <li>
                    <a href="#">Log In/Sign Up</a>
                  </li>
                  <li>
                    <a href="#">Exchange &amp; Returns</a>
                  </li>
                  <li>
                    <a href="#">Shipping &amp; Deliveries</a>
                  </li>
                  <li>
                    <a href="#">How To Buy</a>
                  </li>
                  <li>
                    <a href="#">Payment</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Retail Stores</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
            <p className="site-footer__copy">
              Created by{" "}
              <a
                href="https://www.logisol.tech/"
                className="site-footer__copy-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Logisol Technologies
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
