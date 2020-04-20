let selection: string;

export function setSelectionOnChange(): any {
  document.onselectionchange = function() {
    selection = document.getSelection().toString();
  };
}

export function resetSelection(): any {
  selection = undefined;
}

export function getSelection(): any {
  return selection;
}
/**
 * save selection when the editor is focussed out
 */
export function saveSelection(): any {
  if (window.getSelection) {
    const sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      return sel.getRangeAt(0);
    }
  } else if (document.getSelection && document.createRange) {
    return document.createRange();
  }
  return null;
}

/**
 * restore selection when the editor is focussed in
 *
 * @param range saved selection when the editor is focussed out
 */
export function restoreSelection(range): boolean {
  if (range) {
    if (window.getSelection) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      return true;
    } else if (document.getSelection && range.select) {
      range.select();
      return true;
    }
  } else {
    return false;
  }
}
