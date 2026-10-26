import React, { useState, useEffect, useRef } from 'react';
import { BIBLE_VERSIONS, t } from './i18n.js';

// Lightweight SVG Icons (Zero dependencies - ponytail)
const Icons = {
  Book: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  Search: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  TextSettings: () => (
    <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.05em' }}>Aa</span>
  ),
  BookmarkList: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  Close: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Copy: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  ),
  ImageCard: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
  Compare: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  Download: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Bookmark: ({ filled }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Share: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  ),
  CloudCheck: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"/>
      <polyline points="9 15 12 18 17 13"/>
    </svg>
  ),
  ListLayout: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/>
      <line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  ),
  ParagraphLayout: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 4v16"/>
      <path d="M17 4v16"/>
      <path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13"/>
    </svg>
  )
};

export default function App() {
  // Bible Version & Language State
  const [version, setVersion] = useState(() => localStorage.getItem('alkitab_version') || 'tb');
  const [lang, setLang] = useState(() => localStorage.getItem('alkitab_lang') || 'id');
  const [showVersionModal, setShowVersionModal] = useState(false);

  // Navigation & Books State
  const [books, setBooks] = useState([]);
  const [currentBookId, setCurrentBookId] = useState(() => {
    const val = parseInt(localStorage.getItem('alkitab_book_id') || '43', 10);
    return isNaN(val) ? 43 : val;
  });
  const [currentChapter, setCurrentChapter] = useState(() => {
    const val = parseInt(localStorage.getItem('alkitab_chapter') || '1', 10);
    return isNaN(val) ? 1 : val;
  });
  const [bookCache, setBookCache] = useState({});
  const [loading, setLoading] = useState(true);

  // Appearance
  const [theme, setTheme] = useState(() => localStorage.getItem('alkitab_theme') || 'sepia');
  const [fontSize, setFontSize] = useState(() => {
    const val = parseInt(localStorage.getItem('alkitab_font_size') || '19', 10);
    return isNaN(val) ? 19 : val;
  });
  const [fontFamily, setFontFamily] = useState(() => localStorage.getItem('alkitab_font_family') || 'serif');
  const [lineHeight, setLineHeight] = useState(() => localStorage.getItem('alkitab_line_height') || '1.85');
  const [readerLayout, setReaderLayout] = useState(() => localStorage.getItem('alkitab_reader_layout') || 'list');

  // Reading progress scroll state
  const [scrollProgress, setScrollProgress] = useState(0);

  // Interactivity
  const [selectedVerse, setSelectedVerse] = useState(null);
  
  // Highlights: { [passageKey]: 'yellow' | 'green' | 'blue' | 'pink' }
  const [highlights, setHighlights] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('alkitab_highlights') || '{}');
    } catch {
      return {};
    }
  });

  // Bookmarks: Array of passage keys
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('alkitab_bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  // Modals & Panels
  const [showPicker, setShowPicker] = useState(false);
  const [pickerTestament, setPickerTestament] = useState('ALL');
  const [pickerCategory, setPickerCategory] = useState('ALL');
  const [pickerBook, setPickerBook] = useState(null);

  const [showAppearance, setShowAppearance] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchScope, setSearchScope] = useState('ALL'); // 'ALL', 'PB', 'PL', 'CURRENT'
  const [parsedRef, setParsedRef] = useState(null);
  const [matchedBooks, setMatchedBooks] = useState([]);
  const [targetVerse, setTargetVerse] = useState(null);
  const [pickerSearch, setPickerSearch] = useState('');
  const searchInputRef = useRef(null);

  const [showSavedModal, setShowSavedModal] = useState(false);
  const [showCardMaker, setShowCardMaker] = useState(false);
  const [cardTheme, setCardTheme] = useState('amber'); // amber, midnight, parchment, emerald
  const canvasRef = useRef(null);

  // Verse Comparison Modal
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareData, setCompareData] = useState([]);
  const [comparing, setComparing] = useState(false);

  // Offline Sync & Toast
  const [offlineStatus, setOfflineStatus] = useState(() => {
    return localStorage.getItem(`alkitab_offline_synced_${version}`) === 'true';
  });
  const [syncingOffline, setSyncingOffline] = useState(false);
  const [toast, setToast] = useState(null);

  // Helpers for bilingual metadata
  const getBookName = (b) => {
    if (!b) return '';
    return lang === 'en' ? (b.name_en || b.name) : (b.name_id || b.name);
  };
  const getBookAbbr = (b) => {
    if (!b) return '';
    return lang === 'en' ? (b.abbr_en || b.abbr) : (b.abbr_id || b.abbr);
  };
  const getBookCategory = (b) => {
    if (!b) return '';
    return lang === 'en' ? (b.category_en || b.category) : (b.category_id || b.category);
  };

  // Track scroll progress for reading bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        setScrollProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      const progress = Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme application
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('alkitab_theme', theme);
    const metaThemeColor = document.getElementById('theme-color-meta');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0A0C10' : theme === 'sepia' ? '#FAF6ED' : '#FFFFFF');
    }
  }, [theme]);

  // Typography application
  useEffect(() => {
    document.documentElement.style.setProperty('--reader-font-size', `${fontSize}px`);
    document.documentElement.style.setProperty('--reader-line-height', lineHeight);
    document.documentElement.style.setProperty(
      '--font-reader',
      fontFamily === 'serif' ? 'var(--font-serif)' : 'var(--font-sans)'
    );
    localStorage.setItem('alkitab_font_size', fontSize);
    localStorage.setItem('alkitab_font_family', fontFamily);
    localStorage.setItem('alkitab_line_height', lineHeight);
  }, [fontSize, fontFamily, lineHeight]);

  // Language & Document Title application
  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('alkitab_lang', lang);
    document.title = lang === 'en'
      ? 'Holy Bible - Offline & Distraction-Free Reader'
      : 'Alkitab Digital Indonesia - Baca Firman Offline & Nyaman';
  }, [lang]);

  // Save location & version
  useEffect(() => {
    localStorage.setItem('alkitab_book_id', currentBookId);
    localStorage.setItem('alkitab_chapter', currentChapter);
    localStorage.setItem('alkitab_version', version);
    localStorage.setItem('alkitab_reader_layout', readerLayout);
    setOfflineStatus(localStorage.getItem(`alkitab_offline_synced_${version}`) === 'true');
  }, [currentBookId, currentChapter, version, readerLayout]);

  // Load books metadata
  useEffect(() => {
    fetch('/data/books.json')
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, []);

  // Load current book data for active version
  useEffect(() => {
    const cacheKey = `${version}:${currentBookId}`;
    if (bookCache[cacheKey]) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/data/${version}/${currentBookId}.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Version file not found');
        return res.json();
      })
      .then((bookData) => {
        setBookCache((prev) => ({ ...prev, [cacheKey]: bookData }));
        setLoading(false);
      })
      .catch((err) => {
        console.warn(`Fallback to default book for ${version}:`, err);
        fetch(`/data/books/${currentBookId}.json`)
          .then((res) => res.json())
          .then((bookData) => {
            setBookCache((prev) => ({ ...prev, [cacheKey]: bookData }));
            setLoading(false);
          })
          .catch(() => setLoading(false));
      });
  }, [currentBookId, version, bookCache]);

  const currentBookMeta = books.find((b) => b.id === currentBookId);
  const currentBookData = bookCache[`${version}:${currentBookId}`];
  const chapterVerses = currentBookData?.chapters?.[currentChapter.toString()] || [];

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSelectVersion = (verKey) => {
    setVersion(verKey);
    setSelectedVerse(null);
    setShowVersionModal(false);
    showToast(`${t(lang, 'changeVersion')}: ${BIBLE_VERSIONS[verKey].short}`);
  };

  const handleToggleLang = (newLang) => {
    setLang(newLang);
    showToast(newLang === 'en' ? 'Language switched to English' : 'Bahasa dialihkan ke Indonesia');
  };

  const handlePrevChapter = () => {
    setSelectedVerse(null);
    if (currentChapter > 1) {
      setCurrentChapter((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentBookId > 1) {
      const prevMeta = books.find((b) => b.id === currentBookId - 1);
      if (prevMeta) {
        setCurrentBookId(prevMeta.id);
        setCurrentChapter(prevMeta.chaptersCount);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleNextChapter = () => {
    setSelectedVerse(null);
    if (currentBookMeta && currentChapter < currentBookMeta.chaptersCount) {
      setCurrentChapter((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentBookId < 66) {
      setCurrentBookId((prev) => prev + 1);
      setCurrentChapter(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const jumpToPassage = (bookId, chapter, verse = null) => {
    const targetMeta = books.find((b) => b.id === bookId);
    const safeChapter = targetMeta ? Math.min(Math.max(1, chapter), targetMeta.chaptersCount) : Math.max(1, chapter);
    setCurrentBookId(bookId);
    setCurrentChapter(safeChapter);
    setShowPicker(false);
    setPickerBook(null);
    setPickerSearch('');
    setShowSearch(false);
    setShowSavedModal(false);
    setShowCompareModal(false);
    setSelectedVerse(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (verse) {
      setTargetVerse(verse);
      setTimeout(() => {
        const el = document.getElementById(`verse-${verse}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setSelectedVerse({ verse });
        }
      }, 250);
    }
  };

  // Keyboard Navigation: Escape to close modals, ArrowLeft/Right for chapters
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') {
        if (e.key === 'Escape') {
          document.activeElement.blur();
        }
        return;
      }

      if (e.key === 'Escape') {
        setShowPicker(false);
        setShowSearch(false);
        setShowAppearance(false);
        setShowVersionModal(false);
        setShowCompareModal(false);
        setShowCardMaker(false);
        setShowSavedModal(false);
        setSelectedVerse(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrevChapter();
      } else if (e.key === 'ArrowRight') {
        handleNextChapter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChapter, currentBookId, currentBookMeta, books]);

  // Scroll to target verse once scripture content is loaded
  useEffect(() => {
    if (targetVerse && !loading && currentBookData) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`verse-${targetVerse}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const verseObj = chapterVerses.find((v) => v.verse === targetVerse) || { verse: targetVerse };
          setSelectedVerse(verseObj);
          setTargetVerse(null);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [targetVerse, loading, currentBookData, currentChapter, chapterVerses]);

  // Verse Highlight Toggle
  const handleSetHighlight = (verseObj, color) => {
    const key = `${currentBookId}:${currentChapter}:${verseObj.verse}`;
    const updated = { ...highlights };
    if (updated[key] === color) {
      delete updated[key];
      showToast(t(lang, 'toastHlRemoved'));
    } else {
      updated[key] = color;
      showToast(t(lang, 'toastHlAdded'));
    }
    setHighlights(updated);
    localStorage.setItem('alkitab_highlights', JSON.stringify(updated));
  };

  const handleToggleBookmark = (verseObj) => {
    const key = `${currentBookId}:${currentChapter}:${verseObj.verse}`;
    let updated;
    if (bookmarks.includes(key)) {
      updated = bookmarks.filter((k) => k !== key);
      showToast(t(lang, 'toastBmRemoved'));
    } else {
      updated = [...bookmarks, key];
      showToast(t(lang, 'toastBmAdded'));
    }
    setBookmarks(updated);
    localStorage.setItem('alkitab_bookmarks', JSON.stringify(updated));
  };

  const handleRemoveBookmark = (key) => {
    const updated = bookmarks.filter((k) => k !== key);
    setBookmarks(updated);
    localStorage.setItem('alkitab_bookmarks', JSON.stringify(updated));
    showToast(t(lang, 'toastBmRemoved'));
  };

  const handleRemoveHighlight = (key) => {
    const updated = { ...highlights };
    delete updated[key];
    setHighlights(updated);
    localStorage.setItem('alkitab_highlights', JSON.stringify(updated));
    showToast(t(lang, 'toastHlRemoved'));
  };

  // Safe clipboard helper
  const copyTextToClipboard = async (text) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {}
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch {}
    return false;
  };

  const handleCopyVerse = (verseObj) => {
    if (!currentBookMeta) return;
    const bookTitle = getBookName(currentBookMeta);
    const citation = `"${verseObj.text}"\n— ${bookTitle} ${currentChapter}:${verseObj.verse} (${version.toUpperCase()})`;
    copyTextToClipboard(citation).then(() => {
      showToast(t(lang, 'toastCopied'));
    });
  };

  const handleShareVerse = (verseObj) => {
    if (!currentBookMeta) return;
    const bookTitle = getBookName(currentBookMeta);
    const textToShare = `"${verseObj.text}" — ${bookTitle} ${currentChapter}:${verseObj.verse} (${version.toUpperCase()})`;
    if (navigator.share) {
      navigator.share({
        title: `${bookTitle} ${currentChapter}:${verseObj.verse}`,
        text: textToShare
      }).catch(() => {});
    } else {
      handleCopyVerse(verseObj);
    }
  };

  // Compare Verse Across Versions (TB, AYT, KJV, WEB)
  const handleOpenCompare = async (verseObj) => {
    setSelectedVerse(verseObj);
    setShowCompareModal(true);
    setComparing(true);
    const list = ['tb', 'ayt', 'kjv', 'web'];
    const newlyFetched = {};
    const results = [];

    await Promise.all(
      list.map(async (vKey) => {
        const cacheKey = `${vKey}:${currentBookId}`;
        let bData = bookCache[cacheKey];
        if (!bData) {
          try {
            const res = await fetch(`/data/${vKey}/${currentBookId}.json`);
            if (res.ok) {
              bData = await res.json();
              newlyFetched[cacheKey] = bData;
            }
          } catch (e) {
            console.warn('Error loading version for compare:', vKey, e);
          }
        }
        const vText = bData?.chapters?.[currentChapter.toString()]?.find((v) => v.verse === verseObj.verse || String(v.verse) === String(verseObj.verse))?.text;
        if (vText) {
          results.push({
            version: vKey,
            versionObj: BIBLE_VERSIONS[vKey],
            text: vText
          });
        }
      })
    );

    if (Object.keys(newlyFetched).length > 0) {
      setBookCache((prev) => ({ ...prev, ...newlyFetched }));
    }

    results.sort((a, b) => list.indexOf(a.version) - list.indexOf(b.version));
    setCompareData(results);
    setComparing(false);
  };

  // DRAW VERSE CARD TO CANVAS (with adaptive font scaling)
  const drawVerseCard = () => {
    if (!canvasRef.current || !selectedVerse || !currentBookMeta) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = 1080;
    const height = 1080;
    canvas.width = width;
    canvas.height = height;

    let bgGrad = ctx.createLinearGradient(0, 0, width, height);
    let textColor = '#FFFFFF';
    let quoteColor = 'rgba(255, 255, 255, 0.2)';
    let refColor = '#FBBF24';

    if (cardTheme === 'amber') {
      bgGrad.addColorStop(0, '#78350F');
      bgGrad.addColorStop(0.5, '#451A03');
      bgGrad.addColorStop(1, '#1C1917');
      refColor = '#FDE68A';
    } else if (cardTheme === 'midnight') {
      bgGrad.addColorStop(0, '#0F172A');
      bgGrad.addColorStop(0.5, '#020617');
      bgGrad.addColorStop(1, '#000000');
      refColor = '#38BDF8';
    } else if (cardTheme === 'emerald') {
      bgGrad.addColorStop(0, '#064E3B');
      bgGrad.addColorStop(0.6, '#022C22');
      bgGrad.addColorStop(1, '#0A0C10');
      refColor = '#6EE7B7';
    } else if (cardTheme === 'parchment') {
      bgGrad.addColorStop(0, '#FAF6ED');
      bgGrad.addColorStop(1, '#EFE6D1');
      textColor = '#2C241D';
      quoteColor = 'rgba(180, 83, 9, 0.15)';
      refColor = '#B45309';
    }

    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = cardTheme === 'parchment' ? 'rgba(180, 83, 9, 0.25)' : 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, width - 100, height - 100);

    ctx.font = 'bold 220px Georgia, serif';
    ctx.fillStyle = quoteColor;
    ctx.fillText('“', 100, 240);

    let fontSize = 48;
    let lineHeightPx = 72;
    if (selectedVerse.text.length > 220) {
      fontSize = 32;
      lineHeightPx = 50;
    } else if (selectedVerse.text.length > 130) {
      fontSize = 40;
      lineHeightPx = 62;
    }

    ctx.font = `500 ${fontSize}px "Literata", Georgia, serif`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const words = selectedVerse.text.split(' ');
    const lines = [];
    let currentLine = '';
    const maxWidth = 860;

    for (let n = 0; n < words.length; n++) {
      const testLine = currentLine + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        lines.push(currentLine.trim());
        currentLine = words[n] + ' ';
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine.trim());

    const startY = (height / 2) - ((lines.length * lineHeightPx) / 2) + 20;

    lines.forEach((line, index) => {
      ctx.fillText(line, width / 2, startY + (index * lineHeightPx));
    });

    const bookTitle = getBookName(currentBookMeta);
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = refColor;
    ctx.fillText(`— ${bookTitle} ${currentChapter}:${selectedVerse.verse} (${version.toUpperCase()}) —`, width / 2, startY + (lines.length * lineHeightPx) + 80);

    ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = cardTheme === 'parchment' ? 'rgba(44, 36, 29, 0.4)' : 'rgba(255, 255, 255, 0.4)';
    ctx.fillText(`${t(lang, 'appTitle')} • baca-alkitab.vercel.app`, width / 2, height - 90);
  };

  useEffect(() => {
    if (showCardMaker) {
      setTimeout(drawVerseCard, 50);
    }
  }, [showCardMaker, cardTheme, selectedVerse]);

  const handleDownloadCard = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    const bookTitle = getBookName(currentBookMeta);
    link.download = `Alkitab-${bookTitle}-${currentChapter}-${selectedVerse?.verse}-${version.toUpperCase()}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
    showToast(t(lang, 'toastCardDownloaded'));
  };

  // Offline Precache per Version (batch fetching + memory cache integration)
  const handleSyncAllOffline = async () => {
    setSyncingOffline(true);
    showToast(t(lang, 'toastDownloading', { version: version.toUpperCase() }));
    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'CACHE_VERSION', version });
      }

      const newlyFetched = {};
      const batchSize = 12;
      for (let i = 1; i <= 66; i += batchSize) {
        const chunk = [];
        for (let j = i; j < Math.min(67, i + batchSize); j++) {
          chunk.push(j);
        }
        await Promise.all(
          chunk.map(async (bId) => {
            try {
              const res = await fetch(`/data/${version}/${bId}.json`);
              if (res.ok) {
                const data = await res.json();
                newlyFetched[`${version}:${bId}`] = data;
              }
            } catch {
              // Ignore single error
            }
          })
        );
      }

      if (Object.keys(newlyFetched).length > 0) {
        setBookCache((prev) => ({ ...prev, ...newlyFetched }));
      }

      setOfflineStatus(true);
      localStorage.setItem(`alkitab_offline_synced_${version}`, 'true');
      setSyncingOffline(false);
      showToast(t(lang, 'toastSynced', { version: version.toUpperCase() }));
    } catch {
      setSyncingOffline(false);
      showToast(t(lang, 'toastFailed'));
    }
  };

  const activeSearchQueryRef = useRef('');

  // Auto-focus search input when modal opens
  useEffect(() => {
    if (showSearch) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 60);
    }
  }, [showSearch]);

  // Parse bible reference e.g. "Yohanes 3:16", "Mzm 23", "1 Kor 13:4", "John 3:16"
  const parseBibleReference = (input) => {
    if (!input || !books.length) return null;
    const clean = input.trim();
    const match = clean.match(/^([1-3]?\s*[a-zA-Z\u00C0-\u017F]+)\s+(\d+)(?:[:.\s]+(\d+)(?:-\d+)?)?$/i);
    if (!match) return null;

    const bookPart = match[1].replace(/\s+/g, '').toLowerCase();
    const chapter = parseInt(match[2], 10);
    const verse = match[3] ? parseInt(match[3], 10) : null;

    let foundBook = books.find((b) => {
      const names = [b.abbr, b.abbr_id, b.abbr_en, b.name, b.name_id, b.name_en].filter(Boolean);
      return names.some((n) => n.replace(/\s+/g, '').toLowerCase() === bookPart);
    });

    if (!foundBook) {
      foundBook = books.find((b) => {
        const names = [b.name, b.name_id, b.name_en, b.abbr, b.abbr_id, b.abbr_en].filter(Boolean);
        return names.some((n) => n.replace(/\s+/g, '').toLowerCase().startsWith(bookPart));
      });
    }

    if (!foundBook) return null;
    if (chapter < 1 || chapter > foundBook.chaptersCount) return null;

    return { book: foundBook, chapter, verse };
  };

  const findMatchingBooks = (input) => {
    if (!input || !books.length) return [];
    const clean = input.trim().toLowerCase();
    if (clean.length < 2 || /\d/.test(clean)) return [];

    return books.filter((b) => {
      const names = [b.name, b.name_id, b.name_en, b.abbr, b.abbr_id, b.abbr_en].filter(Boolean);
      return names.some((n) => n.toLowerCase().startsWith(clean) || n.toLowerCase() === clean);
    }).slice(0, 3);
  };

  const highlightSearchText = (text, query) => {
    if (!query || !query.trim()) return text;
    const q = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${q})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === query.trim().toLowerCase() ? (
        <mark key={i} className="search-highlight">{part}</mark>
      ) : (
        part
      )
    );
  };

  const executeVerseSearch = async (queryText, scope = searchScope) => {
    const q = queryText.trim().toLowerCase();
    if (!q || q.length < 2) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    activeSearchQueryRef.current = q;
    setSearching(true);

    let targetBookIds = [];
    if (scope === 'CURRENT') {
      targetBookIds = [currentBookId];
    } else if (scope === 'PB') {
      targetBookIds = books.filter((b) => b.testament === 'PB').map((b) => b.id);
    } else if (scope === 'PL') {
      targetBookIds = books.filter((b) => b.testament === 'PL').map((b) => b.id);
    } else {
      targetBookIds = books.map((b) => b.id);
    }

    const loadedBookData = {};
    const booksToFetch = [];

    for (const bId of targetBookIds) {
      const cacheKey = `${version}:${bId}`;
      if (bookCache[cacheKey]) {
        loadedBookData[bId] = bookCache[cacheKey];
      } else {
        booksToFetch.push(bId);
      }
    }

    if (booksToFetch.length > 0) {
      const newlyFetched = {};
      const batchSize = 15;
      for (let i = 0; i < booksToFetch.length; i += batchSize) {
        if (activeSearchQueryRef.current !== q) return; // Discard stale search
        const batch = booksToFetch.slice(i, i + batchSize);
        await Promise.all(
          batch.map(async (bId) => {
            try {
              const res = await fetch(`/data/${version}/${bId}.json`);
              if (!res.ok) throw new Error('Not ok');
              const data = await res.json();
              newlyFetched[`${version}:${bId}`] = data;
              loadedBookData[bId] = data;
            } catch {
              try {
                const fb = await fetch(`/data/books/${bId}.json`);
                if (fb.ok) {
                  const fbData = await fb.json();
                  newlyFetched[`${version}:${bId}`] = fbData;
                  loadedBookData[bId] = fbData;
                }
              } catch {
                // Ignore missing file
              }
            }
          })
        );
      }
      if (Object.keys(newlyFetched).length > 0) {
        setBookCache((prev) => ({ ...prev, ...newlyFetched }));
      }
    }

    if (activeSearchQueryRef.current !== q) return;

    const results = [];
    for (const bId of targetBookIds) {
      const bookData = loadedBookData[bId];
      if (!bookData || !bookData.chapters) continue;
      const meta = books.find((b) => b.id === bId);
      const bName = getBookName(meta) || bookData.name;

      for (const ch of Object.keys(bookData.chapters)) {
        const chapterNum = parseInt(ch, 10);
        for (const v of bookData.chapters[ch]) {
          if (v.text.toLowerCase().includes(q)) {
            results.push({
              bookId: bId,
              bookName: bName,
              chapter: chapterNum,
              verse: v.verse,
              text: v.text
            });
            if (results.length >= 60) break;
          }
        }
        if (results.length >= 60) break;
      }
      if (results.length >= 60) break;
    }

    setSearchResults(results);
    setSearching(false);
  };

  // Real-time debounced search
  useEffect(() => {
    if (!showSearch) return;
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setSearchResults([]);
      setSearching(false);
      setParsedRef(null);
      setMatchedBooks([]);
      return;
    }

    const ref = parseBibleReference(trimmed);
    setParsedRef(ref);

    const bMatches = findMatchingBooks(trimmed);
    setMatchedBooks(bMatches);

    const timer = setTimeout(() => {
      executeVerseSearch(trimmed, searchScope);
    }, 320);

    return () => clearTimeout(timer);
  }, [searchQuery, searchScope, showSearch, version]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const trimmed = searchQuery.trim();
    if (parsedRef) {
      jumpToPassage(parsedRef.book.id, parsedRef.chapter, parsedRef.verse);
      return;
    }
    if (!trimmed) return;
    executeVerseSearch(trimmed, searchScope);
  };

  const sampleSuggestions = lang === 'en'
    ? ['John 3:16', 'Psalm 23', 'Romans 8:28', 'love', 'peace', 'faith', 'light']
    : ['Yohanes 3:16', 'Mazmur 23', 'Roma 8:28', 'kasih', 'damai', 'iman', 'terang'];

  const filteredBooks = books.filter((b) => {
    if (pickerTestament === 'PL' && b.testament !== 'PL') return false;
    if (pickerTestament === 'PB' && b.testament !== 'PB') return false;
    if (pickerCategory !== 'ALL' && getBookCategory(b) !== pickerCategory) return false;
    if (pickerSearch.trim()) {
      const q = pickerSearch.trim().toLowerCase();
      const names = [b.name, b.abbr, b.name_id, b.name_en, b.abbr_id, b.abbr_en].filter(Boolean);
      return names.some((n) => n.toLowerCase().includes(q));
    }
    return true;
  });

  const availableCategories = ['ALL', ...new Set(
    books
      .filter((b) => pickerTestament === 'ALL' || b.testament === pickerTestament)
      .map((b) => getBookCategory(b))
  )];

  const currentBookDisplayName = getBookName(currentBookMeta);
  const currentBookDisplayAbbr = getBookAbbr(currentBookMeta);

  return (
    <div className="app-layout">
      {/* Scroll Progress Bar (Top) */}
      <div className="reading-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Toast Notification */}
      {toast && (
        <div className="toast-box">
          <Icons.CloudCheck />
          <span>{toast}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="app-header">
        <div className="header-container">
          <div className="header-brand" onClick={() => jumpToPassage(43, 1)} title={t(lang, 'appTitle')}>
            <div className="brand-icon">
              <img src="/icon.svg" alt="Alkitab" width="28" height="28" />
            </div>
            <span className="brand-title-text">{t(lang, 'appTitle')}</span>
          </div>

          <div className="header-center">
            <div className="header-nav-pill">
              <button 
                className="nav-pill-btn nav-passage-btn"
                onClick={() => {
                  setPickerBook(currentBookMeta);
                  setShowPicker(true);
                }}
                title={t(lang, 'selectPassage')}
              >
                <Icons.Book />
                <span className="nav-passage-name">
                  {currentBookDisplayName ? `${currentBookDisplayName} ${currentChapter}` : t(lang, 'loadingScripture')}
                </span>
                <Icons.ChevronDown />
              </button>

              <div className="nav-pill-sep" />

              <button 
                className="nav-pill-btn nav-version-btn"
                onClick={() => setShowVersionModal(true)}
                title={t(lang, 'selectVersion')}
              >
                <span className="nav-version-tag">{version.toUpperCase()}</span>
                <Icons.ChevronDown />
              </button>
            </div>
          </div>

          <div className="header-actions">
            {/* Quick Language Toggle */}
            <div className="lang-toggle-bar">
              <button 
                className={`lang-btn ${lang === 'id' ? 'active' : ''}`}
                onClick={() => handleToggleLang('id')}
                title="Bahasa Indonesia"
              >
                ID
              </button>
              <button 
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => handleToggleLang('en')}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Layout Toggle: List vs Paragraph */}
            <button 
              className={`icon-btn ${readerLayout === 'list' ? 'active' : ''}`}
              onClick={() => setReaderLayout((prev) => prev === 'list' ? 'paragraph' : 'list')}
              title={readerLayout === 'list' ? t(lang, 'viewParagraph') : t(lang, 'viewVerse')}
            >
              {readerLayout === 'list' ? <Icons.ParagraphLayout /> : <Icons.ListLayout />}
            </button>

            <button 
              className={`icon-btn ${showSearch ? 'active' : ''}`}
              onClick={() => setShowSearch(true)} 
              title={t(lang, 'search')}
            >
              <Icons.Search />
            </button>
            <button 
              className={`icon-btn ${showSavedModal ? 'active' : ''}`}
              onClick={() => setShowSavedModal(true)} 
              title={t(lang, 'savedTitle')}
            >
              <Icons.BookmarkList />
            </button>
            <button 
              className={`icon-btn ${showAppearance ? 'active' : ''}`}
              onClick={() => setShowAppearance(true)} 
              title={t(lang, 'appearanceTitle')}
            >
              <Icons.TextSettings />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN READER */}
      <main className="reader-main">
        <div className="reader-content">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>{t(lang, 'loadingScripture')}</p>
            </div>
          ) : (
            <div className="reader-paper-canvas">
              {/* EDITORIAL CHAPTER HEADER */}
              <div className="chapter-header-box">
                <div className="chapter-category-chip">
                  <span>{currentBookMeta?.testament === 'PL' ? t(lang, 'otTestament') : t(lang, 'ntTestament')}</span>
                  <span className="dot-divider">•</span>
                  <span>{getBookCategory(currentBookMeta)}</span>
                </div>

                <h1 className="chapter-book-title">{currentBookDisplayName}</h1>

                <div className="chapter-badge-wrap">
                  <div className="chapter-pill">
                    <span className="chapter-pill-label">{t(lang, 'chapterNum', { chapter: currentChapter })}</span>
                    <span className="chapter-pill-version">{version.toUpperCase()}</span>
                  </div>
                </div>

                <div className="chapter-ornament-divider">
                  <span className="ornament-line" />
                  <span className="ornament-gem">✦</span>
                  <span className="ornament-line" />
                </div>
              </div>

              {/* VERSES PRESENTATION: LIST VS PARAGRAPH */}
              {readerLayout === 'list' ? (
                <div className="verses-flow-list">
                  {chapterVerses.map((verseObj) => {
                    const key = `${currentBookId}:${currentChapter}:${verseObj.verse}`;
                    const isSelected = selectedVerse?.verse === verseObj.verse;
                    const isBookmarked = bookmarks.includes(key);
                    const hlColor = highlights[key];

                    return (
                      <React.Fragment key={verseObj.verse}>
                        {verseObj.title && (
                          <div className="pericope-section-banner">
                            <span className="pericope-gem">✦</span>
                            <span className="pericope-title-text">{verseObj.title}</span>
                            <div className="pericope-line" />
                          </div>
                        )}
                        <div 
                          id={`verse-${verseObj.verse}`}
                          className={`verse-card-row ${isSelected ? 'selected' : ''} ${isBookmarked ? 'bookmarked' : ''} ${hlColor ? `hl-${hlColor}` : ''}`}
                          onClick={() => setSelectedVerse(isSelected ? null : verseObj)}
                        >
                          <div className="verse-num-badge">{verseObj.verse}</div>
                          <div className="verse-card-text">{verseObj.text}</div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              ) : (
                <div className="verses-flow-paragraph">
                  {chapterVerses.map((verseObj) => {
                    const key = `${currentBookId}:${currentChapter}:${verseObj.verse}`;
                    const isSelected = selectedVerse?.verse === verseObj.verse;
                    const isBookmarked = bookmarks.includes(key);
                    const hlColor = highlights[key];

                    return (
                      <React.Fragment key={verseObj.verse}>
                        {verseObj.title && (
                          <div className="pericope-section-banner">
                            <span className="pericope-gem">✦</span>
                            <span className="pericope-title-text">{verseObj.title}</span>
                            <div className="pericope-line" />
                          </div>
                        )}
                        <span 
                          id={`verse-${verseObj.verse}`}
                          className={`verse-item-inline ${isSelected ? 'selected' : ''} ${isBookmarked ? 'bookmarked' : ''} ${hlColor ? `hl-${hlColor}` : ''}`}
                          onClick={() => setSelectedVerse(isSelected ? null : verseObj)}
                        >
                          <sup className="verse-num-pill">{verseObj.verse}</sup>
                          <span className="verse-text">{verseObj.text} </span>
                        </span>
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* POP-UP ACTION BAR (Animos Spring Animation) */}
      {selectedVerse && (
        <div className="verse-actions-bar">
          <div className="hl-palette">
            <button 
              className="hl-dot" 
              style={{ backgroundColor: '#FEF08A' }} 
              onClick={() => handleSetHighlight(selectedVerse, 'yellow')}
              title="Sorot Emas"
            />
            <button 
              className="hl-dot" 
              style={{ backgroundColor: '#BBF7D0' }} 
              onClick={() => handleSetHighlight(selectedVerse, 'green')}
              title="Sorot Hijau"
            />
            <button 
              className="hl-dot" 
              style={{ backgroundColor: '#BAE6FD' }} 
              onClick={() => handleSetHighlight(selectedVerse, 'blue')}
              title="Sorot Biru"
            />
            <button 
              className="hl-dot" 
              style={{ backgroundColor: '#FBCFE8' }} 
              onClick={() => handleSetHighlight(selectedVerse, 'pink')}
              title="Sorot Merah Muda"
            />
          </div>

          <div style={{ width: 1, height: 20, backgroundColor: 'var(--border-subtle)' }} />

          <button className="verse-action-btn" onClick={() => handleCopyVerse(selectedVerse)}>
            <Icons.Copy />
            <span>{t(lang, 'salin')}</span>
          </button>
          <button className="verse-action-btn" onClick={() => handleToggleBookmark(selectedVerse)}>
            <Icons.Bookmark filled={bookmarks.includes(`${currentBookId}:${currentChapter}:${selectedVerse.verse}`)} />
            <span>{t(lang, 'tandai')}</span>
          </button>
          <button className="verse-action-btn" onClick={() => handleOpenCompare(selectedVerse)}>
            <Icons.Compare />
            <span>{t(lang, 'bandingkan')}</span>
          </button>
          <button 
            className="verse-action-btn" 
            style={{ backgroundColor: 'var(--accent)', color: 'var(--text-inverse)' }}
            onClick={() => setShowCardMaker(true)}
          >
            <Icons.ImageCard />
            <span>{t(lang, 'gambar')}</span>
          </button>
          <button className="icon-btn" onClick={() => setSelectedVerse(null)}>
            <Icons.Close />
          </button>
        </div>
      )}

      {/* FLOATING DOCK */}
      <nav className="floating-dock">
        <button 
          className="dock-btn" 
          onClick={handlePrevChapter} 
          disabled={currentBookId === 1 && currentChapter === 1}
          title={t(lang, 'prevChapter')}
        >
          <Icons.ChevronLeft />
          <span>{t(lang, 'prevChapter')}</span>
        </button>

        <div className="dock-divider" />

        <div 
          className="dock-indicator" 
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setPickerBook(currentBookMeta);
            setShowPicker(true);
          }}
        >
          {currentBookDisplayAbbr} {currentChapter} • {version.toUpperCase()}
        </div>

        <div className="dock-divider" />

        <button 
          className="dock-btn" 
          onClick={handleNextChapter} 
          disabled={currentBookId === 66 && currentBookMeta && currentChapter === currentBookMeta.chaptersCount}
          title={t(lang, 'nextChapter')}
        >
          <span>{t(lang, 'nextChapter')}</span>
          <Icons.ChevronRight />
        </button>
      </nav>

      {/* MODAL: BIBLE VERSION SELECTOR */}
      {showVersionModal && (
        <div className="modal-backdrop" onClick={() => setShowVersionModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{t(lang, 'selectVersion')}</div>
              <button className="modal-close-btn" onClick={() => setShowVersionModal(false)}>
                <Icons.Close />
              </button>
            </div>

            <div className="modal-body">
              <div className="version-options-grid">
                {Object.values(BIBLE_VERSIONS).map((vItem) => {
                  const isActive = version === vItem.id;
                  return (
                    <button
                      key={vItem.id}
                      className={`version-card-btn ${isActive ? 'active' : ''}`}
                      onClick={() => handleSelectVersion(vItem.id)}
                    >
                      <div className="version-card-header">
                        <div className="version-card-title">
                          <span>{vItem.name}</span>
                          <span className="version-lang-badge">{vItem.lang.toUpperCase()}</span>
                        </div>
                        <span className="version-card-badge">{vItem.badge}</span>
                      </div>
                      <div className="version-card-desc">{vItem.subtitle}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VERSE COMPARISON ACROSS VERSIONS */}
      {showCompareModal && selectedVerse && (
        <div className="modal-backdrop" onClick={() => setShowCompareModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                {currentBookDisplayName} {currentChapter}:{selectedVerse.verse}
              </div>
              <button className="modal-close-btn" onClick={() => setShowCompareModal(false)}>
                <Icons.Close />
              </button>
            </div>

            <div className="modal-body">
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                {t(lang, 'compareHint')}
              </p>

              {comparing ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>{t(lang, 'loadingScripture')}</p>
                </div>
              ) : (
                <div className="compare-list">
                  {compareData.map((item) => (
                    <div key={item.version} className="compare-item-card">
                      <div className="compare-item-header">
                        <div className="compare-item-version">
                          <span>{item.versionObj.name}</span>
                          <span className="version-lang-badge">{item.versionObj.lang.toUpperCase()}</span>
                        </div>
                        <button 
                          className="verse-action-btn"
                          style={{ padding: '0.25rem 0.6rem', fontSize: '0.74rem' }}
                          onClick={() => {
                            navigator.clipboard.writeText(`"${item.text}" — ${currentBookDisplayName} ${currentChapter}:${selectedVerse.verse} (${item.version.toUpperCase()})`);
                            showToast(t(lang, 'toastCopied'));
                          }}
                        >
                          <Icons.Copy />
                          <span>{t(lang, 'salin')}</span>
                        </button>
                      </div>
                      <div className="compare-item-text">
                        "{item.text}"
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VERSE CARD GENERATOR */}
      {showCardMaker && selectedVerse && (
        <div className="modal-backdrop" onClick={() => setShowCardMaker(false)}>
          <div className="modal-card card-maker-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{t(lang, 'cardMakerTitle')}</div>
              <button className="modal-close-btn" onClick={() => setShowCardMaker(false)}>
                <Icons.Close />
              </button>
            </div>

            <div className="modal-body">
              <div className="quote-canvas-preview">
                <canvas ref={canvasRef} />
              </div>

              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                {t(lang, 'chooseCardStyle')}
              </div>
              <div className="card-themes-row">
                <button 
                  className={`card-theme-btn ${cardTheme === 'amber' ? 'active' : ''}`}
                  style={{ background: 'linear-gradient(135deg, #78350F, #1C1917)' }}
                  onClick={() => setCardTheme('amber')}
                >
                  Amber Gold
                </button>
                <button 
                  className={`card-theme-btn ${cardTheme === 'midnight' ? 'active' : ''}`}
                  style={{ background: 'linear-gradient(135deg, #0F172A, #000000)' }}
                  onClick={() => setCardTheme('midnight')}
                >
                  Midnight
                </button>
                <button 
                  className={`card-theme-btn ${cardTheme === 'emerald' ? 'active' : ''}`}
                  style={{ background: 'linear-gradient(135deg, #064E3B, #0A0C10)' }}
                  onClick={() => setCardTheme('emerald')}
                >
                  Emerald
                </button>
                <button 
                  className={`card-theme-btn ${cardTheme === 'parchment' ? 'active' : ''}`}
                  style={{ background: '#FAF6ED', color: '#2C241D', border: '1px solid #D6C8A8' }}
                  onClick={() => setCardTheme('parchment')}
                >
                  Parchment
                </button>
              </div>

              <div className="card-maker-actions">
                <button className="primary-action-btn" onClick={handleDownloadCard}>
                  <Icons.Download />
                  <span>{t(lang, 'downloadPng')}</span>
                </button>
                <button className="verse-action-btn" onClick={() => handleShareVerse(selectedVerse)}>
                  <Icons.Share />
                  <span>{t(lang, 'share')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SAVED VERSES & HIGHLIGHTS */}
      {showSavedModal && (
        <div className="modal-backdrop" onClick={() => setShowSavedModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{t(lang, 'savedTitle')}</div>
              <button className="modal-close-btn" onClick={() => setShowSavedModal(false)}>
                <Icons.Close />
              </button>
            </div>

            <div className="modal-body">
              {bookmarks.length === 0 && Object.keys(highlights).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  {t(lang, 'emptySaved')}
                </div>
              ) : (
                <div>
                  {bookmarks.map((key) => {
                    const [bId, ch, v] = key.split(':');
                    const bMeta = books.find((b) => b.id === parseInt(bId, 10));
                    const bName = getBookName(bMeta);
                    const bCache = bookCache[`${version}:${bId}`];
                    const vText = bCache?.chapters?.[ch]?.find((x) => String(x.verse) === v)?.text;

                    return (
                      <div 
                        key={key} 
                        className="saved-item-card"
                        onClick={() => jumpToPassage(parseInt(bId, 10), parseInt(ch, 10), parseInt(v, 10))}
                      >
                        <div className="saved-item-header">
                          <div className="saved-item-ref">
                            <span>{bName} {ch}:{v}</span>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t(lang, 'ditandai')}</span>
                          </div>
                          <button 
                            type="button"
                            className="saved-item-del-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveBookmark(key);
                            }}
                            title="Hapus"
                          >
                            <Icons.Close />
                          </button>
                        </div>
                        {vText && <div className="saved-item-snippet">"{vText}"</div>}
                      </div>
                    );
                  })}

                  {Object.entries(highlights).map(([key, color]) => {
                    const [bId, ch, v] = key.split(':');
                    const bMeta = books.find((b) => b.id === parseInt(bId, 10));
                    const bName = getBookName(bMeta);
                    const bCache = bookCache[`${version}:${bId}`];
                    const vText = bCache?.chapters?.[ch]?.find((x) => String(x.verse) === v)?.text;

                    return (
                      <div 
                        key={key} 
                        className="saved-item-card"
                        style={{ borderLeft: `4px solid var(--hl-${color})` }}
                        onClick={() => jumpToPassage(parseInt(bId, 10), parseInt(ch, 10), parseInt(v, 10))}
                      >
                        <div className="saved-item-header">
                          <div className="saved-item-ref">
                            <span>{bName} {ch}:{v}</span>
                            <span style={{ fontSize: '0.72rem', textTransform: 'capitalize', color: 'var(--accent)', fontWeight: 700 }}>
                              {t(lang, 'sorotWarna', { color })}
                            </span>
                          </div>
                          <button 
                            type="button"
                            className="saved-item-del-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveHighlight(key);
                            }}
                            title="Hapus"
                          >
                            <Icons.Close />
                          </button>
                        </div>
                        {vText && <div className="saved-item-snippet">"{vText}"</div>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: BOOK & CHAPTER PICKER */}
      {showPicker && (
        <div className="modal-backdrop" onClick={() => setShowPicker(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                {pickerBook ? (
                  <button 
                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    onClick={() => setPickerBook(null)}
                  >
                    <Icons.ChevronLeft />
                    <span>{getBookName(pickerBook)} ({t(lang, 'chapterNum', { chapter: '' }).trim()})</span>
                  </button>
                ) : (
                  t(lang, 'selectPassage')
                )}
              </div>
              <button className="modal-close-btn" onClick={() => setShowPicker(false)}>
                <Icons.Close />
              </button>
            </div>

            <div className="modal-body">
              {pickerBook ? (
                <div>
                  <div style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {t(lang, 'availableChapters', {
                      count: pickerBook.chaptersCount,
                      book: getBookName(pickerBook)
                    })}
                  </div>
                  <div className="chapters-grid">
                    {Array.from({ length: pickerBook.chaptersCount }, (_, i) => i + 1).map((chNum) => (
                      <button
                        key={chNum}
                        className={`chapter-square-btn ${currentBookId === pickerBook.id && currentChapter === chNum ? 'active' : ''}`}
                        onClick={() => jumpToPassage(pickerBook.id, chNum)}
                      >
                        {chNum}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="picker-search-bar">
                    <span className="search-icon-inside"><Icons.Search /></span>
                    <input 
                      type="text" 
                      className="search-input"
                      placeholder={t(lang, 'filterBookPlaceholder')}
                      value={pickerSearch}
                      onChange={(e) => setPickerSearch(e.target.value)}
                    />
                    {pickerSearch && (
                      <button 
                        type="button" 
                        className="search-clear-inline-btn" 
                        onClick={() => setPickerSearch('')}
                        title={t(lang, 'clearSearch')}
                      >
                        <Icons.Close />
                      </button>
                    )}
                  </div>

                  <div className="testament-tabs">
                    <button 
                      className={`testament-tab ${pickerTestament === 'ALL' ? 'active' : ''}`}
                      onClick={() => { setPickerTestament('ALL'); setPickerCategory('ALL'); }}
                    >
                      {t(lang, 'allTestament')}
                    </button>
                    <button 
                      className={`testament-tab ${pickerTestament === 'PL' ? 'active' : ''}`}
                      onClick={() => { setPickerTestament('PL'); setPickerCategory('ALL'); }}
                    >
                      {t(lang, 'otTestament')}
                    </button>
                    <button 
                      className={`testament-tab ${pickerTestament === 'PB' ? 'active' : ''}`}
                      onClick={() => { setPickerTestament('PB'); setPickerCategory('ALL'); }}
                    >
                      {t(lang, 'ntTestament')}
                    </button>
                  </div>

                  <div className="category-chips">
                    {availableCategories.map((cat) => (
                      <button
                        key={cat}
                        className={`category-chip ${pickerCategory === cat ? 'active' : ''}`}
                        onClick={() => setPickerCategory(cat)}
                      >
                        {cat === 'ALL' ? t(lang, 'allCategories') : cat}
                      </button>
                    ))}
                  </div>

                  <div className="books-grid">
                    {filteredBooks.map((book) => (
                      <button
                        key={book.id}
                        className={`book-card-btn ${currentBookId === book.id ? 'active' : ''}`}
                        onClick={() => setPickerBook(book)}
                      >
                        <div className="book-name">{getBookName(book)}</div>
                        <div className="book-meta">
                          {book.chaptersCount} {t(lang, 'chapterNum', { chapter: '' }).trim()} • {getBookAbbr(book)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: APPEARANCE & SETTINGS */}
      {showAppearance && (
        <div className="modal-backdrop" onClick={() => setShowAppearance(false)}>
          <div className="modal-card settings-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{t(lang, 'appearanceTitle')}</div>
              <button className="modal-close-btn" onClick={() => setShowAppearance(false)}>
                <Icons.Close />
              </button>
            </div>

            <div className="modal-body">
              {/* Language Switcher */}
              <div className="setting-group">
                <label className="setting-label">{t(lang, 'interfaceLang')}</label>
                <div className="font-family-toggle">
                  <button 
                    className={`font-family-btn ${lang === 'id' ? 'active' : ''}`}
                    onClick={() => handleToggleLang('id')}
                  >
                    🇮🇩 Bahasa Indonesia
                  </button>
                  <button 
                    className={`font-family-btn ${lang === 'en' ? 'active' : ''}`}
                    onClick={() => handleToggleLang('en')}
                  >
                    🇬🇧 English
                  </button>
                </div>
              </div>

              {/* Version Switcher Shortcut */}
              <div className="setting-group">
                <label className="setting-label">{t(lang, 'selectVersion')}</label>
                <button 
                  className="version-card-btn active"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setShowAppearance(false);
                    setShowVersionModal(true);
                  }}
                >
                  <div className="version-card-header">
                    <span className="version-card-title">{BIBLE_VERSIONS[version]?.name}</span>
                    <span className="version-card-badge">{t(lang, 'changeVersion')} ▾</span>
                  </div>
                  <div className="version-card-desc">{BIBLE_VERSIONS[version]?.subtitle}</div>
                </button>
              </div>

              {/* Theme Switcher */}
              <div className="setting-group">
                <label className="setting-label">{t(lang, 'readingTheme')}</label>
                <div className="theme-options-grid">
                  <button 
                    className={`theme-option-btn ${theme === 'sepia' ? 'active' : ''}`}
                    onClick={() => setTheme('sepia')}
                    style={{ backgroundColor: '#FAF6ED', color: '#2C241D' }}
                  >
                    <div className="theme-preview-box" style={{ backgroundColor: '#FAF6ED' }} />
                    <span>{t(lang, 'themeSepia')}</span>
                  </button>
                  <button 
                    className={`theme-option-btn ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => setTheme('light')}
                    style={{ backgroundColor: '#FFFFFF', color: '#0F172A' }}
                  >
                    <div className="theme-preview-box" style={{ backgroundColor: '#FFFFFF' }} />
                    <span>{t(lang, 'themeLight')}</span>
                  </button>
                  <button 
                    className={`theme-option-btn ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => setTheme('dark')}
                    style={{ backgroundColor: '#0A0C10', color: '#F1F5F9' }}
                  >
                    <div className="theme-preview-box" style={{ backgroundColor: '#0A0C10' }} />
                    <span>{t(lang, 'themeDark')}</span>
                  </button>
                </div>
              </div>

              {/* Font Size */}
              <div className="setting-group">
                <label className="setting-label">{t(lang, 'fontSize', { size: fontSize })}</label>
                <div className="font-size-control">
                  <button 
                    className="font-size-btn"
                    onClick={() => setFontSize((s) => Math.max(15, s - 1))}
                  >
                    A-
                  </button>
                  <input 
                    type="range" 
                    min="15" 
                    max="26" 
                    value={fontSize} 
                    onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                    className="font-size-slider"
                  />
                  <button 
                    className="font-size-btn"
                    onClick={() => setFontSize((s) => Math.min(26, s + 1))}
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* Font Family */}
              <div className="setting-group">
                <label className="setting-label">{t(lang, 'fontFamily')}</label>
                <div className="font-family-toggle">
                  <button 
                    className={`font-family-btn ${fontFamily === 'serif' ? 'active' : ''}`}
                    style={{ fontFamily: 'var(--font-serif)' }}
                    onClick={() => setFontFamily('serif')}
                  >
                    {t(lang, 'fontSerif')}
                  </button>
                  <button 
                    className={`font-family-btn ${fontFamily === 'sans' ? 'active' : ''}`}
                    style={{ fontFamily: 'var(--font-sans)' }}
                    onClick={() => setFontFamily('sans')}
                  >
                    {t(lang, 'fontSans')}
                  </button>
                </div>
              </div>

              {/* Spacing */}
              <div className="setting-group">
                <label className="setting-label">{t(lang, 'lineSpacing')}</label>
                <div className="font-family-toggle">
                  <button 
                    className={`font-family-btn ${lineHeight === '1.6' ? 'active' : ''}`}
                    onClick={() => setLineHeight('1.6')}
                  >
                    {t(lang, 'spacingTight')}
                  </button>
                  <button 
                    className={`font-family-btn ${lineHeight === '1.85' ? 'active' : ''}`}
                    onClick={() => setLineHeight('1.85')}
                  >
                    {t(lang, 'spacingComfort')}
                  </button>
                  <button 
                    className={`font-family-btn ${lineHeight === '2.1' ? 'active' : ''}`}
                    onClick={() => setLineHeight('2.1')}
                  >
                    {t(lang, 'spacingLoose')}
                  </button>
                </div>
              </div>

              {/* Reading Layout Mode */}
              <div className="setting-group">
                <label className="setting-label">{t(lang, 'layoutMode')}</label>
                <div className="font-family-toggle">
                  <button 
                    className={`font-family-btn ${readerLayout === 'list' ? 'active' : ''}`}
                    onClick={() => setReaderLayout('list')}
                  >
                    📋 {t(lang, 'viewVerse')}
                  </button>
                  <button 
                    className={`font-family-btn ${readerLayout === 'paragraph' ? 'active' : ''}`}
                    onClick={() => setReaderLayout('paragraph')}
                  >
                    📖 {t(lang, 'viewParagraph')}
                  </button>
                </div>
              </div>

              {/* Offline Full Download Box */}
              <div className="offline-sync-box">
                <div className="sync-info">
                  <div className="sync-title">
                    <Icons.CloudCheck />
                    <span>{t(lang, 'offlineTitle')} ({version.toUpperCase()})</span>
                  </div>
                  <div className="sync-desc">
                    {offlineStatus 
                      ? t(lang, 'offlineSynced', { version: version.toUpperCase() })
                      : t(lang, 'offlineUnsynced', { version: version.toUpperCase() })}
                  </div>
                </div>
                <button 
                  className="sync-btn"
                  onClick={handleSyncAllOffline}
                  disabled={syncingOffline || offlineStatus}
                >
                  {syncingOffline ? t(lang, 'downloading') : offlineStatus ? t(lang, 'downloaded') : t(lang, 'downloadAll')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SEARCH */}
      {showSearch && (
        <div className="modal-backdrop" onClick={() => setShowSearch(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{t(lang, 'searchTitle')}</div>
              <button className="modal-close-btn" onClick={() => setShowSearch(false)}>
                <Icons.Close />
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSearch} className="search-input-wrap">
                <div className="search-input-inner">
                  <span className="search-icon-inside"><Icons.Search /></span>
                  <input 
                    ref={searchInputRef}
                    type="text" 
                    className="search-input"
                    placeholder={t(lang, 'searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  {searchQuery && (
                    <button 
                      type="button" 
                      className="search-clear-inline-btn" 
                      onClick={() => setSearchQuery('')}
                      title={t(lang, 'clearSearch')}
                    >
                      <Icons.Close />
                    </button>
                  )}
                </div>
                <button type="submit" className="search-submit-btn">
                  {lang === 'en' ? 'Search' : 'Cari'}
                </button>
              </form>

              {/* Scopes Filter */}
              <div className="search-scopes-row">
                <button 
                  type="button"
                  className={`search-scope-chip ${searchScope === 'ALL' ? 'active' : ''}`}
                  onClick={() => setSearchScope('ALL')}
                >
                  {t(lang, 'scopeAll')}
                </button>
                <button 
                  type="button"
                  className={`search-scope-chip ${searchScope === 'PB' ? 'active' : ''}`}
                  onClick={() => setSearchScope('PB')}
                >
                  {t(lang, 'scopeNT')}
                </button>
                <button 
                  type="button"
                  className={`search-scope-chip ${searchScope === 'PL' ? 'active' : ''}`}
                  onClick={() => setSearchScope('PL')}
                >
                  {t(lang, 'scopeOT')}
                </button>
                <button 
                  type="button"
                  className={`search-scope-chip ${searchScope === 'CURRENT' ? 'active' : ''}`}
                  onClick={() => setSearchScope('CURRENT')}
                >
                  {t(lang, 'scopeCurrent', { book: currentBookDisplayAbbr || currentBookDisplayName })}
                </button>
              </div>

              {/* DIRECT REFERENCE CARD */}
              {parsedRef && (
                <div 
                  className="search-quick-jump-card" 
                  onClick={() => jumpToPassage(parsedRef.book.id, parsedRef.chapter, parsedRef.verse)}
                >
                  <div className="jump-card-icon"><Icons.Book /></div>
                  <div className="jump-card-content">
                    <div className="jump-card-tag">{t(lang, 'directJump')}</div>
                    <div className="jump-card-title">
                      {getBookName(parsedRef.book)} {parsedRef.chapter}{parsedRef.verse ? `:${parsedRef.verse}` : ''}
                    </div>
                  </div>
                  <div className="jump-card-arrow"><Icons.ChevronRight /></div>
                </div>
              )}

              {/* MATCHED BOOKS */}
              {matchedBooks.length > 0 && !parsedRef && (
                <div className="search-matched-books">
                  {matchedBooks.map((b) => (
                    <button 
                      key={b.id} 
                      type="button"
                      className="matched-book-chip"
                      onClick={() => jumpToPassage(b.id, 1)}
                    >
                      <Icons.Book />
                      <span>{getBookName(b)} ({b.chaptersCount} {t(lang, 'chapterNum', { chapter: '' }).trim()})</span>
                      <Icons.ChevronRight />
                    </button>
                  ))}
                </div>
              )}

              {/* QUICK SUGGESTIONS (when query is empty) */}
              {!searchQuery.trim() && (
                <div className="search-suggestions-box">
                  <div className="search-suggestions-title">{t(lang, 'quickSuggestions')}</div>
                  <div className="search-suggestions-chips">
                    {sampleSuggestions.map((item) => (
                      <button 
                        key={item} 
                        type="button"
                        className="suggestion-chip" 
                        onClick={() => setSearchQuery(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searching && (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>{t(lang, 'searching')}</p>
                </div>
              )}

              {searchResults.length > 0 && (
                <div className="search-results-list">
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 700 }}>
                    {t(lang, 'searchResultsCount', { count: searchResults.length })}
                  </div>
                  {searchResults.map((res, idx) => (
                    <div 
                      key={idx} 
                      className="search-result-item"
                      onClick={() => jumpToPassage(res.bookId, res.chapter, res.verse)}
                    >
                      <div className="search-result-ref">
                        {res.bookName} {res.chapter}:{res.verse}
                      </div>
                      <div className="search-result-text">
                        {highlightSearchText(res.text, searchQuery)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!searching && searchResults.length === 0 && searchQuery.trim().length >= 2 && !parsedRef && matchedBooks.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
                  <p>{t(lang, 'noResults')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
