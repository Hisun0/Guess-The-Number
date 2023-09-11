import onChange from "on-change";

const renderSecondAnimation = () => {
  const logo = document.querySelector(".logo-anim");
  const container = document.querySelector(".container");
  const start = Date.now();

  const timer = setInterval(() => {
    const timePassed = Date.now() - start;

    if (timePassed >= 300) {
      clearInterval(timer);
      logo.style.transform = `translate(-50%, -38.7vh)`;
      return;
    }

    draw(timePassed);
  });

  const draw = (timePassed) => {
    logo.style.transform = `translate(-50%, ${Math.round(
      -((timePassed * 1.3) / 10)
    )}vh)`;
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
};

const renderThirdAnimation = () => {
  const start = Date.now();
  const hiddenContainers = document.querySelectorAll(".hidden");

  hiddenContainers.forEach((hiddenContainer) => {
    const timer = setInterval(() => {
      const timePassed = Date.now() - start;

      if (timePassed >= 1000) {
        clearInterval(timer);
        hiddenContainer.classList.remove("hidden");
        return;
      }

      draw(timePassed);
    });

    const draw = (timePassed) => {
      const opacityValue = Math.round(timePassed / 100);
      if (opacityValue === 10) {
        hiddenContainer.style.opacity = `1`;
        return;
      }
      hiddenContainer.style.opacity = `0.${Math.round(timePassed / 100)}`;
    };
  });
};

export default () => {
  const state = {
    animation: "first",
  };

  const watchedState = onChange(state, () => {
    if (state.animation === "second") {
      renderSecondAnimation();
    }
    if (state.animation === "third") {
      setTimeout(renderThirdAnimation, 1000);
    }
  });

  const animation = document.querySelector(".third");
  animation.addEventListener("animationend", () => {
    watchedState.animation = "second";
    watchedState.animation = "third";
  });
};
