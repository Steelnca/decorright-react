import React, { useEffect, useRef, useState } from 'react';

export type SimpleVoiceBubbleProps = {
  src: string;
  className?: string;
  autoPlay?: boolean;
  bars?: number;
};

export default function SimpleVoiceBubble({
  src,
  className = '',
  autoPlay = false,
  bars = 14,
}: SimpleVoiceBubbleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pointerActiveRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [current, setCurrent] = useState<number>(0);

  // --- visual tuning: change these to make bars thinner/wider/closer
  const BAR_WIDTH = 2; // <-- make bars thinner (2 or 2.5)
  const SPACING = 6; // <-- horizontal spacing between bar origins
  const RX = 1.5; // <-- large rx -> fully rounded ends
  // -----------------------------------------------------------------

  // generate some organic-looking heights
  const BAR_HEIGHTS = Array.from({ length: bars }).map((_, i) => {
    const pattern = [6, 18, 10, 22, 12, 16, 20, 8, 14];
    return pattern[i % pattern.length];
  });

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onLoaded = () => setDuration(a.duration || 0);
    const onPlay = () => {
      setIsPlaying(true);
      startRaf();
    };
    const onPause = () => {
      setIsPlaying(false);
      stopRaf();
    };
    const onEnded = () => {
      setIsPlaying(false);
      stopRaf();
      setCurrent(a.duration || 0);
    };

    a.addEventListener('loadedmetadata', onLoaded);
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.addEventListener('ended', onEnded);

    if (autoPlay) a.play().catch(() => {});

    return () => {
      a.removeEventListener('loadedmetadata', onLoaded);
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('ended', onEnded);
      stopRaf();
    };
  }, [src, autoPlay]);

  const startRaf = () => {
    if (rafRef.current != null) return;
    const loop = () => {
      const a = audioRef.current;
      if (a) setCurrent(a.currentTime);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  };

  const stopRaf = () => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
      stopRaf();
      return;
    }
    try {
      await a.play();
      // onPlay handler will set state and start RAF
    } catch (e) {
      console.warn('Play prevented', e);
    }
  };

  // compute and clamp percent from clientX inside container
  const seekToClientX = (clientX: number) => {
    const a = audioRef.current;
    const c = containerRef.current;
    if (!a || !c || !duration) return;
    const rect = c.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(1, Math.max(0, x / rect.width));
    a.currentTime = pct * duration;
    setCurrent(a.currentTime);
  };

  const onPointerDown: React.PointerEventHandler = (e) => {
    // capture pointer so we can track dragging
    pointerActiveRef.current = true;
    const node = containerRef.current;
    try {
      node?.setPointerCapture?.(e.pointerId);
    } catch {}
    seekToClientX(e.clientX);
  };

  const onPointerMove: React.PointerEventHandler = (e) => {
    if (!pointerActiveRef.current) return;
    seekToClientX(e.clientX);
  };

  const onPointerUp: React.PointerEventHandler = (e) => {
    pointerActiveRef.current = false;
    try {
      containerRef.current?.releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  const fmt = (s: number) => {
    if (!isFinite(s) || s <= 0) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const progressPercent = duration ? (current / duration) * 100 : 0;
  const playedBars = Math.round((progressPercent / 100) * BAR_HEIGHTS.length);

  return (
    <div
      className={`simple-voice-bubble inline-flex items-center gap-4 rounded-full ${className}`}
    >
      <audio ref={audioRef} src={src} className="hidden" preload="metadata" />

      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? 'Pause voice message' : 'Play voice message'}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/10 backdrop-blur-sm hover:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-muted/25"
      >
        {isPlaying ? (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* waveform wrapper - pointer events enable click/drag-to-seek */}
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(current)}
        tabIndex={0}
        className="flex-1 min-w-0 cursor-pointer select-none"
        style={{ touchAction: 'none' }} // allow smooth pointer dragging on touch devices
      >
        <svg
          viewBox={`0 0 ${BAR_HEIGHTS.length * SPACING} 24`}
          className="w-full h-8"
          preserveAspectRatio="none"
          aria-hidden
        >
          <g>
            {BAR_HEIGHTS.map((h, i) => {
              const x = i * SPACING + 2;
              const y = Math.max(1, 24 - h) / 2;
              const played = i < playedBars;
              // played -> full opacity; unplayed -> dim
              const fillClass = played ? 'fill-muted' : isPlaying ? 'fill-muted/45' : 'fill-muted/25';
              return (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width={BAR_WIDTH}
                  height={h}
                  rx={RX}
                  className={fillClass}
                />
              );
            })}
          </g>
        </svg>
      </div>

      <div className="flex-none text-sm font-medium text-muted tabular-nums mx-1">
        {isPlaying || current > 0 ? fmt(current) : fmt(duration)}
      </div>
    </div>
  );
}
