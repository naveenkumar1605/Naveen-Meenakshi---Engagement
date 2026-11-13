import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Image as ImageIcon, RotateCcw, Upload, X } from 'lucide-react';
import { ImageAsset, invitationConfig } from '../config/invitation';
import { usePhotoOverrides } from '../context/InvitationContext';
import { ConfigImage } from './ConfigImage';

interface PhotoSlot {
  slot: string;
  label: string;
  asset: ImageAsset;
}

const PHOTO_SLOTS: PhotoSlot[] = [
  { slot: 'coupleMain', label: 'Main couple photo', asset: invitationConfig.images.coupleMain },
  { slot: 'groom', label: 'Groom portrait', asset: invitationConfig.images.groom },
  { slot: 'bride', label: 'Bride portrait', asset: invitationConfig.images.bride },
  ...invitationConfig.images.gallery.map((asset, idx) => ({
    slot: `gallery.${idx}`,
    label: `Gallery photo ${idx + 1}`,
    asset,
  })),
];

function parsePosition(pos = '50% 50%') {
  const [xRaw, yRaw] = pos.split(' ').map((v) => Number.parseFloat(v));
  return {
    x: Number.isFinite(xRaw) ? xRaw : 50,
    y: Number.isFinite(yRaw) ? yRaw : 50,
  };
}

function SlotRow({ slot, label, asset }: PhotoSlot) {
  const { overrides, setOverride } = usePhotoOverrides();
  const override = overrides[slot];
  const { x, y } = parsePosition(override?.position ?? asset.position);
  const fit = override?.fit ?? asset.fit;
  const displayName = override?.fileName ?? asset.src;

  const handleFileChange = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setOverride(slot, { src: reader.result, fileName: file.name });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <li className="rounded-2xl border border-[#D8C9E8] bg-[#FFFDF8] p-3">
      <div className="flex gap-3">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-[#E6E0F2]">
          <ConfigImage slot={slot} asset={asset} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-[#493B59]">{label}</p>
          <p className="truncate text-xs text-[#493B59]/60">{displayName}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#8873A8] px-3 py-1.5 text-xs text-[#FFFDF8] transition hover:bg-[#493B59]">
              <Upload className="size-3.5" aria-hidden="true" />
              Replace
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(e) => handleFileChange(e.target.files?.[0])}
              />
            </label>
            <button
              type="button"
              onClick={() => setOverride(slot, { fit: fit === 'cover' ? 'contain' : 'cover' })}
              className="rounded-full border border-[#D8C9E8] px-3 py-1.5 text-xs text-[#493B59] transition hover:border-[#8873A8]"
            >
              Fit: {fit}
            </button>
            {override && (
              <button
                type="button"
                onClick={() => setOverride(slot, null)}
                className="inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-xs text-[#493B59]/75 hover:text-[#493B59]"
                aria-label={`Reset ${label}`}
              >
                <RotateCcw className="size-3.5" aria-hidden="true" />
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <label className="text-[11px] text-[#493B59]/75">
          Horizontal {Math.round(x)}%
          <input
            type="range"
            min={0}
            max={100}
            value={x}
            onChange={(e) => setOverride(slot, { position: `${e.target.value}% ${y}%` })}
            className="mt-1 w-full accent-[#8873A8]"
          />
        </label>
        <label className="text-[11px] text-[#493B59]/75">
          Vertical {Math.round(y)}%
          <input
            type="range"
            min={0}
            max={100}
            value={y}
            onChange={(e) => setOverride(slot, { position: `${x}% ${e.target.value}%` })}
            className="mt-1 w-full accent-[#8873A8]"
          />
        </label>
      </div>
    </li>
  );
}

export function PhotoCustomizer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed top-[max(0.75rem,env(safe-area-inset-top))] right-3 z-40 flex items-center gap-1.5 rounded-full border border-[#D6BD91]/70 bg-[#FFFDF8]/92 px-3.5 py-2 text-xs font-medium text-[#493B59] shadow-md backdrop-blur transition hover:bg-[#FFFDF8]"
      >
        <ImageIcon className="size-4 text-[#8873A8]" aria-hidden="true" />
        Photos
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex justify-end bg-[#372B45]/55 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Replaceable photo customizer"
              className="flex h-full w-full max-w-sm flex-col bg-[#F5F1FA] shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
            >
              <header className="flex items-start justify-between gap-3 border-b border-[#D8C9E8] p-4">
                <div>
                  <h2 className="font-serif text-xl font-semibold text-[#493B59]">
                    Customize Photos
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-[#493B59]/75">
                    Upload your own couple portraits or gallery images and adjust their framing. Changes are saved locally in your browser.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 text-[#493B59] transition hover:bg-[#E6E0F2]"
                  aria-label="Close photo customizer"
                >
                  <X className="size-5" />
                </button>
              </header>

              <ul className="flex-1 space-y-3 overflow-y-auto p-4 pb-24">
                {PHOTO_SLOTS.map((item) => (
                  <SlotRow key={item.slot} {...item} />
                ))}
              </ul>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
