"use-strict";

const slider = function () {
  //Nextボタンの取得
  const next = document.querySelector("#js-next");

  //Prevボタンの取得
  const prev = document.querySelector("#js-prev");

  // slider(ul要素)の取得
  const slideGroup = document.querySelector("#js-slideGroup");

  // slider(li要素一覧)の取得
  const slideGroup_item = document.querySelectorAll(".js-slideItem");

  // liタグのwidthを取得
  const sliderwidth = document.querySelector(".js-slideItem");
  let width = sliderwidth.clientWidth;

  //スライドの数を取得
  const slideNumber = slideGroup_item.length;

  //最初のスライドのクローン
  const firstSlide1st = slideGroup_item[0].cloneNode(true);
  //最初から2番目のスライドのクローン
  const firstSlide2nd = slideGroup_item[1].cloneNode(true);
  //ラストスライドのクローン
  const lastSlide1st = slideGroup_item[slideNumber - 1].cloneNode(true);
  //最後から二番目のスライドのクローン
  const lastSlide2nd = slideGroup_item[slideNumber - 2].cloneNode(true);

  //クローンをスライドの前後に挿入
  slideGroup.append(firstSlide1st);
  slideGroup.append(firstSlide2nd);
  slideGroup.prepend(lastSlide1st);
  slideGroup.prepend(lastSlide2nd);

  // カウンターの設定
  //スライドの前に2枚増やしているので2を指定
  const init = 2;
  let counter = init;

  //タイマー
  let timer = 5;
  setInterval(() => {
    timer--;
  }, 1000);

  //スライド1枚目を中央にセット
  //ずらす幅
  const gap = 50;
  slideGroup.style.transform = "translateX(" + (-width * counter + gap) + "px)";

  const goNext = () => {
    //ボタンを押した直後自動送りを10秒無効化
    timer = 10;

    //ulのtransitionを0.1秒にする
    slideGroup.style.transition = ".1s";

    //カウントを1増やす
    counter++;

    //ulのスタイル変更(x方向に、-1スライドの幅XカウントPX)
    slideGroup.style.transform =
      "translateX(" + (-width * counter + gap) + "px)";

    //イベントリスナー追加(トランジション終了時)
    slideGroup.addEventListener("transitionend", () => {
      //カウントがスライド(ul)の数+初期値なら
      if (counter == slideGroup_item.length + init) {
        //巻き戻しはトランジション無し
        slideGroup.style.transition = "0s";

        //巻き戻し実行
        slideGroup.style.transform =
          "translateX(" + (-width * init + gap) + "px)";

        //カウントからスライド数分を減らす
        counter -= slideNumber;
      }
    });
  };

  // イベントリスナー (next)
  next.addEventListener("click", goNext);

  const goPrev = () => {
    //ボタンを押した直後自動送りを10秒無効化
    timer = 10;

    //ulのtransitionを0.1秒にする
    slideGroup.style.transition = ".1s";

    //カウントを1減らす
    counter--;

    //ulのスタイル変更(x方向に、1スライドの幅XカウントPX) (""+ - widthにしないとだめ)
    slideGroup.style.transform =
      "translateX(" + (-width * counter + gap) + "px)";

    //イベントリスナー追加(トランジション終了時)
    slideGroup.addEventListener("transitionend", () => {
      //カウントが初期位置より1つ前の時
      if (counter == init - 1) {
        //巻き戻しはトランジション無し
        slideGroup.style.transition = "0s";
        //巻き戻し実行
        slideGroup.style.transform =
          "translateX(" + (-width * (slideNumber + 1) + gap) + "px)";
        //カウントに、スライド数を引く
        counter += slideNumber;
      }
    });
  };
  // イベントリスナー (prev)
  prev.addEventListener("click", goPrev);

  //5秒ごとに次のスライド自動送り
  setInterval(() => {
    if (timer < 0) {
      goNext();
    }
  }, 5000);
};

slider();
