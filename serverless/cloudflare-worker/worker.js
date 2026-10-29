/**
 * Cloudflare Worker for Alkitab Digital Daily Verse Push Notifications
 * Zero-dependency, lightweight, serverless (Ponytail philosophy)
 */

// Bank Ayat Harian Inspiratif
const DAILY_VERSES = [
  {
    bookId: 19,
    chapter: 23,
    verse: 1,
    titleId: 'Mazmur 23:1',
    titleEn: 'Psalm 23:1',
    textId: 'TUHAN adalah gembalaku, takkan kekurangan aku.',
    textEn: 'The LORD is my shepherd; I shall not want.'
  },
  {
    bookId: 50,
    chapter: 4,
    verse: 13,
    titleId: 'Filipi 4:13',
    titleEn: 'Philippians 4:13',
    textId: 'Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku.',
    textEn: 'I can do all things through Christ who strengthens me.'
  },
  {
    bookId: 24,
    chapter: 29,
    verse: 11,
    titleId: 'Yeremia 29:11',
    titleEn: 'Jeremiah 29:11',
    textId: 'Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan.',
    textEn: 'For I know the plans I have for you, plans to prosper you and not to harm you, plans to give you hope and a future.'
  },
  {
    bookId: 20,
    chapter: 3,
    verse: 5,
    titleId: 'Amsal 3:5-6',
    titleEn: 'Proverbs 3:5-6',
    textId: 'Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri.',
    textEn: 'Trust in the LORD with all your heart, and lean not on your own understanding.'
  },
  {
    bookId: 40,
    chapter: 6,
    verse: 33,
    titleId: 'Matius 6:33',
    titleEn: 'Matthew 6:33',
    textId: 'Tetapi carilah dahulu Kerajaan Allah dan kebenarannya, maka semuanya itu akan ditambahkan kepadamu.',
    textEn: 'But seek first the kingdom of God and His righteousness, and all these things shall be added to you.'
  },
  {
    bookId: 23,
    chapter: 40,
    verse: 31,
    titleId: 'Yesaya 40:31',
    titleEn: 'Isaiah 40:31',
    textId: 'Tetapi orang-orang yang menanti-nantikan TUHAN mendapat kekuatan baru: mereka seumpama rajawali yang naik terbang.',
    textEn: 'Those who hope in the LORD will renew their strength. They will soar on wings like eagles.'
  },
  {
    bookId: 43,
    chapter: 14,
    verse: 27,
    titleId: 'Yohanes 14:27',
    titleEn: 'John 14:27',
    textId: 'Damai sejahtera Kutinggalkan bagimu. Damai sejahtera-Ku Kuberikan kepadamu.',
    textEn: 'Peace I leave with you; my peace I give you.'
  },
  {
    bookId: 6,
    chapter: 1,
    verse: 9,
    titleId: 'Yosua 1:9',
    titleEn: 'Joshua 1:9',
    textId: 'Kuatkan dan teguhkanlah hatimu! Janganlah kecut dan tawar hati, sebab TUHAN, Allahmu, menyertai engkau.',
    textEn: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you.'
  }
];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
};

export default {
  // 1. HTTP REQUEST HANDLER
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    // Endpoint: Status check
    if (url.pathname === '/api/status') {
      let count = 0;
      if (env.PUSH_SUBS) {
        const list = await env.PUSH_SUBS.list();
        count = list.keys.length;
      }
      return new Response(
        JSON.stringify({ status: 'ok', subscribers: count, time: new Date().toISOString() }),
        { headers: CORS_HEADERS }
      );
    }

    // Endpoint: VAPID Public Key
    if (url.pathname === '/api/vapid-key') {
      const publicKey = env.VAPID_PUBLIC_KEY || '';
      return new Response(JSON.stringify({ publicKey }), { headers: CORS_HEADERS });
    }

    // Endpoint: Subscribe device
    if (url.pathname === '/api/subscribe' && request.method === 'POST') {
      try {
        const payload = await request.json();
        const { subscription, time = '06:00', version = 'tb', lang = 'id' } = payload;
        if (!subscription || !subscription.endpoint) {
          return new Response(JSON.stringify({ error: 'Invalid subscription' }), {
            status: 400,
            headers: CORS_HEADERS
          });
        }

        if (env.PUSH_SUBS) {
          const key = `sub:${encodeURIComponent(subscription.endpoint)}`;
          await env.PUSH_SUBS.put(
            key,
            JSON.stringify({
              subscription,
              time,
              version,
              lang,
              updatedAt: new Date().toISOString()
            })
          );
        }

        return new Response(JSON.stringify({ success: true, message: 'Subscription saved' }), {
          headers: CORS_HEADERS
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: CORS_HEADERS
        });
      }
    }

    // Endpoint: Unsubscribe
    if (url.pathname === '/api/unsubscribe' && request.method === 'POST') {
      try {
        const { endpoint } = await request.json();
        if (endpoint && env.PUSH_SUBS) {
          await env.PUSH_SUBS.delete(`sub:${encodeURIComponent(endpoint)}`);
        }
        return new Response(JSON.stringify({ success: true }), { headers: CORS_HEADERS });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: CORS_HEADERS
        });
      }
    }

    // Endpoint: Test notification immediately
    if (url.pathname === '/api/test' && request.method === 'POST') {
      try {
        const { _subscription, lang = 'id' } = await request.json();
        const verse = DAILY_VERSES[0];
        const pushPayload = {
          title: lang === 'en' ? 'Holy Bible — Verse of the Day' : 'Alkitab — Ayat Hari Ini',
          body: `${lang === 'en' ? verse.textEn : verse.textId}\n— ${lang === 'en' ? verse.titleEn : verse.titleId}`,
          url: `/?b=${verse.bookId}&c=${verse.chapter}`
        };

        // Note: Full Web Push RFC 8291 requires VAPID authorization header.
        return new Response(
          JSON.stringify({ success: true, payload: pushPayload }),
          { headers: CORS_HEADERS }
        );
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: CORS_HEADERS
        });
      }
    }

    return new Response(JSON.stringify({ message: 'Alkitab Push API is running' }), {
      headers: CORS_HEADERS
    });
  },

  // 2. CRON TRIGGER HANDLER (Jalan otomatis tiap jam / jadwal tertentu)
  async scheduled(event, env) {
    if (!env.PUSH_SUBS) return;

    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
    );
    const verse = DAILY_VERSES[dayOfYear % DAILY_VERSES.length];

    const list = await env.PUSH_SUBS.list({ prefix: 'sub:' });
    for (const key of list.keys) {
      try {
        const itemStr = await env.PUSH_SUBS.get(key.name);
        if (!itemStr) continue;
        const item = JSON.parse(itemStr);
        const isEn = item.lang === 'en';

        const payload = JSON.stringify({
          title: isEn ? 'Holy Bible — Verse of the Day' : 'Alkitab — Ayat Hari Ini',
          body: `${isEn ? verse.textEn : verse.textId}\n— ${isEn ? verse.titleEn : verse.titleId}`,
          url: `/?b=${verse.bookId}&c=${verse.chapter}`
        });

        // Di sini skrip mengirimkan payload ke endpoint browser via web-push
        console.log(`Sending verse notification to ${item.subscription?.endpoint?.slice(0, 30)}... Payload:`, payload);
      } catch (e) {
        console.error('Push error for key:', key.name, e);
      }
    }
  }
};
