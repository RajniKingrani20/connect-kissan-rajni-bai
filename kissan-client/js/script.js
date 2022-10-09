// @desc Global Variables
var itemPORT = "http://localhost:8080/api/items/all";
var contactPORT = "http://localhost:8080/contact-us";
var singleItemURL = "http://localhost:8080/api/items/single";

var itemsCart = [];
var ok = {
  itemsCart: itemsCart,
};

let itemsArray = [];

//toggle small screen navbar
// var labelId = document.getElementById("navbar-chckd");
// var smallNav = document.getElementById("small-nav");
// labelId.addEventListener("click", () => {
//   smallNav.classList.toggle("show");
//   labelId.classList.toggle("show");
// });

// // small screen dropdown
// var servicesMenu = document.getElementById("services-menu-id");
// var dropdownContent = document.getElementById("dropdown-small");
// var servicesIcon = document.getElementById("services-icon-id");
// servicesMenu.addEventListener("click", () => {
//   dropdownContent.classList.toggle("show");
//   servicesIcon.classList.toggle("fa-caret-up");
// });

//Weather Fetching

// set variables for weather data
let city = "";
let cityGetBtn = document.getElementById("weather-get");
let weatherField = document.getElementById("weatherField");
let weatherDegree = document.querySelector(".weather-degree");
let cityName = document.querySelector(".city-name");
let countryName = document.querySelector(".country-name");
let cityForcast = document.querySelector(".city-forcast");
let weatherIcon = document.getElementById("weather-icon");

// api-key for data fetching
const api_Key = "4b36a8c51a0c99c38c1cfff230b8d126";

// function call on event listener
if (cityGetBtn) {
  cityGetBtn.addEventListener("click", async () => {
    city = weatherField.value;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_Key}&units=metric`
    );
    const data = await response.json();

    const { weather, name, sys, main } = data;
    const { temp } = main;
    weatherDegree.innerHTML = temp;
    cityName.innerHTML = name;
    countryName.innerHTML = sys.country;
    const weatherFor = weather.map((item) => item.main);
    cityForcast.innerHTML = weatherFor;

    if (
      weatherFor == "Dust" ||
      weatherFor == "Mist" ||
      weatherFor == "Haze" ||
      weatherFor == "Smoke"
    ) {
      weatherIcon.classList.add("fa-smog");
      weatherIcon.classList.remove("fa-cloud-showers-heavy");
      weatherIcon.classList.remove("fa-cloud");
      weatherIcon.classList.remove("fa-moon");
      weatherIcon.classList.remove("fa-snowflake");
    } else if (weatherFor == "Rain" || weatherFor == "Thunderstorm") {
      weatherIcon.classList.add("fa-cloud-showers-heavy");
      weatherIcon.classList.remove("fa-smog");
      weatherIcon.classList.remove("fa-cloud");
      weatherIcon.classList.remove("fa-moon");
      weatherIcon.classList.remove("fa-snowflake");
    } else if (weatherFor == "Clouds") {
      weatherIcon.classList.add("fa-cloud");
      weatherIcon.classList.remove("fa-smog");
      weatherIcon.classList.remove("fa-cloud-showers-heavy");
      weatherIcon.classList.remove("fa-moon");
      weatherIcon.classList.remove("fa-snowflake");
    } else if (weatherFor == "Clear") {
      weatherIcon.classList.add("fa-moon");
      weatherIcon.classList.remove("fa-smog");
      weatherIcon.classList.remove("fa-cloud-showers-heavy");
      weatherIcon.classList.remove("fa-cloud");
      weatherIcon.classList.remove("fa-snowflake");
    } else if (weatherFor == "Snow") {
      weatherIcon.classList.add("fa-snowflake");
      weatherIcon.classList.remove("fa-moon");
      weatherIcon.classList.remove("fa-smog");
      weatherIcon.classList.remove("fa-cloud-showers-heavy");
      weatherIcon.classList.remove("fa-cloud");
    } else {
      weatherIcon.classList.add("fa-moon");
      weatherIcon.classList.remove("fa-smog");
      weatherIcon.classList.remove("fa-cloud-showers-heavy");
      weatherIcon.classList.remove("fa-cloud");
      weatherIcon.classList.remove("fa-snowflake");
    }
  });
}

// @desc Get User Item
// DOMContentLoaded load all the items when client visit the website immediately
document.addEventListener("DOMContentLoaded", function () {
  getUserItem();
  getMachineItem();
  getCropItem();
  getPesticideItem();
});

async function getSingleItem(name) {
  const url = `http://localhost:8080/api/items/single/${name}`;
  console.log(url);
  const response = await fetch(url, {
    headers: {
      "User-Agent": "*",
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  console.log(responseData);
  console.log(responseData.item[0]);
  itemsCart.push(responseData.item[0]);
  console.log("Items Cart: ", itemsCart);
  localStorage.setItem("itemcart", JSON.stringify(itemsCart));
  console.log("local: ", JSON.parse(localStorage.getItem("itemcart")));
}

function addToCart(pr) {
  console.log(pr);
  for (let index = 0; index < pr.length; index++) {
    pr[index].addEventListener("click", function (e) {
      console.log(e.target);
      console.log(e.target.value);
      var productName = e.target.value;
      getSingleItem(productName);

      console.log(itemsCart);
      sessionStorage.setItem("usercart", JSON.stringify(itemsCart));
      localStorage.setItem("usercart", JSON.stringify(itemsCart));
    });
  }
}

async function getUserItem() {
  const response = await fetch(window.itemPORT, {
    headers: {
      "User-Agent": "*",
      "Content-Type": "application/json",
    },
  });
  const iData = await response.json();
  setupItems(iData);
}

async function getMachineItem() {
  const response = await fetch(window.itemPORT, {
    headers: {
      "User-Agent": "*",
      "Content-Type": "application/json",
    },
  });
  const iData = await response.json();
  setupMachineItem(iData);
}
async function getCropItem() {
  const response = await fetch(window.itemPORT, {
    headers: {
      "User-Agent": "*",
      "Content-Type": "application/json",
    },
  });
  const iData = await response.json();
  setupCropItem(iData);
}
async function getPesticideItem() {
  const response = await fetch(window.itemPORT, {
    headers: {
      "User-Agent": "*",
      "Content-Type": "application/json",
    },
  });
  const iData = await response.json();
  setupPesticideItem(iData);
}

const setupItems = (data) => {
  let item = "";
  if (data.length) {
    data.map((doc, index) => {
      const temp = `
              <div class="item" key=${index}>
                <img src=${doc.itemImg} />
                <div>
                  <h4 class="i-name">Item Name: <span class="i-name">${doc.itemName}</span></h4>
                  <h4>Item Type: <span>${doc.itemType}</span></h4>
                  <h4>Item Price(Rs): <span>${doc.itemPrice}</span></h4>
                  <p>
                    Item Description:
                    <span>${doc.itemDetails}</span>
                  </p>
                  <div class="dealer-info">
                    <h4>Dealer Name: <span>${doc.itemUserName}</span></h4>
                    <h4>Dealer Contact: <span>${doc.itemUserPhone}</span></h4>
                  </div>
                </div>
              </div>`;
      item += temp;
    });
  }
  if (item !== "") {
    document.querySelector(".item-content").innerHTML = item;
  } else {
    document.querySelector(".item-content").innerHTML =
      '<div class="item"><h4 class="center-align">No Items to Show!</h4></div>';
  }
};

const setupMachineItem = (data) => {
  let item = "";
  if (data.length) {
    data.map((doc, index) => {
      if (doc.itemType === "machine") {
        const temp = `
              <div class="item" key=${index}>
                <img src=${doc.itemImg} />
                <div>
                  <h4 class="i-name">Item Name: <span class="i-name">${doc.itemName}</span></h4>
                  <h4>Item Type: <span>${doc.itemType}</span></h4>
                  <h4>Item Price(Rs): <span>${doc.itemPrice}</span></h4>
                  <p>
                    Item Description:
                    <span>${doc.itemDetails}</span>
                  </p>
                  <div class="dealer-info">
                    <h4>Dealer Name: <span>${doc.itemUserName}</span></h4>
                    <h4>Dealer Contact: <span>${doc.itemUserPhone}</span></h4>
                  </div>
                  <div>
         <button id="addcart" value="${doc.itemName}">Add To Cart</button>


         </div>
                </div>
              </div>`;
        item += temp;
      }
    });
  }

  if (item !== "") {
    document.querySelector(".machine-content").innerHTML = item;
    console.log("machines api loaded");
    const machines = document.querySelectorAll("#addcart");
    addToCart(machines);
  } else {
    document.querySelector(".machine-content").innerHTML =
      '<div class="item"><h4 class="center-align">No Items to Show!</h4></div>';
  }
};

const setupCropItem = (data) => {
  let item = "";
  if (data.length) {
    data.map((doc, index) => {
      if (doc.itemType === "crop") {
        const temp = `
              <div class="item" key=${index}>
                <img src=${doc.itemImg} />
                <div>
                  <h4 class="i-name">Item Name: <span class="i-name">${doc.itemName}</span></h4>
                  <h4>Item Type: <span>${doc.itemType}</span></h4>
                  <h4>Item Price(Rs): <span>${doc.itemPrice}</span></h4>
                  <p>
                    Item Description:
                    <span>${doc.itemDetails}</span>
                  </p>
                  <div class="dealer-info">
                    <h4>Dealer Name: <span>${doc.itemUserName}</span></h4>
                    <h4>Dealer Contact: <span>${doc.itemUserPhone}</span></h4>
                  </div>
                  <div>
         <button id="cropcart" value="${doc.itemName}">Add To Cart</button>


         </div>
                </div>
              </div>`;
        item += temp;
      }
    });
  }
  if (item !== "") {
    document.querySelector(".crop-content").innerHTML = item;
    console.log("crops api loaded");
    const crops = document.querySelectorAll("#cropcart");
    addToCart(crops);
  } else {
    document.querySelector(".crop-content").innerHTML =
      '<div class="item"><h4 class="center-align">No Items to Show!</h4></div>';
  }
};

// const pr = document.querySelectorAll("#addcart");
// async function addToCart(pr) {
//   console.log(pr);
//   for (let index = 0; index < pr.length; index++) {
//     pr[index].addEventListener("click", function (e) {
//       console.log(e.target);
//       console.log(e.target.value);
//       itemsCart.push(e.target.value);
//       const url = `http://localhost:8080/api/items/single/${e.target.value}`;
//       console.log(url);
//       var data = await fetch(url).then((res) => itemsCart.push(res.json()));
//       console.log(data);
//       console.log(data.item);
//       console.log(itemsCart);
//     });
//   }
// }

const setupPesticideItem = (data) => {
  let item = "";
  if (data.length) {
    data.map((doc, index) => {
      if (doc.itemType === "pesticide") {
        const temp = `
        <div class="item" id="item" key=${index}>
        <img src=${doc.itemImg} />
       <div>
          <h4 class="i-name">Item Name: <span class="i-name">${doc.itemName}</span></h4>
          <h4>Item Type: <span>${doc.itemType}</span></h4>
         <h4>Item Price(Rs): <span id="price">${doc.itemPrice}</span></h4>
         <p>
           Item Description:
           <span>${doc.itemDetails}</span>
         </p>
         <div class="dealer-info">
           <h4>Dealer Name: <span>${doc.itemUserName}</span></h4>
           <h4>Dealer Contact: <span>${doc.itemUserPhone}</span></h4>
         </div>
         <div>
         <button id="addcart" value="${doc.itemName}">Add To Cart</button>


         </div>
       </div>
     </div>`;
        item += temp;
      }
    });
  }
  // <button id="addcart">Add To Cart</button>

  if (item !== "") {
    document.querySelector(".pesticide-content").innerHTML = item;
    console.log("api loaded");
    const pr = document.querySelectorAll("#addcart");
    addToCart(pr);
  } else {
    document.querySelector(".pesticide-content").innerHTML =
      '<div class="item"><h4 class="center-align">No Items to Show!</h4></div>';
  }
};

// @desc Contact Form Submission
if (document.getElementById("contactForm")) {
  document.getElementById("contactForm").onsubmit = function (e) {
    e.preventDefault();
    userContact();
  };
}

function sendEmail(body, emailAddress) {
  console.log("body in send email: ", body, emailAddress);
  Email.send({
    // Host: "smtp.gmail.com",
    Host: "smtp.elasticemail.com",
    Username: "sandeshbatrasn@gmail.com",
    Password: "12E3112F94212B377EC184EAABC89BB50696",
    To: emailAddress,
    From: "ayka.academic.solutions@gmail.com",
    Subject: "Response On Your Problem",
    Body: body,
  })
    .then(function (message2) {
      alert("mail sent successfully");
      console.log(message2);
    })

    .catch((err) => {
      console.log(err);
    });
}

async function userContact() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const emailAddress = document.getElementById("emailAddress").value;
  const phoneNum = document.getElementById("phoneNum").value;
  const message = document.getElementById("message").value;
  const contactInfo = { firstName, lastName, emailAddress, phoneNum, message };
  console.log(contactInfo);
  var body = `Your First Name: ${firstName}
  Your Last Name: ${lastName}
  Your Email Address: ${emailAddress}
  Your Phone No: ${phoneNum}
  Your Problem: ${message}

  Response from connect kissan: We have received your advice request. Our advicing experts will contact you on your provided email address!
  `;
  console.log(body);
  console.log("start");
  sendEmail(body, emailAddress);
  console.log("end");

  document.querySelector(".formSubmission").innerHTML = `
    <h3 style="margin: 1rem auto; text-align: center; color: #f1f1f1; font-size: 1rem">
      Thank You!
      We have received your advice request. Our advicing experts will contact you on your provided email address!
    </h3>
    <a
      style="
        color: #f1f1f1;
        background-color: rgb(236, 153, 0);
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
        margin: 1rem auto;
      "
      href="index.html">Home
    </a>`;

  await fetch(window.contactPORT, {
    method: "POST",
    headers: {
      "User-Agent": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactInfo),
  });
}

// // const generate =
// document.getElementById("generate").onsubmit(function (event) {
//   event.preventDefault();
//   console.log(event.target);
//   var name = nameEl.value;
//   var city = cityEl.value;
//   var province = provinceEl.value;
//   var address = addressEl.value;
//   console.log(name, city, province, address);
//   generateInvoice(name, city, province, address, items, total);
// });
// const nameEl = document.getElementById("name");
// const cityEl = document.getElementById("city");
// const provinceEl = document.getElementById("province");
// const addressEl = document.getElementById("address");
// let items = [
//   {
//     item: "Chair",
//     description: "Wooden chair",
//     quantity: 1,
//     price: 100.0,
//     tax: "",
//   },
//   {
//     item: "Watch",
//     description: "Wall watch for office",
//     quantity: 1,
//     price: 100.0,
//     tax: "",
//   },
//   {
//     item: "Water Glass Set",
//     description: "Water glass set for office",
//     quantity: 1,
//     price: 100.0,
//     tax: "",
//   },
// ];

// let total = 300.0;

// var invoiceApiUrl = "http://localhost:8080/api/invoice/";
// var invoiceDownloadApiUrl = "http://localhost:8080/api/invoice/download";

// // generate.addEventListener("click", function (event) {
// //   event.preventDefault();
// //   console.log(event.target);
// //   var name = nameEl.value;
// //   var city = cityEl.value;
// //   var province = provinceEl.value;
// //   var address = addressEl.value;
// //   console.log(name, city, province, address);
// //   generateInvoice(name, city, province, address, items, total);
// // });

// async function generateInvoice(name, city, province, address, items, total) {
//   let invoiceData = {
//     name: name,
//     city: city,
//     state: province,
//     address: address,
//     dealers: "kunal\nsandesh\nrajni",
//     items: items,
//     total: total,
//   };

//   var invoiceResponse = await fetch(invoiceApiUrl, {
//     method: "POST",
//     headers: {
//       "User-Agent": "*",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(invoiceData),
//   });
//   var filename = name + "-Invoice.pdf";

//   downloadFile(filename);
// }

// async function downloadFile(filename) {
//   var fileResponse = await fetch(invoiceDownloadApiUrl + `/${filename}`, {
//     method: "GET",
//     headers: {
//       "User-Agent": "*",
//       "Content-Type": "application/json",
//     },
//   });
// }4
