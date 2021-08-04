$(document).ready(function () {
   let item, tile, author, publisher, bookLink, bookImg;
   let outputList = document.getElementById("list-output");
   let bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
   let apiKey = "key=AIzaSyDtXC7kb6a7xKJdm_Le6_BYoY5biz6s8Lw";
   let placeHldr = '<img src="https://via.placeholder.com/150">';
   let searchData;

   // not to allow number and symbls  ??//not working code on index.htmml
   function lettersOnly(input) {
      let regex = /[^a-z]/gi;
      input.value = input.value.replace(regex, "");
   };

   //listener for search button
   $("#search").click(function () {
      outputList.innerHTML = "";
      document.body.style.backgroundImage = "url('')";
      searchData = $("#search-box").val();
      if (searchData === "" || searchData === null) {
         displayError();
      }
      else {
         $.ajax({
            url: bookUrl + searchData,
            dataType: "json",
            success: function (response) {
               console.log(response)
               if (response.totalItems === 0) {
                  alert("No result! Try again")
               }
               else {
                  $("#title").animate({ 'margin-top': '5px' }, 3000); //search box animation
                  $(".book-list").css("visibility", "visible");
                  displayResults(response);
               }
            },
            error: function () {
               alert("Something went wrong.." + "Try again!");
            }
         });
      }
      $("#search-box").val(""); //clearn search box
   });

   function displayResults(response) {
      for (let i = 0; i < response.items.length; i += 2) {
         item = response.items[i];
         title1 = item.volumeInfo.title;
         author1 = item.volumeInfo.authors;
         publisher1 = item.volumeInfo.publisher;
         bookLink1 = item.volumeInfo.previewLink;
         bookIsbn = item.volumeInfo.industryIdentifiers[1].identifier
         bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;

         item2 = response.items[i + 1];
         title2 = item2.volumeInfo.title;
         author2 = item2.volumeInfo.authors;
         publisher2 = item2.volumeInfo.publisher;
         bookLink2 = item2.volumeInfo.previewLink;
         bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier
         bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHldr;

         outputList.innerHTML += '<div class="row mt-4">' +
            formatOutput(bookImg1, title1, author1, publisher1, bookLink1, bookIsbn) +
            formatOutput(bookImg2, title2, author2, publisher2, bookLink2, bookIsbn2) +
            '</div>';

         console.log(outputList);
      }
   }


   function formatOutput(bookImg, title, author, publisher, bookLink, bookIsbn) {
      let viewUrl = 'book.html?isbn=' + bookIsbn; //constructing link for bookviewer
      let htmlCard = `<div class="col-lg-6">
        <div class="card" style="">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img src="${bookImg}" class="card-img" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">Author: ${author}</p>
                <p class="card-text">Publisher: ${publisher}</p>
                <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Read Book</a>
              </div>
            </div>
          </div>
        </div>
      </div>`
      return htmlCard;
   }

   //handling error for empty search box
   function displayError() {
      alert("search term can not be empty!")
   }

});
