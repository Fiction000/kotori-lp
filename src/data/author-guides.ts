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
    "authorSlug": "natsume-soseki",
    "title": "夏目漱石は何から読む？ はじめての一冊を3作品から選ぶ",
    "lead": [
      "迷ったら、『坊っちゃん』をおすすめします。語り手の勢いある声に乗って読みたい人に向く一冊です。",
      "幻想的な場面を一つずつ味わいたいなら『夢十夜』、人と人の距離をゆっくり読みたいなら『こころ』もおすすめです。"
    ],
    "choices": [
      {
        "workID": "work-botchan",
        "anchor": "work-botchan",
        "label": "語りの勢いを追いたい"
      },
      {
        "workID": "work-yumejuya",
        "anchor": "work-yumejuya",
        "label": "幻想的な場面を一つずつ読みたい"
      },
      {
        "workID": "work-kokoro",
        "anchor": "work-kokoro",
        "label": "人と人の距離をゆっくり追いたい"
      }
    ],
    "works": [
      {
        "workID": "work-botchan",
        "anchor": "work-botchan",
        "heading": "語りの勢いを追いたい → 『坊っちゃん』",
        "paragraphs": [
          "『坊っちゃん』は、四国の中学校へ数学教師として赴任した語り手が、同僚や生徒と関わっていく物語です。「赤シャツ」や「山嵐」といった呼び名を手がかりに、人物同士のやりとりを追ってみてください。",
          "まずは、この人の言い分についていくつもりで読んでみてください。自分が納得できないことに腹を立てる語り手を前にして、どこまで同意するかを考えるのも、この作品の入口になります。"
        ]
      },
      {
        "workID": "work-yumejuya",
        "anchor": "work-yumejuya",
        "heading": "幻想的な場面を一つずつ読みたい → 『夢十夜』",
        "paragraphs": [
          "『夢十夜』は、第一夜から第十夜まで、十の夜からなる作品です。気になる一夜から読み始め、幻想的な場面を味わってみてください。",
          "意味を急いで一つに決めなくても大丈夫です。目に浮かんだ風景や、なぜか引っかかった場面を覚えておく。不思議な場面をそのまま味わってみてください。"
        ]
      },
      {
        "workID": "work-kokoro",
        "anchor": "work-kokoro",
        "heading": "人と人の距離をゆっくり追いたい → 『こころ』",
        "paragraphs": [
          "『こころ』では、「私」が先生と出会い、その家を訪ねるようになります。先生の言葉や態度を追いながら、人と親しくなるときにも残る距離を読みたい人に向く一冊です。",
          "学校で一部を読んだことがあるなら、冒頭から戻って「私」が先生をどう見ているかをたどってみてください。"
        ]
      }
    ],
    "readingOrder": {
      "heading": "3冊続けて読むなら、この順番も一案です",
      "paragraphs": [
        {
          "before": "順番に迷うなら、",
          "emphasis": "『坊っちゃん』→『夢十夜』→『こころ』",
          "after": "を提案します。語り手の声から入り、幻想的な場面を挟み、最後に人間関係をじっくり追う。3つの入口の違いを比べながら読める順番です。"
        }
      ]
    },
    "appCTA": {
      "heading": "コトリで読みたい方へ",
      "body": "一冊を選んだら、App Storeでコトリの情報をご覧ください。"
    },
    "sources": {
      "heading": "作品本文",
      "bodyBeforeLinks": "公開テキストは青空文庫で読めます。",
      "bodyAfterLinks": "。ここでの選び方と読む順番は、コトリの編集上の提案です。"
    }
  }
];

export const authorGuideForSlug = (slug: string): AuthorGuide | undefined =>
  authorGuides.find((guide) => guide.authorSlug === slug);
