import onChange from "on-change";

export default () => {
  const state = {
    animationEnd: false,
  };

  const logo = document.querySelector(".logo-anim");
  const container = document.querySelector(".container");

  const watchedState = onChange(state, () => {
    const start = Date.now();

    const timer = setInterval(() => {
      const timePassed = Date.now() - start;

      if (timePassed >= 300) {
        clearInterval(timer);
        logo.style.transform = `translate(-50%, -48.7vh)`; // это нужно для точного попадания анимации в новый header
        return;
      }

      draw(timePassed);
    });

    const draw = (timePassed) => {
      logo.style.transform = `translate(-50%, ${Math.round(
        -((timePassed * 1.3) / 10)
      )}vh)`; // 1.312 - магическое число. оно просто самое ближайшее к -390px
    };

    logo.innerHTML = "";

    const createH1 = () => {
      const h1 = document.createElement("h1");
      const textNode = document.createTextNode("Guess the ");
      const span = document.createElement("span");

      span.textContent = "number";
      span.classList.add("color-blue");

      h1.append(textNode, span);
      return h1;
    };

    logo.append(createH1());
    logo.style.width = "300px";

    setTimeout(() => {
      container.innerHTML = "";
      container.append(createH1());
    }, 1000);
  });

  const animation = document.querySelector(".third");
  animation.addEventListener("animationend", () => {
    watchedState.animationEnd = true;
  });
};