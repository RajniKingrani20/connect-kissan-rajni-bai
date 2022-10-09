// @desc Global Variables
var itemPORT = "http://localhost:8080/api/items/all/";

// @desc Get User Item
// DOMContentLoaded load all the items when client visit the website immediately
document.addEventListener("DOMContentLoaded", function () {
  getUserItem();
});

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
