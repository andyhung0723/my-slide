import { useEffect, useRef, type ReactNode } from 'react';
import {
  Step,
  Steps,
  useIsActivePage,
  useSlidePageNumber,
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
} from '@open-slide/core';

import aiShot from './assets/ai-ui.png';
import figmaShot from './assets/figma-design-system.png';
import realShot from './assets/real-ui.png';

const storybookClip = new URL('./assets/storybook.mp4', import.meta.url).href;

// ─── Panel-tweakable design tokens ────────────────────────────────────────────
export const design: DesignSystem = {
  palette: {
    bg: '#F5F2EA',
    text: '#1C1917',
    accent: '#FF5A00',
  },
  fonts: {
    display:
      '"PingFang TC", "Noto Sans TC", "Hiragino Sans TC", system-ui, -apple-system, sans-serif',
    body: '"PingFang TC", "Noto Sans TC", "Hiragino Sans TC", system-ui, -apple-system, sans-serif',
  },
  typeScale: {
    hero: 132,
    body: 36,
  },
  radius: 4,
};

// ─── Local constants (outside what the Design panel exposes) ──────────────────
const c = {
  paper: '#FFFDF8',
  ink2: '#4A443C',
  muted: '#8C8578',
  rule: '#D9D2C4',
  accentWash: 'rgba(255, 90, 0, 0.08)',
  accentInk: '#C43F00',
  ok: '#2F7D5B',
  lane: 'rgba(28, 25, 23, 0.035)',
};

const mono = '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace';

const fill = {
  width: '100%',
  height: '100%',
  fontFamily: 'var(--osd-font-body)',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
} as const;

const PAD_X = 130;

// ─── Shared primitives ────────────────────────────────────────────────────────

/** Highlighter swipe — the notebook motif. Reserved for the memorable lines. */
const Mark = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      background:
        'linear-gradient(to top, rgba(255,90,0,0.30) 0%, rgba(255,90,0,0.30) 44%, transparent 44%)',
      padding: '0 6px',
      boxDecorationBreak: 'clone',
      WebkitBoxDecorationBreak: 'clone',
    }}
  >
    {children}
  </span>
);

const Eyebrow = ({ text, tone }: { text: string; tone: string }) => (
  <span
    style={{
      fontFamily: mono,
      fontSize: 24,
      lineHeight: 1.4,
      letterSpacing: '0.16em',
      color: tone,
      whiteSpace: 'pre',
    }}
  >
    {text}
  </span>
);

const Footer = ({ note }: { note: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <footer style={{ flexShrink: 0 }}>
      <div style={{ height: 1, background: c.rule }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginTop: 16,
          fontFamily: mono,
          fontSize: 22,
          lineHeight: 1.4,
          color: c.muted,
          letterSpacing: '0.08em',
        }}
      >
        <span>{note}</span>
        <span>
          {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
    </footer>
  );
};

/**
 * Every content page shares one frame: mono eyebrow + hairline on top,
 * hairline + page number at the bottom. Content area is exactly 729px tall.
 */
const Frame = ({
  chapter,
  aside,
  footer,
  tone = 'var(--osd-accent)',
  children,
}: {
  chapter: string;
  aside?: ReactNode;
  footer: string;
  tone?: string;
  children: ReactNode;
}) => (
  <div
    style={{
      ...fill,
      display: 'flex',
      flexDirection: 'column',
      padding: `88px ${PAD_X}px 76px`,
      boxSizing: 'border-box',
    }}
  >
    <header style={{ flexShrink: 0 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 18,
        }}
      >
        <Eyebrow text={chapter} tone={tone} />
        {aside}
      </div>
      <div style={{ height: 1, background: c.rule }} />
    </header>

    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: 46,
        marginBottom: 40,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>

    <Footer note={footer} />
  </div>
);

const H2 = ({ children, size = 68 }: { children: ReactNode; size?: number }) => (
  <h2
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: size,
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: '-0.01em',
      margin: 0,
      flexShrink: 0,
    }}
  >
    {children}
  </h2>
);

// ─── S1 · 封面 ────────────────────────────────────────────────────────────────

const Cover: Page = () => (
  <div
    style={{
      ...fill,
      display: 'flex',
      flexDirection: 'column',
      padding: `88px ${PAD_X}px 76px`,
      boxSizing: 'border-box',
    }}
  >
    <header style={{ flexShrink: 0 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 18,
        }}
      >
        <Eyebrow text="實驗心得" tone="var(--osd-accent)" />
      </div>
      <div style={{ height: 1, background: c.rule }} />
    </header>

    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: 46,
        marginBottom: 40,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
      <div
        style={{
          width: 220,
          height: 10,
          background: 'var(--osd-accent)',
          marginBottom: 48,
        }}
      />
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          fontWeight: 800,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          margin: 0,
        }}
      >
        AI 輔助協作 UI 研究
      </h1>
      <p
        style={{
          fontSize: 48,
          lineHeight: 1.4,
          color: c.ink2,
          margin: '40px 0 0',
          fontWeight: 500,
        }}
      >
        以 Web 工程師的角度思考
      </p>
      </div>

      <p
        style={{
          fontFamily: mono,
          fontSize: 30,
          lineHeight: 1.4,
          color: c.ink2,
          margin: 0,
          letterSpacing: '0.06em',
          textAlign: 'right',
          flexShrink: 0,
        }}
      >
        Andy
      </p>
    </div>

    <footer style={{ flexShrink: 0 }}>
      <div style={{ height: 1, background: c.rule }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginTop: 16,
          fontFamily: mono,
          fontSize: 22,
          lineHeight: 1.4,
          color: c.muted,
          letterSpacing: '0.08em',
        }}
      >
        <span>① 研究目的　② 研究過程　③ 遇到的問題　④ 心得</span>
      </div>
    </footer>
  </div>
);

// ─── S2 · 為什麼做這件事 ──────────────────────────────────────────────────────

const ChainArrow = () => (
  <div
    style={{
      fontFamily: mono,
      fontSize: 40,
      lineHeight: 1,
      color: c.muted,
      margin: '32px 0',
      height: 40,
    }}
  >
    ↓
  </div>
);

const Why: Page = () => (
  <Frame chapter="①　研究目的" footer="">
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Steps>
        <Step>
          <div
            style={{
              fontSize: 56,
              lineHeight: 1.35,
              fontWeight: 600,
              color: c.ink2,
            }}
          >
            隨著 AI 模型的快速成長，開發速度倍增
            <span style={{ color: 'var(--osd-accent)', fontFamily: mono }}> (?)</span>
          </div>
        </Step>
        <Step>
          <div>
            <ChainArrow />
            <div style={{ fontSize: 56, lineHeight: 1.35, fontWeight: 600, color: c.ink2 }}>
              Toby 老大丟出來的一個問題
            </div>
          </div>
        </Step>
        <Step>
          <div>
            <ChainArrow />
            <div
              style={{
                fontFamily: 'var(--osd-font-display)',
                fontSize: 112,
                lineHeight: 1.3,
                fontWeight: 800,
                letterSpacing: '-0.02em',
              }}
            >
              <Mark>那 UI 設計呢？</Mark>
            </div>
          </div>
        </Step>
      </Steps>
    </div>
  </Frame>
);

// ─── S3 · 出發點 ──────────────────────────────────────────────────────────────

const ShotLabel = ({ text, tone }: { text: string; tone: string }) => (
  <div
    style={{
      fontFamily: mono,
      fontSize: 24,
      lineHeight: 1.4,
      letterSpacing: '0.1em',
      color: tone,
      marginBottom: 14,
    }}
  >
    {text}
  </div>
);

// Keyframes can't be expressed inline — injected once per document, scoped by
// a slide-prefixed class. `--osd-pan` lets one keyframe serve both screenshots.
const SHOT_PAN_CSS = `
@keyframes aiuidf-shot-pan {
  0%, 10%  { transform: translateY(0); }
  50%, 60% { transform: translateY(calc(var(--aiuidf-pan, 0px) * -1)); }
  100%     { transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .aiuidf-shot-pan { animation: none !important; }
}
`;

if (typeof document !== 'undefined' && !document.getElementById('aiuidf-shot-pan')) {
  const style = document.createElement('style');
  style.id = 'aiuidf-shot-pan';
  style.textContent = SHOT_PAN_CSS;
  document.head.appendChild(style);
}

/**
 * Fixed frame so screenshots read as one controlled comparison; the image inside
 * pans down and back so the whole page gets seen. `overflow: hidden` here is a
 * deliberate image viewport, not a way to hide slide overflow.
 */
const Shot = ({
  src,
  alt,
  pan,
  w = 802,
  h = 456,
}: {
  src: string;
  alt: string;
  pan: number;
  w?: number;
  h?: number;
}) => {
  const active = useIsActivePage();
  return (
    <div
      style={{
        width: w,
        height: h,
        overflow: 'hidden',
        background: c.paper,
        border: `2px solid ${c.rule}`,
        borderRadius: 'var(--osd-radius)',
      }}
    >
      <img
        className="aiuidf-shot-pan"
        src={src}
        alt={alt}
        style={{
          display: 'block',
          width: '100%',
          ['--aiuidf-pan' as string]: `${pan}px`,
          animation: active ? 'aiuidf-shot-pan 18s ease-in-out infinite' : undefined,
        }}
      />
    </div>
  );
};

const Observation: Page = () => (
  <Frame chapter="②　研究過程　·　出發點" footer="">
    <H2 size={68}>AI 畫得很好看，但那不是我們的產品</H2>

    <div style={{ display: 'flex', gap: 56, marginTop: 40, flexShrink: 0 }}>
      <div style={{ width: 802 }}>
        <ShotLabel text="AI 隨手生的" tone={c.muted} />
        <Shot src={aiShot} alt="AI 隨手生出來的畫面" pan={203} />
      </div>
      <div style={{ width: 802 }}>
        <ShotLabel text="我們的產品" tone="var(--osd-accent)" />
        <Shot src={realShot} alt="我們產品的實際畫面" pan={451} />
      </div>
    </div>

    <Steps>
      <Step>
        <div style={{ fontSize: 40, lineHeight: 1.5, marginTop: 40, fontWeight: 600 }}>
          問題不在 AI 不夠強 ——{' '}
          <Mark>它強到會自由發揮，只是不知道我們的規則。</Mark>
        </div>
      </Step>
    </Steps>
  </Frame>
);

// ─── S4 · 想法 ────────────────────────────────────────────────────────────

const IdeaHead = ({ index, question }: { index: string; question: string }) => (
  <div>
    <div
      style={{
        fontFamily: mono,
        fontSize: 40,
        lineHeight: 1.2,
        color: 'var(--osd-accent)',
        letterSpacing: '0.04em',
      }}
    >
      {index}
    </div>
    {/* Fixed one-line box — all three titles are sized to fit 518px at 36px, and
        pinning the height keeps the underlines on one baseline. */}
    <div
      style={{
        fontSize: 36,
        lineHeight: 1.35,
        fontWeight: 700,
        marginTop: 18,
        height: 49,
      }}
    >
      {question}
    </div>
    <div style={{ height: 3, background: 'var(--osd-text)', marginTop: 20 }} />
  </div>
);

/** `second` renders a peer term/gloss pair — for a column that answers with two
 *  equally-weighted things rather than one thing plus supporting detail. */
const IdeaBody = ({
  term,
  gloss,
  details,
  second,
}: {
  term: string;
  gloss: string;
  details?: ReactNode;
  second?: { term: string; gloss: string };
}) => (
  <div>
    <div style={{ fontSize: 32, lineHeight: 1.3, fontWeight: 700 }}>{term}</div>
    <div style={{ fontSize: 30, lineHeight: 1.4, color: c.ink2, marginTop: 10 }}>{gloss}</div>

    {details ? (
      <div style={{ fontSize: 26, lineHeight: 1.6, color: c.muted, marginTop: 20 }}>{details}</div>
    ) : null}

    {second ? (
      <>
        <div style={{ height: 1, background: c.rule, margin: '22px 0' }} />
        <div style={{ fontSize: 32, lineHeight: 1.3, fontWeight: 700 }}>{second.term}</div>
        <div style={{ fontSize: 30, lineHeight: 1.4, color: c.ink2, marginTop: 10 }}>
          {second.gloss}
        </div>
      </>
    ) : null}
  </div>
);

const StatusLine = ({ mark, tone, text }: { mark: string; tone: string; text: string }) => (
  <div style={{ display: 'flex', gap: 10 }}>
    <span style={{ fontFamily: mono, color: tone, flexShrink: 0 }}>{mark}</span>
    <span>{text}</span>
  </div>
);

const Ideas: Page = () => (
  <Frame chapter="②　研究過程　·　想法" footer="">
    <H2 size={64}>想法</H2>

    {/* Grid rows put all three heads ahead of all three bodies in document
        order, so the reveal runs 標題 ①②③ then 內容 ①②③. */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        columnGap: 52,
        rowGap: 32,
        marginTop: 52,
        flexShrink: 0,
      }}
    >
      <Steps>
        <Step>
          <IdeaHead index="01" question="需要一套規範去限制 AI 的設計" />
        </Step>
        <Step>
          <IdeaHead index="02" question="vibe coding 時就大致符合設計" />
        </Step>
        <Step>
          <IdeaHead index="03" question="如何將這一切變成可複製的流程" />
        </Step>

        <Step>
          <IdeaBody
            term="Figma Design System"
            gloss="＝ 一套 UI 規範"
            details={
              <>
                <div>顏色、間距、元件</div>
                <div>全部先定好</div>
                <div style={{ color: 'var(--osd-accent)' }}>AI 只能從這裡面挑</div>
              </>
            }
          />
        </Step>
        <Step>
          <IdeaBody
            term="Storybook"
            gloss="＝ 前端元件的展示櫃"
            details={
              <>
                <div>每個元件長什麼樣</div>
                <div>有哪些狀態</div>
                <div style={{ color: 'var(--osd-accent)' }}>讓 AI 套用真實前端元件</div>
              </>
            }
          />
        </Step>
        <Step>
          <IdeaBody
            term="Figma ⇄ Storybook 同步"
            gloss="＝ 透過 Figma MCP 實現"
            second={{ term: 'skill', gloss: '＝ Storybook 元件 ＋ 設計師的 UX 心法' }}
          />
        </Step>
      </Steps>
    </div>

    <Steps>
      <Step>
        <div
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 52,
            lineHeight: 1.4,
            fontWeight: 800,
            marginTop: 44,
          }}
        >
          其實就是在做 <Mark>Harness</Mark>
        </div>
      </Step>
    </Steps>
  </Frame>
);

// ─── 名詞解釋 01–03 ───────────────────────────────────────────────────────────

const Gloss = ({ children }: { children: ReactNode }) => (
  <div style={{ fontSize: 36, lineHeight: 1.5, color: c.ink2, marginTop: 20, flexShrink: 0 }}>
    {children}
  </div>
);

const Punch = ({ children }: { children: ReactNode }) => (
  <div style={{ fontSize: 44, lineHeight: 1.45, fontWeight: 800, marginTop: 44 }}>{children}</div>
);

const TermDesignSystem: Page = () => (
  <Frame chapter="②　研究過程　·　名詞解釋 01" footer="">
    <H2 size={64}>Design System</H2>
    <Gloss>＝ 把顏色、間距、元件全部先定好的一套規範</Gloss>

    <div style={{ marginTop: 40, flexShrink: 0 }}>
      {/* 2625×1371 · fits the full 1660 width, so it pans vertically. */}
      <Shot
        src={figmaShot}
        alt="Figma 上的 Design System：Theme、Color、Typography"
        w={1660}
        h={420}
        pan={447}
      />
    </div>

    <Steps>
      <Step>
        <Punch>
          做畫面的時候，<Mark>只能從這裡面拿東西</Mark>
        </Punch>
      </Step>
    </Steps>
  </Frame>
);

/**
 * Restarts from the top each time you land on the page; paused off-page.
 *
 * `autoPlay` + `muted` + `playsInline` is what browsers actually honour without
 * a user gesture — the effect below only handles restart/pause, and retries once
 * the data is there because `play()` rejects while readyState is still 0.
 */
const StorybookClip = ({ w, h }: { w: number; h: number }) => {
  const active = useIsActivePage();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    if (!active) {
      // Thumbnails/overview render this page too — keep them from ever starting.
      v.pause();
      const stop = () => v.pause();
      v.addEventListener('play', stop);
      return () => v.removeEventListener('play', stop);
    }

    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      v.currentTime = 0;
      void v.play().catch(() => {});
    };

    if (v.readyState >= 2) start();
    else v.addEventListener('loadeddata', start, { once: true });

    return () => {
      cancelled = true;
      v.removeEventListener('loadeddata', start);
    };
  }, [active]);

  return (
    <video
      ref={ref}
      src={storybookClip}
      autoPlay={active}
      muted
      loop
      playsInline
      preload="auto"
      style={{
        display: 'block',
        width: w,
        height: h,
        objectFit: 'cover',
        background: c.paper,
        border: `2px solid ${c.rule}`,
        borderRadius: 'var(--osd-radius)',
      }}
    />
  );
};

const TermStorybook: Page = () => (
  <Frame chapter="②　研究過程　·　名詞解釋 02" footer="">
    <H2 size={64}>Storybook</H2>
    <Gloss>＝ 將 Design System 用前端元件呈現，加上狀態與功能</Gloss>

    <div style={{ display: 'flex', gap: 56, marginTop: 40, flexShrink: 0 }}>
      <StorybookClip w={952} h={535} />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 40,
        }}
      >
        <div style={{ fontSize: 48, lineHeight: 1.45, fontWeight: 800 }}>
          就是<Mark>真實 Angular 的元件</Mark>
        </div>
      </div>
    </div>
  </Frame>
);

const AttemptCard = ({
  index,
  name,
  stance,
  scale,
  agents,
  result,
  won,
}: {
  index: string;
  name: string;
  stance: string;
  scale: string;
  agents: string;
  result: string;
  won?: boolean;
}) => (
  <div
    style={{
      width: 526,
      boxSizing: 'border-box',
      padding: 28,
      background: won ? c.accentWash : c.paper,
      border: won ? '3px solid var(--osd-accent)' : `2px solid ${c.rule}`,
      borderRadius: 'var(--osd-radius)',
    }}
  >
    <div
      style={{
        fontFamily: mono,
        fontSize: 26,
        lineHeight: 1.3,
        letterSpacing: '0.08em',
        color: won ? c.accentInk : c.muted,
      }}
    >
      {index}
    </div>
    <div style={{ fontSize: 40, lineHeight: 1.3, fontWeight: 700, marginTop: 12 }}>{name}</div>
    <div style={{ fontSize: 30, lineHeight: 1.4, color: c.ink2, marginTop: 8 }}>{stance}</div>

    <div style={{ height: 2, background: won ? 'var(--osd-accent)' : c.rule, margin: '20px 0' }} />

    <div style={{ fontFamily: mono, fontSize: 26, lineHeight: 1.6, color: c.muted }}>
      <div>{scale}</div>
      <div>{agents}</div>
    </div>

    <div
      style={{
        fontSize: 30,
        lineHeight: 1.4,
        fontWeight: 700,
        marginTop: 20,
        color: won ? c.ok : c.ink2,
      }}
    >
      {result}
    </div>
  </div>
);

const Attempts: Page = () => (
  <Frame chapter="②　研究過程　·　實際做法 02" footer="">
    <H2 size={64}>使用 Storybook 套件進行 vibe code</H2>
    <Gloss>透過 skill 達成：Storybook 元件 ＋ 設計師的 UX 心法</Gloss>

    <div style={{ display: 'flex', gap: 40, marginTop: 44, flexShrink: 0, alignItems: 'flex-start' }}>
      <AttemptCard
        index="01"
        name="ds-craft"
        stance="把規則寫死，違規就擋下"
        scale="128 KB 規範 · 11 步流程"
        agents="3 支 Subagent · 1 支審查"
        result="✗ 規則守住了，設計還是不準"
      />
      <AttemptCard
        index="02"
        name="ds-studio"
        stance="補上 UX 階段與雙重審查"
        scale="144 KB 規範 · 9 階段 · 5 軌"
        agents="6 支 Subagent · 2 支審查"
        result="✗ 更慢更貴，一樣不準"
      />
      <AttemptCard
        index="03"
        name="ds-sense"
        stance="不擋不審，只當參考材料"
        scale="21 KB 規範 · 4 步"
        agents="0 支 Subagent · 0 支審查"
        result="✓ 反而準一點，也便宜"
        won
      />
    </div>

    <Steps>
      <Step>
        <Punch>
          管得越嚴，<Mark>AI 反而做得越差</Mark>
        </Punch>
      </Step>
    </Steps>
  </Frame>
);

// Diagram geometry. Node widths and gaps are asymmetric: the engineer segment
// carries two actions, so its gap is widened to fit a two-line edge label.
const SF_W = 1660;
const SF_H = 400;
const SF_NODE_H = 176;
const SF_RAIL_Y = 150;
const SF_RETURN_Y = 344;
const SF_NODE_X = [0, 425, 870, 1410];
const SF_NODE_W = [210, 230, 200, 250];

const SyncNode = ({
  i,
  title,
  desc,
  auto,
  env,
}: {
  i: number;
  title: string;
  desc: string;
  auto?: boolean;
  /** Which tool this step lives in — rendered as a caption above the box. */
  env?: string;
}) => (
  <>
    {env ? (
      <div
        style={{
          position: 'absolute',
          left: SF_NODE_X[i],
          top: SF_RAIL_Y - SF_NODE_H / 2 - 34,
          width: SF_NODE_W[i],
          fontFamily: mono,
          fontSize: 20,
          lineHeight: 1.4,
          letterSpacing: '0.08em',
          color: c.muted,
        }}
      >
        {env}
      </div>
    ) : null}
  <div
    style={{
      position: 'absolute',
      left: SF_NODE_X[i],
      top: SF_RAIL_Y - SF_NODE_H / 2,
      width: SF_NODE_W[i],
      height: SF_NODE_H,
      boxSizing: 'border-box',
      padding: 22,
      background: auto ? c.accentWash : c.paper,
      border: auto ? '3px solid var(--osd-accent)' : '2px solid var(--osd-text)',
      borderRadius: 'var(--osd-radius)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 10,
    }}
  >
    <span style={{ fontSize: 26, lineHeight: 1.3, fontWeight: 700 }}>{title}</span>
    <span style={{ fontSize: 21, lineHeight: 1.4, color: c.muted }}>{desc}</span>
  </div>
  </>
);

/** Sits centred on the rail and paints over it, so the line reads as labelled. */
const EdgeLabel = ({
  i,
  w,
  text,
  auto,
}: {
  i: number;
  w: number;
  text: ReactNode;
  auto?: boolean;
}) => {
  const gapStart = SF_NODE_X[i] + SF_NODE_W[i];
  const gapEnd = SF_NODE_X[i + 1];
  return (
    <div
      style={{
        position: 'absolute',
        left: gapStart + (gapEnd - gapStart - w) / 2,
        top: SF_RAIL_Y - 40,
        width: w,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'var(--osd-bg)',
        fontSize: 20,
        lineHeight: 1.35,
        fontWeight: 600,
        color: auto ? c.accentInk : c.ink2,
      }}
    >
      {text}
    </div>
  );
};

const SF_RAIL = (i: number) =>
  `M${SF_NODE_X[i] + SF_NODE_W[i]} ${SF_RAIL_Y} H${SF_NODE_X[i + 1] - 12}`;

const SyncFlow: Page = () => (
  <Frame chapter="②　研究過程　·　實際做法 01" footer="">
    <H2 size={64}>Figma Design System → Storybook 同步</H2>
    <Gloss>元件怎麼從設計稿，變成 vibe coding 裝得到的套件</Gloss>

    <div
      style={{
        position: 'relative',
        width: SF_W,
        height: SF_H,
        marginTop: 40,
        flexShrink: 0,
      }}
    >
      <svg
        width={SF_W}
        height={SF_H}
        viewBox={`0 0 ${SF_W} ${SF_H}`}
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          <marker id="sfArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 Z" fill={c.ink2} />
          </marker>
          <marker id="sfLoop" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 Z" fill={c.muted} />
          </marker>
        </defs>

        <path d={SF_RAIL(0)} stroke={c.ink2} strokeWidth={3} fill="none" markerEnd="url(#sfArrow)" />
        <path d={SF_RAIL(1)} stroke={c.ink2} strokeWidth={3} fill="none" markerEnd="url(#sfArrow)" />
        <path d={SF_RAIL(2)} stroke={c.ink2} strokeWidth={3} fill="none" markerEnd="url(#sfArrow)" />

        {/* Closes the cycle: last node back round to the first. */}
        <path
          d={`M${SF_NODE_X[3] + SF_NODE_W[3] / 2} ${SF_RAIL_Y + SF_NODE_H / 2}
              V${SF_RETURN_Y}
              H${SF_NODE_X[0] + SF_NODE_W[0] / 2}
              V${SF_RAIL_Y + SF_NODE_H / 2 + 14}`}
          stroke={c.muted}
          strokeWidth={3}
          fill="none"
          markerEnd="url(#sfLoop)"
        />
      </svg>

      <SyncNode i={0} env="Figma" title="Design System" desc="設計師的工作環境" />
      <SyncNode i={1} title="建立 Design Ready 標籤" desc="版本控制及觸發自動化" />
      <SyncNode i={2} auto env="GitHub" title="Draft PR" desc="指派給工程師進行同步" />
      <SyncNode i={3} title="Storybook 元件" desc="發布成套件提供給 vibe code 安裝" />

      <EdgeLabel i={0} w={150} text={<>設計師調完<br />宣告設計完成</>} />
      <EdgeLabel i={1} w={150} auto text={<>Webhook 驗證<br />後自動開</>} />
      <EdgeLabel
        i={2}
        w={280}
        text={
          <>
            工程師用 Figma MCP 同步
            <br />
            再比對差異、補上元件功能
          </>
        }
      />

      <div
        style={{
          position: 'absolute',
          left: SF_NODE_X[0] + SF_NODE_W[0] / 2,
          top: SF_RETURN_Y - 22,
          width: SF_NODE_X[3] + SF_NODE_W[3] / 2 - (SF_NODE_X[0] + SF_NODE_W[0] / 2),
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            background: 'var(--osd-bg)',
            padding: '0 24px',
            fontSize: 20,
            lineHeight: 1.4,
            fontWeight: 600,
            color: c.muted,
          }}
        >
          發布後 Figma 和 Storybook 回到對齊
        </span>
      </div>
    </div>
  </Frame>
);

// ─── S5 · 目前的流程 ──────────────────────────────────────────────────────────

const DIAGRAM_W = 1660;
const DIAGRAM_H = 620;

const LANE_Y = { pm: 44, design: 162, eng: 280 };
const LANE_H = 86;

const LaneBand = ({ y, name }: { y: number; name: string }) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      top: y,
      width: DIAGRAM_W,
      height: LANE_H,
      background: c.lane,
      borderRadius: 'var(--osd-radius)',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 16,
      boxSizing: 'border-box',
    }}
  >
    <span
      style={{
        fontFamily: mono,
        fontSize: 24,
        letterSpacing: '0.08em',
        color: c.muted,
      }}
    >
      {name}
    </span>
  </div>
);

const FlowNode = ({
  x,
  y,
  w,
  title,
  sub,
}: {
  x: number;
  y: number;
  w: number;
  title: string;
  sub?: string;
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: LANE_H,
      boxSizing: 'border-box',
      background: c.paper,
      border: '2px solid var(--osd-text)',
      borderRadius: 'var(--osd-radius)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    }}
  >
    <span style={{ fontSize: 26, lineHeight: 1.3, fontWeight: 700 }}>{title}</span>
    {sub ? (
      <span style={{ fontSize: 21, lineHeight: 1.3, color: c.muted }}>{sub}</span>
    ) : null}
  </div>
);

const FlowGate = ({
  x,
  y,
  w,
  index,
  check,
}: {
  x: number;
  y: number;
  w: number;
  index: string;
  check: string;
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: LANE_H,
      boxSizing: 'border-box',
      background: c.accentWash,
      border: '3px solid var(--osd-accent)',
      borderRadius: 'var(--osd-radius)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
    }}
  >
    <span
      style={{
        fontFamily: mono,
        fontSize: 20,
        lineHeight: 1.3,
        letterSpacing: '0.1em',
        color: c.accentInk,
      }}
    >
      {index}
    </span>
    <span style={{ fontSize: 24, lineHeight: 1.3, fontWeight: 700 }}>{check}</span>
  </div>
);

const DashLabel = ({ x, y, text }: { x: number; y: number; text: string }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      fontFamily: mono,
      fontSize: 22,
      lineHeight: 1.4,
      color: c.accentInk,
      letterSpacing: '0.04em',
      whiteSpace: 'nowrap',
    }}
  >
    {text}
  </div>
);

const LoopChip = ({ text, auto, big }: { text: string; auto?: boolean; big?: boolean }) => (
  <span
    style={{
      fontSize: big ? 34 : 26,
      lineHeight: 1.3,
      fontWeight: 600,
      padding: big ? '20px 30px' : '10px 20px',
      background: auto ? c.accentWash : c.paper,
      border: auto ? '3px solid var(--osd-accent)' : `2px solid ${c.rule}`,
      borderRadius: 'var(--osd-radius)',
      whiteSpace: 'nowrap',
    }}
  >
    {text}
  </span>
);

const LoopSep = ({ big }: { big?: boolean }) => (
  <span style={{ fontFamily: mono, fontSize: big ? 34 : 26, color: c.muted }}>→</span>
);

const FL_W = 1660;
const FL_H = 600;
const FL_LH = 68;
const LY = { pm: 76, de: 188, en: 300 };
const FL_LOOP_Y = 450;
// Routing bands in the gaps between lanes.
const BAND_OK = 158;
const BAND_NG = 176;
const BAND_TOP = 38;

// [x, width] — column order matches the FigJam board left-to-right.
// Gaps are sized to their labels: 90px before POC ("vibe code"), 70px after each
// gate ("不通過"), 25px elsewhere.
const N = {
  prd: [78, 95],
  poc: [268, 95], // wide gap before this one carries the "vibe code" label
  talk: [396, 140],
  gUx: [569, 130],
  ask: [769, 145],
  fe1: [769, 145],
  toFig: [947, 165],
  figFix: [1165, 175],
  fe2: [1165, 175],
  gReq: [1400, 140],
  dev: [1573, 87],
} as const;

type Col = readonly [number, number];
const cx = (n: Col) => n[0] + n[1] / 2;
const rt = (n: Col) => n[0] + n[1];
const mid = (y: number) => y + FL_LH / 2;
const bot = (y: number) => y + FL_LH;

const FlLane = ({ y, name }: { y: number; name: string }) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      top: y,
      width: FL_W,
      height: FL_LH,
      background: c.lane,
      borderRadius: 'var(--osd-radius)',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 8,
      boxSizing: 'border-box',
    }}
  >
    <span style={{ fontFamily: mono, fontSize: 18, letterSpacing: '0.06em', color: c.muted }}>
      {name}
    </span>
  </div>
);

const FlNode = ({ n, y, title, gate }: { n: Col; y: number; title: string; gate?: boolean }) => (
  <div
    style={{
      position: 'absolute',
      left: n[0],
      top: y,
      width: n[1],
      height: FL_LH,
      boxSizing: 'border-box',
      background: gate ? c.accentWash : c.paper,
      border: gate ? '3px solid var(--osd-accent)' : '2px solid var(--osd-text)',
      borderRadius: 'var(--osd-radius)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 6px',
      fontSize: 18,
      lineHeight: 1.25,
      fontWeight: 700,
    }}
  >
    {title}
  </div>
);

const FlTag = ({
  x,
  y,
  text,
  tone,
}: {
  x: number;
  y: number;
  text: ReactNode;
  tone?: string;
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: 'translateY(-50%)',
      fontFamily: mono,
      fontSize: 16,
      lineHeight: 1.3,
      color: tone ?? c.muted,
      background: 'var(--osd-bg)',
      padding: '0 5px',
      textAlign: 'center',
      whiteSpace: 'nowrap',
    }}
  >
    {text}
  </div>
);

const Ln = ({ d, dash, accent }: { d: string; dash?: boolean; accent?: boolean }) => (
  <path
    d={d}
    fill="none"
    stroke={accent ? 'var(--osd-accent)' : c.ink2}
    strokeWidth={accent ? 3 : 2.5}
    strokeDasharray={dash ? '9 7' : undefined}
    markerEnd={accent ? 'url(#flC)' : 'url(#flA)'}
  />
);

const Flow: Page = () => (
  <Frame chapter="②　研究過程　·　產出" footer="">
    <H2 size={64}>協作流程</H2>

    <div style={{ position: 'relative', width: FL_W, height: FL_H, marginTop: 32, flexShrink: 0 }}>
      <Steps>
        {/* build 1 — 三泳道：主路徑 + 兩條退回 */}
        <Step>
          <div style={{ position: 'absolute', inset: 0 }}>
            <FlLane y={LY.pm} name="PM" />
            <FlLane y={LY.de} name="設計師" />
            <FlLane y={LY.en} name="工程師" />

            <svg
              width={FL_W}
              height={FL_H}
              viewBox={`0 0 ${FL_W} ${FL_H}`}
              style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
            >
              <defs>
                <marker id="flA" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
                  <path d="M0,0 L10,4 L0,8 Z" fill={c.ink2} />
                </marker>
                <marker id="flC" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
                  <path d="M0,0 L10,4 L0,8 Z" fill="var(--osd-accent)" />
                </marker>
              </defs>

              <Ln d={`M${rt(N.prd)} ${mid(LY.pm)} H${N.poc[0] - 6}`} />
              <Ln d={`M${rt(N.poc)} ${mid(LY.pm)} H${rt(N.poc) + 16} V${mid(LY.de)} H${N.talk[0] - 6}`} />
              <Ln d={`M${rt(N.talk)} ${mid(LY.de)} H${N.gUx[0] - 6}`} />

              {/* 檢視 UX 不通過 → 提出修改 → 修改 vibe code → 回 UI/UX 討論 */}
              <Ln d={`M${rt(N.gUx)} ${mid(LY.de)} H${N.ask[0] - 6}`} />
              <Ln d={`M${cx(N.ask)} ${bot(LY.de)} V${LY.en - 6}`} />
              <Ln d={`M${N.fe1[0]} ${mid(LY.en)} H${cx(N.talk)} V${bot(LY.de) + 6}`} />

              {/* 通過 → vibe code 轉入 Figma → Figma 調整 → 整體需求確認 */}
              <Ln d={`M${cx(N.gUx)} ${LY.de} V${BAND_OK} H${cx(N.toFig)} V${LY.en - 6}`} />
              <Ln d={`M${rt(N.toFig)} ${mid(LY.en)} H${rt(N.toFig) + 16} V${mid(LY.de)} H${N.figFix[0] - 6}`} />
              <Ln d={`M${rt(N.figFix)} ${mid(LY.de)} H${rt(N.figFix) + 16} V${mid(LY.pm)} H${N.gReq[0] - 6}`} />

              {/* 新的修正迴圈：需求確認 → 改 vibe code → 同步回 Figma */}
              <Ln d={`M${cx(N.gReq) + 40} ${bot(LY.pm)} V${mid(LY.en)} H${rt(N.fe2) + 6}`} />

              {/* 整體需求確認 不通過 → 回 Figma 細節與元件調整 */}
              <Ln d={`M${cx(N.gReq)} ${LY.pm} V${BAND_TOP} H${cx(N.figFix)} V${LY.de - 6}`} />
              <Ln d={`M${cx(N.fe2)} ${LY.en} V${bot(LY.de) + 6}`} />

              {/* 整體需求確認 通過 → 開發 */}
              <Ln d={`M${rt(N.gReq)} ${mid(LY.pm)} H${rt(N.gReq) + 16} V${mid(LY.en)} H${N.dev[0] - 6}`} />
            </svg>

            <FlNode n={N.prd} y={LY.pm} title="PRD" />
            <FlNode n={N.poc} y={LY.pm} title="POC" />
            <FlNode n={N.talk} y={LY.de} title="UI/UX 討論" />
            <FlNode n={N.gUx} y={LY.de} title="檢視 UX" gate />
            <FlNode n={N.ask} y={LY.de} title="提出修改" />
            <FlNode n={N.fe1} y={LY.en} title="修改 vibe code" />
            <FlNode n={N.toFig} y={LY.en} title="vibe code 轉入 Figma" />
            <FlNode n={N.figFix} y={LY.de} title="Figma 細節與元件調整" />
            <FlNode n={N.fe2} y={LY.en} title="修改 vibe code" />
            <FlNode n={N.gReq} y={LY.pm} title="整體需求確認" gate />
            <FlNode n={N.dev} y={LY.en} title="開發" />

            <FlTag x={rt(N.prd) + 22} y={mid(LY.pm)} text={<>vibe<br />code</>} tone={c.accentInk} />
            <FlTag x={rt(N.gUx) + 4} y={mid(LY.de)} text="不通過" />
            <FlTag x={cx(N.gUx) + 8} y={BAND_OK} text="通過" />
            <FlTag x={cx(N.fe2) + 14} y={278} text="同步到 Figma" />
            <FlTag x={cx(N.gReq) - 90} y={mid(LY.en)} text="新需求或調整" />
            <FlTag x={cx(N.figFix) + 60} y={BAND_TOP} text="不通過" />
            <FlTag x={rt(N.gReq) + 22} y={278} text="通過" />
          </div>
        </Step>

        {/* build 2 — Design System 迴圈 + 兩條接線 */}
        <Step>
          <div style={{ position: 'absolute', inset: 0 }}>
            <svg
              width={FL_W}
              height={FL_H}
              viewBox={`0 0 ${FL_W} ${FL_H}`}
              style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
            >
              <defs>
                <marker id="flD" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
                  <path d="M0,0 L10,4 L0,8 Z" fill="var(--osd-accent)" />
                </marker>
              </defs>
              {/* 修改前端 → 調整／新增共用元件 */}
              <path d={`M${cx(N.fe2)} ${bot(LY.en)} V${FL_LOOP_Y - 6}`} fill="none" stroke="var(--osd-accent)" strokeWidth={3} strokeDasharray="9 7" markerEnd="url(#flD)" />
              {/* DS 套件 → POC */}
              <path d={`M${rt(N.prd) + 48} ${FL_LOOP_Y} V${bot(LY.pm) + 6}`} fill="none" stroke="var(--osd-accent)" strokeWidth={3} strokeDasharray="9 7" markerEnd="url(#flD)" />
            </svg>

            <FlTag x={cx(N.fe2) + 10} y={408} text="import" tone={c.accentInk} />
            <FlTag x={rt(N.prd) + 56} y={202} text="skill 套用" tone={c.accentInk} />

            <div
              style={{
                position: 'absolute',
                left: 78,
                top: FL_LOOP_Y,
                width: FL_W - 78,
                boxSizing: 'border-box',
                background: c.paper,
                border: `3px solid ${c.rule}`,
                borderRadius: 'var(--osd-radius)',
                padding: '16px 22px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <span style={{ fontFamily: mono, fontSize: 19, letterSpacing: '0.08em', color: 'var(--osd-accent)' }}>
                Figma Design System → Storybook 同步
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <LoopChip text="調整／新增共用元件" />
                <LoopSep />
                <LoopChip text="Figma Design System" />
                <LoopSep />
                <LoopChip text="Storybook" />
                <LoopSep />
                <LoopChip text="Design System 套件" />
              </div>
            </div>
          </div>
        </Step>
      </Steps>
    </div>
  </Frame>
);

// ─── S6 · 三個沒解決的 ────────────────────────────────────────────────────────

const ProblemCol = ({
  no,
  title,
  where,
  desc,
}: {
  no: string;
  title: string;
  where: string;
  desc: ReactNode;
}) => (
  <div style={{ width: 526 }}>
    <div
      style={{
        fontFamily: mono,
        fontSize: 28,
        lineHeight: 1.2,
        letterSpacing: '0.06em',
        color: 'var(--osd-accent)',
      }}
    >
      {no}
    </div>
    <div style={{ fontSize: 40, lineHeight: 1.3, fontWeight: 700, marginTop: 14 }}>{title}</div>
    <div style={{ height: 3, background: 'var(--osd-text)', margin: '20px 0' }} />
    <div style={{ fontFamily: mono, fontSize: 20, lineHeight: 1.4, color: c.muted }}>{where}</div>
    <div style={{ fontSize: 26, lineHeight: 1.55, marginTop: 10 }}>{desc}</div>
  </div>
);

const Problems: Page = () => (
  <Frame chapter="③　遇到的問題" footer="">
    <H2 size={68}>遇到的問題</H2>

    <div style={{ display: 'flex', gap: 40, marginTop: 44, flexShrink: 0, alignItems: 'flex-start' }}>
      <ProblemCol
        no="01"
        title="設計不準"
        where="POC · 修改前端"
        desc="元件拿對了，版面還是會跑"
      />
      <ProblemCol
        no="02"
        title="SSOT 問題"
        where="Figma 細節與元件調整"
        desc="Figma 與 Storybook 各有一份 Design System"
      />
      <ProblemCol
        no="03"
        title="同步失真問題"
        where="前端轉入 Figma"
        desc={
          <>
            vibe code 轉進 Figma，失真一次
            <br />
            Figma 調完再轉回真實前端，又失真一次
          </>
        }
      />
    </div>

  </Frame>
);

// ─── S7 · 兩個心得 ────────────────────────────────────────────────────────────

const TakeawayLabel = ({ text }: { text: string }) => (
  <div
    style={{
      fontFamily: mono,
      fontSize: 26,
      lineHeight: 1.3,
      letterSpacing: '0.1em',
      color: 'var(--osd-accent)',
    }}
  >
    {text}
  </div>
);

const Takeaways: Page = () => (
  <Frame chapter="④　心得" footer="">
    <H2 size={68}>心得</H2>

    <Steps>
      <Step>
        <div style={{ marginTop: 48 }}>
          <TakeawayLabel text="一 · AI 做設計還是有差距" />
          <div style={{ fontSize: 40, lineHeight: 1.4, color: c.muted, marginTop: 18 }}>
            它做得出「像設計的東西」，
          </div>
          <div style={{ fontSize: 48, lineHeight: 1.4, fontWeight: 800 }}>
            不好做出<Mark>「對的設計」</Mark>。
          </div>
        </div>
      </Step>

      <Step>
        <div>
          <div style={{ height: 1, background: c.rule, margin: '44px 0' }} />
          <TakeawayLabel text="二 · vibe code 的價值是速度" />
          <div style={{ fontSize: 40, lineHeight: 1.4, color: c.muted, marginTop: 18 }}>
            做出 POC 的難度降低也更快，
          </div>
          <div style={{ fontSize: 48, lineHeight: 1.4, fontWeight: 800 }}>
            需求討論時可以直接看<Mark>真實畫面</Mark>。
          </div>
          <div style={{ fontSize: 36, lineHeight: 1.5, color: c.muted, marginTop: 12 }}>
            但實際開發時的把關還是重要。
          </div>
        </div>
      </Step>
    </Steps>
  </Frame>
);

// ─── Transitions ──────────────────────────────────────────────────────────────

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

// RISE — house quiet.
export const transition: SlideTransition = {
  duration: 200,
  exit: {
    duration: 140,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' },
    ],
  },
  enter: {
    duration: 200,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

// SETTLE — cover-grade.
Cover.transition = {
  duration: 280,
  exit: {
    duration: 160,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-6px)' },
    ],
  },
  enter: {
    duration: 280,
    delay: 100,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(12px)', filter: 'blur(4px)' },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
    ],
  },
};

// ─── Speaker notes ────────────────────────────────────────────────────────────

export const notes: (string | undefined)[] = [
  `【15s】我這邊講的比較像實驗紀錄——我試了什麼、成功了什麼、還有哪些沒解決。前面兩位講的是我們現在怎麼做事，我要講的是「這套做法是怎麼長出來的」。`,

  `【1:00】這一兩年 AI 模型長得很快，開發速度明顯變快——我後面那個問號是我自己加的，說「倍增」可能有點誇張，但確實快了不少。（記得把問號唸出來。承認自己的說法可能誇張，比講一堆數字更能建立信任。）

那問題就來了。這是 Toby 老大丟出來的：開發變快之後，瓶頸就跑到別的地方去了。其中一個就是 UI 設計。

所以他把目光放到設計這一段，想找方法讓它也加速。

〔停一下再講〕我不是設計師，我是從 Web 工程師的角度去想這件事：如果 AI 已經能幫我寫 code，它能不能也幫忙把畫面做出來？這場分享就是我試下來的紀錄。`,

  `【45s】⭐ 第一件事我很快就發現了。
你叫 AI 做一個畫面，它做出來的東西很好看。真的好看，配色、留白、字級都不錯。
但——那不是我們的產品。
顏色不對、間距不對、元件長得不一樣。它做的是「一個漂亮的網站」，不是「我們家的網站」。
所以問題不在 AI 不夠強。它很強，強到會自由發揮。問題是它不知道我們的規則。
※ 這頁靠兩張截圖說話，講稿是配角。`,

  `【2:00】⭐ 這頁七拍：先三個標題，再三份答案，最後金句。

〔標題三連〕想清楚問題之後，我列了三件要做的事——先整個唸過一遍，不解釋，讓大家看到全貌。
① 需要一套規範去限制 AI 的設計
② vibe coding 時就大致符合設計
③ 如何將這一切變成可複製的流程

〔答案三連〕然後一個一個講怎麼做到。

① → Figma Design System，就是一套 UI 規範，把顏色、間距、按鈕長什麼樣全部先定好。定好之後，AI 就只能從這裡面挑，不能自己發明。

② → 這是最有企圖心的一個：能不能在 PM 用 AI 做原型的時候，做出來的東西就已經大致符合我們的設計？如果可以，設計師的工作就從「重畫」變成「修」。
做法是 Storybook。規範寫在文件裡沒有用，AI 讀不到，人也懶得看；Storybook 是前端元件的展示櫃，每個元件長什麼樣、有哪些狀態全列在上面。關鍵是它讓 AI 套用真實的前端元件——不是照著描述重畫一個像的，是直接用我們線上在跑的那一個。

③ → 這裡有兩件事。
第一是 Figma ⇄ Storybook 同步：設計師在 Figma 宣告設計完成，系統自動開一個 PR，工程師再透過 MCP 把設計回寫成 Storybook 的元件。這條線讓元件流得動。
第二是 skill：把設計作法包裝成 AI 會遵循的流程。裡面裝的是兩樣東西——Storybook 的真實元件，加上設計師的 UX 心法。讓 AI 照著做，不是自由發揮。
兩件事的細節後面兩頁分別講。
（伏筆：UX 心法這件事，等一下講問題的時候會再回來——因為它還沒寫完。）

〔最後一拍〕講到底，其實就是在做 Harness——大家常在講的那個。給 AI 一套邊界，讓它在裡面跑。講完停一下。`,

  `【25s】名詞解釋 01 —— Design System。

講白話就是一套規範：顏色只有這幾個、間距只有這幾階、元件就這幾種，全部先定好。

〔指版面〕你們看這三排——這就是全部了。不在盤子裡的東西，就不該出現在畫面上。

〔最後一句〕所以做畫面的時候，只能從這個盤子裡拿東西。這就是「限制」的意思。`,

  `【25s】名詞解釋 02 —— Storybook。

規範寫在文件裡沒有用，AI 讀不到，人也懶得看。Storybook 是把 Design System 用前端元件呈現出來——每個元件長什麼樣、有哪些狀態，而且是帶著真實功能的，可以直接點、直接試。

〔指影片〕左邊那排就是我們所有的元件，一個元件一頁——長什麼樣、有哪些狀態，按鈕的 primary、secondary、停用，全部列在上面，而且可以直接點、直接試。

〔最後一句〕重點就一句話：它不是截圖、也不是說明文件，就是真實 Angular 的元件——跟我們產品上跑的是同一個。

（同步是怎麼運作的、跟 Figma 的關係，下一頁再講。這頁只要讓大家知道 Storybook 長什麼樣。）`,

  `【40s】實際做法 01 —— Figma Design System ⇄ Storybook 同步。

這條線叫 Design System 迴圈：元件怎麼從設計稿，變成 vibe coding 裝得到的套件。三段。

〔設計師〕改完 Figma 不會自動發生任何事。要手動建立一個叫「Design Ready」的版本，而且版本標籤的格式要對——格式不符就不會觸發。這本身就是一道關：隨手存檔不會驚動工程端，要他主動宣告才算數。

〔系統，指橘框〕這是整條線唯一自動的一段。Webhook 收到之後驗標籤格式、驗權限、去重，然後開一個 Draft PR。注意：PR 裡面只有一份同步任務檔，一行元件程式碼都沒動。

〔工程師〕工程師接手之後，是用 Figma MCP 把 Figma Design System 上的內容同步到 Storybook——但 MCP 帶過來的是樣式跟結構，元件的功能要工程師自己補。同步完再比對差異：他拿到的不是「Figma 現在長怎樣」，是三方差異報告——上次同步點、現在的 Figma、現在的 code 三邊一起比。為什麼要三方？因為這段時間工程師可能也改了 code，只比最新兩邊會蓋掉別人的修改。兩邊改到同一個地方就停下來，讓設計師跟工程師決定。確認完才動 code，測試過才發布，套件跟 Figma Library 掛同一個版號。

〔如果被問到進度〕這是我們規劃的方式，目前先挑一個元件（Button）做 MVP 驗證。`,

  `【35s】實際做法 02 —— 使用 Storybook 套件進行 vibe code。⭐ 這頁是這次研究最誠實的一頁。

有了套件之後，怎麼讓 AI 真的用它？靠 skill。三個 skill 裡裝的東西都一樣：Storybook 的真實元件，加上設計師的 UX 心法。差別在「管多嚴」——我試了三次。

〔01 ds-craft〕第一版的設計目標就是「限制得夠嚴」。規則寫死，AI 一違規就擋下來、不准硬刻，整套規範 128 KB、11 步流程、3 支 Subagent。
結果很有意思：規則確實守住了——它不會用錯顏色、不會用非 DS 的元件。但畫面還是不準。

〔02 ds-studio〕我以為是「管的東西不夠全面」，所以往前延伸：加上 UX 策略階段、品味校準、方向發散，驗證那關從一支 reviewer 變兩支。規範長到 144 KB、9 個階段、6 支 Subagent。
結果一樣不準，只是更慢更貴。

〔03 ds-sense〕最後我反過來做。規範砍到 21 KB、Subagent 全部拿掉、審查全部拿掉，立場改成：DS 的 token 跟元件是「材料」不是「合規清單」，超出 DS 不算錯。
結果反而準一點，也便宜很多。

〔停一下〕管得越嚴，AI 反而做得越差。

這跟我原本的直覺完全相反。我事後的理解是：規範太細的時候，它花力氣在滿足檢查，不是在把畫面做對——第一版就是最好的例子，規則全過，設計還是不對。`,

  `【1:45】三個想法試下來，長出這條流程。這張圖是結果，不是我一開始就畫好的。不要逐節點講，只要傳達三件事。

〔build 1〕上面是一個需求怎麼走到開發。三條線是 PM、設計師、工程師。PM 先用 AI 做出會動的第一版，然後過三道關——第一關看流程順不順，第二關看細節對不對，第三關 PM 確認跟需求對不對。不過就退回去改，三關都過才進開發。
值得注意：圖上沒有「畫設計稿」這個動作。Figma 出現在第一關之後，不是拿來畫初稿的，是調細節跟管元件。

〔build 2〕下面這塊是元件庫自己的迴圈：設計師調整或新增共用元件 → 改 Figma Design System → 更新到 Storybook → 發布成套件。兩條虛線把上下接起來：PM 做 POC 的時候透過 skill 吃這個套件；工程師改前端的時候 import 這個套件——兩邊拿的是同一包。
重點是中間這三條虛線，它們把上下兩塊接起來。PM 做第一版透過 skill 吃這個套件，工程師改前端直接 import 這個套件——兩邊拿的是同一包。最重要的一條：流程走到一半發現元件不夠用，就掉到下面這個迴圈，補一個進去，發布，再流回來。

所以這張圖是兩個迴圈咬在一起——上面把需求磨對，下面把元件庫養大。
※ 超時的話這頁最先壓：只講上半 +「下面是元件庫怎麼維護的，細節等等聊」。`,

  `【1:45】講三個還沒解決的問題，不然聽起來會太順利。

第一，設計超級不準。元件 AI 都拿對了，但排出來還是會醜、版面會跑掉。
第二，skill 非常消耗 token。白話講：每次叫 AI 做事之前要先餵一大包規範，寫得越完整做得越準，但每次呼叫也越貴。準確度跟成本是直接對立的，這個平衡我還沒找到好的解法。
第三，就是剛剛埋的那個伏筆——做好的畫面回不到 Figma。
我們的元件是從 Figma 的 Design System 同步下來的，那條路是通的。但那只到「元件」為止：AI 把元件組成一個完整畫面之後，那個畫面沒有路回到 Figma。
而設計師是在 Figma 工作的。所以 AI 做完的東西，設計師接不了手——他要調，只能自己在 Figma 重排一次。

〔停一下再講〕第一個跟第三個其實是同一個根因——我們定義了有哪些零件，但沒有定義這些零件該怎麼組起來。按鈕、表格、輸入框都定好了；但間距要多大、什麼要對齊、一頁塞多少才不會擠——這些是設計師腦子裡的東西，還沒有被寫下來。AI 拿得到零件，拿不到組法。`,

  `【1:30】⭐ 最後講兩個心得。

一、AI 做設計還是有差距。它做得出「像設計的東西」，做不出「對的設計」。

我試過用規範去堵這個差距——第一版 skill 寫了 28 KB，管得死死的，結果更不準，也更貴。砍到 3 KB 反而好一點。

所以差距不是「規範寫得不夠」造成的。它缺的不是規則，是判斷。

二、vibe code 的價值就是速度，這點我要講清楚。

做出 POC 的難度降低了，速度也快很多——以前要花好幾天，現在當天就有東西。

更關鍵的是討論的品質：以前開會拿著圖跟文字在想像，現在直接看真實畫面，能點、能操作、會有反應。要改什麼、哪裡怪，當場就講得出來。

但要講清楚它加速的是哪一段：只有「做出來」。確認這東西對不對——UX 順不順、細節對不對、跟需求合不合——還是要人一道一道看，跟以前一樣慢。這就是為什麼流程裡那幾道關一道都不能省。
這就是為什麼我們流程裡要有那三道關。不是不信任 AI，是因為它太會裝了。
以上，謝謝。`,
];

export const meta: SlideMeta = {
  title: 'AI 輔助協作 UI 研究',
  createdAt: '2026-08-16T04:47:37.845Z',
};

export default [
  Cover,
  Why,
  Observation,
  Ideas,
  TermDesignSystem,
  TermStorybook,
  SyncFlow,
  Attempts,
  Flow,
  Problems,
  Takeaways,
] satisfies Page[];
