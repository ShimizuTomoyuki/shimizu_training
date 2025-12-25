//各IDの取得//
const parentResult = document.getElementById("parentResult");
const parentHandName = document.getElementById("parentHandName");
const parentCards = document.getElementById("parentCards");
const startgameBtm = document.getElementById("startGameBtn");
const childCards = document.getElementById("childCards");
const childHandName = document.getElementById("childHandName");
const childResult = document.getElementById("childResult");

//カード作る//
//絵//
const suit = ["S", "C", "H", "D"];
//数//
const cardNum = [
  "TW",
  "TH",
  "FO",
  "FI",
  "SI",
  "SE",
  "EI",
  "NI",
  "T",
  "J",
  "Q",
  "K",
  "A",
];
//カードイメージ(無料画像)//
const cardURL =
  "https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust";

const cardImages = {
  "S-TW": "2.png",
  "S-TH": "3.png",
  "S-FO": "4.png",
  "S-FI": "5.png",
  "S-SI": "6.png",
  "S-SE": "7.png",
  "S-EI": "8.png",
  "S-NI": "9.png",
  "S-T": "10.png",
  "S-J": "11.png",
  "S-Q": "12.png",
  "S-K": "13.png",
  "S-A": "1.png",
  "H-TW": "41.png",
  "H-TH": "42.png",
  "H-FO": "43.png",
  "H-FI": "44.png",
  "H-SI": "45.png",
  "H-SE": "46.png",
  "H-EI": "47.png",
  "H-NI": "48.png",
  "H-T": "49.png",
  "H-J": "50.png",
  "H-Q": "51.png",
  "H-K": "52.png",
  "H-A": "40.png",
  "D-TW": "28.png",
  "D-TH": "29.png",
  "D-FO": "30.png",
  "D-FI": "31.png",
  "D-SI": "32.png",
  "D-SE": "33.png",
  "D-EI": "34.png",
  "D-NI": "35.png",
  "D-T": "36.png",
  "D-J": "37.png",
  "D-Q": "38.png",
  "D-K": "39.png",
  "D-A": "27.png",
  "C-TW": "15.png",
  "C-TH": "16.png",
  "C-FO": "17.png",
  "C-FI": "18.png",
  "C-SI": "19.png",
  "C-SE": "20.png",
  "C-EI": "21.png",
  "C-NI": "22.png",
  "C-T": "23.png",
  "C-J": "24.png",
  "C-Q": "25.png",
  "C-K": "26.png",
  "C-A": "14.png",
};

//役の強さを決める//
const handrRank = {
  rf: 9,
  sf: 8,
  fc: 7,
  fh: 6,
  f: 5,
  s: 4,
  soa: 3,
  tp: 2,
  op: 1,
  hc: 0,
};
const handdisplay = {
  rf: "ロイヤルフラッシュ",
  sf: "ストレートフラッシュ",
  fc: "フォーカード",
  fh: "フルハウス",
  f: "フラッシュ",
  s: "ストレート",
  soa: "スリーオブアカインド",
  tp: "ツーペア",
  op: "ワンペア",
  hc: "ハイカード",
};

//カード自体の強さ決めないとだった//
const cardRank = {
  TW: 2,
  TH: 3,
  FO: 4,
  FI: 5,
  SI: 6,
  SE: 7,
  EI: 8,
  NI: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

//上記の情報持ったカードデッキを作る//
const createDeck = () => {
  const deck = []; // 箱用意
  //マーク (suit)//
  for (let i = 0; i < suit.length; i++) {
    const currentSuit = suit[i];
    //数字 (rank)//
    for (let j = 0; j < cardNum.length; j++) {
      const currentRank = cardNum[j];
      deck.push({
        rank: currentRank,
        suit: currentSuit,
        value: cardRank[currentRank],
      });
    }
  }
  return deck;
};

//ランダム（シャッフル）//
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    //配列の最後から１減らしながらループ//
    const j = Math.floor(Math.random() * (i + 1)); //iから0までの範囲からランダムに//
    [deck[i], deck[j]] = [deck[j], deck[i]]; //i番目とj番目をこうかん//
  }
}

//役を定義//
//ロイヤルフラッシュとストレートフラッシュ作るのにストレートとフラッシュを作る//
//フラッシュ（全部が同じマーク（suit）)//
const isFlush = (hand) => {
  return hand.every((card) => card.suit === hand[0].suit); //全部のカードが最初のマークと同じか//
};
//ストレート//
const isStraight = (hand) => {
  const ranks = hand.map((card) => card.value).sort((a, b) => b - a); //順番に並べて//
  //隣との差が１かどうか//
  const isNormalStraight = ranks.every((rank, index) => {
    if (index === 0) return true;
    //前ー今＝１//
    return ranks[index - 1] - rank === 1;
  });
  return isNormalStraight;
};

//ペアの判定//役判定//

function determineHand(hand) {
  const isF = isFlush(hand);
  const isS = isStraight(hand);

  const ranks = hand.map((card) => card.value).sort((a, b) => b - a);

  const rankCounts = {};
  hand.forEach((card) => {
    rankCounts[card.value] = (rankCounts[card.value] || 0) + 1;
  });
  const counts = Object.values(rankCounts).sort((a, b) => b - a); //並び替えて//
  //一致数で//
  const hasFour = counts[0] === 4;
  const hasThree = counts[0] === 3;
  const hasPair = counts.includes(2);
  //役の強さの順にチェック//
  if (isS && isF && ranks[0] === 14 && ranks[4] === 10) {
    return "rf";
  } else if (isS && isF) {
    return "sf";
  } else if (hasFour) {
    return "fc";
  } else if (hasThree && hasPair) {
    return "fh";
  } else if (isF) {
    return "f";
  } else if (isS) {
    return "s";
  } else if (hasThree) {
    return "soa";
  } else if (counts[0] === 2 && counts[1] === 2) {
    return "tp";
  } else if (counts[0] === 2) {
    return "op";
  } else {
    return "hc";
  }
}

//勝敗決める//
const determineWinner = (handNameP, handNameC, handP, handC) => {
  const rankP = handrRank[handNameP];
  const rankC = handrRank[handNameC];

  //役の強さで比較//
  if (rankP > rankC) return { parent: "勝ち", child: "負け" };
  if (rankC > rankP) return { parent: "負け", child: "勝ち" };

  if (handNameP !== "hc") return { parent: "引分", child: "引分" };

  //カード//自体の強さ比較（役が同じ時）//
  const valuesP = handP.map((c) => c.value).sort((a, b) => b - a); //並び替えて//
  const valuesC = handC.map((c) => c.value).sort((a, b) => b - a);

  for (let i = 0; i < 5; i++) {
    //1枚ずつ比較//
    if (valuesP[i] > valuesC[i]) return { parent: "勝ち", child: "負け" };
    if (valuesC[i] > valuesP[i]) return { parent: "負け", child: "勝ち" };
  }
  return { parent: "引分", child: "引分" };
};

//表示させたい//
const displayCards = (cards, container) => {
  container.innerHTML = "";
  cards.forEach((card) => {
    //カード1枚ずつ取り出して//
    const cardDiv = document.createElement("div");
    const key = `${card.suit}-${card.rank}`; //URL探すよう//

    cardDiv.className = "card";

    const cardImageUrl = cardURL + cardImages[key];

    if (cardImages[key]) {
      cardDiv.style.backgroundImage = `url('${cardImageUrl}')`;
    }
    container.appendChild(cardDiv);
  });
};

const resetDisplay = () => {
  const initialCardHTML = '<div class="card">カード</div>';
  parentCards.innerHTML = Array(5).fill(initialCardHTML).join("");
  childCards.innerHTML = Array(5).fill(initialCardHTML).join("");
};

//ゲームスタート//
const startGame = () => {
  const deck = createDeck();
  shuffleDeck(deck); // デッキをシャッフル

  const parentHand = deck.slice(0, 5); //5枚ずつ配る//
  const childHand = deck.slice(5, 10);

  const parentHandNameStr = determineHand(parentHand); //役判定//
  const childHandNameStr = determineHand(childHand);

  const displayP = handdisplay[parentHandNameStr] || parentHandNameStr;
  const displayC = handdisplay[childHandNameStr] || childHandNameStr;
  //勝敗判定//
  const results = determineWinner(
    parentHandNameStr,
    childHandNameStr,
    parentHand,
    childHand
  );
  //表示//
  displayCards(parentHand, parentCards);
  displayCards(childHand, childCards);

  parentHandName.textContent = `役: ${displayP}`;
  childHandName.textContent = `役: ${displayC}`;

  parentResult.textContent = `結果: ${results.parent}`;
  childResult.textContent = `結果: ${results.child}`;
};

startgameBtm.addEventListener("click", startGame);

resetDisplay();
