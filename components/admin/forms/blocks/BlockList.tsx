"use client";

import { useState } from "react";
import BlockEditor from "./BlockEditor";
import {
  BLOCK_TYPES,
  BLOCK_LABELS,
  BLOCK_HINTS,
  newBlock,
  type Block,
  type BlockType,
} from "@/lib/content/blocks";

export default function BlockList({
  blocks,
  onChange,
}: {
  blocks: Block[];
  onChange: (b: Block[]) => void;
}) {
  const [addingAt, setAddingAt] = useState<number | null>(null);

  function update(i: number, patch: Block) {
    const next = blocks.slice();
    next[i] = patch;
    onChange(next);
  }
  function remove(i: number) {
    onChange(blocks.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    const next = blocks.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }
  function add(type: BlockType, at: number) {
    const block = newBlock(type);
    const next = blocks.slice();
    next.splice(at, 0, block);
    onChange(next);
    setAddingAt(null);
  }

  return (
    <div className="rounded-2xl border border-ink-line bg-paper-raised p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="font-mono text-[11px] uppercase tracking-wider text-ink-dim">
          Blocks ({blocks.length})
        </div>
        <AddBlockButton
          open={addingAt === blocks.length}
          onToggle={() =>
            setAddingAt(addingAt === blocks.length ? null : blocks.length)
          }
          onPick={(type) => add(type, blocks.length)}
        />
      </div>

      {blocks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink-line bg-paper p-8 text-center">
          <div className="text-sm text-ink-muted">No blocks yet.</div>
          <div className="mt-2 text-xs text-ink-dim">
            Click <span className="text-ink">+ Add block</span> above to start.
          </div>
        </div>
      ) : (
        <ul className="space-y-4">
          {blocks.map((block, i) => (
            <li key={block.id}>
              <BlockCard
                block={block}
                index={i}
                count={blocks.length}
                onChange={(b) => update(i, b)}
                onRemove={() => remove(i)}
                onMove={(dir) => move(i, dir)}
              />
              {/* In-between adder */}
              <div className="flex items-center justify-center pt-2">
                <AddBlockButton
                  open={addingAt === i + 1}
                  onToggle={() =>
                    setAddingAt(addingAt === i + 1 ? null : i + 1)
                  }
                  onPick={(type) => add(type, i + 1)}
                  compact
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function BlockCard({
  block,
  index,
  count,
  onChange,
  onRemove,
  onMove,
}: {
  block: Block;
  index: number;
  count: number;
  onChange: (b: Block) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  return (
    <div className="rounded-xl border border-ink-line bg-paper p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-dim">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="rounded-full bg-copper/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-copper">
            {BLOCK_LABELS[block.type]}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onMove(-1)}
            disabled={index === 0}
            title="Move up"
            className="rounded-md border border-ink-line bg-paper-raised px-2 py-1 text-xs text-ink-muted transition hover:bg-paper disabled:cursor-not-allowed disabled:opacity-30"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            disabled={index === count - 1}
            title="Move down"
            className="rounded-md border border-ink-line bg-paper-raised px-2 py-1 text-xs text-ink-muted transition hover:bg-paper disabled:cursor-not-allowed disabled:opacity-30"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={onRemove}
            title="Remove block"
            className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-700 transition hover:bg-red-100"
          >
            ×
          </button>
        </div>
      </div>
      <BlockEditor block={block} onChange={onChange} />
    </div>
  );
}

function AddBlockButton({
  open,
  onToggle,
  onPick,
  compact = false,
}: {
  open: boolean;
  onToggle: () => void;
  onPick: (type: BlockType) => void;
  compact?: boolean;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={
          compact
            ? "rounded-full border border-dashed border-ink-line bg-paper px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-dim transition hover:border-copper hover:text-copper"
            : "btn-ghost text-xs"
        }
      >
        + Add block
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-72 rounded-xl border border-ink-line bg-paper-raised p-2 shadow-lg">
          <div className="px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-ink-dim">
            Pick a block
          </div>
          {BLOCK_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onPick(t)}
              className="block w-full rounded-lg px-3 py-2 text-left transition hover:bg-paper"
            >
              <div className="text-sm font-medium text-ink">
                {BLOCK_LABELS[t]}
              </div>
              <div className="mt-0.5 text-xs text-ink-muted">
                {BLOCK_HINTS[t]}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
