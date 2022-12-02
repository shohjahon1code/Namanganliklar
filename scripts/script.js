const addModalNews = document.querySelector("#add-news");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".addNews-modal");
const elForm = document.querySelector(".forms");
const elHeroArticles = document.querySelector(".hero__articles");
const elFormBtns = elForm.querySelectorAll("button");

// adding backdrop to modal
const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

// showModal
const showModal = () => {
  toggleBackdrop();
  modal.classList.add("active");
};

// close modal
const closeModal = () => {
  modal.classList.remove("active");
};

//clear Inputs
const clearInputs = () => {
  let titleValue = elForm.querySelector("#title");
  let imageValue = elForm.querySelector("#url");
  let dateValue = elForm.querySelector("#date");
  let timeValue = elForm.querySelector("#time");

  titleValue.value = "";
  imageValue.value = "";
  dateValue.value = "";
  timeValue.value = "";
};

// backdrophnadler
const backdropHandler = () => {
  closeModal();
  toggleBackdrop();
  clearInputs();
};

function addZero(num) {
  if (num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

//render the news
function renderNews(items) {
  elHeroArticles.textContent = "";

  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();

  items.forEach((item) => {
    const elArticlesItems = document.createElement("div");
    elArticlesItems.className = "articles__items";

    elArticlesItems.innerHTML = `
    <img
    width="386"
    height="190"
    src="${item.img}"
    alt="${item.title}"
    class="articles__items-img"
  />
  <h4 class="articles__items-title">
    ${item.title}
  </h4>
  <span class="articles__items-time">${item.time} / ${item.date
      .split("-")
      .join(".")}</span>
    <button class="articles__items-btn" data-id="${item.id}">Delete</button>
    <div class="article__overlay"></div>
    `;

    elHeroArticles.appendChild(elArticlesItems);
  });
}

const addNewsHandler = () => {
  const titleValue = elForm.querySelector("#title").value;
  const imageValue = elForm.querySelector("#url").value;
  const timeValue = elForm.querySelector("#time").value;
  const dateValue = elForm.querySelector("#date").value;

  if (titleValue.trim() == "" || imageValue.trim() === "" || dateValue === "") {
    alert("Enter valid value");
    return;
  }

  const newItem = {
    id: news.length,
    title: titleValue,
    img: imageValue,
    time: timeValue,
    date: dateValue,
  };

  news.push(newItem);
};

// cancel
function cancelNewsHandler(e) {
  if (e.target.innerText !== "Add") {
    toggleBackdrop();
    closeModal();
    clearInputs();
  }
}

//event for cancel item
elFormBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    cancelNewsHandler(e);
  });
});

function showDeleteModal() {
  const deleteModal = document.getElementById("delete-modal");
  deleteModal.classList.add("active");
}

function closeDeleteModal() {
  const elDelete = document.querySelector(".btn--passive");
  elDelete.addEventListener("click", () => {
    const deleteModal = document.getElementById("delete-modal");
    deleteModal.classList.remove("active");
  });
}
closeDeleteModal();

// delete Items
elHeroArticles.addEventListener("click", (evt) => {
  if (evt.target.matches(".articles__items-btn")) {
    showDeleteModal();
    const yesDelete = document.querySelector(".btn--danger");
    yesDelete.addEventListener("click", () => {
      const id = evt.target.dataset.id;
      const fileredArray = news.filter((item) => {
        if (item.id != id) {
          return evt.target;
        }
      });
      news = fileredArray;
      renderNews(fileredArray);
      const deleteModal = document.getElementById("delete-modal");
      deleteModal.classList.remove("active");
    });
  }
});

renderNews(news);
addModalNews.addEventListener("click", showModal);
backdrop.addEventListener("click", backdropHandler);
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addNewsHandler();
  renderNews(news);
  clearInputs();
});
