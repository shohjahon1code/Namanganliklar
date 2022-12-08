const addModalNews = document.querySelector("#add-news");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".addNews-modal");
const elForm = document.querySelector(".forms");
const elHeroArticles = document.querySelector(".hero__articles");
const elFormBtns = elForm.querySelectorAll("button");
const searchBtn = document.getElementById("search-btn");
const elSearchMenu = document.querySelector(".search-menu");
const elEditBtn = elForm.querySelector(".elform-btn");
const elTabList = document.querySelector(".nav__list");

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

function addHash(arr) {
  arr.map((ar) => `# + ${arr}`);
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
    <p class="edit" data-id="${item.id}">Edit</p>
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
      renderNews(news);
      const deleteModal = document.getElementById("delete-modal");
      deleteModal.classList.remove("active");
    });
  }

  if (evt.target.matches(".edit")) {
    showModal();
    elEditBtn.textContent = "Change";
    elEditBtn.type = "button";
    const id = evt.target.dataset.id;

    let title = elForm.title;
    let url = elForm.url;
    let time = elForm.time;
    let date = elForm.date;
    console.log(title);
    news.forEach((item) => {
      if (item.id === Number(id)) {
        title.value = news[id].title;
        url.value = news[id].img;
        time.value = news[id].time;
        date.value = news[id].date;
        editHandler(id, title, url, time, date);
        renderNews(news);
      }
    });
  }
});

function editHandler(id, title, url, time, date) {
  elEditBtn.addEventListener("click", () => {
    news.forEach((item) => {
      if (item.id === Number(id)) {
        news[id].title = title.value;
        news[id].title = url.value;
        news[id].title = time.value;
        news[id].title = date.value;
      }
      renderNews(news);
    });
  });
}

//search btn
const searchBarOpen = () => {
  elSearchMenu.classList.toggle("search-active");
  searchBtn.style.display = "none";
};

window.addEventListener("change", (e) => {
  if (!e.path.includes(elSearchMenu) && !e.path.includes(searchBtn)) {
    elSearchMenu.classList.remove("search-active");
    searchBtn.style.display = "block";
  }
  renderNews(news);
});

elSearchMenu.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const elSearchInput = document.querySelector("#search");
  const searchInputValue = elSearchInput.value.trim();
  const elSearchReg = new RegExp(searchInputValue, "gi");
  const filteredSearch = news.filter((item) => item.title.match(elSearchReg));

  if (filteredSearch.length > 0) {
    renderNews(filteredSearch);
  } else {
    alert("Write the Russian letter or not found please!!!");
  }

  elSearchInput.value = "";
});

searchBtn.addEventListener("click", searchBarOpen);

renderNews(news);
addModalNews.addEventListener("click", () => {
  elEditBtn.textContent = "Add";
  elEditBtn.type = "submit";
});
addModalNews.addEventListener("click", showModal);
backdrop.addEventListener("click", backdropHandler);
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addNewsHandler();
  renderNews(news);
  clearInputs();
});

// tab categories//////////////////////////

function renderTab(items) {
  const categoryArr = [];

  items.forEach((item) => {
    item.categories.forEach((category) => {
      if (!categoryArr.includes(category)) {
        categoryArr.push(category);
      }
    });
  });
  categoryArr.forEach((category) => {
    const list = document.createElement("li");
    list.className = "nav__item";
    const link = document.createElement("a");
    link.className = "nav__link";
    link.textContent = category;
    link.style.cursor = "pointer";
    list.appendChild(link);
    elTabList.prepend(list);
  });
}

elTabList.addEventListener("click", (evt) => {
  const fileredArray = news.filter((item) =>
    item.categories.includes(evt.target.textContent)
  );
  console.log(fileredArray);
  console.log(evt.target.textContent);

  if (fileredArray.length > 0) {
    renderNews(fileredArray);
  }
  //

  if (evt.target.textContent === "All") {
    renderNews(news);
  }
});

renderTab(news);
