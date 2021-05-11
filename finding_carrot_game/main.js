// "use strict";
const ground = document.querySelector(".background");
let ground_wrap = document.querySelector(".ground_wrap");
const timer = document.querySelector(".timer");
let width = ground.getBoundingClientRect().width;
let height = ground.getBoundingClientRect().height;
let half_height = ground.getBoundingClientRect().height / 2;
const button = document.querySelector(".button");
const play_button = document.querySelector(".play_btn");
const body = document.querySelector("body");
const alert = document.querySelector(".alert");
const countdown_carrots = document.querySelector(".count_carrots");
let _timer;
let t = 10;
let carrots = document.querySelectorAll(".carrot");
let carrots_count = carrots.length;
let bugs;
let replay_btn = document.querySelector(".fa-redo");
timer.innerText = t;

window.addEventListener("resize", () => {
  width = ground.getBoundingClientRect().width;
  height = ground.getBoundingClientRect().height;
  return width, height;
});

button.addEventListener("click", (event) => {
  if (play_button.classList.contains("pause_btn")) {
    play_button.setAttribute("class", "far fa-caret-square-right btn play_btn");
    game_end(_timer, "You lose");
    return;
  }
  start_game();
});

//시작버튼
function start_game() {
  play_button.style.display = "block";
  countdown_carrots.style.display = "block";
  timer.style.display = "block";
  play_button.setAttribute("class", "far fa-stop-circle btn pause_btn");
  for (let i = 0; i < 2; i++) {
    let randomWidth = width * Math.random() - 80;
    let randomHeight =
      Math.random() * (height - half_height) + half_height - 80;
    const carrot = document.createElement("img");
    carrot.setAttribute("src", "./img/carrot.png");
    carrot.setAttribute("class", "carrot");
    carrot.setAttribute("data-id", i);
    carrot.style.transform = `translate(${randomWidth}px,${randomHeight}px)`;
    ground_wrap.append(carrot);
  }
  //랜덤한위치에 벌레뿌린다
  for (let i = 0; i < 10; i++) {
    let randomWidth = width * Math.random() - 80;
    let randomHeight =
      Math.random() * (height - half_height) + half_height - 80;
    const bug = document.createElement("img");
    bug.setAttribute("src", "./img/bug.png");
    bug.setAttribute("class", "bug");
    bug.setAttribute("data-id", i);
    bug.style.transform = `translate(${randomWidth}px,${randomHeight}px)`;
    ground_wrap.append(bug);
  }

  t = 10;
  timer.innerText = t;
  _timer = setInterval(timer_handler, 1000);

  //당근 갯수세기
  counting_carrots();
}

//타이머

function timer_handler() {
  t--;
  timer.innerText = t;
  if (t == 0) {
    game_end(_timer, "You lose!");
  }
}

//시간끝나면
function timeout() {
  delete_elem();
}

//중지버튼,시간종료, 벌레누름, 다 잡음(당근==0)
function finish_message(word) {
  const text = `
    <div class="restart">
      <i class="fas fa-redo"></i>
      <div class="comment">Replay?</div>
    </div>
    <div class="status">${word}</div>
  `;
  alert.style.display = "block";
  alert.innerHTML = text;
}

//다시시작
function redo() {
  alert.style.display = "none";
  start_game();
  t = 10;
  timer.innerText = t;
  _timer = setInterval(timer_handler, 1000);
}
//벌레,당근 삭제
function delete_elem() {
  carrots = document.querySelectorAll(".carrot");
  bugs = document.querySelectorAll(".bug");
  carrots.forEach((elem) => {
    elem.parentNode.removeChild(elem);
  });
  bugs.forEach((elem) => {
    elem.parentNode.removeChild(elem);
  });
}

function game_end(_timer, message) {
  clearInterval(_timer);
  play_button.style.display = "none";
  countdown_carrots.style.display = "none";
  timer.style.display = "none";
  delete_elem();
  finish_message(message);
  //다시시작
  replay_btn = document.querySelector(".fa-redo");
  replay_btn.addEventListener("click", () => {
    console.log("clicked");
    alert.style.display = "none";
    start_game();
  });
}
function counting_carrots() {
  ground_wrap = document.querySelector(".ground_wrap");
  carrots = document.querySelectorAll(".carrot");
  carrots_count = carrots.length;
  countdown_carrots.innerText = carrots_count;

  ground_wrap.addEventListener("click", (e) => {
    if (e.target.className === "carrot") {
      let clicked = e.target.dataset.id;
      ground_wrap.removeChild(carrots[clicked]);
      carrots_count = carrots_count - 1;
      countdown_carrots.innerText = carrots_count;
    }
    if (e.target.className === "bug") {
      game_end(_timer, "You clicked the bug!");
    }
    console.log(carrots_count);
    if (carrots_count == 0) {
      game_end(_timer, "You win!!");
    }
  });
}
