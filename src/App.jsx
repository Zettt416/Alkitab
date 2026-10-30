import React, { useState, useEffect, useRef } from 'react';
import { BIBLE_VERSIONS, TRANSLATE_LANGUAGES, HEBREW_BOOK_NAMES, HEBREW_BOOK_ABBRS, t } from './i18n.js';

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
  ),
  Bell: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  Note: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  NoteIndicator: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>
  ),
  Upload: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  Speaker: ({ isPlaying }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      {isPlaying ? (
        <>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        </>
      ) : (
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      )}
    </svg>
  ),
  Globe: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Stop: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <rect x="5" y="5" width="14" height="14" rx="2" ry="2"/>
    </svg>
  ),
  FlagID: () => (
    <svg width="20" height="14" viewBox="0 0 24 16" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 0 0 1px rgba(0,0,0,0.15)', display: 'inline-block', verticalAlign: 'middle' }}>
      <rect width="24" height="8" fill="#E70011" />
      <rect y="8" width="24" height="8" fill="#FFFFFF" />
    </svg>
  ),
  FlagEN: () => (
    <svg width="20" height="14" viewBox="0 0 60 36" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 0 0 1px rgba(0,0,0,0.15)', display: 'inline-block', verticalAlign: 'middle', overflow: 'hidden' }}>
      <rect width="60" height="36" fill="#012169" />
      <path d="M0 0 L60 36 M60 0 L0 36" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M0 0 L60 36 M60 0 L0 36" stroke="#C8102E" strokeWidth="3" />
      <path d="M30 0 v36 M0 18 h60" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M30 0 v36 M0 18 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  ),
  FlagHE: () => (
    <svg width="20" height="14" viewBox="0 0 32 22" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 0 0 1px rgba(0,0,0,0.15)', display: 'inline-block', verticalAlign: 'middle' }}>
      <rect width="32" height="22" fill="#FFFFFF" />
      <rect y="3" width="32" height="2.5" fill="#0038B8" />
      <rect y="16.5" width="32" height="2.5" fill="#0038B8" />
      <g transform="translate(16, 11) scale(0.65)" fill="none" stroke="#0038B8" strokeWidth="1.2">
        <polygon points="0,-6.5 5.6,3.2 -5.6,3.2" />
        <polygon points="0,6.5 5.6,-3.2 -5.6,-3.2" />
      </g>
    </svg>
  ),
  BookOpenMini: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  SunMini: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  ),
  MoonMini: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  CheckMini: () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Gear: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  )
};

function formatVerseNumbers(nums) {
  if (!nums || nums.length === 0) return '';
  const sorted = [...new Set(nums)].map(Number).sort((a, b) => a - b);
  const ranges = [];
  let start = sorted[0];
  let end = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === end + 1) {
      end = sorted[i];
    } else {
      ranges.push(start === end ? `${start}` : `${start}-${end}`);
      start = end = sorted[i];
    }
  }
  ranges.push(start === end ? `${start}` : `${start}-${end}`);
  return ranges.join(', ');
}

export default function App() {
  // Bible Version & Language State
  const [version, setVersion] = useState(() => localStorage.getItem('alkitab_version') || 'tb');
  const [lang, setLang] = useState(() => localStorage.getItem('alkitab_lang') || 'id');
  const [showVersionModal, setShowVersionModal] = useState(false);

  // Navigation & Books State
  const [books, setBooks] = useState([]);
  const [currentBookId, setCurrentBookId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const b = parseInt(params.get('b'), 10);
    if (!isNaN(b) && b >= 1 && b <= 66) return b;
    const val = parseInt(localStorage.getItem('alkitab_book_id') || '43', 10);
    return isNaN(val) ? 43 : val;
  });
  const [currentChapter, setCurrentChapter] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const c = parseInt(params.get('c'), 10);
    if (!isNaN(c) && c >= 1) return c;
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

  // Interactivity (Multi-select support)
  const [selectedVerses, setSelectedVerses] = useState([]);
  
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

  // Personal Notes: { [passageKey]: string }
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('alkitab_notes') || '{}');
    } catch {
      return {};
    }
  });
  const [editingNoteVerse, setEditingNoteVerse] = useState(null);
  const [noteInputText, setNoteInputText] = useState('');
  const [savedTab, setSavedTab] = useState('all'); // 'all', 'bookmarks', 'highlights', 'notes'

  // Ref for JSON backup/restore file picker
  const fileInputRef = useRef(null);

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
  const [compareVerse, setCompareVerse] = useState(null);
  const [compareData, setCompareData] = useState([]);
  const [comparing, setComparing] = useState(false);

  // Text-To-Speech (Web Speech API) & Audio State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const activeAudioRef = useRef(null);
  const availableVoicesRef = useRef([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        try {
          const v = window.speechSynthesis.getVoices();
          if (v && v.length > 0) {
            availableVoicesRef.current = v;
          }
        } catch {}
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
      return () => {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
    }
  }, []);

  // Dynamic Verse Translation Modal State
  const [showTranslateModal, setShowTranslateModal] = useState(false);
  const [targetTranslateLang, setTargetTranslateLang] = useState('en');
  const [translatedText, setTranslatedText] = useState('');
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState(null);
  const [offlineTransCache, setOfflineTransCache] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('alkitab_offline_translations') || '{}');
    } catch {
      return {};
    }
  });
  const [transSourceMode, setTransSourceMode] = useState('online'); // 'offline-scripture', 'offline-cached', 'online'
  const [cachingChapter, setCachingChapter] = useState(false);
  const [cacheProgress, setCacheProgress] = useState(0);

  // Offline Sync & Toast
  const [offlineStatus, setOfflineStatus] = useState(() => {
    return localStorage.getItem(`alkitab_offline_synced_${version}`) === 'true';
  });
  const [syncingOffline, setSyncingOffline] = useState(false);
  const [toast, setToast] = useState(null);

  // Daily Verse Notification & Reminder State
  const [notifEnabled, setNotifEnabled] = useState(() => {
    return localStorage.getItem('alkitab_notif_enabled') === 'true';
  });
  const [notifTime, setNotifTime] = useState(() => {
    return localStorage.getItem('alkitab_notif_time') || '06:00';
  });
  const [notifWorkerUrl, setNotifWorkerUrl] = useState(() => {
    return localStorage.getItem('alkitab_worker_url') || '';
  });

  const HEBREW_CATEGORIES = {
    'Taurat': 'תורה',
    'Sejarah': 'היסטוריה',
    'Puisi & Hikmat': 'שירה וחוכמה',
    'Nabi-nabi Besar': 'נביאים ראשונים',
    'Nabi-nabi Kecil': 'נביאים אחרונים',
    'Injil': 'בשורות',
    'Surat Paulus': 'איגרות פאולוס',
    'Surat Umum': 'איגרות כלליות',
    'Nubuat': 'נבואה'
  };

  // Helpers for multilingual metadata
  const getBookName = (b) => {
    if (!b) return '';
    if (lang === 'he') return b.name_he || HEBREW_BOOK_NAMES[b.id] || b.name_en || b.name;
    return lang === 'en' ? (b.name_en || b.name) : (b.name_id || b.name);
  };
  const getBookAbbr = (b) => {
    if (!b) return '';
    if (lang === 'he') return b.abbr_he || HEBREW_BOOK_ABBRS[b.id] || b.abbr_en || b.abbr;
    return lang === 'en' ? (b.abbr_en || b.abbr) : (b.abbr_id || b.abbr);
  };
  const getBookCategory = (b) => {
    if (!b) return '';
    if (lang === 'he') return HEBREW_CATEGORIES[b.category] || b.category_en || b.category;
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
    fetch('/data/books.json?v=2')
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

  // Background prefetching: adjacent books & core versions so switching is 100% instant (no loading)
  useEffect(() => {
    if (!books.length) return;
    const toPrefetch = [];
    if (currentBookId > 1) toPrefetch.push({ ver: version, id: currentBookId - 1 });
    if (currentBookId < 66) toPrefetch.push({ ver: version, id: currentBookId + 1 });
    ['tb', 'web', 'he'].forEach((v) => {
      if (v !== version) toPrefetch.push({ ver: v, id: currentBookId });
    });

    toPrefetch.forEach(({ ver, id }) => {
      const k = `${ver}:${id}`;
      if (!bookCache[k]) {
        fetch(`/data/${ver}/${id}.json`)
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data) {
              setBookCache((prev) => ({ ...prev, [k]: data }));
            }
          })
          .catch(() => {});
      }
    });
  }, [currentBookId, version, books.length]);

  const currentBookMeta = books.find((b) => b.id === currentBookId);
  const currentBookData = bookCache[`${version}:${currentBookId}`];
  const chapterVerses = currentBookData?.chapters?.[currentChapter.toString()] || [];

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const DEFAULT_VERSION_FOR_LANG = {
    id: 'tb',
    en: 'web',
    he: 'he'
  };

  const handleSelectVersion = (verKey) => {
    handleStopSpeech();
    setShowTranslateModal(false);
    setVersion(verKey);
    try {
      localStorage.setItem('alkitab_version', verKey);
    } catch {
      // ignore
    }
    setSelectedVerses([]);
    setShowVersionModal(false);

    // By default, synchronize interface language to match the selected Bible version
    const verLang = BIBLE_VERSIONS[verKey]?.lang;
    if (verLang && verLang !== lang) {
      setLang(verLang);
      try {
        localStorage.setItem('alkitab_lang', verLang);
      } catch {
        // ignore
      }
    }

    const activeLang = verLang || lang;
    showToast(`${t(activeLang, 'changeVersion')}: ${BIBLE_VERSIONS[verKey]?.short || verKey.toUpperCase()}`);
  };

  const handleToggleLang = (newLang, autoSwitchVersion = true) => {
    setLang(newLang);
    try {
      localStorage.setItem('alkitab_lang', newLang);
    } catch {
      // ignore
    }

    let targetVersion = version;
    if (autoSwitchVersion) {
      const currentVerLang = BIBLE_VERSIONS[version]?.lang || 'id';
      if (currentVerLang !== newLang) {
        targetVersion = DEFAULT_VERSION_FOR_LANG[newLang] || 'tb';
        setVersion(targetVersion);
        try {
          localStorage.setItem('alkitab_version', targetVersion);
        } catch {
          // ignore
        }
      }
    }

    let msg = 'Bahasa dialihkan ke Indonesia';
    if (newLang === 'en') msg = 'Language switched to English';
    if (newLang === 'he') msg = 'השפה שונתה לעברית (Hebrew)';

    if (targetVersion !== version) {
      const verShort = BIBLE_VERSIONS[targetVersion]?.short || targetVersion.toUpperCase();
      msg += ` • ${verShort}`;
    }
    showToast(msg);
  };

  const handlePrevChapter = () => {
    handleStopSpeech();
    setShowTranslateModal(false);
    setSelectedVerses([]);
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
    handleStopSpeech();
    setShowTranslateModal(false);
    setSelectedVerses([]);
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
    handleStopSpeech();
    setShowTranslateModal(false);
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
    setSelectedVerses([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (verse) {
      setTargetVerse(verse);
      setTimeout(() => {
        const el = document.getElementById(`verse-${verse}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const verseObj = chapterVerses.find((v) => v.verse === verse) || { verse };
          setSelectedVerses([verseObj]);
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
        handleStopSpeech();
        setShowPicker(false);
        setShowSearch(false);
        setShowAppearance(false);
        setShowVersionModal(false);
        setShowCompareModal(false);
        setShowTranslateModal(false);
        setShowCardMaker(false);
        setShowSavedModal(false);
        setEditingNoteVerse(null);
        setSelectedVerses([]);
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
          setSelectedVerses([verseObj]);
          setTargetVerse(null);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [targetVerse, loading, currentBookData, currentChapter, chapterVerses]);

  // Formatted citation helper for single or multiple verses
  const getFormattedReference = (verses = selectedVerses) => {
    if (!currentBookMeta || !verses || verses.length === 0) return '';
    const bookTitle = getBookName(currentBookMeta);
    const verseNums = formatVerseNumbers(verses.map((v) => v.verse));
    return `${bookTitle} ${currentChapter}:${verseNums} (${version.toUpperCase()})`;
  };

  // Toggle single or multiple verse selection
  const handleVerseClick = (verseObj) => {
    setSelectedVerses((prev) => {
      const exists = prev.some((v) => v.verse === verseObj.verse);
      if (exists) {
        return prev.filter((v) => v.verse !== verseObj.verse);
      } else {
        return [...prev, verseObj].sort((a, b) => a.verse - b.verse);
      }
    });
  };

  // Verse Highlight Toggle (supports multiple selected verses)
  const handleSetHighlightVerses = (verses = selectedVerses, color) => {
    if (!verses || verses.length === 0) return;
    const keys = verses.map((v) => `${currentBookId}:${currentChapter}:${v.verse}`);
    const allHaveColor = keys.every((k) => highlights[k] === color);
    const updated = { ...highlights };
    if (allHaveColor) {
      keys.forEach((k) => delete updated[k]);
      showToast(t(lang, 'toastHlRemoved'));
    } else {
      keys.forEach((k) => { updated[k] = color; });
      showToast(t(lang, 'toastHlAdded'));
    }
    setHighlights(updated);
    localStorage.setItem('alkitab_highlights', JSON.stringify(updated));
  };

  // Bookmark Toggle (supports multiple selected verses)
  const handleToggleBookmarkVerses = (verses = selectedVerses) => {
    if (!verses || verses.length === 0) return;
    const keys = verses.map((v) => `${currentBookId}:${currentChapter}:${v.verse}`);
    const allBookmarked = keys.every((k) => bookmarks.includes(k));
    let updated;
    if (allBookmarked) {
      updated = bookmarks.filter((k) => !keys.includes(k));
      showToast(t(lang, 'toastBmRemoved'));
    } else {
      const toAdd = keys.filter((k) => !bookmarks.includes(k));
      updated = [...bookmarks, ...toAdd];
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

  // Copy Verses (Single or Multi-select)
  const handleCopyVerses = (verses = selectedVerses) => {
    if (!verses || verses.length === 0 || !currentBookMeta) return;
    const citation = getFormattedReference(verses);
    let fullText = '';
    if (verses.length === 1) {
      fullText = `"${verses[0].text}"\n— ${citation}`;
    } else {
      fullText = `"${verses.map((v) => `${v.verse}. ${v.text}`).join('\n')}"\n— ${citation}`;
    }
    copyTextToClipboard(fullText).then(() => {
      showToast(t(lang, 'toastCopied'));
    });
  };

  // Share Verses
  const handleShareVerses = (verses = selectedVerses) => {
    if (!verses || verses.length === 0 || !currentBookMeta) return;
    const citation = getFormattedReference(verses);
    let textToShare = '';
    if (verses.length === 1) {
      textToShare = `"${verses[0].text}" — ${citation}`;
    } else {
      textToShare = `"${verses.map((v) => `${v.verse}. ${v.text}`).join('\n')}" — ${citation}`;
    }
    if (navigator.share) {
      navigator.share({
        title: citation,
        text: textToShare
      }).catch(() => {});
    } else {
      handleCopyVerses(verses);
    }
  };

  // Helper to determine TTS language code
  const getLanguageCodeForVersion = (verKey) => {
    if (verKey === 'he') return 'he-IL';
    if (verKey === 'kjv' || verKey === 'web') return 'en-US';
    return 'id-ID';
  };

  // Strip cantillation accents (Hebrew teamim) so speech and translation read cleanly
  const stripCantillation = (str) => {
    if (!str) return '';
    return str.replace(/[\u0591-\u05AF\u05BD\u05BF\u05C0\u05C3\u05C4\u05C5]/g, '');
  };

  // Text-To-Speech (Native Web Speech API + High-Quality Audio Stream fallback - ponytail)
  const handleStopSpeech = () => {
    if (activeAudioRef.current) {
      try {
        activeAudioRef.current.pause();
        activeAudioRef.current.currentTime = 0;
      } catch {}
      activeAudioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const playAudioStreamChunks = (text, langPrefix) => {
    // Split into readable segments so chunks stay under Google TTS limits (~170 chars)
    const rawParts = text.match(/([^.:;,\n\u05C3]+[.:;,\n\u05C3]?)/g) || [text];
    const chunks = [];
    let currentChunk = '';

    for (const part of rawParts) {
      if ((currentChunk + ' ' + part).length > 170) {
        if (currentChunk.trim()) chunks.push(currentChunk.trim());
        currentChunk = part;
      } else {
        currentChunk = (currentChunk + ' ' + part).trim();
      }
    }
    if (currentChunk.trim()) chunks.push(currentChunk.trim());
    if (chunks.length === 0) chunks.push(text.slice(0, 170));

    let currentIndex = 0;
    setIsSpeaking(true);

    const playNext = () => {
      if (currentIndex >= chunks.length) {
        setIsSpeaking(false);
        activeAudioRef.current = null;
        return;
      }

      const chunkText = chunks[currentIndex++];
      const cleanChunk = stripCantillation(chunkText).trim();
      if (!cleanChunk) {
        playNext();
        return;
      }

      // Use local dev proxy in DEV to bypass referrer checks, or direct URL with no-referrer
      const ttsUrl = import.meta.env.DEV
        ? `/api/tts?ie=UTF-8&tl=${langPrefix}&client=tw-ob&q=${encodeURIComponent(cleanChunk)}`
        : `https://translate.google.com/translate_tts?ie=UTF-8&tl=${langPrefix}&client=tw-ob&q=${encodeURIComponent(cleanChunk)}`;

      const audio = new Audio();
      audio.referrerPolicy = 'no-referrer';
      audio.src = ttsUrl;
      activeAudioRef.current = audio;

      audio.onended = () => {
        playNext();
      };
      audio.onerror = (e) => {
        console.warn('TTS Audio error:', e);
        // Fallback attempt with direct URL if dev proxy had an issue
        if (ttsUrl.startsWith('/api/tts')) {
          const directUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${langPrefix}&client=tw-ob&q=${encodeURIComponent(cleanChunk)}`;
          const directAudio = new Audio();
          directAudio.referrerPolicy = 'no-referrer';
          directAudio.src = directUrl;
          activeAudioRef.current = directAudio;
          directAudio.onended = () => playNext();
          directAudio.onerror = () => {
            setIsSpeaking(false);
            activeAudioRef.current = null;
            showToast(t(lang, 'gagalMemuat') || 'Gagal memutar audio');
          };
          directAudio.play().catch(() => {
            setIsSpeaking(false);
            activeAudioRef.current = null;
          });
          return;
        }
        setIsSpeaking(false);
        activeAudioRef.current = null;
        showToast(t(lang, 'gagalMemuat') || 'Gagal memutar audio');
      };

      audio.play().catch((err) => {
        console.warn('TTS play() caught error:', err);
        setIsSpeaking(false);
        activeAudioRef.current = null;
      });
    };

    playNext();
  };

  const handleSpeakText = (text, langCode) => {
    if (!text || !text.trim()) return;

    if (isSpeaking) {
      handleStopSpeech();
      return;
    }

    const targetCode = langCode || getLanguageCodeForVersion(version);
    const prefix = targetCode.split('-')[0].toLowerCase();
    const cleanText = stripCantillation(text.replace(/<[^>]+>/g, '')).trim();

    // Check if browser has an authentic native voice matching this language (including Hebrew 'he' / 'iw')
    let matchedVoice = null;
    const isHebrew = prefix === 'he' || prefix === 'iw';
    const voices = (availableVoicesRef.current && availableVoicesRef.current.length > 0)
      ? availableVoicesRef.current
      : (typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis.getVoices() : []);

    if (voices && voices.length > 0) {
      matchedVoice = voices.find((v) => {
        const l = v.lang.toLowerCase();
        return l.startsWith(prefix) || (isHebrew && l.startsWith('iw'));
      });
    }

    // If an authentic native voice is found on the device, use Web Speech API
    if (matchedVoice) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(cleanText);
      utter.lang = matchedVoice.lang || targetCode;
      utter.voice = matchedVoice;
      utter.rate = 0.95;

      utter.onstart = () => setIsSpeaking(true);
      utter.onend = () => setIsSpeaking(false);
      utter.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utter);
      return;
    }

    // If no native voice matching the language is installed (e.g. Hebrew on Windows default):
    // Play authentic native audio stream so it NEVER speaks with the wrong English voice!
    playAudioStreamChunks(cleanText, prefix);
  };

  const handleSpeakVerses = (verses) => {
    if (!verses || verses.length === 0) return;
    const combined = verses.map((v) => v.text).join(' ');
    handleSpeakText(combined, getLanguageCodeForVersion(version));
  };

  // Instant Translation Handlers with Full Offline Support (0ms, zero network)
  const handleExecuteTranslate = async (sourceText, targetLangCode, vObj = selectedVerses[0] || compareVerse) => {
    if (!sourceText || !sourceText.trim()) return;
    setTranslateError(null);

    const vNum = vObj?.verse;
    const cacheKey = `${currentBookId}:${currentChapter}:${vNum}:${targetLangCode}`;

    // 1. Direct offline resolution from authorized Bible databases (0ms, 100% offline, zero loading)
    let offlineScripture = null;
    if (targetLangCode === 'id') {
      offlineScripture = bookCache[`tb:${currentBookId}`]?.chapters?.[currentChapter.toString()]?.find((v) => v.verse === vNum || String(v.verse) === String(vNum))?.text
        || bookCache[`ayt:${currentBookId}`]?.chapters?.[currentChapter.toString()]?.find((v) => v.verse === vNum || String(v.verse) === String(vNum))?.text;
    } else if (targetLangCode === 'en') {
      offlineScripture = bookCache[`web:${currentBookId}`]?.chapters?.[currentChapter.toString()]?.find((v) => v.verse === vNum || String(v.verse) === String(vNum))?.text
        || bookCache[`kjv:${currentBookId}`]?.chapters?.[currentChapter.toString()]?.find((v) => v.verse === vNum || String(v.verse) === String(vNum))?.text;
    } else if (targetLangCode === 'he') {
      offlineScripture = bookCache[`he:${currentBookId}`]?.chapters?.[currentChapter.toString()]?.find((v) => v.verse === vNum || String(v.verse) === String(vNum))?.text;
    }

    if (offlineScripture) {
      setTranslatedText(offlineScripture);
      setTransSourceMode('offline-scripture');
      setTranslating(false);
      return;
    }

    // 2. Check persistent offline translation cache (0ms, 100% offline, zero loading)
    if (offlineTransCache[cacheKey]) {
      setTranslatedText(offlineTransCache[cacheKey]);
      setTransSourceMode('offline-cached');
      setTranslating(false);
      return;
    }

    // If device is offline and not in cache, fallback gracefully to TB / WEB
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      const fb = bookCache[`tb:${currentBookId}`]?.chapters?.[currentChapter.toString()]?.find((v) => v.verse === vNum || String(v.verse) === String(vNum))?.text
        || bookCache[`web:${currentBookId}`]?.chapters?.[currentChapter.toString()]?.find((v) => v.verse === vNum || String(v.verse) === String(vNum))?.text;
      if (fb) {
        setTranslatedText(fb);
        setTransSourceMode('offline-scripture');
        setTranslating(false);
        return;
      }
    }

    // 3. Online fetch & instant local persistence
    setTranslating(true);
    const cleanSource = stripCantillation(sourceText).trim();
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLangCode}&dt=t&q=${encodeURIComponent(cleanSource)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('GTX error');
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const translatedParts = data[0].map((item) => item[0]).filter(Boolean).join('');
        setTranslatedText(translatedParts);
        setTransSourceMode('online');
        setTranslating(false);

        // Save to offline storage immediately
        setOfflineTransCache((prev) => {
          const updated = { ...prev, [cacheKey]: translatedParts };
          try {
            localStorage.setItem('alkitab_offline_translations', JSON.stringify(updated));
          } catch {}
          return updated;
        });
        return;
      }
      throw new Error('Malformed structure');
    } catch {
      // Fallback: MyMemory API
      try {
        const fbUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanSource)}&langpair=autodetect|${targetLangCode}`;
        const fbRes = await fetch(fbUrl);
        if (fbRes.ok) {
          const fbData = await fbRes.json();
          if (fbData?.responseData?.translatedText) {
            const fbResult = fbData.responseData.translatedText;
            setTranslatedText(fbResult);
            setTransSourceMode('online');
            setTranslating(false);

            setOfflineTransCache((prev) => {
              const updated = { ...prev, [cacheKey]: fbResult };
              try {
                localStorage.setItem('alkitab_offline_translations', JSON.stringify(updated));
              } catch {}
              return updated;
            });
            return;
          }
        }
      } catch (fbErr) {
        console.warn('Fallback translate failed', fbErr);
      }
      setTranslateError(t(lang, 'translateFailed'));
      setTranslating(false);
    }
  };

  const handleOpenTranslate = (verseObj) => {
    handleStopSpeech();
    setShowTranslateModal(true);
    setTranslatedText('');
    setTranslateError(null);
    const targetObj = verseObj || selectedVerses[0] || compareVerse;
    if (targetObj && targetObj.text) {
      handleExecuteTranslate(targetObj.text, targetTranslateLang, targetObj);
    }
  };

  const handleChangeTranslateLang = (newTargetLang) => {
    setTargetTranslateLang(newTargetLang);
    const sourceVerse = selectedVerses[0] || compareVerse;
    if (sourceVerse && sourceVerse.text) {
      handleExecuteTranslate(sourceVerse.text, newTargetLang, sourceVerse);
    }
  };

  // Batch cache all verses of the chapter in the selected target language for 100% offline reading
  const handleCacheChapterTranslations = async () => {
    if (!chapterVerses || chapterVerses.length === 0 || cachingChapter) return;
    setCachingChapter(true);
    setCacheProgress(0);

    const total = chapterVerses.length;
    let completed = 0;
    const newlyCached = {};

    for (const vObj of chapterVerses) {
      const cacheKey = `${currentBookId}:${currentChapter}:${vObj.verse}:${targetTranslateLang}`;
      if (offlineTransCache[cacheKey]) {
        completed++;
        setCacheProgress(Math.round((completed / total) * 100));
        continue;
      }

      let scriptText = null;
      if (targetTranslateLang === 'id') {
        scriptText = bookCache[`tb:${currentBookId}`]?.chapters?.[currentChapter.toString()]?.find((x) => x.verse === vObj.verse)?.text;
      } else if (targetTranslateLang === 'en') {
        scriptText = bookCache[`web:${currentBookId}`]?.chapters?.[currentChapter.toString()]?.find((x) => x.verse === vObj.verse)?.text;
      } else if (targetTranslateLang === 'he') {
        scriptText = bookCache[`he:${currentBookId}`]?.chapters?.[currentChapter.toString()]?.find((x) => x.verse === vObj.verse)?.text;
      }

      if (scriptText) {
        newlyCached[cacheKey] = scriptText;
      } else {
        try {
          const cleanText = stripCantillation(vObj.text).trim();
          const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetTranslateLang}&dt=t&q=${encodeURIComponent(cleanText)}`;
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && Array.isArray(data[0])) {
              newlyCached[cacheKey] = data[0].map((item) => item[0]).filter(Boolean).join('');
            }
          }
        } catch {
          // ignore error in single verse of batch
        }
      }

      completed++;
      setCacheProgress(Math.round((completed / total) * 100));
      await new Promise((r) => setTimeout(r, 100));
    }

    setOfflineTransCache((prev) => {
      const updated = { ...prev, ...newlyCached };
      try {
        localStorage.setItem('alkitab_offline_translations', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setCachingChapter(false);
    showToast(t(lang, 'offlineChapterSaved', { count: total }));
  };

  const isChapterFullyCached = chapterVerses.length > 0 && chapterVerses.every((v) => {
    if (['id', 'en', 'he'].includes(targetTranslateLang)) return true;
    const k = `${currentBookId}:${currentChapter}:${v.verse}:${targetTranslateLang}`;
    return Boolean(offlineTransCache[k]);
  });

  // Compare Verse Across Versions (TB, AYT, KJV, WEB, HE)
  const handleOpenCompare = async (verseObj) => {
    setCompareVerse(verseObj);
    setShowCompareModal(true);
    setComparing(true);
    const list = ['tb', 'ayt', 'kjv', 'web', 'he'];
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

  // Personal Verse Notes Handlers
  const handleOpenNoteModal = (verseObj) => {
    const key = `${currentBookId}:${currentChapter}:${verseObj.verse}`;
    setEditingNoteVerse(verseObj);
    setNoteInputText(notes[key] || '');
  };

  const handleSaveNote = () => {
    if (!editingNoteVerse) return;
    const key = `${currentBookId}:${currentChapter}:${editingNoteVerse.verse}`;
    const trimmed = noteInputText.trim();
    const updated = { ...notes };
    if (trimmed) {
      updated[key] = trimmed;
      showToast(t(lang, 'toastNoteSaved'));
    } else {
      delete updated[key];
      showToast(t(lang, 'toastNoteRemoved'));
    }
    setNotes(updated);
    localStorage.setItem('alkitab_notes', JSON.stringify(updated));
    setEditingNoteVerse(null);
  };

  const handleDeleteNote = (key) => {
    const updated = { ...notes };
    delete updated[key];
    setNotes(updated);
    localStorage.setItem('alkitab_notes', JSON.stringify(updated));
    showToast(t(lang, 'toastNoteRemoved'));
  };

  // Backup & Restore Handlers (JSON Export & Import)
  const handleExportBackup = () => {
    try {
      const backupData = {
        app: 'Alkitab PWA',
        version: 1,
        exportedAt: new Date().toISOString(),
        bookmarks,
        highlights,
        notes,
        preferences: {
          theme,
          fontSize,
          fontFamily,
          lineHeight,
          readerLayout,
          version,
          lang
        }
      };
      const jsonStr = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10);
      a.download = `Alkitab-Backup-${dateStr}.json`;
      a.href = url;
      a.click();
      URL.revokeObjectURL(url);
      showToast(t(lang, 'toastBackupSuccess'));
    } catch {
      showToast(t(lang, 'toastBackupError'));
    }
  };

  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid format');
        }

        let count = 0;
        if (Array.isArray(data.bookmarks)) {
          setBookmarks((prev) => {
            const merged = Array.from(new Set([...prev, ...data.bookmarks]));
            localStorage.setItem('alkitab_bookmarks', JSON.stringify(merged));
            return merged;
          });
          count += data.bookmarks.length;
        }

        if (data.highlights && typeof data.highlights === 'object') {
          setHighlights((prev) => {
            const merged = { ...prev, ...data.highlights };
            localStorage.setItem('alkitab_highlights', JSON.stringify(merged));
            return merged;
          });
          count += Object.keys(data.highlights).length;
        }

        if (data.notes && typeof data.notes === 'object') {
          setNotes((prev) => {
            const merged = { ...prev, ...data.notes };
            localStorage.setItem('alkitab_notes', JSON.stringify(merged));
            return merged;
          });
          count += Object.keys(data.notes).length;
        }

        showToast(t(lang, 'toastRestoreSuccess', { count }));
      } catch {
        showToast(t(lang, 'toastRestoreError'));
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // DRAW VERSE CARD TO CANVAS (with adaptive font scaling & multi-verse support)
  const drawVerseCard = () => {
    if (!canvasRef.current || selectedVerses.length === 0 || !currentBookMeta) return;
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

    const fullVerseText = selectedVerses.length === 1
      ? selectedVerses[0].text
      : selectedVerses.map((v) => `${v.verse}. ${v.text}`).join(' ');

    let fontSize = 48;
    let lineHeightPx = 72;
    if (fullVerseText.length > 300) {
      fontSize = 26;
      lineHeightPx = 42;
    } else if (fullVerseText.length > 200) {
      fontSize = 32;
      lineHeightPx = 50;
    } else if (fullVerseText.length > 120) {
      fontSize = 40;
      lineHeightPx = 62;
    }

    ctx.font = `500 ${fontSize}px "Literata", Georgia, serif`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const words = fullVerseText.split(' ');
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
    const verseRange = formatVerseNumbers(selectedVerses.map((v) => v.verse));
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = refColor;
    ctx.fillText(`— ${bookTitle} ${currentChapter}:${verseRange} (${version.toUpperCase()}) —`, width / 2, startY + (lines.length * lineHeightPx) + 80);

    ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = cardTheme === 'parchment' ? 'rgba(44, 36, 29, 0.4)' : 'rgba(255, 255, 255, 0.4)';
    ctx.fillText(`${t(lang, 'appTitle')} • baca-alkitab.vercel.app`, width / 2, height - 90);
  };

  useEffect(() => {
    if (showCardMaker) {
      setTimeout(drawVerseCard, 50);
    }
  }, [showCardMaker, cardTheme, selectedVerses]);

  const handleDownloadCard = () => {
    if (!canvasRef.current || selectedVerses.length === 0) return;
    const link = document.createElement('a');
    const bookTitle = getBookName(currentBookMeta);
    const vTag = formatVerseNumbers(selectedVerses.map((v) => v.verse)).replace(/[\s,]+/g, '_');
    link.download = `Alkitab-${bookTitle}-${currentChapter}-${vTag}-${version.toUpperCase()}.png`;
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

  // Daily Verse Inspirational Bank
  const INSPIRATIONAL_VERSES = [
    {
      bookId: 19,
      chapter: 23,
      verse: 1,
      refId: 'Mazmur 23:1',
      refEn: 'Psalm 23:1',
      textId: 'TUHAN adalah gembalaku, takkan kekurangan aku.',
      textEn: 'The LORD is my shepherd; I shall not want.'
    },
    {
      bookId: 50,
      chapter: 4,
      verse: 13,
      refId: 'Filipi 4:13',
      refEn: 'Philippians 4:13',
      textId: 'Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku.',
      textEn: 'I can do all things through Christ who strengthens me.'
    },
    {
      bookId: 24,
      chapter: 29,
      verse: 11,
      refId: 'Yeremia 29:11',
      refEn: 'Jeremiah 29:11',
      textId: 'Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan.',
      textEn: 'For I know the plans I have for you, plans to prosper you and not to harm you, plans to give you hope and a future.'
    },
    {
      bookId: 20,
      chapter: 3,
      verse: 5,
      refId: 'Amsal 3:5-6',
      refEn: 'Proverbs 3:5-6',
      textId: 'Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri.',
      textEn: 'Trust in the LORD with all your heart, and lean not on your own understanding.'
    },
    {
      bookId: 40,
      chapter: 6,
      verse: 33,
      refId: 'Matius 6:33',
      refEn: 'Matthew 6:33',
      textId: 'Tetapi carilah dahulu Kerajaan Allah dan kebenarannya, maka semuanya itu akan ditambahkan kepadamu.',
      textEn: 'But seek first the kingdom of God and His righteousness, and all these things shall be added to you.'
    },
    {
      bookId: 23,
      chapter: 40,
      verse: 31,
      refId: 'Yesaya 40:31',
      refEn: 'Isaiah 40:31',
      textId: 'Tetapi orang-orang yang menanti-nantikan TUHAN mendapat kekuatan baru: mereka seumpama rajawali yang naik terbang.',
      textEn: 'Those who hope in the LORD will renew their strength. They will soar on wings like eagles.'
    },
    {
      bookId: 43,
      chapter: 14,
      verse: 27,
      refId: 'Yohanes 14:27',
      refEn: 'John 14:27',
      textId: 'Damai sejahtera Kutinggalkan bagimu. Damai sejahtera-Ku Kuberikan kepadamu.',
      textEn: 'Peace I leave with you; my peace I give you.'
    },
    {
      bookId: 6,
      chapter: 1,
      verse: 9,
      refId: 'Yosua 1:9',
      refEn: 'Joshua 1:9',
      textId: 'Kuatkan dan teguhkanlah hatimu! Janganlah kecut dan tawar hati, sebab TUHAN, Allahmu, menyertai engkau.',
      textEn: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you.'
    }
  ];

  // Trigger Notification via Service Worker or Native Notification
  const triggerNotification = async (title, body, url = '/') => {
    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.ready;
        if (reg && reg.showNotification) {
          await reg.showNotification(title, {
            body,
            icon: '/icon.svg',
            badge: '/icon.svg',
            tag: 'alkitab-daily-verse',
            renotify: true,
            data: { url }
          });
          return true;
        }
      } catch (err) {
        console.warn('Service worker notification error:', err);
      }
    }
    if ('Notification' in window && Notification.permission === 'granted') {
      const n = new Notification(title, {
        body,
        icon: '/icon.svg'
      });
      n.onclick = () => {
        window.focus();
        if (url && url !== '/') {
          window.location.href = url;
        }
      };
      return true;
    }
    return false;
  };

  const syncPushSubscriptionWithWorker = async (workerUrl, timeOverride = null) => {
    if (!workerUrl || !('serviceWorker' in navigator)) return;
    try {
      const cleanUrl = workerUrl.trim().replace(/\/$/, '');
      const reg = await navigator.serviceWorker.ready;
      let sub = await reg.pushManager.getSubscription();
      if (!sub) {
        const keyRes = await fetch(`${cleanUrl}/api/vapid-key`).catch(() => null);
        if (keyRes && keyRes.ok) {
          const { publicKey } = await keyRes.json();
          if (publicKey) {
            sub = await reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: publicKey
            });
          }
        }
      }
      if (sub) {
        await fetch(`${cleanUrl}/api/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subscription: sub,
            time: timeOverride || notifTime,
            version,
            lang
          })
        });
      }
    } catch (err) {
      console.warn('Worker sync note:', err);
    }
  };

  const handleToggleNotification = async (enable) => {
    if (!enable) {
      setNotifEnabled(false);
      localStorage.setItem('alkitab_notif_enabled', 'false');
      showToast(t(lang, 'notifDisabledToast'));
      return;
    }

    if (!('Notification' in window)) {
      showToast(t(lang, 'notifUnsupported'));
      return;
    }

    let perm = Notification.permission;
    if (perm === 'default') {
      try {
        perm = await Notification.requestPermission();
      } catch (e) {
        console.error(e);
      }
    }

    if (perm === 'granted') {
      setNotifEnabled(true);
      localStorage.setItem('alkitab_notif_enabled', 'true');
      showToast(t(lang, 'notifPermissionGranted'));

      const sampleVerse = INSPIRATIONAL_VERSES[0];
      const title = t(lang, 'notifDailyTitle');
      const body = `${lang === 'en' ? sampleVerse.textEn : sampleVerse.textId}\n— ${lang === 'en' ? sampleVerse.refEn : sampleVerse.refId}`;
      const url = `/?b=${sampleVerse.bookId}&c=${sampleVerse.chapter}`;
      triggerNotification(title, body, url);

      if (notifWorkerUrl) {
        syncPushSubscriptionWithWorker(notifWorkerUrl);
      }
    } else {
      setNotifEnabled(false);
      localStorage.setItem('alkitab_notif_enabled', 'false');
      showToast(t(lang, 'notifPermissionDenied'));
    }
  };

  const handleUpdateNotifTime = (time) => {
    setNotifTime(time);
    localStorage.setItem('alkitab_notif_time', time);
    showToast(`${t(lang, 'notifTimeLabel')}: ${time}`);
    if (notifWorkerUrl && notifEnabled) {
      syncPushSubscriptionWithWorker(notifWorkerUrl, time);
    }
  };

  const handleTestNotification = async () => {
    if (!('Notification' in window)) {
      showToast(t(lang, 'notifUnsupported'));
      return;
    }
    let perm = Notification.permission;
    if (perm !== 'granted') {
      try {
        perm = await Notification.requestPermission();
      } catch (e) {
        console.error(e);
      }
    }
    if (perm === 'granted') {
      const randomIdx = Math.floor(Math.random() * INSPIRATIONAL_VERSES.length);
      const sample = INSPIRATIONAL_VERSES[randomIdx];
      const title = t(lang, 'notifDailyTitle');
      const body = `${lang === 'en' ? sample.textEn : sample.textId}\n— ${lang === 'en' ? sample.refEn : sample.refId}`;
      const url = `/?b=${sample.bookId}&c=${sample.chapter}`;
      const sent = await triggerNotification(title, body, url);
      if (sent) {
        showToast(t(lang, 'notifPermissionGranted'));
      }
    } else {
      showToast(t(lang, 'notifPermissionDenied'));
    }
  };

  const handleSaveWorkerUrl = () => {
    localStorage.setItem('alkitab_worker_url', notifWorkerUrl.trim());
    showToast(t(lang, 'notifWorkerSaved'));
    if (notifEnabled && notifWorkerUrl.trim()) {
      syncPushSubscriptionWithWorker(notifWorkerUrl.trim());
    }
  };

  // Local In-App Reminder Check (Runs every 30s)
  useEffect(() => {
    if (!notifEnabled) return;

    const checkReminder = () => {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMinutes}`;
      const todayDateStr = now.toISOString().split('T')[0];
      const lastSentDate = localStorage.getItem('alkitab_last_notif_date');

      if (currentTimeStr === notifTime && lastSentDate !== todayDateStr) {
        localStorage.setItem('alkitab_last_notif_date', todayDateStr);
        const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const sample = INSPIRATIONAL_VERSES[dayOfYear % INSPIRATIONAL_VERSES.length];
        const title = t(lang, 'notifDailyTitle');
        const body = `${lang === 'en' ? sample.textEn : sample.textId}\n— ${lang === 'en' ? sample.refEn : sample.refId}`;
        const url = `/?b=${sample.bookId}&c=${sample.chapter}`;
        triggerNotification(title, body, url);
      }
    };

    checkReminder();
    const timer = setInterval(checkReminder, 30000);
    return () => clearInterval(timer);
  }, [notifEnabled, notifTime, lang]);

  const activeSearchQueryRef = useRef('');

  // Auto-focus search input when modal opens
  useEffect(() => {
    if (showSearch) {
      searchInputRef.current?.focus();
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
      if (searchResults.length > 0) setSearchResults([]);
      if (searching) setSearching(false);
      if (parsedRef !== null) setParsedRef(null);
      if (matchedBooks.length > 0) setMatchedBooks([]);
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

  const sampleSuggestions = lang === 'he'
    ? ['בראשית 1:1', 'תהילים 23', 'אהבה', 'שלום', 'אור', 'אמונה']
    : lang === 'en'
    ? ['John 3:16', 'Psalm 23', 'Romans 8:28', 'love', 'peace', 'faith', 'light']
    : ['Yohanes 3:16', 'Mazmur 23', 'Roma 8:28', 'kasih', 'damai', 'iman', 'terang'];

  const filteredBooks = books.filter((b) => {
    if (pickerTestament === 'PL' && b.testament !== 'PL') return false;
    if (pickerTestament === 'PB' && b.testament !== 'PB') return false;
    if (pickerCategory !== 'ALL' && getBookCategory(b) !== pickerCategory) return false;
    if (pickerSearch.trim()) {
      const q = pickerSearch.trim().toLowerCase();
      const names = [b.name, b.abbr, b.name_id, b.name_en, b.name_he, b.abbr_id, b.abbr_en, b.abbr_he].filter(Boolean);
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
  const isRTL = BIBLE_VERSIONS[version]?.direction === 'rtl';

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
              <button 
                className={`lang-btn ${lang === 'he' ? 'active' : ''}`}
                onClick={() => handleToggleLang('he')}
                title="עִבְרִית (Hebrew)"
              >
                HE
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
            <div className={`reader-paper-canvas ${isRTL ? 'dir-rtl hebrew-canvas' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
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
                    const isSelected = selectedVerses.some((v) => v.verse === verseObj.verse);
                    const isBookmarked = bookmarks.includes(key);
                    const hlColor = highlights[key];
                    const hasNote = Boolean(notes[key]);

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
                          onClick={() => handleVerseClick(verseObj)}
                        >
                          <div className="verse-num-badge">
                            <span>{verseObj.verse}</span>
                            {hasNote && (
                              <button 
                                type="button" 
                                className="verse-note-indicator-btn" 
                                title={t(lang, 'editNote')}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenNoteModal(verseObj);
                                }}
                              >
                                <Icons.NoteIndicator />
                              </button>
                            )}
                          </div>
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
                    const isSelected = selectedVerses.some((v) => v.verse === verseObj.verse);
                    const isBookmarked = bookmarks.includes(key);
                    const hlColor = highlights[key];
                    const hasNote = Boolean(notes[key]);

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
                          onClick={() => handleVerseClick(verseObj)}
                        >
                          <sup className="verse-num-pill">
                            {verseObj.verse}
                            {hasNote && (
                              <span 
                                className="verse-note-indicator-sup" 
                                title={t(lang, 'editNote')}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenNoteModal(verseObj);
                                }}
                              >
                                <Icons.NoteIndicator />
                              </span>
                            )}
                          </sup>
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
      {selectedVerses.length > 0 && (
        <div className="verse-actions-bar">
          <div className="verse-actions-badge">
            {selectedVerses.length > 1
              ? `${selectedVerses.length} ${t(lang, 'ayat')}`
              : `${selectedVerses[0].verse}`}
          </div>

          <div className="hl-palette">
            <button 
              className="hl-dot" 
              style={{ backgroundColor: '#FEF08A' }} 
              onClick={() => handleSetHighlightVerses(selectedVerses, 'yellow')}
              title="Sorot Emas"
            />
            <button 
              className="hl-dot" 
              style={{ backgroundColor: '#BBF7D0' }} 
              onClick={() => handleSetHighlightVerses(selectedVerses, 'green')}
              title="Sorot Hijau"
            />
            <button 
              className="hl-dot" 
              style={{ backgroundColor: '#BAE6FD' }} 
              onClick={() => handleSetHighlightVerses(selectedVerses, 'blue')}
              title="Sorot Biru"
            />
            <button 
              className="hl-dot" 
              style={{ backgroundColor: '#FBCFE8' }} 
              onClick={() => handleSetHighlightVerses(selectedVerses, 'pink')}
              title="Sorot Merah Muda"
            />
          </div>

          <div style={{ width: 1, height: 20, backgroundColor: 'var(--border-subtle)' }} />

          <button className="verse-action-btn" onClick={() => handleCopyVerses(selectedVerses)}>
            <Icons.Copy />
            <span>{t(lang, 'salin')}</span>
          </button>
          <button className="verse-action-btn" onClick={() => handleToggleBookmarkVerses(selectedVerses)}>
            <Icons.Bookmark filled={selectedVerses.every((v) => bookmarks.includes(`${currentBookId}:${currentChapter}:${v.verse}`))} />
            <span>{t(lang, 'tandai')}</span>
          </button>
          <button 
            type="button"
            className={`verse-action-btn ${isSpeaking ? 'active-audio' : ''}`} 
            onClick={() => isSpeaking ? handleStopSpeech() : handleSpeakVerses(selectedVerses)}
            title={isSpeaking ? t(lang, 'stopAudio') : t(lang, 'listenVerse')}
          >
            {isSpeaking ? <Icons.Stop /> : <Icons.Speaker isPlaying={isSpeaking} />}
            <span>{isSpeaking ? t(lang, 'berhenti') : t(lang, 'suara')}</span>
          </button>
          <button 
            type="button"
            className="verse-action-btn" 
            onClick={() => handleOpenTranslate(selectedVerses[0])}
            title={t(lang, 'terjemahkan')}
          >
            <Icons.Globe />
            <span>{t(lang, 'terjemahkan')}</span>
          </button>
          {selectedVerses.length === 1 && (
            <>
              <button className="verse-action-btn" onClick={() => handleOpenCompare(selectedVerses[0])}>
                <Icons.Compare />
                <span>{t(lang, 'bandingkan')}</span>
              </button>
              <button className="verse-action-btn" onClick={() => handleOpenNoteModal(selectedVerses[0])}>
                <Icons.Note />
                <span>{notes[`${currentBookId}:${currentChapter}:${selectedVerses[0].verse}`] ? t(lang, 'editNote') : t(lang, 'catatan')}</span>
              </button>
            </>
          )}
          <button 
            className="verse-action-btn" 
            style={{ backgroundColor: 'var(--accent)', color: 'var(--text-inverse)' }}
            onClick={() => setShowCardMaker(true)}
          >
            <Icons.ImageCard />
            <span>{t(lang, 'gambar')}</span>
          </button>
          <button className="icon-btn" onClick={() => setSelectedVerses([])}>
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
      {showCompareModal && compareVerse && (
        <div className="modal-backdrop" onClick={() => { setShowCompareModal(false); handleStopSpeech(); }}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                {currentBookDisplayName} {currentChapter}:{compareVerse.verse}
              </div>
              <button className="modal-close-btn" onClick={() => { setShowCompareModal(false); handleStopSpeech(); }}>
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
                          {item.versionObj.direction === 'rtl' && (
                            <span className="version-lang-badge" style={{ background: 'rgba(217, 119, 6, 0.15)', color: '#d97706' }}>RTL</span>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                          <button 
                            type="button"
                            className="verse-action-btn"
                            style={{ padding: '0.25rem 0.6rem', fontSize: '0.74rem' }}
                            onClick={() => handleSpeakText(item.text, getLanguageCodeForVersion(item.version))}
                            title={t(lang, 'listenVerse')}
                          >
                            <Icons.Speaker />
                            <span>{t(lang, 'suara')}</span>
                          </button>
                          <button 
                            type="button"
                            className="verse-action-btn"
                            style={{ padding: '0.25rem 0.6rem', fontSize: '0.74rem' }}
                            onClick={() => {
                              copyTextToClipboard(`"${item.text}" — ${currentBookDisplayName} ${currentChapter}:${compareVerse.verse} (${item.version.toUpperCase()})`).then(() => {
                                showToast(t(lang, 'toastCopied'));
                              });
                            }}
                          >
                            <Icons.Copy />
                            <span>{t(lang, 'salin')}</span>
                          </button>
                        </div>
                      </div>
                      <div 
                        className={`compare-item-text ${item.versionObj?.direction === 'rtl' ? 'dir-rtl hebrew-text' : ''}`}
                        dir={item.versionObj?.direction === 'rtl' ? 'rtl' : 'ltr'}
                      >
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

      {/* MODAL: INSTANT MULTI-LANGUAGE VERSE TRANSLATION */}
      {showTranslateModal && (selectedVerses[0] || compareVerse) && (
        <div className="modal-backdrop" onClick={() => { setShowTranslateModal(false); handleStopSpeech(); }}>
          <div className="modal-card translate-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icons.Globe />
                <span>{t(lang, 'translateTitle')}</span>
                <span className="translate-verse-ref-badge">
                  {currentBookDisplayName} {currentChapter}:{selectedVerses[0]?.verse || compareVerse?.verse}
                </span>
              </div>
              <button 
                type="button"
                className="modal-close-btn" 
                onClick={() => { setShowTranslateModal(false); handleStopSpeech(); }}
                title={t(lang, 'tutup')}
              >
                <Icons.Close />
              </button>
            </div>

            <div className="modal-body translate-modal-body">
              {/* Original Source Box */}
              <div className="translate-card-box">
                <div className="translate-card-header">
                  <div className="translate-card-label">
                    <span>{t(lang, 'originalText')}</span>
                    <span className="version-lang-badge">{version.toUpperCase()}</span>
                  </div>
                  <div className="translate-card-actions">
                    <button
                      type="button"
                      className={`verse-action-btn ${isSpeaking ? 'active-audio' : ''}`}
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.74rem' }}
                      onClick={() => handleSpeakText((selectedVerses[0] || compareVerse)?.text, getLanguageCodeForVersion(version))}
                      title={t(lang, 'listenVerse')}
                    >
                      {isSpeaking ? <Icons.Stop /> : <Icons.Speaker isPlaying={isSpeaking} />}
                      <span>{isSpeaking ? t(lang, 'berhenti') : t(lang, 'suara')}</span>
                    </button>
                    <button
                      type="button"
                      className="verse-action-btn"
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.74rem' }}
                      onClick={() => {
                        const vObj = selectedVerses[0] || compareVerse;
                        copyTextToClipboard(`"${vObj?.text}" — ${currentBookDisplayName} ${currentChapter}:${vObj?.verse} (${version.toUpperCase()})`).then(() => {
                          showToast(t(lang, 'toastCopied'));
                        });
                      }}
                      title={t(lang, 'salin')}
                    >
                      <Icons.Copy />
                      <span>{t(lang, 'salin')}</span>
                    </button>
                  </div>
                </div>
                <div 
                  className={`translate-text-content ${version === 'he' ? 'dir-rtl hebrew-text' : ''}`}
                  dir={version === 'he' ? 'rtl' : 'ltr'}
                >
                  {(selectedVerses[0] || compareVerse)?.text}
                </div>
              </div>

              {/* Target Language Selection Chips */}
              <div className="translate-lang-chips-section">
                <div className="translate-chips-title">
                  {t(lang, 'translateTo')}
                </div>
                <div className="translate-lang-chips-grid">
                  {TRANSLATE_LANGUAGES.map((lItem) => {
                    const isActive = targetTranslateLang === lItem.code;
                    return (
                      <button
                        key={lItem.code}
                        type="button"
                        className={`translate-chip-btn ${isActive ? 'active' : ''}`}
                        onClick={() => handleChangeTranslateLang(lItem.code)}
                      >
                        <span className="translate-chip-flag">{lItem.flag}</span>
                        <span className="translate-chip-name">{lItem.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Translated Output Box */}
              <div className="translate-card-box target-result-box">
                <div className="translate-card-header">
                  <div className="translate-card-label">
                    <span>{t(lang, 'translatedResult')}</span>
                    <span className="version-lang-badge" style={{ background: 'var(--accent)', color: 'var(--text-inverse)' }}>
                      {TRANSLATE_LANGUAGES.find((l) => l.code === targetTranslateLang)?.flag}{' '}
                      {TRANSLATE_LANGUAGES.find((l) => l.code === targetTranslateLang)?.name}
                    </span>
                    {transSourceMode === 'offline-scripture' && (
                      <span className="translate-mode-badge instant">{t(lang, 'offlineInstant')}</span>
                    )}
                    {transSourceMode === 'offline-cached' && (
                      <span className="translate-mode-badge cached">{t(lang, 'offlineCached')}</span>
                    )}
                  </div>
                  <div className="translate-card-actions">
                    {translatedText && !translating && (
                      <>
                        <button
                          type="button"
                          className={`verse-action-btn ${isSpeaking ? 'active-audio' : ''}`}
                          style={{ padding: '0.25rem 0.6rem', fontSize: '0.74rem' }}
                          onClick={() => {
                            const curTarget = TRANSLATE_LANGUAGES.find((l) => l.code === targetTranslateLang);
                            handleSpeakText(translatedText, curTarget?.tts || 'en-US');
                          }}
                          title={t(lang, 'listenVerse')}
                        >
                          {isSpeaking ? <Icons.Stop /> : <Icons.Speaker isPlaying={isSpeaking} />}
                          <span>{isSpeaking ? t(lang, 'berhenti') : t(lang, 'suara')}</span>
                        </button>
                        <button
                          type="button"
                          className="verse-action-btn"
                          style={{ padding: '0.25rem 0.6rem', fontSize: '0.74rem' }}
                          onClick={() => {
                            const curTarget = TRANSLATE_LANGUAGES.find((l) => l.code === targetTranslateLang);
                            const vObj = selectedVerses[0] || compareVerse;
                            copyTextToClipboard(`"${translatedText}" — ${currentBookDisplayName} ${currentChapter}:${vObj?.verse} [${curTarget?.name || targetTranslateLang}]`).then(() => {
                              showToast(t(lang, 'toastCopied'));
                            });
                          }}
                          title={t(lang, 'salin')}
                        >
                          <Icons.Copy />
                          <span>{t(lang, 'salin')}</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="translate-result-body">
                  {translating ? (
                    <div className="translate-loading-state">
                      <div className="spinner small"></div>
                      <span>{t(lang, 'translating')}</span>
                    </div>
                  ) : translateError ? (
                    <div className="translate-error-state">
                      <span>{translateError}</span>
                      <button
                        type="button"
                        className="translate-retry-btn"
                        onClick={() => {
                          const vObj = selectedVerses[0] || compareVerse;
                          if (vObj?.text) handleExecuteTranslate(vObj.text, targetTranslateLang);
                        }}
                      >
                        Coba Lagi
                      </button>
                    </div>
                  ) : (
                    <div 
                      className={`translate-text-content result-text ${TRANSLATE_LANGUAGES.find((l) => l.code === targetTranslateLang)?.rtl ? 'dir-rtl' : ''}`}
                      dir={TRANSLATE_LANGUAGES.find((l) => l.code === targetTranslateLang)?.rtl ? 'rtl' : 'ltr'}
                    >
                      {translatedText || '—'}
                    </div>
                  )}
                </div>
              </div>

              {/* Offline Chapter Sync & Offline Notice Bar */}
              <div className="translate-footer-bar">
                <button
                  type="button"
                  className="offline-chapter-sync-btn"
                  onClick={handleCacheChapterTranslations}
                  disabled={cachingChapter}
                  title={t(lang, 'offlineSaveChapter')}
                >
                  {cachingChapter ? (
                    <>
                      <div className="spinner mini" />
                      <span>{t(lang, 'offlineSavingChapter', { progress: cacheProgress })}</span>
                    </>
                  ) : isChapterFullyCached ? (
                    <>
                      <span>{t(lang, 'offlineChapterSaved', { count: chapterVerses.length })}</span>
                    </>
                  ) : (
                    <>
                      <span>{t(lang, 'offlineSaveChapter')}</span>
                    </>
                  )}
                </button>
                {transSourceMode !== 'online' && (
                  <div className="translate-mode-hint">
                    {t(lang, 'offlineNotice')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VERSE CARD GENERATOR */}
      {showCardMaker && selectedVerses.length > 0 && (
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
                <button className="verse-action-btn" onClick={() => handleShareVerses(selectedVerses)}>
                  <Icons.Share />
                  <span>{t(lang, 'share')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PERSONAL VERSE NOTE */}
      {editingNoteVerse && (
        <div className="modal-backdrop" onClick={() => setEditingNoteVerse(null)}>
          <div className="modal-card note-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Icons.Note />
                <span>
                  {t(lang, 'noteTitle', { 
                    reference: `${getBookName(currentBookMeta)} ${currentChapter}:${editingNoteVerse.verse}` 
                  })}
                </span>
              </div>
              <button className="modal-close-btn" onClick={() => setEditingNoteVerse(null)}>
                <Icons.Close />
              </button>
            </div>

            <div className="modal-body">
              {editingNoteVerse.text && (
                <div className="note-verse-preview">
                  "{editingNoteVerse.text}"
                </div>
              )}

              <div className="note-input-group">
                <label className="setting-label">{t(lang, 'noteLabel')}</label>
                <textarea
                  className="note-textarea"
                  value={noteInputText}
                  onChange={(e) => setNoteInputText(e.target.value)}
                  placeholder={t(lang, 'notePlaceholder')}
                  rows={5}
                  autoFocus
                />
              </div>

              <div className="note-modal-actions">
                {notes[`${currentBookId}:${currentChapter}:${editingNoteVerse.verse}`] && (
                  <button 
                    type="button" 
                    className="note-delete-btn"
                    onClick={() => {
                      handleDeleteNote(`${currentBookId}:${currentChapter}:${editingNoteVerse.verse}`);
                      setEditingNoteVerse(null);
                    }}
                  >
                    {t(lang, 'deleteNote')}
                  </button>
                )}
                <div style={{ flex: 1 }} />
                <button 
                  type="button" 
                  className="secondary-btn" 
                  onClick={() => setEditingNoteVerse(null)}
                >
                  {t(lang, 'batal')}
                </button>
                <button 
                  type="button" 
                  className="primary-action-btn" 
                  onClick={handleSaveNote}
                >
                  {t(lang, 'saveNote')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SAVED VERSES, HIGHLIGHTS & NOTES */}
      {showSavedModal && (
        <div className="modal-backdrop" onClick={() => setShowSavedModal(false)}>
          <div className="modal-card saved-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{t(lang, 'savedTitle')}</div>
              <button className="modal-close-btn" onClick={() => setShowSavedModal(false)}>
                <Icons.Close />
              </button>
            </div>

            <div className="saved-tabs-bar">
              <button 
                type="button"
                className={`saved-tab-pill ${savedTab === 'all' ? 'active' : ''}`}
                onClick={() => setSavedTab('all')}
              >
                {t(lang, 'tabAll', { count: bookmarks.length + Object.keys(highlights).length + Object.keys(notes).length })}
              </button>
              <button 
                type="button"
                className={`saved-tab-pill ${savedTab === 'bookmarks' ? 'active' : ''}`}
                onClick={() => setSavedTab('bookmarks')}
              >
                {t(lang, 'tabBookmarks', { count: bookmarks.length })}
              </button>
              <button 
                type="button"
                className={`saved-tab-pill ${savedTab === 'highlights' ? 'active' : ''}`}
                onClick={() => setSavedTab('highlights')}
              >
                {t(lang, 'tabHighlights', { count: Object.keys(highlights).length })}
              </button>
              <button 
                type="button"
                className={`saved-tab-pill ${savedTab === 'notes' ? 'active' : ''}`}
                onClick={() => setSavedTab('notes')}
              >
                {t(lang, 'tabNotes', { count: Object.keys(notes).length })}
              </button>
            </div>

            <div className="modal-body">
              {bookmarks.length === 0 && Object.keys(highlights).length === 0 && Object.keys(notes).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  {t(lang, 'emptySaved')}
                </div>
              ) : (
                <div className="saved-items-container">
                  {/* Bookmarks */}
                  {(savedTab === 'all' || savedTab === 'bookmarks') && bookmarks.map((key) => {
                    const [bId, ch, v] = key.split(':');
                    const bMeta = books.find((b) => b.id === parseInt(bId, 10));
                    const bName = getBookName(bMeta);
                    const bCache = bookCache[`${version}:${bId}`];
                    const vText = bCache?.chapters?.[ch]?.find((x) => String(x.verse) === v)?.text;

                    return (
                      <div 
                        key={`bm-${key}`} 
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

                  {/* Highlights */}
                  {(savedTab === 'all' || savedTab === 'highlights') && Object.entries(highlights).map(([key, color]) => {
                    const [bId, ch, v] = key.split(':');
                    const bMeta = books.find((b) => b.id === parseInt(bId, 10));
                    const bName = getBookName(bMeta);
                    const bCache = bookCache[`${version}:${bId}`];
                    const vText = bCache?.chapters?.[ch]?.find((x) => String(x.verse) === v)?.text;

                    return (
                      <div 
                        key={`hl-${key}`} 
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

                  {/* Notes */}
                  {(savedTab === 'all' || savedTab === 'notes') && Object.entries(notes).map(([key, noteText]) => {
                    const [bId, ch, v] = key.split(':');
                    const bMeta = books.find((b) => b.id === parseInt(bId, 10));
                    const bName = getBookName(bMeta);
                    const bCache = bookCache[`${version}:${bId}`];
                    const vText = bCache?.chapters?.[ch]?.find((x) => String(x.verse) === v)?.text;

                    return (
                      <div 
                        key={`note-${key}`} 
                        className="saved-item-card saved-note-card"
                        onClick={() => jumpToPassage(parseInt(bId, 10), parseInt(ch, 10), parseInt(v, 10))}
                      >
                        <div className="saved-item-header">
                          <div className="saved-item-ref">
                            <span>{bName} {ch}:{v}</span>
                            <span className="saved-note-pill">
                              <Icons.Note /> {t(lang, 'catatan')}
                            </span>
                          </div>
                          <div className="saved-actions-group">
                            <button 
                              type="button"
                              className="saved-item-del-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                const vObj = bCache?.chapters?.[ch]?.find((x) => String(x.verse) === v) || { verse: parseInt(v, 10), text: vText || '' };
                                handleOpenNoteModal(vObj);
                              }}
                              title={t(lang, 'editNote')}
                            >
                              <Icons.NoteIndicator />
                            </button>
                            <button 
                              type="button"
                              className="saved-item-del-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteNote(key);
                              }}
                              title={t(lang, 'deleteNote')}
                            >
                              <Icons.Close />
                            </button>
                          </div>
                        </div>
                        {vText && <div className="saved-item-snippet">"{vText}"</div>}
                        <div className="saved-note-content">{noteText}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer with Backup & Restore Buttons */}
            <div className="saved-modal-footer">
              <div className="saved-footer-info">
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {t(lang, 'backupRestoreTitle')}
                </span>
              </div>
              <div className="saved-footer-actions">
                <button 
                  type="button" 
                  className="saved-footer-btn"
                  onClick={handleExportBackup}
                  title={t(lang, 'exportBackup')}
                >
                  <Icons.Download />
                  <span>{t(lang, 'exportBackup')}</span>
                </button>
                <button 
                  type="button" 
                  className="saved-footer-btn"
                  onClick={() => fileInputRef.current?.click()}
                  title={t(lang, 'importBackup')}
                >
                  <Icons.Upload />
                  <span>{t(lang, 'importBackup')}</span>
                </button>
              </div>
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
                <div className="lang-options-grid">
                  <button 
                    className={`lang-option-btn ${lang === 'id' ? 'active' : ''}`}
                    onClick={() => handleToggleLang('id')}
                  >
                    <Icons.FlagID />
                    <span>Bahasa Indonesia</span>
                  </button>
                  <button 
                    className={`lang-option-btn ${lang === 'en' ? 'active' : ''}`}
                    onClick={() => handleToggleLang('en')}
                  >
                    <Icons.FlagEN />
                    <span>English</span>
                  </button>
                  <button 
                    className={`lang-option-btn ${lang === 'he' ? 'active' : ''}`}
                    onClick={() => handleToggleLang('he')}
                  >
                    <Icons.FlagHE />
                    <span>עִבְרִית (Hebrew)</span>
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
                    type="button"
                    className={`theme-option-btn theme-sepia ${theme === 'sepia' ? 'active' : ''}`}
                    onClick={() => setTheme('sepia')}
                    title={t(lang, 'themeSepia')}
                  >
                    {theme === 'sepia' && (
                      <span className="theme-option-check">
                        <Icons.CheckMini />
                      </span>
                    )}
                    <div className="theme-preview-box">
                      <Icons.BookOpenMini />
                    </div>
                    <span className="theme-option-name">{t(lang, 'themeSepia')}</span>
                  </button>

                  <button 
                    type="button"
                    className={`theme-option-btn theme-light ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => setTheme('light')}
                    title={t(lang, 'themeLight')}
                  >
                    {theme === 'light' && (
                      <span className="theme-option-check">
                        <Icons.CheckMini />
                      </span>
                    )}
                    <div className="theme-preview-box">
                      <Icons.SunMini />
                    </div>
                    <span className="theme-option-name">{t(lang, 'themeLight')}</span>
                  </button>

                  <button 
                    type="button"
                    className={`theme-option-btn theme-dark ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => setTheme('dark')}
                    title={t(lang, 'themeDark')}
                  >
                    {theme === 'dark' && (
                      <span className="theme-option-check">
                        <Icons.CheckMini />
                      </span>
                    )}
                    <div className="theme-preview-box">
                      <Icons.MoonMini />
                    </div>
                    <span className="theme-option-name">{t(lang, 'themeDark')}</span>
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
                <div className="layout-toggle-grid">
                  <button 
                    type="button"
                    className={`layout-option-btn ${readerLayout === 'list' ? 'active' : ''}`}
                    onClick={() => setReaderLayout('list')}
                  >
                    <Icons.ListLayout />
                    <span>{t(lang, 'viewVerse')}</span>
                  </button>
                  <button 
                    type="button"
                    className={`layout-option-btn ${readerLayout === 'paragraph' ? 'active' : ''}`}
                    onClick={() => setReaderLayout('paragraph')}
                  >
                    <Icons.ParagraphLayout />
                    <span>{t(lang, 'viewParagraph')}</span>
                  </button>
                </div>
              </div>

              {/* Daily Verse Notification & Reminder Box */}
              <div className="settings-feature-card">
                <div className="feature-card-header">
                  <div className="feature-card-main">
                    <div className="feature-icon-badge">
                      <Icons.Bell />
                    </div>
                    <div className="feature-text">
                      <div className="feature-title">{t(lang, 'notifTitle')}</div>
                      <div className="feature-desc">{t(lang, 'notifDesc')}</div>
                    </div>
                  </div>
                  <label className="toggle-switch" title={t(lang, 'notifEnable')}>
                    <input 
                      type="checkbox" 
                      checked={notifEnabled} 
                      onChange={(e) => handleToggleNotification(e.target.checked)} 
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                {notifEnabled && (
                  <div className="notif-details-panel">
                    {/* Time Picker */}
                    <div className="notif-field-group">
                      <label className="notif-field-label">{t(lang, 'notifTimeLabel')}</label>
                      <div className="notif-time-preset-row">
                        {['06:00', '07:00', '12:00', '19:00', '21:00'].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            className={`preset-time-btn ${notifTime === preset ? 'active' : ''}`}
                            onClick={() => handleUpdateNotifTime(preset)}
                          >
                            {preset}
                          </button>
                        ))}
                        <input 
                          type="time" 
                          value={notifTime} 
                          onChange={(e) => handleUpdateNotifTime(e.target.value)}
                          className="notif-custom-time-input"
                          title="Pilih jam kustom"
                        />
                      </div>
                    </div>

                    {/* Test Notification Button */}
                    <div className="notif-actions-row">
                      <button 
                        type="button"
                        className="test-notif-btn"
                        onClick={handleTestNotification}
                      >
                        <Icons.Bell />
                        <span>{t(lang, 'notifTestBtn')}</span>
                      </button>
                    </div>

                    {/* Cloudflare Worker URL Config (Collapsible) */}
                    <div className="worker-config-box">
                      <details className="worker-details">
                        <summary className="worker-summary">
                          <Icons.Gear />
                          <span>{t(lang, 'notifWorkerTitle')}</span>
                        </summary>
                        <div className="worker-inputs">
                          <label className="notif-field-label">{t(lang, 'notifWorkerDesc')}</label>
                          <div className="worker-input-wrap">
                            <input 
                              type="url" 
                              value={notifWorkerUrl} 
                              onChange={(e) => setNotifWorkerUrl(e.target.value)} 
                              placeholder={t(lang, 'notifWorkerPlaceholder')}
                              className="worker-text-input"
                            />
                            <button 
                              type="button"
                              className="worker-save-btn"
                              onClick={handleSaveWorkerUrl}
                            >
                              {t(lang, 'notifWorkerSave')}
                            </button>
                          </div>
                          <div className="worker-hint">
                            Deploy Cloudflare Worker dari folder <code>serverless/cloudflare-worker/</code> agar notifikasi otomatis dikirim setiap hari via Web Push gratis.
                          </div>
                        </div>
                      </details>
                    </div>
                  </div>
                )}
              </div>

              {/* Offline Full Download Box */}
              <div className="settings-feature-card">
                <div className="feature-card-header">
                  <div className="feature-card-main">
                    <div className="feature-icon-badge">
                      <Icons.CloudCheck />
                    </div>
                    <div className="feature-text">
                      <div className="feature-title">
                        {t(lang, 'offlineTitle')} ({version.toUpperCase()})
                      </div>
                      <div className="feature-desc">
                        {offlineStatus 
                          ? t(lang, 'offlineSynced', { version: version.toUpperCase() })
                          : t(lang, 'offlineUnsynced', { version: version.toUpperCase() })}
                      </div>
                    </div>
                  </div>
                  <button 
                    type="button"
                    className={`sync-btn ${offlineStatus ? 'synced' : ''}`}
                    onClick={handleSyncAllOffline}
                    disabled={syncingOffline || offlineStatus}
                  >
                    {syncingOffline ? (
                      <>
                        <span className="spinner mini" />
                        <span>{t(lang, 'downloading')}</span>
                      </>
                    ) : offlineStatus ? (
                      <>
                        <Icons.CheckMini />
                        <span>{t(lang, 'downloaded')}</span>
                      </>
                    ) : (
                      <>
                        <Icons.Download />
                        <span>{t(lang, 'downloadAll')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Backup & Restore Data Box */}
              <div className="settings-feature-card">
                <div className="feature-card-header">
                  <div className="feature-card-main">
                    <div className="feature-icon-badge">
                      <Icons.Download />
                    </div>
                    <div className="feature-text">
                      <div className="feature-title">{t(lang, 'backupRestoreTitle')}</div>
                      <div className="feature-desc">{t(lang, 'backupDesc')}</div>
                    </div>
                  </div>
                </div>
                <div className="backup-action-grid">
                  <button 
                    type="button"
                    className="backup-action-btn primary"
                    onClick={handleExportBackup}
                    title={t(lang, 'exportBackup')}
                  >
                    <Icons.Download />
                    <span>{t(lang, 'exportBackup')}</span>
                  </button>
                  <button 
                    type="button"
                    className="backup-action-btn secondary"
                    onClick={() => fileInputRef.current?.click()}
                    title={t(lang, 'importBackup')}
                  >
                    <Icons.Upload />
                    <span>{t(lang, 'importBackup')}</span>
                  </button>
                </div>
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
      {/* Hidden File Input for JSON Backup Import */}
      <input 
        ref={fileInputRef} 
        type="file" 
        accept=".json" 
        style={{ display: 'none' }} 
        onChange={handleImportBackup} 
      />
    </div>
  );
}
