document.addEventListener("DOMContentLoaded", function () {
  
  // NAVBAR (DESKTOP)
 
  const navbar = document.getElementById("navbarlist");

  const navbarLinkList = [
    { href: "#home", text: "Home" },
    { href: "#about", text: "About" },
    { href: "#portfolio", text: "Portfolio" },
    { href: "#contact", text: "Contact" },
    { href: "autor.html", text: "O autoru" },
    { href: "Websajt.rar", text: "Preuzmi ZIP" },
    { href: "Dokumentacija.pdf", text: "dokumentacija" },
  ];

  if (navbar) {
    navbar.innerHTML = "";
    navbarLinkList.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.text;
      li.appendChild(a);
      navbar.appendChild(li);
    });
  }

  // NAVBAR (MOBILE)
  
  const mobileNavList = document.getElementById("mobileNavList");

  if (mobileNavList) {
    mobileNavList.innerHTML = "";
    navbarLinkList.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.text;
      li.appendChild(a);
      mobileNavList.appendChild(li);
    });
  }

  
  // SKILLS TAGOVI
  
  const skillsContainer = document.getElementById("skillsContainer");

  const skills = [
    "Mobile App Development",
    "Web Development",
    "Desktop Development",
    "Graphic Design",
    "Photoshop",
    "Taking Pictures",
  ];

  if (skillsContainer) {
    skillsContainer.innerHTML = "";
    skills.forEach((skill) => {
      const span = document.createElement("span");
      span.classList.add("skill-tag");
      span.textContent = skill;
      skillsContainer.appendChild(span);
    });
  }

 
  // SELECTI: FILTER i FORMA (OBAVEZNO ODVOJENO)

  const serviceFilter = document.getElementById("serviceFilter"); 
  const serviceForm = document.getElementById("service");         

  // Popuni FORM select opcijama (jer ti je u HTML prazan)
  if (serviceForm) {
    const serviceOptions = [
      { value: "", text: "Select service" },
      { value: "programming", text: "Programming" },
      { value: "imaging", text: "Image / Design" },
    ];

    serviceForm.innerHTML = "";
    serviceOptions.forEach((opt) => {
      const option = document.createElement("option");
      option.value = opt.value;
      option.textContent = opt.text;
      serviceForm.appendChild(option);
    });
  }

  
  // PORTFOLIO / SERVICES (DINAMICKI ISPIS + FILTER)
 
  const portfolioGrid = document.getElementById("portfolioGrid");

  const portfolioItems = [
    {
      title: "Mobile Programming",
      description: "Development of Android and iOS applications.",
      category: "programming",
      image: "images/computer-desk-stickers.jpg",
    },
    {
      title: "Web Programming",
      description: "Modern responsive websites and web applications.",
      category: "programming",
      image: "images/curved-display-pinky-girl.jpg",
    },
    {
      title: "Windows Programming",
      description: "Desktop software development for Windows.",
      category: "programming",
      image: "images/dashboard-interfaces-transparent-displays.jpg",
    },
    {
      title: "Photoshop",
      description: "Photo editing, retouching and manipulation.",
      category: "imaging",
      image: "images/marketing-strategy-women.jpg",
    },
    {
      title: "Graphic Design",
      description: "Branding, logos and marketing materials.",
      category: "imaging",
      image: "images/portfolio-website-girl.jpg",
    },
    {
      title: "Taking Pictures",
      description: "Professional photography services.",
      category: "imaging",
      image: "images/working-business-women.jpg",
    },
  ];

  function createCard(item) {
    const card = document.createElement("div");
    card.classList.add("portfolio-item");

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("portfolio-image");
    imageDiv.style.backgroundImage = `url('${item.image}')`;
    imageDiv.style.backgroundSize = "cover";
    imageDiv.style.backgroundPosition = "center";

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("portfolio-content");

    const h4 = document.createElement("h4");
    h4.textContent = item.title;

    const p = document.createElement("p");
    p.textContent = item.description;

    contentDiv.appendChild(h4);
    contentDiv.appendChild(p);

    card.appendChild(imageDiv);
    card.appendChild(contentDiv);

    return card;
  }

  function renderServices(filterValue) {
    if (!portfolioGrid) return;
    portfolioGrid.innerHTML = "";

    const listToShow =
      filterValue === "all"
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === filterValue);

    listToShow.forEach((item) => {
      portfolioGrid.appendChild(createCard(item));
    });
  }

  
  renderServices(serviceFilter ? serviceFilter.value : "all");

  
  if (serviceFilter) {
    serviceFilter.addEventListener("change", function () {
      renderServices(this.value);
    });
  }

  
  // TEAM - SEE MORE / SEE LESS
  
  document.querySelectorAll(".team-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const extraText = this.previousElementSibling;
      extraText.classList.toggle("active");
      this.textContent = extraText.classList.contains("active")
        ? "See less"
        : "See more";
    });
  });

 
  // FORM VALIDACIJA (REGEX)
 
  const emailRegex = /^[\w\d._+-]+@[\w\d._+-]+\.[a-zA-Z\d]{2,}$/;
  const nameRegex =
    /^[A-ŽĆČĐŠŽ][a-zčćžđš]{1,20}([ -][A-ŽĆČĐŠŽ][a-zčćžđš]{1,20})*$/;
  const phoneRegex = /^(\+)?[0-9]{7,15}$/;
  const messageRegex = /^(?=.*\S).{10,500}$/;

  const ime = document.getElementById("name");
  const mejl = document.getElementById("email");
  const telefon = document.getElementById("phone");
  const poruka = document.getElementById("message");
  const dugmeforma = document.getElementById("validateBtn");

  const imeerror = document.getElementById("nameerror");
  const mejlerror = document.getElementById("mailerror");
  const phoneerror = document.getElementById("phoneerror");
  const porukaerror = document.getElementById("messageerror");
  const serviceerror = document.getElementById("serviceerror");

  if (dugmeforma) {
    dugmeforma.addEventListener("click", function (e) {
      e.preventDefault();

      // SERVICE (FORMA) - koristi serviceForm, ne filter
      if (serviceerror && serviceForm) {
        if (serviceForm.value === "") {
          serviceerror.textContent = "Please select a service type.";
        } else {
          serviceerror.textContent = "";
        }
      }

      if (imeerror && ime && !nameRegex.test(ime.value.trim())) {
        imeerror.textContent = "Enter a valid full name.";
      } else if (imeerror) imeerror.textContent = "";

      if (mejlerror && mejl && !emailRegex.test(mejl.value.trim())) {
        mejlerror.textContent = "Enter a valid mail address.";
      } else if (mejlerror) mejlerror.textContent = "";

      if (phoneerror && telefon && !phoneRegex.test(telefon.value.trim())) {
        phoneerror.textContent = "Invalid phone number (7-15 digits, optional +).";
      } else if (phoneerror) phoneerror.textContent = "";

      if (porukaerror && poruka && !messageRegex.test(poruka.value.trim())) {
        porukaerror.textContent = "Message must be at least 10 characters.";
      } else if (porukaerror) porukaerror.textContent = "";

      const sveOk =
        nameRegex.test((ime?.value || "").trim()) &&
        emailRegex.test((mejl?.value || "").trim()) &&
        phoneRegex.test((telefon?.value || "").trim()) &&
        messageRegex.test((poruka?.value || "").trim()) &&
        (!!serviceForm && serviceForm.value !== "");

      if (sveOk) {
  const form = document.querySelector(".contact-form");
  if (form) form.reset();

  const successMsg = document.getElementById("formSuccessMessage");
  if (successMsg) {
    successMsg.textContent = "Your message has been successfully sent!";
    successMsg.style.color = "green";

    setTimeout(() => {
      successMsg.textContent = "";
    }, 3000);
  }
}
    });
  }
});