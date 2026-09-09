import React, { useMemo, useState } from "react";
import { GhomeBar, GhomeFoot } from "../chrome";
import { SharedLightbox, useT } from "../../src";
import wave from "../../demo/gallery/frg-greatwave.jpg";
import starry from "../../demo/gallery/frg-starrynight.jpg";
import waterlilies from "../../demo/gallery/frg-waterlilies.jpg";
import athens from "../../demo/gallery/frg-athens.jpg";
import windowsill from "../../demo/gallery/frg-windowsill.jpg";
import catCream from "../../audit/harness-v0.1/references/cat-cream-reference.jpg";
import catBlue from "../../audit/harness-v0.1/references/cat-blue-reference.jpg";
import "./gallery.css";

type Cat = "scenery" | "portrait" | "daily" | "paintings";
const ITEMS: { no: string; en: string; zh: string; cat: Cat; src: string;
  meta: string; desc: [string, string] }[] = [
  { no: "01", en: "The Great Wave", zh: "神奈川冲浪猫", cat: "scenery", src: wave,
    meta: "Ukiyo-e 浮世绘 · 2024",
    desc: ["Two cats keep perfectly still while the wave rises — after Hokusai.", "浪起，猫不动。致敬《神奈川冲浪里》。"] },
  { no: "02", en: "Starry Night", zh: "星月夜猫", cat: "scenery", src: starry,
    meta: "Post-impression 后印象 · 2024",
    desc: ["A blue cat watches the swirls from the rooftop.", "蓝灰那只坐在尖顶屋顶，看旋涡星云。"] },
  { no: "03", en: "Water Lilies", zh: "睡莲中的猫", cat: "scenery", src: waterlilies,
    meta: "Impression 印象 · 2024",
    desc: ["One on the bridge, one on the bank.", "一只占桥，一只守岸。"] },
  { no: "04", en: "The School", zh: "雅典学院猫", cat: "paintings", src: athens,
    meta: "Renaissance 文艺复兴 · 2024",
    desc: ["Seated like philosophers, surrounded by scholars.", "台阶正中并肩而坐，如两位哲学家。"] },
  { no: "05", en: "Windowsill", zh: "窗台", cat: "daily", src: windowsill,
    meta: "Daily Life 日常 · 2024",
    desc: ["Watching the world go by, together.", "并排看窗外， world 慢慢经过。"] },
  { no: "06", en: "Golden Coat", zh: "万万 · 蓝金渐层", cat: "portrait", src: catCream,
    meta: "Portrait 肖像 · Real",
    desc: ["The bold one. Moves first, purrs loudest.", "社牛那只。先动，呼噜最响。"] },
  { no: "07", en: "Blue Point", zh: "千千 · 重点色", cat: "portrait", src: catBlue,
    meta: "Portrait 肖像 · Real",
    desc: ["The quiet one. Watches, then decides.", "慢热那只。先看着，再决定。"] },
];
const CATS: { id: "all" | Cat; label: string }[] = [
  { id: "all", label: "All 全部" }, { id: "scenery", label: "Scenery 风景" },
  { id: "portrait", label: "Portrait 肖像" }, { id: "paintings", label: "Paintings 画作" },
  { id: "daily", label: "Daily Life 日常" },
];

/** G03 · Golden Gallery —— 图片即主视觉；筛选/元数据低存在感；Lightbox 走共享过渡。 */
export function GoldenGallery() {
  const t = useT();
  const [filter, setFilter] = useState<"all" | Cat>("all");
  const [sel, setSel] = useState(0);
  const [zoom, setZoom] = useState(false);
  const items = useMemo(() => ITEMS.filter((i) => filter === "all" || i.cat === filter), [filter]);
  const cur = items[Math.min(sel, items.length - 1)];
  const step = (d: number) => setSel((v) => (v + d + items.length) % items.length);

  return (
    <div className="ghome ggallery">
      <GhomeBar active="gallery" />

      <section className="ghome__hero gg-hero">
        <div className="ghome__hero-shade" />
        <div className="ghome__hero-copy">
          <p className="ghome__kicker">
            <span>GALLERY</span><span>画廊</span>
          </p>
          <h1 className="ghome__display">
            A Kinder<br />Perspective
            <span className="ghome__display-zh">更温柔的视角</span>
          </h1>
          <p className="ghome__lead-en">
            Moments with cats, landscapes, and quiet details — a visual collection
            from the world of Fragrance UI.
          </p>
          <p className="ghome__lead-zh">与猫咪、自然风景和安静的细节相遇——来自 Fragrance UI 的视觉收藏。</p>
          <a className="ghome__btn pri" href="#golden/article" style={{ marginTop: 24 }}>
            View the Story<span>查看故事</span>
          </a>
        </div>
      </section>

      <div className="gg-filters">
        <div className="gg-chips">
          {CATS.map((c) => (
            <button key={c.id} className={filter === c.id ? "on" : ""}
              onClick={() => { setFilter(c.id); setSel(0); }}>{c.label}</button>
          ))}
        </div>
        <span className="gg-count">{items.length} items <span>个作品</span></span>
      </div>

      <main className="gg-main">
        <div className="gg-grid">
          {items.map((it, i) => (
            <figure key={it.no} className={"gg-item" + (i === sel ? " on" : "")}
              tabIndex={0} onClick={() => setSel(i)}
              onKeyDown={(e) => e.key === "Enter" && setSel(i)}>
              <img src={it.src} alt={it.en} loading="lazy" />
              <figcaption>
                <b>{it.no}</b> {it.en} <span>{it.zh}</span>
                <em>{it.cat.toUpperCase()}</em>
              </figcaption>
            </figure>
          ))}
        </div>

        <aside className="gg-detail">
          <div className="gg-detail__imgwrap" onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
            e.currentTarget.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
          }}>
            <img src={cur.src} alt={cur.en} />
            <button className="gg-arrow l" onClick={() => step(-1)} aria-label="previous">←</button>
            <button className="gg-arrow r" onClick={() => step(1)} aria-label="next">→</button>
          </div>
          <p className="gg-detail__no">{cur.no} / {String(ITEMS.length).padStart(2, "0")}
            <b> / {cur.en} {cur.zh}</b></p>
          <p className="gg-detail__desc">{cur.desc[0]}<span>{cur.desc[1]}</span></p>
          <p className="gg-detail__meta">▤ {cur.meta}</p>
          <button className="gg-larger" onClick={() => setZoom(true)}>View Larger 放大查看 ↗</button>
          <p className="gg-hand">Cats make<br />better ideas.<span>猫咪，让好想法发生。</span></p>
        </aside>
      </main>

      <SharedLightbox open={zoom} onClose={() => setZoom(false)}
        src={cur.src} alt={cur.en}
        caption={`${cur.no} · ${cur.en} ${cur.zh} · ${cur.meta}`}
        origin={document.querySelector(".gg-detail__imgwrap img")?.getBoundingClientRect() ?? null} />

      <GhomeFoot />
    </div>
  );
}
