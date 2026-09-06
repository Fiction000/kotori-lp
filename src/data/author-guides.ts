export type AuthorGuideChoice = {
  workID: string;
  anchor: string;
  label: string;
};

export type AuthorGuideWork = {
  workID: string;
  anchor: string;
  heading: string;
  paragraphs: readonly string[];
  linkLabel: string;
};

export type AuthorGuideParagraph =
  | { text: string }
  | { before: string; emphasis: string; after: string };

export type AuthorGuide = {
  authorSlug: string;
  title: string;
  lead: readonly string[];
  choices: readonly AuthorGuideChoice[];
  works: readonly AuthorGuideWork[];
  readingOrder: {
    heading: string;
    paragraphs: readonly AuthorGuideParagraph[];
  };
  appCTA: {
    heading: string;
    body: string;
  };
  sources: {
    heading: string;
    bodyBeforeLinks: string;
    bodyAfterLinks: string;
  };
};

export const authorGuides: readonly AuthorGuide[] = [
  {
    authorSlug: 'natsume-soseki',
    title: '夏目漱石は何から読む？ はじめての一冊を3作品から選ぶ',
    lead: [
      '初めて漱石を読むなら、『坊っちゃん』をおすすめします。腹を立てたり、言い返したりする主人公の語りに勢いがあり、登場人物のやりとりを追って読める一冊です。',
      '少しずつ試したい人には『夢十夜』、人と人の距離をじっくり読みたい人には『こころ』も向いています。今の気分に近い入口を選んでみてください。',
    ],
    choices: [
      { workID: 'work-botchan', anchor: 'work-botchan', label: '歯切れのよい語りを楽しみたい' },
      { workID: 'work-yumejuya', anchor: 'work-yumejuya', label: '短い話を一つずつ読みたい' },
      { workID: 'work-kokoro', anchor: 'work-kokoro', label: '人と人の距離をじっくり読みたい' },
    ],
    works: [
      {
        workID: 'work-botchan',
        anchor: 'work-botchan',
        heading: '迷ったら『坊っちゃん』。主人公の語りに乗って読む',
        paragraphs: [
          '四国の学校に数学教師として赴任した主人公が、同僚や生徒と衝突する物語です。「赤シャツ」「山嵐」といった呼び名には、相手をどう見ているかがにじみます。',
          '主人公は、自分が納得できないことにすぐ腹を立てます。その歯切れのよさに笑いながら、「この人の言い分をどこまで信じようか」と考える読み方もできます。難しい背景知識を先にそろえなくても、まずはこの声についていくと入りやすいと思います。',
        ],
        linkLabel: '『坊っちゃん』のあらすじと読みどころを読む',
      },
      {
        workID: 'work-yumejuya',
        anchor: 'work-yumejuya',
        heading: '『夢十夜』は、一つの夢だけ読んで閉じてもいい',
        paragraphs: [
          '『夢十夜』には、第一夜から第十夜まで、十の短い話が収められています。まとまった読書時間を取りにくい日にも、一話で区切れます。',
          'ただ、短くても不思議な場面は残ります。「これは何を意味するのだろう」と考え込むところもあるはずです。最初から一つの答えを出そうとせず、目に浮かんだ風景や気になった場面を覚えておくくらいで読み進めてみてください。',
          '一冊を通して読む前に、まず第一夜を試す。その景色が気になったら、次の夜へ進む。そんな入口を選べる作品です。',
        ],
        linkLabel: '『夢十夜』のあらすじと読みどころを読む',
      },
      {
        workID: 'work-kokoro',
        anchor: 'work-kokoro',
        heading: '『こころ』は、「先生」との距離をゆっくり追う',
        paragraphs: [
          '『こころ』では、「私」が先生と知り合い、訪ねるうちにその人をもっと知りたいと思うようになります。先生の言葉や態度を追いながら、人と親しくなるときに残る距離をじっくり読みたい人に向く一冊です。',
          '「私」が先生をどう見ているかを、出会いの場面から追ってみてください。学校で一部分を読んだことがある人も、冒頭から読むと、先生との出会いや会話をたどれます。',
        ],
        linkLabel: '『こころ』のあらすじと読みどころを読む',
      },
    ],
    readingOrder: {
      heading: '三冊読むなら、『坊っちゃん』から始める順番を',
      paragraphs: [
        { before: '順番に迷うなら、', emphasis: '『坊っちゃん』→『夢十夜』→『こころ』', after: 'を提案します。主人公の勢いある語りから、夢の不思議な場面へ。最後に、人間関係を長く追う一冊へ進むと、漱石の書き方の違いを味わえます。' },
        { text: '『夢十夜』の第一夜が気になれば、そこから始めて大丈夫です。今読みたい一冊を選んでください。' },
      ],
    },
    appCTA: {
      heading: 'iPhoneやiPadで読みたい方へ',
      body: 'Kotoriは青空文庫を縦書きで読めるアプリです。作品案内で一冊を選んだら、アプリの情報もご覧ください。',
    },
    sources: {
      heading: '作品本文',
      bodyBeforeLinks: '紹介は青空文庫の',
      bodyAfterLinks: 'を参照しています。選び方と読む順番は、このページでの提案です。',
    },
  },
];

export const authorGuideForSlug = (slug: string): AuthorGuide | undefined =>
  authorGuides.find((guide) => guide.authorSlug === slug);
