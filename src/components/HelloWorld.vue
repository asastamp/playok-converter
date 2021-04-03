<template>
  <div class="container">
    <div class="header">PlayOK Converter</div>
    <input
      class="input"
      name="link"
      type="text"
      placeholder="Please insert the link"
      v-on:change="requestPlayOK"
    />
    <div class="card">
      <div class="original"></div>
      <div class="final"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios from "axios";
@Options({
  props: {
    msg: String,
  },
})
export default class HelloWorld extends Vue {
  msg!: string;
  action: any = {
    x: "กิน",
    "=P": "หงาย",
    "+": "รุก",
  };

  board: any = {
    a: "ก",
    b: "ข",
    c: "ค",
    d: "ง",
    e: "จ",
    f: "ฉ",
    g: "ช",
    h: "ญ",
  };

  piece: any = {
    K: "ขุน",
    Q: "เม็ด",
    N: "ม้า",
    R: "เรือ",
    B: "โคน",
    P: "เบี้ยหงาย",
    "": "เบี้ย",
  };

  requestPlayOK(event: Event) {
    console.log(event)
    const value = "mk62800464";
    axios
      .get(`https://www.playok.com/p/?g=${value}.txt`)
      .then((response) => {
        // handle success
        const arr = response.data.split("]");
        this.handle(arr[arr.length - 1].trim());
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  handle(text: string): void {
    const turns = text.split(/\d+\./g);
    let index = 0;
    for (const turn of turns) {
      const trimTurn = turn.trim().replace(/\n\r/g, "");
      const exec = /(\w+)(\+|=P?)?\s+(\w+)(\+|=P?)?/.exec(trimTurn);
      if (exec) {
        index++;
        const extractWhite = this.extract("ขาว", exec[1], exec[2]);
        const extractBlack = this.extract("ดำ", exec[3], exec[4]);
        console.log(index, extractWhite, extractBlack)
      }
    }
  }

  extract(player: string, str: string, check: string): string {
    const exec = /(K|Q|N|R|B|P)?([a-h])?(x)?([a-h])(\d)/.exec(str);
    let mark;
    let posFrom;
    let posTo;
    if (exec) {
      mark = exec[1] ? this.piece[exec[1]] : this.piece[""];
      posFrom = exec[2] ? this.board[exec[2]] : "";
      posTo = exec[4] ? this.board[exec[4]] : "";
      const output =
        mark +
        " " +
        posFrom +
        " " +
        (posFrom ? "ไป" : "") +
        (exec[3] ? this.piece[exec[3]] : "") +
        (check === "+" ? this.action["+"] : "") +
        " " +
        posTo +
        exec[5] +
        " " +
        (check && check === "=P" ? this.piece[check] : "");
      return output;
    }
    return "";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  margin: 20px 100px;
  display: flex;
  flex-direction: column;
}

.header {
  font-size: 50px;
}

.input {
  width: 50%;
  height: 50px;

  margin-top: 50px;
  padding: 0 20px;

  border: 1px solid grey;
  border-radius: 20px;

  align-self: center;

  font-size: 20px;
}

.input:focus {
  outline: none;
}

.card {
  display: flex;
  justify-content: space-between;

  margin-top: 20px;
}

.original,
.final {
  width: 40vw;
  height: 500px;

  border: 1px solid black;
}
</style>
