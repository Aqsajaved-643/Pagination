import axios from "axios";

const paginationWrapper = document.querySelector(".pagination");
const postListWrapper = document.querySelector(".list-unstyled");
const perPageCount = 10;

const getContent = (start, end, stopPaginationRender = false) => {
  axios
    .get(`http://localhost:3000/posts?_start=${start}&_end=${end}`)
    .then((response) => {
      const totalCount = response.headers["x-total-count"];

      const countPaginationNumber = Math.floor(totalCount / perPageCount);

      renderPostList(response.data);

      if (!stopPaginationRender) {
        renderPagination(countPaginationNumber);
      }
    });
};

getContent(0, 10, false);

const renderPostList = (postList) => {
  postListWrapper.innerHTML = "";

  postList.forEach((postItem) => {
    const postlistItem = document.createElement("li");
    postlistItem.classList.add("media");
    postlistItem.classList.add("mt-2");

    const postbody = document.createElement("div");

    const header = document.createElement("h5");
    header.classList.add("mt-0");
    header.classList.add("mb-1");
    header.innerHTML = postItem.title + postItem.id;

    const bodyContent = document.createElement("div");
    bodyContent.innerHTML = postItem.body;

    postbody.appendChild(header);
    postbody.appendChild(bodyContent);

    postlistItem.appendChild(postbody);

    postListWrapper.appendChild(postlistItem);
  });
};

const renderPagination = (countPaginationNumber) => {
  paginationWrapper.innerHTML = "";
  for (let i = 0; i < countPaginationNumber; i++) {
    const anchor = document.createElement("a");
    anchor.classList.add("page-link");
    anchor.setAttribute("href", "#");
    const count = i + 1;
    anchor.innerHTML = count;

    const pageItem = document.createElement("li");
    pageItem.classList.add("page-item");

    if (i === 0) {
      pageItem.classList.add("active");
    }

    pageItem.addEventListener("click", (event) => {
      const end = count * perPageCount;
      const start = end - perPageCount;

      console.log(start, end);

      getContent(start, end, true);

      // Remove All active class
      Array.from(paginationWrapper.querySelectorAll("li")).forEach(
        (listItem) => {
          listItem.classList.remove("active");
        }
      );

      pageItem.classList.add("active");
    });

    pageItem.appendChild(anchor);

    paginationWrapper.appendChild(pageItem);
  }
};