export type WorkPageStatus = 'draft' | 'reviewed' | 'ready';

export type WorkMetadata = {
  label: string;
  value: string;
};

export type ReadingPoint = {
  title: string;
  body: string;
};

export type RelatedWork = {
  bookID: string;
  title: string;
};

export type WorkFAQ = {
  question: string;
  answer: string;
};

export type WorkPage = {
  status: WorkPageStatus;
  bookID: string;
  slug: string;
  weeklyID: string;
  title: string;
  titleDisplay: string;
  author: string;
  authorAozoraID: string;
  aliases: string[];
  image: string;
  imageAlt: string;
  seo: {
    title: string;
    description: string;
    socialTitle: string;
    socialDescription: string;
  };
  lead: string;
  synopsis: string[];
  metadata: WorkMetadata[];
  readingPoints: ReadingPoint[];
  sources: {
    cardURL: string;
    textURL: string;
  };
  relatedWorks: RelatedWork[];
  faq: WorkFAQ[];
};

export const workPages: WorkPage[] = [
  {
    status: 'ready',
    bookID: '000773',
    slug: 'kokoro',
    weeklyID: 'kokoro',
    title: 'こころ',
    titleDisplay: '『こころ』',
    author: '夏目漱石',
    authorAozoraID: '000148',
    aliases: ['こゝろ'],
    image: '/images/weekly/kokoro.webp',
    imageAlt: '夏目漱石『こころ』をモチーフにしたコトリの選書イラスト',
    seo: {
      title: '『こころ』夏目漱石｜あらすじ・読みどころ｜コトリ',
      description: '夏目漱石『こころ』の結末に触れないあらすじと読みどころ。確認済みの青空文庫公開テキストと、Kotoriで縦書きで読むための入口を案内します。',
      socialTitle: '夏目漱石『こころ』｜あらすじ・読みどころ',
      socialDescription: '「先生」と「私」の関係を起点に、孤独と語られないものを見つめる長編。結末に触れない案内と、青空文庫・Kotoriへの入口。',
    },
    lead: '夏目漱石『こころ』は、「先生」と「私」の出会いから始まる長編です。明治の終わりにある孤独や沈黙を、急がずたどるための入口として。結末に触れずに、作品の輪郭と読む手がかりを紹介します。',
    synopsis: [
      '海辺で出会った「私」は、「先生」と呼ぶ人物に惹かれ、往来を重ねていきます。近づくほどに見えてくるのは、先生の静かな孤立と、簡単には語られない過去の気配です。',
      '『こころ』は、二人の距離を追いながら、人が何を抱え、何を言葉にできないまま生きるのかを問いかけます。結末を急がず、人物の言葉と沈黙のあいだを読む作品です。',
    ],
    metadata: [
      { label: '作者', value: '夏目漱石' },
      { label: '青空文庫 作品ID', value: '000773' },
      { label: '表記', value: '新字新仮名' },
      { label: '初出', value: '1914年4月〜8月『朝日新聞』連載' },
      { label: '底本', value: '『こころ』集英社文庫／集英社' },
      { label: '入力', value: '1995年10刷' },
      { label: '校正', value: '1996年14刷' },
      { label: '別表記', value: 'こゝろ' },
    ],
    readingPoints: [
      {
        title: '「先生」と「私」の距離を読む',
        body: 'この作品では、親しさがそのまま理解にはなりません。「私」が先生に近づく過程を追うと、二人の関係のなかにある距離が、少しずつ輪郭を持ちはじめます。',
      },
      {
        title: '語られないものに耳を澄ます',
        body: '『こころ』の重さは、大きな出来事だけで決まりません。ためらい、沈黙、言い切られない言葉にも目を向けると、人物たちの孤独がより近く感じられます。',
      },
      {
        title: '明治の終わりを背景として読む',
        body: '時代の節目に置かれた人々の感覚も、この作品の静かな緊張を形づくっています。すぐに答えを決めず、ひとりで抱えることの重さを考えながら読むのが似合います。',
      },
    ],
    sources: {
      cardURL: 'https://www.aozora.gr.jp/cards/000148/card773.html',
      textURL: 'https://www.aozora.gr.jp/cards/000148/files/773_14560.html',
    },
    relatedWorks: [
      { bookID: '000752', title: '坊っちゃん' },
      { bookID: '000789', title: '吾輩は猫である' },
      { bookID: '056143', title: 'それから' },
    ],
    faq: [
      {
        question: '『こころ』のあらすじは？',
        answer: '「私」と「先生」の出会いと交流を起点に、孤独や、語られない過去の重さを描く長編です。このページのあらすじは結末に触れていません。',
      },
      {
        question: '『こころ』は青空文庫で読めますか？',
        answer: 'はい。確認済みの青空文庫作品カードとXHTML版へのリンクを、このページの「青空文庫で読む」に掲載しています。',
      },
    ],
  },
];

export function readyWorkPages(): WorkPage[] {
  return workPages.filter((work) => work.status === 'ready');
}

export function workPagePath(work: Pick<WorkPage, 'bookID' | 'slug'>): string {
  return `/works/${work.bookID}/${work.slug}/`;
}
