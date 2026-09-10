import { useCallback, useRef, useState } from "react";

/**
 * Return type interface for `useDialogState`.
 */
export interface UseDialogStateReturn<TState> {
  /** The raw active state payload, or `null` when the dialog is closed. */
  state: TState | null;
  /**
   * Preserves the previous non-null payload during closing exit transitions.
   * Prevents UI content from vanishing abruptly while exit animations play.
   */
  activeOrPreviousState: TState | null;
  /** Opens the dialog with the given state payload. */
  open: (s: TState) => void;
  /** Closes the dialog, setting `state` to `null`. */
  close: () => void;
  /** Boolean indicating whether the dialog is currently open. */
  isOpen: boolean;
}

/**
 * Custom hook for managing modal, sheet, or dialog state with exit-animation support.
 *
 * Keeps track of both the active state and the last non-null state in a ref so that
 * animating dialogs can retain their content until the exit transition completes.
 *
 * @template TState - Type of the payload associated with the dialog.
 * @returns An object containing `state`, `activeOrPreviousState`, `open`, `close`, and `isOpen`.
 *
 * @example
 * ```tsx
 * interface EditUserPayload { userId: string; name: string }
 * const editDialog = useDialogState<EditUserPayload>();
 *
 * return (
 *   <>
 *     <button onClick={() => editDialog.open({ userId: "1", name: "Alice" })}>Edit</button>
 *     <Dialog open={editDialog.isOpen} onOpenChange={(open) => !open && editDialog.close()}>
 *       <DialogContent>
 *         <p>Editing user: {editDialog.activeOrPreviousState?.name}</p>
 *       </DialogContent>
 *     </Dialog>
 *   </>
 * );
 * ```
 */
export function useDialogState<TState>(): UseDialogStateReturn<TState> {
  const [state, setState] = useState<TState | null>(null);
  // Keep the last valid state in a ref to feed exit animations
  const lastStateRef = useRef<TState | null>(null);

  if (state !== null) {
    lastStateRef.current = state;
  }

  const open = useCallback((s: TState) => setState(s), []);
  const close = useCallback(() => setState(null), []);

  return {
    /** The raw active state (null when closed). */
    state,
    /** Preserves previous payload during closing transitions. */
    activeOrPreviousState: state ?? lastStateRef.current,
    open,
    close,
    isOpen: state !== null,
  };
}
