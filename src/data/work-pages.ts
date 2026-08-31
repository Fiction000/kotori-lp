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
  authorAliases: string[];
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
  relatedIntro: string;
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
    authorAliases: [],
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
    relatedIntro: '夏目漱石の作品を続けて読むと、語り手の距離や時代の空気が作品ごとに異なることに気づきます。',
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
 {
  status: 'ready',
  bookID: '043737',
  slug: 'ginga-tetsudo-no-yoru',
  weeklyID: 'ginga-tetsudo-no-yoru',
  title: '銀河鉄道の夜',
  titleDisplay: '『銀河鉄道の夜』',
  author: '宮沢賢治',
  authorAliases: [],
  authorAozoraID: '000081',
  aliases: [],
  image: '/images/weekly/ginga-tetsudo-no-yoru.webp',
  imageAlt: '星空を走る銀河鉄道を描いた『銀河鉄道の夜』のイメージ',
  seo: {
   title: '『銀河鉄道の夜』宮沢賢治｜あらすじ・読みどころ｜コトリ',
   description: '宮沢賢治『銀河鉄道の夜』のあらすじ、読みどころ、青空文庫の作品情報を紹介。幻想的な旅をたどりながら、物語を味わう手がかりをまとめました。',
   socialTitle: '『銀河鉄道の夜』を読む前に｜宮沢賢治',
   socialDescription: '幻想的な列車の旅をたどる『銀河鉄道の夜』。あらすじと読みどころを、ネタバレを抑えて紹介します。',
  },
  lead: '夜空を走る列車に乗り、少年たちが不思議な旅を続けていく物語です。幻想的な風景と、旅の中で交わされる言葉をゆっくり味わえます。',
  synopsis: [
   '孤独を抱える少年ジョバンニは、星祭りの夜、気づくと銀河を走る列車に乗っています。隣には友人のカムパネルラが座り、二人はさまざまな乗客と出会いながら旅を続けます。',
   '窓の外に現れるのは、美しくもどこか不思議な銀河の風景です。移り変わる景色や乗客との会話を通して、二人の旅が静かに進んでいきます。',
  ],
  metadata: [
   { label: '作者', value: '宮沢賢治' },
   { label: '青空文庫 作品ID', value: '043737' },
   { label: '表記', value: '新字新仮名' },
   { label: '底本', value: '角川文庫・角川書店（1969年改版）' },
  ],
  readingPoints: [
   { title: '銀河をめぐる風景', body: '星座や川、光の描写が次々と現れます。筋を急がず、車窓から景色を眺めるように読むと、この作品ならではの時間が立ち上がります。' },
   { title: '旅の途中の出会い', body: '列車に乗り合わせる人々の言葉やふるまいには、それぞれ異なる願いが表れます。短い場面同士の響き合いに注目してみてください。' },
   { title: '言葉と沈黙の間', body: '旅の会話には、すぐには意味を決められない言葉や、ふと訪れる沈黙があります。説明しきられない余韻にも耳を澄ませてみてください。' },
  ],
  sources: {
   cardURL: 'https://www.aozora.gr.jp/cards/000081/card43737.html',
   textURL: 'https://www.aozora.gr.jp/cards/000081/files/43737_19215.html',
  },
  relatedIntro: '宮沢賢治の作品を、もう一篇。',
  relatedWorks: [
   { bookID: '000473', title: 'よだかの星' },
   { bookID: '001927', title: '注文の多い料理店' },
  ],
  faq: [
   { question: '『銀河鉄道の夜』はどんな作品ですか？', answer: '少年ジョバンニが友人カムパネルラと銀河を走る列車に乗り、不思議な旅をする物語です。幻想的な風景と、旅の途中で交わされる会話が印象に残ります。' },
   { question: '青空文庫で読めますか？', answer: 'はい。このページの「青空文庫で読む」から、確認済みの作品カードとXHTML版を開けます。このページでは角川文庫版を底本とするテキストを案内しています。青空文庫には新潮文庫版を底本とし、本文に異同がある別版も収録されています。' },
  ],
 },
 {
  status: 'ready',
  bookID: '000799',
  slug: 'yumejuya',
  weeklyID: 'yumejuya',
  title: '夢十夜',
  titleDisplay: '『夢十夜』',
  author: '夏目漱石',
  authorAliases: [],
  authorAozoraID: '000148',
  aliases: [],
  image: '/images/weekly/yumejuya.webp',
  imageAlt: '月明かりに浮かぶ幻想的な情景を描いた『夢十夜』のイメージ',
  seo: {
   title: '夏目漱石『夢十夜』あらすじ・読みどころ・作品情報',
   description: '夏目漱石『夢十夜』のあらすじ、読みどころ、青空文庫の作品情報を紹介。十の夢をどう味わうか、ネタバレを抑えて案内します。',
   socialTitle: '『夢十夜』を読む前に｜夏目漱石',
   socialDescription: '十の「夜」からなる夏目漱石の作品。あらすじと読みどころを、ネタバレを抑えて紹介します。',
  },
  lead: '「第一夜」から「第十夜」まで、時代も人物も異なる十の夢を並べた作品です。短い場面の一つひとつに、現実からわずかにずれた感触が残ります。',
  synopsis: [
   '十の「夜」には、それぞれ異なる時間と場所が現れます。場面が変わるたびに登場人物や語りの距離も移り、一つの夢から次の夢へと進んでいきます。',
   '夜と夜をつなぐ一つの筋はありません。理由の説明されない出来事や、ふいに途切れる情景が、目覚めたあとにも残る夢のような余韻を生みます。',
  ],
  metadata: [
   { label: '作者', value: '夏目漱石' },
   { label: '青空文庫 作品ID', value: '000799' },
   { label: '表記', value: '新字新仮名' },
   { label: '構成', value: '第一夜から第十夜までの十篇' },
  ],
  readingPoints: [
   { title: '一夜ずつ、独立した場面として読む', body: '十の「夜」は、まず一夜ずつ開いて読めます。前の夜の答えを探すよりも、その場面に置かれた時間や距離の感覚を味わうと、作品の手触りが見えてきます。' },
   { title: '説明されない余白', body: '夢の出来事には、理由や結末が明かされないものもあります。意味を急いで決めず、強く残った情景や言葉から読み進めるのも一つの楽しみ方です。' },
   { title: '反復する感触', body: '待つこと、恐れること、見つめること。似た感触が別の姿で現れるため、読み終えたあとに夜同士を比べると新しいつながりが見つかります。' },
  ],
  sources: {
   cardURL: 'https://www.aozora.gr.jp/cards/000148/card799.html',
   textURL: 'https://www.aozora.gr.jp/cards/000148/files/799_14972.html',
  },
  relatedIntro: '夏目漱石の作品を、もう一冊。',
  relatedWorks: [
   { bookID: '000773', title: 'こころ' },
   { bookID: '000752', title: '坊っちゃん' },
  ],
  faq: [
   { question: '『夢十夜』はどんな構成ですか？', answer: '「第一夜」から「第十夜」まで、十の独立した夢のような物語で構成されています。舞台や登場人物は夜ごとに変わります。' },
   { question: '「こんな夢を見た。」で始まる作品ですか？', answer: 'この言葉は作品を象徴する書き出しですが、十篇すべてが同じ一文で始まるわけではありません。青空文庫版では四つの夜に使われています。' },
  ],
 },
 {
  status: 'ready',
  bookID: '000128',
  slug: 'rashomon',
  weeklyID: 'rashomon',
  title: '羅生門',
  titleDisplay: '『羅生門』',
  author: '芥川龍之介',
  authorAliases: ['芥川竜之介'],
  authorAozoraID: '000879',
  aliases: [],
  image: '/images/weekly/rashomon.webp',
  imageAlt: '雨の羅生門を描いた芥川龍之介『羅生門』のイメージ',
  seo: {
   title: '『羅生門』芥川龍之介｜あらすじ・読みどころ｜コトリ',
   description: '芥川龍之介『羅生門』のあらすじ、読みどころ、青空文庫の作品情報を紹介。荒廃した都と行き場を失った下人を描く短編を、ネタバレを抑えて案内します。',
   socialTitle: '『羅生門』を読む前に｜芥川龍之介',
   socialDescription: '荒廃した都と一人の下人を描く短編『羅生門』。あらすじと読みどころを紹介します。',
  },
  lead: '荒廃した京都の羅生門で、一人の下人が雨宿りをしています。夕暮れから夜へ移る短い時間を、重い空気と細やかな心理描写でつないだ短編です。',
  synopsis: [
   '主人から暇を出された下人は、行き場を失い、羅生門の下で途方に暮れています。都は災いが続いて荒れ、人影もありません。',
   '雨は降り続き、日は暮れていきます。荒れた門の細部と下人の不安が交互に描かれ、静かな場面に少しずつ緊張が満ちていきます。',
  ],
  metadata: [
   { label: '作者', value: '芥川龍之介' },
   { label: '青空文庫 作品ID', value: '000128' },
   { label: '表記', value: '旧字旧仮名' },
   { label: '初出', value: '1915年11月' },
  ],
  readingPoints: [
   { title: '揺れ動く下人の心', body: '下人の考えは、雨や時刻、周囲の様子とともに細かく移り変わります。外の景色と内面の描写がどう重なるかを追うと、物語の緊張が伝わります。' },
   { title: '荒廃した都の描写', body: '雨、夕暮れ、崩れた門。冒頭の景色は、下人が置かれた不安定な状況と重なります。細部の描写が生む空気にも注目してみてください。' },
   { title: '語り手との距離', body: '語り手は下人の心に近づきながら、ときに少し離れた位置からその姿を捉えます。視点の距離が変わる箇所に注目すると、短編の運びがより鮮明になります。' },
  ],
  sources: {
   cardURL: 'https://www.aozora.gr.jp/cards/000879/card128.html',
   textURL: 'https://www.aozora.gr.jp/cards/000879/files/128_15261.html',
  },
  relatedIntro: '芥川龍之介の作品を、もう一篇。',
  relatedWorks: [
   { bookID: '000092', title: '蜘蛛の糸' },
  ],
  faq: [
   { question: '『羅生門』はどのくらいの長さですか？', answer: '比較的短い作品です。一つの場面と下人の心理の変化を中心に進むため、芥川龍之介を初めて読む方にも取り組みやすい短編です。' },
   { question: '黒澤明の映画『羅生門』と同じ物語ですか？', answer: '同じではありません。映画は主に芥川龍之介の『藪の中』をもとにしつつ、『羅生門』の舞台や要素を組み合わせています。' },
  ],
 },
 {
  status: 'ready',
  bookID: '000752',
  slug: 'botchan',
  weeklyID: 'botchan',
  title: '坊っちゃん',
  titleDisplay: '『坊っちゃん』',
  author: '夏目漱石',
  authorAliases: [],
  authorAozoraID: '000148',
  aliases: [],
  image: '/images/weekly/botchan.webp',
  imageAlt: '夏目漱石『坊っちゃん』をモチーフにしたコトリの選書イラスト',
  seo: {
   title: '『坊っちゃん』夏目漱石｜あらすじ・読みどころ｜コトリ',
   description: '夏目漱石『坊っちゃん』の結末に触れないあらすじと読みどころ。まっすぐな語り手が学校で出会う人々を描く物語を、青空文庫の作品情報とともに紹介します。',
   socialTitle: '夏目漱石『坊っちゃん』｜あらすじ・読みどころ',
   socialDescription: '夏目漱石『坊っちゃん』のあらすじと読みどころ。結末に触れない案内と、青空文庫・Kotoriへの入口。',
  },
  lead: '夏目漱石『坊っちゃん』は、自分の納得を簡単には曲げない語り手が、新しく勤め始めた学校で人々と出会う物語です。歯切れのよい一人称の声を楽しみながら、結末に触れずに作品の輪郭と読む手がかりを紹介します。',
  synopsis: [
   '新しい職場へ赴任した語り手は、そこで出会う人たちの言葉や振る舞いに、次々と反応していきます。周囲の空気を読んで収めるより、自分が変だと思ったことを見過ごせないところに、この人物らしさがあります。',
   '『坊っちゃん』は、語り手の勢いある視線を通して、人間関係の可笑しさやややこしさを描く作品です。人物をどう呼び、どう受け取るかという語りの調子にも目を向けると、読書のテンポがいっそう鮮明になります。',
  ],
  metadata: [
   { label: '作者', value: '夏目漱石' },
   { label: '青空文庫 作品ID', value: '000752' },
   { label: '表記', value: '新字新仮名' },
   { label: '初出', value: '「ホトトギス」1906（明治39）年4月' },
   { label: '底本', value: '『ちくま日本文学全集 夏目漱石』／筑摩書房' },
  ],
  readingPoints: [
   { title: '語り手の勢いをそのまま追う', body: '『坊っちゃん』は、判断の早い語り手の声が作品を前へ進めます。正しいかどうかをすぐに決める前に、まずはその語りの速さや言い切り方を味わうと、作品の面白さが立ち上がります。' },
   { title: '人物の呼び方に注目する', body: '語り手は、出会った人々を自分なりの見方で受け取ります。誰をどう呼び、どんなところに引っかかるのかをたどると、人間関係の距離や可笑しさが見えてきます。' },
   { title: 'まっすぐさの揺れを読む', body: '納得できないことを見過ごせない態度は、いつも簡単な答えにつながるわけではありません。語り手の率直さが周囲とどうぶつかるかを見ながら読むと、軽やかな語りの奥行きも感じられます。' },
  ],
  sources: {
   cardURL: 'https://www.aozora.gr.jp/cards/000148/card752.html',
   textURL: 'https://www.aozora.gr.jp/cards/000148/files/752_14964.html',
  },
  relatedIntro: '夏目漱石の作品を続けて読むと、語り手の声の近さや、人との距離の描き方が作品ごとに異なることに気づきます。',
  relatedWorks: [
   { bookID: '000773', title: 'こころ' },
   { bookID: '000799', title: '夢十夜' },
  ],
  faq: [
   { question: '『坊っちゃん』のあらすじは？', answer: '新しく勤め始めた学校で、率直な語り手が周囲の人々と関わっていく物語です。このページのあらすじは、終盤の展開や結末には触れていません。' },
   { question: '『坊っちゃん』は青空文庫で読めますか？', answer: 'はい。青空文庫で公開テキストを読めます。このページの「青空文庫で読む」から、確認済みの作品カードとXHTML版へ進めます。' },
  ],
 },
];

export function readyWorkPages(): WorkPage[] {
  return workPages.filter((work) => work.status === 'ready');
}

export function workPagePath(work: Pick<WorkPage, 'bookID' | 'slug'>): string {
  return `/works/${work.bookID}/${work.slug}/`;
}

export function readyWorkPageByWeeklyID(weeklyID: string): WorkPage | undefined {
  return readyWorkPages().find((work) => work.weeklyID === weeklyID);
}

export function readyWorkPageByBookID(bookID: string): WorkPage | undefined {
  return readyWorkPages().find((work) => work.bookID === bookID);
}

export function workPagePathForWeeklyID(weeklyID: string): string | undefined {
  const work = readyWorkPageByWeeklyID(weeklyID);
  return work ? workPagePath(work) : undefined;
}

export function workPagePathForBookID(bookID: string): string | undefined {
  const work = readyWorkPageByBookID(bookID);
  return work ? workPagePath(work) : undefined;
}
