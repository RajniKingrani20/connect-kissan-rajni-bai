const btn = document.getElementById("generate");
const nameEl = document.getElementById("name");
const cityEl = document.getElementById("city");
const provinceEl = document.getElementById("province");
const addressEl = document.getElementById("address");
const noItems = document.getElementById("empty");
userCart = JSON.parse(localStorage.getItem("itemcart"));
apiCart = [];

console.log(userCart);

function initCartItems() {
  var item = "";
  if (userCart !== null) {
    item =
      item +
      `    <div class="cart-header">
  <h2 id="empty">Your Cart</h2>
</div>`;
    userCart.forEach((element) => {
      item =
        item +
        `<div class="item">
    <img class="ok" src=${element.itemImg} />
    <div>
      <h4 class="i-name">Item Name: <span class="i-name">${element.itemName}</span></h4>
      <h4>Item Type: <span>${element.itemType}</span></h4>
      <h4>Item Price(Rs): <span>${element.itemPrice}</span></h4>
      <p>
        Item Description:
        <span>${element.itemDetails}</span>
      </p>
      
        <h4>Dealer Name: <span>${element.itemUserName}</span></h4>
        <h4>Dealer Contact: <span>${element.itemUserPhone}</span></h4>
      
    </div>
  </div>`;
      //<div class="dealer-info">
      //</div>
    });
  } else {
    item = `<div class="item" id="item">
      <h3>No items</h3>
    </div>`;
    // noItems.innerText = "No Items";
  }

  if (item != "") {
    document.querySelector("#cart-items").innerHTML = item;
  } else {
    document.querySelector("#cart-items").classList.remove("cart-items");
    noItems.innerText = "No Items";
  }
}

initCartItems();

function settings() {
  let total = parseFloat("0");
  if (userCart != null) {
    userCart.forEach((element) => {
      console.log(element);
      total = parseFloat(total) + parseFloat(element.itemPrice);
      var itemObj = {
        item: element.itemName,
        description: element.itemType,
        quantity: 1,
        price: parseFloat(element.itemPrice + ".0"),
        tax: "",
      };

      apiCart.push(itemObj);
    });
  }
  return total;
}
9;
function getAllDealers() {
  var dealers = "";
  if (userCart != null) {
    userCart.forEach((element) => {
      dealers = dealers + element.itemUserName + "\n";
    });
  }
  return dealers;
}

dealers = getAllDealers();

console.log(apiCart);
total = settings();
total = parseFloat(total + ".0");

var invoiceApiUrl = "http://localhost:8080/api/invoice/";
var invoiceDownloadApiUrl = "http://localhost:8080/api/invoice/download";

btn.addEventListener("click", function (event) {
  event.preventDefault();
  console.log(event.target);
  var name = nameEl.value;
  var city = cityEl.value;
  var province = provinceEl.value;
  var address = addressEl.value;
  console.log(name, city, province, address);
  generateInvoice(name, city, province, address, apiCart, total, dealers);
});

async function generateInvoice(
  name,
  city,
  province,
  address,
  items,
  total,
  dealers
) {
  let invoiceData = {
    name: name,
    city: city,
    state: province,
    address: address,
    dealers: dealers,
    items: items,
    total: total,
  };

  var invoiceResponse = await fetch(invoiceApiUrl, {
    method: "POST",
    headers: {
      "User-Agent": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoiceData),
  });
  var filename = name + "-Invoice.pdf";

  if (userCart != null) {
    downloadFile(filename);
    localStorage.removeItem("itemcart");
    console.log("file downloaded and cart deleted from local storage");
  } else {
    console.log("jshgd");
  }
}

async function downloadFile(filename) {
  var fileResponse = await fetch(invoiceDownloadApiUrl + `/${filename}`, {
    method: "GET",
    headers: {
      "User-Agent": "*",
      "Content-Type": "application/json",
    },
  });
}
