export type Locale = "ja" | "en";

export interface LandingContent {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    features: string;
    ai: string;
    deploy: string;
    languageLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryAction: string;
    secondaryAction: string;
  };
  screenshots: {
    editorAlt: string;
    editorOpenLabel: string;
    aiAlt: string;
    aiOpenLabel: string;
    rebuildAlt: string;
    rebuildOpenLabel: string;
    lightboxLabel: string;
    closeLabel: string;
  };
  positioning: string[];
  features: Array<{
    title: string;
    body: string;
  }>;
  featuresSection: {
    eyebrow: string;
    title: string;
  };
  aiSection: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  mcpSection: {
    eyebrow: string;
    title: string;
    capabilities: string[];
  };
  deploySection: {
    eyebrow: string;
    title: string;
    body: string;
  };
  start: {
    eyebrow: string;
    title: string;
    github: string;
  };
}

export const content: Record<Locale, LandingContent> = {
  ja: {
    meta: {
      title: "Serene Bach - Self-hosted weblog engine",
      description:
        "Serene Bach v3 の資産と所有感を引き継ぎ、Go + SQLite + 静的再構築 + AI 執筆補助で現代化したセルフホスト型ブログエンジン。",
    },
    nav: {
      features: "特徴",
      ai: "AI 補助",
      deploy: "運用",
      languageLabel: "言語切り替え",
    },
    hero: {
      eyebrow: "Self-hosted weblog engine",
      title: "自分の場所で、自分の文章を書き続けるためのブログエンジン。",
      lead:
        "Serene Bach v4 は、v3 の資産と運用感を引き継ぎながら、Go + SQLite + 静的再構築 + AI 執筆補助で現代化したセルフホスト型ブログエンジンです。",
      primaryAction: "はじめる",
      secondaryAction: "特徴を見る",
    },
    screenshots: {
      editorAlt:
        "Serene Bach の記事編集画面。Markdown エディタと AI 補助ボタンが表示されている。",
      editorOpenLabel: "記事編集画面のスクリーンショットを拡大表示",
      aiAlt:
        "Serene Bach の AI 設定画面。プロバイダ、エンドポイント URL、モデル、API key、画像 alt 自動生成を設定できる。",
      aiOpenLabel: "AI 設定画面のスクリーンショットを拡大表示",
      rebuildAlt:
        "Serene Bach のページ構築画面。静的出力先と最終更新時刻、再構築ボタンが表示されている。",
      rebuildOpenLabel: "ページ構築画面のスクリーンショットを拡大表示",
      lightboxLabel: "スクリーンショット拡大表示",
      closeLabel: "閉じる",
    },
    positioning: [
      "WordPress ほど大きくなく、純粋な静的サイトジェネレータほど割り切らない。",
      "ブラウザで運用できる CMS 的な手触りに、自己ホストと AI 連携を無理なく重ねます。",
    ],
    featuresSection: {
      eyebrow: "Why Serene Bach",
      title: "古い資産を捨てずに、今の環境で運用する。",
    },
    features: [
      {
        title: "Serene Bach の資産を引き継ぐ",
        body:
          "Serene Bach v3 のテンプレート互換を重視し、昔からのデザイン資産と運用感を活かせます。",
      },
      {
        title: "Go + SQLite で小さく運用",
        body:
          "単一バイナリ、Pure Go SQLite、HTTP サーバと CGI の両対応。小規模 VPS や共用サーバでも扱いやすい構成です。",
      },
      {
        title: "AI 補助を編集画面に統合",
        body:
          "書き直し、続きを書く、要約、タイトル・タグ・キーワード提案、画像 alt text 生成を日々の投稿フローに組み込めます。",
      },
    ],
    aiSection: {
      eyebrow: "AI writing assist",
      title: "AI に書かせるより、自分で書く人を助ける。",
      paragraphs: [
        "AI 補助は別アプリへのコピペではなく、記事編集画面の中で使えます。OpenAI 互換 API、LM Studio、Ollama、Claude を選べるため、クラウド API とローカル LLM のどちらにも寄せられます。",
        "API key はサーバ側で暗号化保存。ユーザー単位で有効化できるため、ブログ全体を AI 前提にせず、使う人だけが使える形を保てます。",
      ],
    },
    mcpSection: {
      eyebrow: "MCP / llms.txt",
      title: "AI に読ませるブログから、AI と作業できるブログへ。",
      capabilities: ["llms.txt", "llms-full.txt", "MCP stdio", "MCP HTTP", "Read / write scope", "Audit log"],
    },
    deploySection: {
      eyebrow: "Deploy small",
      title: "常駐サーバ、CGI、静的配信を同じ Go バイナリから。",
      body:
        "小さな VPS、Raspberry Pi、共用サーバ、静的ホストまで、運用場所に合わせて選べます。管理画面で記事を書き、必要なタイミングで静的 rebuild する構成にも対応しています。",
    },
    start: {
      eyebrow: "Get started",
      title: "まずはローカルで動かす。",
      github: "GitHub で見る",
    },
  },
  en: {
    meta: {
      title: "Serene Bach - Self-hosted weblog engine",
      description:
        "A self-hosted weblog engine that carries Serene Bach v3 forward with Go, SQLite, static rebuilds, and AI-assisted writing.",
    },
    nav: {
      features: "Features",
      ai: "AI assist",
      deploy: "Deploy",
      languageLabel: "Language switcher",
    },
    hero: {
      eyebrow: "Self-hosted weblog engine",
      title: "A weblog engine for people who still want to own their writing.",
      lead:
        "Serene Bach v4 carries forward the assets and operating feel of v3, modernized with Go, SQLite, static rebuilds, and AI-assisted writing.",
      primaryAction: "Get started",
      secondaryAction: "View features",
    },
    screenshots: {
      editorAlt:
        "Serene Bach entry editor showing a Markdown editor and AI assist buttons.",
      editorOpenLabel: "Open the entry editor screenshot",
      aiAlt:
        "Serene Bach AI settings screen with provider, endpoint URL, model, API key, and automatic image alt text options.",
      aiOpenLabel: "Open the AI settings screenshot",
      rebuildAlt:
        "Serene Bach rebuild screen showing the static output path, last update time, and rebuild button.",
      rebuildOpenLabel: "Open the rebuild screen screenshot",
      lightboxLabel: "Screenshot preview",
      closeLabel: "Close",
    },
    positioning: [
      "Not as large as WordPress. Not as rigid as a pure static site generator.",
      "It keeps the browser-based CMS workflow while adding self-hosting, static output, and AI integration.",
    ],
    featuresSection: {
      eyebrow: "Why Serene Bach",
      title: "Keep your old assets, and run them in a modern environment.",
    },
    features: [
      {
        title: "Bring Serene Bach assets forward",
        body:
          "Template compatibility with Serene Bach v3 is a core goal, so existing design assets and publishing habits can keep working.",
      },
      {
        title: "Run small with Go + SQLite",
        body:
          "A single binary, Pure Go SQLite, HTTP server mode, and CGI support make it practical on a small VPS, a local box, or traditional shared hosting.",
      },
      {
        title: "AI assist inside the editor",
        body:
          "Rewrite, continue, summarize, suggest titles, tags, and keywords, and generate image alt text from the posting workflow.",
      },
    ],
    aiSection: {
      eyebrow: "AI writing assist",
      title: "Not a CMS that writes for you. A CMS that helps you write.",
      paragraphs: [
        "AI assist is built into the entry editor rather than living in a separate app. You can choose OpenAI-compatible APIs, LM Studio, Ollama, or Claude, so cloud APIs and local LLMs are both viable.",
        "API keys are encrypted on the server. AI settings are per-user, so the whole blog does not have to become AI-first just because one author wants assistance.",
      ],
    },
    mcpSection: {
      eyebrow: "MCP / llms.txt",
      title: "From a blog AI can read to a blog AI can work with.",
      capabilities: ["llms.txt", "llms-full.txt", "MCP stdio", "MCP HTTP", "Read / write scope", "Audit log"],
    },
    deploySection: {
      eyebrow: "Deploy small",
      title: "HTTP server, CGI, and static publishing from the same Go binary.",
      body:
        "Run it on a small VPS, Raspberry Pi, shared host, or static host. Write from the admin UI, then rebuild static HTML when your publishing workflow calls for it.",
    },
    start: {
      eyebrow: "Get started",
      title: "Run it locally first.",
      github: "View on GitHub",
    },
  },
};
