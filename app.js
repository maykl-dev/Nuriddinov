window.onload = () => {
  const modules = document.querySelector(".module");

  const handleModule = (status) => {
    modules.style.display = status;
  };

  const headerNav = document.querySelectorAll(
    "header nav ul li a, .module nav ul li a, .home-btn a",
  );

  const loads = (hrefs) => {
    headerNav.forEach((item) => {
      const href = item.getAttribute("href");
      if (href === `/#${hrefs}`) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  headerNav.forEach((item) => {
    item.addEventListener("click", () => {
      const href = item.getAttribute("href");
      headerNav.forEach((i) => {
        const hrefs = i.getAttribute("href");
        if (hrefs === href) {
          i.classList.add("active");
        } else {
          i.classList.remove("active");
        }
      });
      document.body.classList.remove("show");
      dogs.classList.remove("show");
      handleModule("none");
    });
  });

  const dogs = document.querySelector("header .dogs");

  dogs.addEventListener("click", (e) => {
    e.stopPropagation();
    document.body.classList.add("show");
    dogs.classList.add("show");
    handleModule("block");
  });

  document.addEventListener("click", (e) => {
    const module = document.querySelector(".module nav");
    if (!module.contains(e.target) && modules.style.display === "block") {
      document.body.classList.remove("show");
      dogs.classList.remove("show");
      handleModule("none");
    }
  });

  const cursor = document.querySelector(".cursor");
  const cursorRing = document.querySelector(".cursor-ring");

  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.transform = `translate(${mx}px,${my}px)`;
  });

  function animRing() {
    cursorRing.style.transform = `translate(${mx - 14}px, ${my - 14}px)`;
    requestAnimationFrame(animRing);
  }
  animRing();

  const homeTxt = document.getElementById("home-txt");

  const homeArray = [
    "Men zamonaviy web-ilovalar ishlab chiqaman: tezkor, barqaror va kengayishga tayyor.",
    "Frontend va backend yechimlarni integratsiya qilaman, foydalanuvchi tajribasini optimallashtiraman.",
    "React, Node.js va boshqa texnologiyalar yordamida murakkab tizimlarni sodda va samarali qilaman.",
    "Kodim oson texnik xizmat ko‘rsatish va kengaytirishga mo‘ljallangan, har doim zamonaviy standartlarga mos.",
  ];

  let textIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < homeArray[textIndex].length) {
      homeTxt.textContent += homeArray[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 40);
    } else {
      setTimeout(erase, 1500);
    }
  }

  function erase() {
    if (charIndex > 0) {
      homeTxt.textContent = homeArray[textIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 20);
    } else {
      textIndex++;
      if (textIndex >= homeArray.length) textIndex = 0;
      setTimeout(type, 300);
    }
  }

  type();

  const skillsFill = document.querySelectorAll(".skills-fill");

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(
      (entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.w + "%";
          skillsObserver.unobserve(entry.target);
        }
      },
      {
        threshold: 0.8,
      },
    );
  });

  skillsFill.forEach((item) => {
    item.style.width = "0%";
    skillsObserver.observe(item);
  });

  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (el) => {
      el.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("visible"), i * 60);
          observer.unobserve(e.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  reveals.forEach((item) => observer.observe(item));

  // Form Data

  const errorText = (txt, status) => {
    const errorModule = document.querySelector(".error-module");
    errorModule.style.background =
      status === 0 ? "rgb(203, 18, 18)" : "#a2ff70";
    errorModule.style.color =
      status === 0 ? "rgba(255, 255, 255, 0.8)" : "black";
    errorModule.textContent = txt;
    errorModule.classList.remove("show");
    errorModule.offsetWidth;
    errorModule.classList.add("show");
  };

  const form = document.getElementById("myForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:3000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const req = await res.json();

      if (!req.success) {
        errorText(req.message, 0);
        return;
      }

      errorText(req.message, 1);

      form.reset();
    } catch (err) {
      errorText(err.message, 0);
    }
  });

  const section = document.querySelectorAll("section");

  const observers = new IntersectionObserver(
    (el) => {
      el.forEach((i) => {
        if (i.isIntersecting) {
          const id = i.target.getAttribute("id");
          history.replaceState(null, null, `/#${id}`);
          loads(id);
        }
      });
    },
    {
      threshold: 0.4,
    },
  );

  section.forEach((item) => observers.observe(item));
};
