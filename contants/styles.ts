export const PF_STYLES = `
.pf-page {
  min-height: 100%;
  background: #f4f5f7;
  padding: 32px 16px;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}
.pf-container { max-width: 900px; margin: 0 auto; }
.pf-header h1 { font-size: 20px; font-weight: 700; color: #1a1a2e; margin: 0 0 4px; }
.pf-header p { font-size: 13.5px; color: #6b7280; margin: 0 0 24px; }

.pf-section { margin-bottom: 28px; }
.pf-section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.pf-section-title { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: .04em; margin-bottom: 10px; }

/* ---- Promo Card ---- */
.pf-card {
  position: relative;
  border-radius: 20px;
  padding: 22px 20px 20px;
  overflow: hidden;
  box-shadow: 0 16px 32px -12px rgba(91, 42, 158, 0.45);
  color: #fff;
  transition: filter .5s ease, background .3s ease;
}
.pf-card-expired { filter: grayscale(1) brightness(0.92); }
.pf-card-glow {
  position: absolute; top: -60px; right: -50px; width: 180px; height: 180px;
  background: radial-gradient(circle, rgba(255,255,255,.28), transparent 70%);
  border-radius: 50%; pointer-events: none;
}
.pf-card-dots {
  position: absolute; inset: 0; opacity: .12; pointer-events: none;
  background-image: radial-gradient(rgba(255,255,255,.9) 1px, transparent 1px);
  background-size: 14px 14px;
}
.pf-ribbon {
  position: absolute; top: 14px; right: -32px; width: 130px;
  background: #6b7280; color: #fff; font-size: 11px; font-weight: 700;
  text-align: center; padding: 3px 0; transform: rotate(35deg);
  letter-spacing: .05em; box-shadow: 0 2px 6px rgba(0,0,0,.25); text-transform: uppercase;
}
.pf-card-body { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; text-align: center; }

.pf-eyebrow {
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(255,255,255,.16); border: 1px solid rgba(255,255,255,.35);
  padding: 5px 12px; border-radius: 999px; font-size: 11px; font-weight: 700;
  letter-spacing: .03em; margin-bottom: 16px;
}
.pf-eyebrow-icon { color: #ffd166; }

.pf-countdown { display: flex; align-items: flex-start; gap: 4px; margin-bottom: 18px; }
.pf-colon { font-size: 22px; font-weight: 700; line-height: 44px; color: rgba(255,255,255,.7); }
.pf-unit { display: flex; flex-direction: column; align-items: center; }
.pf-unit-digits { display: flex; gap: 3px; }
.pf-unit-label { font-size: 10px; color: rgba(255,255,255,.85); margin-top: 5px; font-weight: 600; }

.pf-digit-wrap { width: 26px; height: 34px; perspective: 200px; }
.pf-digit-wrap.pf-dim { opacity: .55; }
.pf-digit-inner {
  position: relative; width: 100%; height: 100%;
  transform-style: preserve-3d;
  transition: transform .5s cubic-bezier(.45,.05,.55,.95);
  transform: rotateX(0deg);
}
.pf-digit-inner.pf-flip { transform: rotateX(-180deg); }
.pf-face {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  backface-visibility: hidden;
  border-radius: 5px;
  background: linear-gradient(180deg, #fffaf0, #fdf0d5);
  color: #5b2a9e;
  font-weight: 800; font-size: 18px;
  font-variant-numeric: tabular-nums;
  box-shadow: inset 0 -1px 0 rgba(0,0,0,.08);
}
.pf-face::after {
  content: ""; position: absolute; left: 0; right: 0; top: 50%;
  height: 1px; background: rgba(91,42,158,.18);
}
.pf-face-back { transform: rotateX(180deg); }

.pf-title { font-size: 13px; font-weight: 700; letter-spacing: .04em; margin-bottom: 6px; color: #f1e8ff; }
.pf-discount { font-size: 25px; font-weight: 800; margin-bottom: 4px; color: #ffd166; text-shadow: 0 2px 6px rgba(0,0,0,.15); }
.pf-extra { font-size: 11.5px; font-weight: 600; color: rgba(255,255,255,.9); margin-bottom: 16px; line-height: 1.4; }
.pf-expired-msg { font-size: 14px; font-weight: 700; color: rgba(255,255,255,.85); margin: 6px 0 18px; }

.pf-cta {
  width: 100%; border: none; border-radius: 999px; padding: 11px 0;
  background: linear-gradient(180deg, #ff9142, #ff6b1a);
  color: #fff; font-weight: 800; font-size: 13.5px; letter-spacing: .03em;
  box-shadow: 0 8px 16px -6px rgba(255,107,26,.6);
  cursor: pointer; margin-bottom: 12px; transition: transform .15s ease;
}
.pf-cta:hover:not(:disabled) { transform: translateY(-1px); }
.pf-cta:disabled { background: #9ca3af; box-shadow: none; cursor: not-allowed; }

.pf-footer-link { display: flex; align-items: center; font-size: 11.5px; color: rgba(255,255,255,.85); font-weight: 600; text-decoration: none; cursor: pointer; }
.pf-footer-link:hover { color: #fff; text-decoration: underline; }
.pf-footer-link-disabled { cursor: not-allowed; opacity: .7; }

.pf-bg-tabs { display: flex; gap: 6px; background: #f3f4f6; padding: 3px; border-radius: 8px; width: fit-content; }
.pf-bg-tab {
  border: none; background: transparent; padding: 6px 12px; border-radius: 6px;
  font-size: 12.5px; font-weight: 600; color: #6b7280; cursor: pointer;
}
.pf-bg-tab-active { background: #fff; color: #1a1a2e; box-shadow: 0 1px 2px rgba(0,0,0,.08); }
.pf-bg-image-preview {
  width: 100%; height: 90px; border-radius: 10px; background-size: cover; background-position: center;
  border: 1px solid #e5e7eb;
}

.pf-bg-presets { display: flex; gap: 8px; flex-wrap: wrap; }
.pf-bg-swatch {
  width: 28px; height: 28px; border-radius: 8px; border: 2px solid transparent;
  cursor: pointer; padding: 0; box-shadow: 0 0 0 1px rgba(0,0,0,.08);
}
.pf-bg-swatch-active { border-color: #1a1a2e; box-shadow: 0 0 0 2px #fff, 0 0 0 3px #1a1a2e; }
.pf-color-input {
  width: 32px; height: 28px; border: 1px solid #e5e7eb; border-radius: 6px;
  padding: 2px; cursor: pointer; background: #fff;
}

.pf-empty {
  display: flex; align-items: center; gap: 8px; color: #9ca3af; font-size: 13px;
  background: #fff; border: 1px dashed #d1d5db; border-radius: 12px; padding: 20px; justify-content: center;
}

/* ---- Table ---- */
.pf-table-card { border-radius: 14px; overflow: hidden; }
.pf-table-head, .pf-table-row {
  display: grid;
  grid-template-columns: 90px 1fr 150px 120px 90px;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;
}
.pf-table-head { background: #f9fafb; font-size: 11.5px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .03em; }
.pf-table-row { border-top: 1px solid #f1f2f4; font-size: 13.5px; }
.pf-row-title { font-weight: 700; color: #1a1a2e; }
.pf-row-sub { font-size: 12px; color: #9ca3af; margin-top: 2px; }
.pf-col-date { font-size: 12.5px; color: #6b7280; }
.pf-col-actions { display: flex; gap: 2px; }
.pf-badge-live { background: #16a34a; color: #fff; }
.pf-badge-expired { background: #e5e7eb; color: #6b7280; }
.pf-digit-wrap {
  width: 26px;
  height: 34px;
  perspective: 200px;
  position: relative;
}

.pf-digit-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform .5s cubic-bezier(.45,.05,.55,.95);
  transform: rotateX(0deg);
}

.pf-face {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  border-radius: 5px;

  background: linear-gradient(
    180deg,
    #fffaf0,
    #fdf0d5
  );

  color: #5b2a9e;
  font-weight: 800;
  font-size: 18px;

  font-variant-numeric: tabular-nums;

  box-shadow:
    inset 0 -1px 0 rgba(0, 0, 0, .08);
}

.pf-face-back {
  transform: rotateX(180deg);
}
`;
