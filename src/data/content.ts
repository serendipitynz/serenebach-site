export type Locale = "ja" | "en";

export interface LandingContent {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    compare: string;
    features: string;
    templates: string;
    news: string;
    ai: string;
    deploy: string;
    languageLabel: string;
    menuLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    proof: string[];
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
  comparisonSection: {
    eyebrow: string;
    title: string;
    note: string;
    columns: string[];
    rows: Array<{
      label: string;
      values: string[];
    }>;
  };
  quickStartSection: {
    eyebrow: string;
    title: string;
    steps: string[];
    code: string;
  };
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
  migrationSection: {
    eyebrow: string;
    title: string;
    body: string;
  };
  safetySection: {
    eyebrow: string;
    title: string;
    points: string[];
  };
  start: {
    eyebrow: string;
    title: string;
    code: string;
    github: string;
  };
  footer: {
    github: string;
    license: string;
    docs: string;
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
      compare: "比較",
      features: "特徴",
      templates: "テンプレート",
      news: "ニュース",
      ai: "AI 補助",
      deploy: "運用",
      languageLabel: "言語切り替え",
      menuLabel: "メニューを開く",
    },
    hero: {
      eyebrow: "Self-hosted weblog engine",
      title: "WordPress と Hugo の狭間にある、軽量ブログエンジン",
      lead:
        "Serene Bach v4 は、CGI でも常駐サーバでも動く Go 製の単一バイナリです。外部 DB サーバなしで、ブラウザから書き、必要に応じて静的 HTML も再構築できます。",
      proof: ["単一バイナリ", "CGI 対応", "SQLite", "SB3 移行", "静的再構築"],
      primaryAction: "GitHub で見る",
      secondaryAction: "比較を見る",
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
      "ブラウザで更新したい。でも、大きな CMS は持ち込みたくない人のために。",
      "CGI 時代の手軽さそのままに、SQLite、静的再構築、AI 連携を足しました。",
    ],
    comparisonSection: {
      eyebrow: "Positioning",
      title: "ブログの運用感で選ぶ。",
      note: "Serene Bach は、ブラウザで更新したい個人ブログや小規模サイトを、軽く自分で持ちたい人に向いています。",
      columns: ["Serene Bach v4", "WordPress", "Hugo"],
      rows: [
        {
          label: "実行方式",
          values: ["Go 単一バイナリ / CGI / 常駐サーバ", "PHP + DB サーバ", "ローカルで静的生成"],
        },
        {
          label: "配置",
          values: ["共用サーバ、VPS、Raspberry Pi", "PHP と MySQL 対応ホスト", "静的ホスト"],
        },
        {
          label: "更新方法",
          values: ["管理画面で即時更新", "管理画面で即時更新", "ファイル編集して再ビルド"],
        },
        {
          label: "依存",
          values: ["外部 DB サーバ不要、SQLite", "PHP、MySQL、プラグイン", "ビルド環境、テーマ"],
        },
        {
          label: "運用負荷",
          values: ["小さく保ちやすい", "更新と防御の継続が必要", "軽いが編集フローは割り切り"],
        },
      ],
    },
    quickStartSection: {
      eyebrow: "Quick start",
      title: "まずはローカルで。",
      steps: ["リポジトリを取得", "サーバを起動", "ブラウザで初回セットアップ"],
      code: "git clone git@github.com:serendipitynz/serenebach.git\ncd serenebach\ntask dev",
    },
    featuresSection: {
      eyebrow: "Why Serene Bach",
      title: "小さく置けて、ブラウザで書ける。",
    },
    features: [
      {
        title: "Serene Bach の資産を引き継ぐ",
        body:
          "Serene Bach v3 のテンプレート互換を重視し、昔からのデザイン資産と運用感を活かせます。",
      },
      {
        title: "単一バイナリ + SQLite で小さく運用",
        body:
          "Pure Go SQLite を同梱し、外部 DB サーバは不要。HTTP サーバと CGI の両対応で、小規模 VPS や共用サーバでも扱いやすい構成です。",
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
        "小さな VPS、Raspberry Pi、CGI 実行可能な共用サーバ、静的ホストまで、運用場所に合わせて選べます。管理画面で記事を書き、必要なタイミングで静的 rebuild する構成にも対応しています。",
    },
    migrationSection: {
      eyebrow: "Migration",
      title: "SB2 / SB3 からの移行。",
      body:
        "Perl 版 Serene Bach v2 のテキストベースデータ / v3 の SQLite データベースから記事を取り込み、テンプレート互換も重視しています。昔からのデザイン資産と運用感を、Go 版でも引き続き使えることを目指しています。",
    },
    safetySection: {
      eyebrow: "Data ownership",
      title: "データを自分の手元に置く。",
      points: [
        "記事、設定、分析データは SQLite とファイルに保存",
        "画像やテンプレートもサーバ上のデータとして管理",
        "外部サービスの都合に左右されにくいセルフホスト構成",
      ],
    },
    start: {
      eyebrow: "Get started",
      title: "README から始める。",
      code: "git clone git@github.com:serendipitynz/serenebach.git\ncd serenebach\ntask dev",
      github: "GitHub で見る",
    },
    footer: {
      github: "GitHub",
      license: "License",
      docs: "Docs",
    },
  },
  en: {
    meta: {
      title: "Serene Bach - Self-hosted weblog engine",
      description:
        "A self-hosted weblog engine that carries Serene Bach v3 forward with Go, SQLite, static rebuilds, and AI-assisted writing.",
    },
    nav: {
      compare: "Compare",
      features: "Feature",
      templates: "Templates",
      ai: "AI assist",
      deploy: "Deploy",
      news: "News",
      languageLabel: "Language switcher",
      menuLabel: "Open navigation menu",
    },
    hero: {
      eyebrow: "Self-hosted weblog engine",
      title: "A lighter path between WordPress and Hugo.",
      lead:
        "Serene Bach v4 is a Go weblog engine that runs as a single binary over CGI or HTTP. Write from the browser, keep SQLite on your server, and rebuild static HTML when your workflow calls for it.",
      proof: ["Single binary", "CGI support", "SQLite", "SB3 migration", "Static rebuilds"],
      primaryAction: "View on GitHub",
      secondaryAction: "Compare",
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
      "For people who want browser-based publishing without carrying a large CMS stack.",
      "It keeps the CGI-era ability to place your blog almost anywhere, with SQLite, static rebuilds, and AI integration added in.",
    ],
    comparisonSection: {
      eyebrow: "Positioning",
      title: "Choose by publishing workflow.",
      note: "Serene Bach is for personal blogs and small sites that want browser-based editing without carrying a large CMS stack.",
      columns: ["Serene Bach", "WordPress", "Hugo"],
      rows: [
        {
          label: "Runtime",
          values: ["Go single binary / CGI / HTTP", "PHP + database server", "Static generator"],
        },
        {
          label: "Placement",
          values: ["Shared host, VPS, Raspberry Pi", "PHP and MySQL hosting", "Static hosting"],
        },
        {
          label: "Updates",
          values: ["Publish from the admin UI", "Publish from the admin UI", "Edit files and rebuild"],
        },
        {
          label: "Dependencies",
          values: ["No external DB server, SQLite", "PHP, MySQL, plugins", "Build tools and themes"],
        },
        {
          label: "Operations",
          values: ["Small surface area", "Ongoing updates and hardening", "Light, file-based workflow"],
        },
      ],
    },
    quickStartSection: {
      eyebrow: "Quick start",
      title: "Run it locally first.",
      steps: ["Clone repository", "Start the server", "Finish setup in the browser"],
      code: "git clone https://github.com/serendipitynz/serenebach\ncd serenebach\ntask dev",
    },
    featuresSection: {
      eyebrow: "Why Serene Bach",
      title: "Small to place. Familiar to publish.",
    },
    features: [
      {
        title: "Bring Serene Bach assets forward",
        body:
          "Template compatibility with Serene Bach v3 is a core goal, so existing design assets and publishing habits can keep working.",
      },
      {
        title: "Run small with one binary and SQLite",
        body:
          "Pure Go SQLite is embedded, so there is no external database server to run. HTTP server mode and CGI support make it practical on a small VPS, a local box, or traditional shared hosting.",
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
        "Run it on a small VPS, Raspberry Pi, CGI-capable shared host, or static host. Write from the admin UI, then rebuild static HTML when your publishing workflow calls for it.",
    },
    migrationSection: {
      eyebrow: "Migration",
      title: "Carry SB3 assets forward.",
      body:
        "Import from a Perl-era Serene Bach 3 SQLite database and keep the familiar template model. The goal is to preserve old design assets and publishing habits while moving the runtime to Go.",
    },
    safetySection: {
      eyebrow: "Data ownership",
      title: "Keep your data close.",
      points: [
        "Entries, settings, and analytics live in SQLite and local files",
        "Images and templates remain server-side data you can back up",
        "A self-hosted setup that is less dependent on external platform decisions",
      ],
    },
    start: {
      eyebrow: "Get started",
      title: "Start with the README.",
      code: "git clone git@github.com:serendipitynz/serenebach.git\ncd serenebach\ntask dev",
      github: "View on GitHub",
    },
    footer: {
      github: "GitHub",
      license: "License",
      docs: "Docs",
    },
  },
};
