import axios from "axios";

var paginationWrapper = document.querySelector(".pagination");
var postListWrapper = document.querySelector(".list-unstyled");
var perPageCount = 10;

var getContent = (start, end, stopPaginationRender = false) => {
  axios
    .get(`http://localhost:3000/posts?_start=${start}&_end=${end}`)
    .then((response) => {
      var totalCount = response.headers["x-total-count"];

      var countPaginationNumber = Math.floor(totalCount / perPageCount);

      renderPostList(response.data);

      if (!stopPaginationRender) {
        renderPagination(countPaginationNumber);
      }
    });
};

getContent(0, 10, false);

var renderPostList = (postList) => {
  postListWrapper.innerHTML = "";

  postList.forEach((postItem) => {
    var postlistItem = document.createElement("li");
    postlistItem.classList.add("media");
    postlistItem.classList.add("mt-2");

    var postbody = document.createElement("div");

    var header = document.createElement("h5");
    header.classList.add("mt-0");
    header.classList.add("mb-1");
    header.innerHTML = postItem.title + postItem.id;

    var bodyContent = document.createElement("div");
    bodyContent.innerHTML = postItem.body;

    postbody.appendChild(header);
    postbody.appendChild(bodyContent);

    postlistItem.appendChild(postbody);

    postListWrapper.appendChild(postlistItem);
  });
};

var renderPagination = (countPaginationNumber) => {
  paginationWrapper.innerHTML = "";
  for (let i = 0; i < countPaginationNumber; i++) {
    var anchor = document.createElement("a");
    anchor.classList.add("page-link");
    anchor.setAttribute("href", "#");
    var count = i + 1;
   
    anchor.innerHTML = count;

    var pageItem = document.createElement("li");
    pageItem.classList.add("page-item");

    if (i === 0) {
      pageItem.classList.add("active");
    }

    pageItem.addEventListener("click", (event) => {
      var end = count * perPageCount;
      var start = end - perPageCount;

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