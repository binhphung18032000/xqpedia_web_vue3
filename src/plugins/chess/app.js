import * as notify from "@/plugins/chess/notify";
import Board from "@/plugins/chess/board";
import axios from "axios";

function XiangQi() {
  this.elGame = document.getElementById("xiangqi_game");
  this.elBoard = document.getElementById("board");
  this.elSndCapture = document.getElementById("sndCapture");
  this.elSndCheck = document.getElementById("sndCheck");
  this.elSndMove = document.getElementById("sndMove");
  this.winCallback = null;
  this.loseCallback = null;
  this.drawCallback = null;
  this.firstMoveCallback = null;
  this.level = 0;
  this.current_level_move = 0;
  this.startFen = "";

  this.cndbMoves = [
    [0], // beginner
    [0, 0, 1], // semi
    [0, 1, 1], // pro
    [1], // master
  ];
}

XiangQi.prototype.init = function (computer = true, skill = 0, cnDBlevel = 0) {
  this.board.animated = 1;
  let searchLevel = 16;
  // if (skill > 0){
  //   searchLevel = 24;
  // }
  this.board.setSearch(searchLevel);
  this.board.millis = Math.pow(10, skill + 1);
  this.level = parseInt(cnDBlevel);

  if (computer) {
    // vs. computer
    this.board.response();
  }

  let self = this;
  let onmove = function (evt) {
    let move = evt.detail;

    self.genComputerMove();

    if (move.check) {
      notify.playSound(self.elSndCheck);
    } else if (move.capture) {
      notify.playSound(self.elSndCapture);
    } else {
      notify.playSound(self.elSndMove);
    }

    if (self.board.pos.mvList.length === 2) {
      if (typeof self.firstMoveCallback === "function") {
        self.firstMoveCallback();
      }
    }
  };
  this.board.addEventListener("move", onmove);

  let ongameover = function (evt) {
    let details = evt.detail;
    // if (this.board.online) {
    //     if (details.checkmate) {
    //         notify.flashTitle('Checkmate!');
    //     } else {
    //         notify.flashTitle('Gameover!');
    //     }
    // }
    if (self.winCallback && self.drawCallback && self.loseCallback) {
      if (details.result === 1) {
        // win
        if (typeof self.winCallback === "function") {
          self.winCallback();
        }
      } else if (details.result === 2) {
        // draw
        if (typeof self.drawCallback === "function") {
          self.drawCallback();
        }
      } else if (details.result === 3) {
        // lose

        if (typeof self.loseCallback === "function") {
          self.loseCallback();
        }
      }
    } else {
      alert(details.message);
    }
  };
  this.board.addEventListener("gameover", ongameover);

  if (!computer && this.board.computerMove()) {
    this.genComputerMove();
  }
};

XiangQi.prototype.genComputerMove = function () {
  if (this.level > 0) {
    if (this.board.computerMove()) {
      this.board.triggerBusy(true);
      if (this.current_level_move === this.cndbMoves[this.level].length) {
        this.current_level_move = 0;
      }
      if (this.cndbMoves[this.level][this.current_level_move] === 1) {
        this.getNextMoveChinaDB().then((next_move) => {
          if (next_move !== 0) {
            this.board.addMove(next_move, this.board.computerMove());
            this.board.triggerBusy();
          } else {
            this.board.genNextMove();
          }
        });
      } else {
        this.board.genNextMove();
      }

      this.current_level_move += 1;
    }
  }
};

XiangQi.prototype.resize = function (
  elGame = null,
  elBoard = null,
  board = null
) {
  if (elGame == null) {
    elGame = this.elGame;
  }
  if (elBoard == null) {
    elBoard = this.elBoard;
  }
  if (board == null) {
    board = this.board;
  }
  let availWidth = elGame.offsetWidth;
  let availHeight = window.innerHeight;

  let padding = 160;
  if (availWidth < 768) {
    padding = 60;
  }
  availHeight -= padding;

  let min = availWidth < availHeight ? availWidth : availHeight;
  if (min < 350) {
    min = 350;
  } else if (min > 720) {
    min = 720;
  }

  let height = min;
  let width = ~~((min * 9) / 10) + 1;

  if (min < 768) {
    width = min;
    height = ~~((min * 10) / 9) + 1;
  }

  elBoard.style.width = width + "px";
  elBoard.style.height = height + "px";

  if (board) {
    board.resize();
  }
};

XiangQi.prototype.start = function (
  redFirst = 1,
  cnDBLevel = 0,
  fen = "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w"
) {
  this.setStartFen(fen, redFirst);
  if (parseInt(cnDBLevel) === 0) {
    this.board = new Board(this.elBoard, redFirst, false, fen);
    this.resize(this.elGame, this.elBoard, this.board);
    this.init(true, 2, 0);
  } else {
    this.board = new Board(this.elBoard, redFirst, true, fen);
    this.resize(this.elGame, this.elBoard, this.board);
    this.init(false, 2, cnDBLevel);
  }

  window.addEventListener(
    "resize",
    this.resize.bind(null, this.elGame, this.elBoard, this.board)
  );
};

XiangQi.prototype.setStartFen = function (fen, redFirst) {
  this.startFen = fen.trim().split(" ")[0] + (redFirst ? " w" : " b");
};

XiangQi.prototype.setCallBack = function (
  winCallBack,
  loseCallBack,
  drawCallBack,
  firstMoveCallback
) {
  this.winCallback = winCallBack;
  this.loseCallback = loseCallBack;
  this.drawCallback = drawCallBack;
  this.firstMoveCallback = firstMoveCallback;
};

XiangQi.prototype.setLevel = function (level = 3) {
  if (level > 0) {
    this.level = parseInt(level);
  }
};

XiangQi.prototype.restart = function (fen = null) {
  if (this.board) {
    this.resize(this.elGame, this.elBoard, this.board);
    this.setStartFen(fen, this.board.computer);
    this.board.restart(fen);
  }
};

XiangQi.prototype.genChinaDBToken = function (fen) {
  var s = fen;
  var n, t, r, e;
  function d(n, t) {
    var r = (65535 & n) + (65535 & t);
    return (((n >> 16) + (t >> 16) + (r >> 16)) << 16) | (65535 & r);
  }
  function f(n, t, r, e, o, c) {
    return d(((u = d(d(t, n), d(e, c))) << (f = o)) | (u >>> (32 - f)), r);
    var u, f;
  }
  function l(n, t, r, e, o, c, u) {
    return f((t & r) | (~t & e), n, t, o, c, u);
  }
  function m(n, t, r, e, o, c, u) {
    return f((t & e) | (r & ~e), n, t, o, c, u);
  }
  function v(n, t, r, e, o, c, u) {
    return f(t ^ r ^ e, n, t, o, c, u);
  }
  function g(n, t, r, e, o, c, u) {
    return f(r ^ (t | ~e), n, t, o, c, u);
  }

  var u = Math.floor(1e4 * Math.random());
  var cal = "";
  do {
    u += Math.floor(100 * Math.random());
    cal = ((t = s.concat(u)),
    (function (n) {
      var t,
        r,
        e = "0123456789abcdef",
        o = "";
      for (r = 0; r < n.length; r += 1)
        (t = n.charCodeAt(r)),
          (o += e.charAt((t >>> 4) & 15) + e.charAt(15 & t));
      return o;
    })(
      ((r = t),
      (function (n) {
        var t,
          r = "",
          e = 32 * n.length;
        for (t = 0; t < e; t += 8)
          r += String.fromCharCode((n[t >> 5] >>> t % 32) & 255);
        return r;
      })(
        (function (n, t) {
          var r, e, o, c, u;
          (n[t >> 5] |= 128 << t % 32), (n[14 + (((t + 64) >>> 9) << 4)] = t);
          var f = 1732584193,
            a = -271733879,
            i = -1732584194,
            h = 271733878;
          for (r = 0; r < n.length; r += 16)
            (a = g(
              (a = g(
                (a = g(
                  (a = g(
                    (a = v(
                      (a = v(
                        (a = v(
                          (a = v(
                            (a = m(
                              (a = m(
                                (a = m(
                                  (a = m(
                                    (a = l(
                                      (a = l(
                                        (a = l(
                                          (a = l(
                                            (o = a),
                                            (i = l(
                                              (c = i),
                                              (h = l(
                                                (u = h),
                                                (f = l(
                                                  (e = f),
                                                  a,
                                                  i,
                                                  h,
                                                  n[r],
                                                  7,
                                                  -680876936
                                                )),
                                                a,
                                                i,
                                                n[r + 1],
                                                12,
                                                -389564586
                                              )),
                                              f,
                                              a,
                                              n[r + 2],
                                              17,
                                              606105819
                                            )),
                                            h,
                                            f,
                                            n[r + 3],
                                            22,
                                            -1044525330
                                          )),
                                          (i = l(
                                            i,
                                            (h = l(
                                              h,
                                              (f = l(
                                                f,
                                                a,
                                                i,
                                                h,
                                                n[r + 4],
                                                7,
                                                -176418897
                                              )),
                                              a,
                                              i,
                                              n[r + 5],
                                              12,
                                              1200080426
                                            )),
                                            f,
                                            a,
                                            n[r + 6],
                                            17,
                                            -1473231341
                                          )),
                                          h,
                                          f,
                                          n[r + 7],
                                          22,
                                          -45705983
                                        )),
                                        (i = l(
                                          i,
                                          (h = l(
                                            h,
                                            (f = l(
                                              f,
                                              a,
                                              i,
                                              h,
                                              n[r + 8],
                                              7,
                                              1770035416
                                            )),
                                            a,
                                            i,
                                            n[r + 9],
                                            12,
                                            -1958414417
                                          )),
                                          f,
                                          a,
                                          n[r + 10],
                                          17,
                                          -42063
                                        )),
                                        h,
                                        f,
                                        n[r + 11],
                                        22,
                                        -1990404162
                                      )),
                                      (i = l(
                                        i,
                                        (h = l(
                                          h,
                                          (f = l(
                                            f,
                                            a,
                                            i,
                                            h,
                                            n[r + 12],
                                            7,
                                            1804603682
                                          )),
                                          a,
                                          i,
                                          n[r + 13],
                                          12,
                                          -40341101
                                        )),
                                        f,
                                        a,
                                        n[r + 14],
                                        17,
                                        -1502002290
                                      )),
                                      h,
                                      f,
                                      n[r + 15],
                                      22,
                                      1236535329
                                    )),
                                    (i = m(
                                      i,
                                      (h = m(
                                        h,
                                        (f = m(
                                          f,
                                          a,
                                          i,
                                          h,
                                          n[r + 1],
                                          5,
                                          -165796510
                                        )),
                                        a,
                                        i,
                                        n[r + 6],
                                        9,
                                        -1069501632
                                      )),
                                      f,
                                      a,
                                      n[r + 11],
                                      14,
                                      643717713
                                    )),
                                    h,
                                    f,
                                    n[r],
                                    20,
                                    -373897302
                                  )),
                                  (i = m(
                                    i,
                                    (h = m(
                                      h,
                                      (f = m(
                                        f,
                                        a,
                                        i,
                                        h,
                                        n[r + 5],
                                        5,
                                        -701558691
                                      )),
                                      a,
                                      i,
                                      n[r + 10],
                                      9,
                                      38016083
                                    )),
                                    f,
                                    a,
                                    n[r + 15],
                                    14,
                                    -660478335
                                  )),
                                  h,
                                  f,
                                  n[r + 4],
                                  20,
                                  -405537848
                                )),
                                (i = m(
                                  i,
                                  (h = m(
                                    h,
                                    (f = m(f, a, i, h, n[r + 9], 5, 568446438)),
                                    a,
                                    i,
                                    n[r + 14],
                                    9,
                                    -1019803690
                                  )),
                                  f,
                                  a,
                                  n[r + 3],
                                  14,
                                  -187363961
                                )),
                                h,
                                f,
                                n[r + 8],
                                20,
                                1163531501
                              )),
                              (i = m(
                                i,
                                (h = m(
                                  h,
                                  (f = m(
                                    f,
                                    a,
                                    i,
                                    h,
                                    n[r + 13],
                                    5,
                                    -1444681467
                                  )),
                                  a,
                                  i,
                                  n[r + 2],
                                  9,
                                  -51403784
                                )),
                                f,
                                a,
                                n[r + 7],
                                14,
                                1735328473
                              )),
                              h,
                              f,
                              n[r + 12],
                              20,
                              -1926607734
                            )),
                            (i = v(
                              i,
                              (h = v(
                                h,
                                (f = v(f, a, i, h, n[r + 5], 4, -378558)),
                                a,
                                i,
                                n[r + 8],
                                11,
                                -2022574463
                              )),
                              f,
                              a,
                              n[r + 11],
                              16,
                              1839030562
                            )),
                            h,
                            f,
                            n[r + 14],
                            23,
                            -35309556
                          )),
                          (i = v(
                            i,
                            (h = v(
                              h,
                              (f = v(f, a, i, h, n[r + 1], 4, -1530992060)),
                              a,
                              i,
                              n[r + 4],
                              11,
                              1272893353
                            )),
                            f,
                            a,
                            n[r + 7],
                            16,
                            -155497632
                          )),
                          h,
                          f,
                          n[r + 10],
                          23,
                          -1094730640
                        )),
                        (i = v(
                          i,
                          (h = v(
                            h,
                            (f = v(f, a, i, h, n[r + 13], 4, 681279174)),
                            a,
                            i,
                            n[r],
                            11,
                            -358537222
                          )),
                          f,
                          a,
                          n[r + 3],
                          16,
                          -722521979
                        )),
                        h,
                        f,
                        n[r + 6],
                        23,
                        76029189
                      )),
                      (i = v(
                        i,
                        (h = v(
                          h,
                          (f = v(f, a, i, h, n[r + 9], 4, -640364487)),
                          a,
                          i,
                          n[r + 12],
                          11,
                          -421815835
                        )),
                        f,
                        a,
                        n[r + 15],
                        16,
                        530742520
                      )),
                      h,
                      f,
                      n[r + 2],
                      23,
                      -995338651
                    )),
                    (i = g(
                      i,
                      (h = g(
                        h,
                        (f = g(f, a, i, h, n[r], 6, -198630844)),
                        a,
                        i,
                        n[r + 7],
                        10,
                        1126891415
                      )),
                      f,
                      a,
                      n[r + 14],
                      15,
                      -1416354905
                    )),
                    h,
                    f,
                    n[r + 5],
                    21,
                    -57434055
                  )),
                  (i = g(
                    i,
                    (h = g(
                      h,
                      (f = g(f, a, i, h, n[r + 12], 6, 1700485571)),
                      a,
                      i,
                      n[r + 3],
                      10,
                      -1894986606
                    )),
                    f,
                    a,
                    n[r + 10],
                    15,
                    -1051523
                  )),
                  h,
                  f,
                  n[r + 1],
                  21,
                  -2054922799
                )),
                (i = g(
                  i,
                  (h = g(
                    h,
                    (f = g(f, a, i, h, n[r + 8], 6, 1873313359)),
                    a,
                    i,
                    n[r + 15],
                    10,
                    -30611744
                  )),
                  f,
                  a,
                  n[r + 6],
                  15,
                  -1560198380
                )),
                h,
                f,
                n[r + 13],
                21,
                1309151649
              )),
              (i = g(
                i,
                (h = g(
                  h,
                  (f = g(f, a, i, h, n[r + 4], 6, -145523070)),
                  a,
                  i,
                  n[r + 11],
                  10,
                  -1120210379
                )),
                f,
                a,
                n[r + 2],
                15,
                718787259
              )),
              h,
              f,
              n[r + 9],
              21,
              -343485551
            )),
              (f = d(f, e)),
              (a = d(a, o)),
              (i = d(i, c)),
              (h = d(h, u));
          return [f, a, i, h];
        })(
          (function (n) {
            var t,
              r = [];
            for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)
              r[t] = 0;
            var e = 8 * n.length;
            for (t = 0; t < e; t += 8)
              r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32;
            return r;
          })((e = unescape(encodeURIComponent(r)))),
          8 * e.length
        )
      ))
    )).substring(0, 2);
  } while (cal !== "00");
  return u;
};

XiangQi.prototype.getNextMoveChinaDB = async function () {
  var next_move = await this.getNextBestMoveChinaDB();

  if (next_move !== "") {
    var valid = await this.checkChinaDBBestMove(next_move);
    if (valid === false) {
      next_move = "";
    }
  }

  if (next_move === "") {
    next_move = await this.getNextEngineMoveChinaDB();
  }

  if (next_move !== "") {
    next_move = next_move.toLowerCase();
    var from_x = next_move.charCodeAt(0) - 94;
    var from_y = 12 - parseInt(next_move[1]);
    var from = from_x + (from_y << 4);

    var to_x = next_move.charCodeAt(2) - 94;
    var to_y = 12 - parseInt(next_move[3]);
    var to = to_x + (to_y << 4);

    return from + (to << 8);
  }

  return 0;
};

XiangQi.prototype.getMoveList = function (moveList) {
  let results = [];
  for (let i = 0; i < moveList.length; i++) {
    if (moveList[i] === 0) {
      continue;
    }
    let to = moveList[i] >> 8;
    let from = moveList[i] & 255;

    let to_x = String.fromCharCode((to & 15) + 94);
    let to_y = 12 - (to >> 4);

    let from_x = String.fromCharCode((from & 15) + 94);
    let from_y = 12 - (from >> 4);

    results.push(from_x + from_y + to_x + to_y);
  }

  return results;
};

XiangQi.prototype.getNextBestMoveChinaDB = async function (currentFen) {
  var fen = this.board.pos.toFen();
  var url =
    "https://www.chessdb.cn/chessdb.php?action=querybest&learn=1&board=" + fen;
  return axios
    .get(url)
    .then((response) => {
      return this.parseChinaDBResult(response.data);
    })
    .catch((e) => {
      console.log("Error");
      console.log(e);
      return "";
    });
};

XiangQi.prototype.checkChinaDBBestMove = async function (nextMove) {
  var fen = this.startFen;
  let moveList = this.getMoveList(this.board.pos.mvList).join("|");
  if (moveList.length > 0) {
    moveList = moveList + "|" + nextMove;
  } else {
    return true;
  }
  var url =
    "https://www.chessdb.cn/chessdb.php?action=rulecheck" +
    "&board=" +
    fen +
    "&movelist=" +
    moveList;
  return axios
    .get(url)
    .then((response) => {
      return parseInt(response.data) === 0;
    })
    .catch((e) => {
      return false;
    });
};

XiangQi.prototype.getNextEngineMoveChinaDB = async function () {
  var fen = this.startFen;
  let moveList = this.getMoveList(this.board.pos.mvList).join("|");
  var token = this.genChinaDBToken(fen);
  var url =
    "https://www.chessdb.cn/chessdb.php?action=queryengine&token=" +
    token +
    "&board=" +
    fen +
    "&movelist=" +
    moveList;
  return axios
    .get(url)
    .then((response) => {
      return this.parseChinaDBResult(response.data);
    })
    .catch((e) => {
      console.log("Error");
      console.log(e);
      return "";
    });
};

XiangQi.prototype.parseChinaDBResult = function (result) {
  if (result.search(/move:/) !== -1) {
    return result.substr(5, 4);
  } else if (result.search(/egtb:/) !== -1) {
    return result.substr(5, 4);
  }
  return "";
};

export default XiangQi;
