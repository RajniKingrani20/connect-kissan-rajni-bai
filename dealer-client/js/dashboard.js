// @desc Global Variables
var itemPORT = "http://localhost:8080/api/items/";
var currentUser = JSON.parse(localStorage.getItem("user")) || null;
let itemImage = "";

// @desc Call function onload
// DOMContentLoaded load the user when dealer visit the website immediately
document.addEventListener("DOMContentLoaded", function () {
  if (currentUser) {
    document.querySelector(".username").innerHTML = currentUser.name;
    document.querySelector(".userEmail").innerHTML = currentUser.email;
    document.querySelector(".dealerShip").innerHTML = currentUser.dealer;
    document.querySelector(".phone").innerHTML = currentUser.phone;
    document.querySelector(".icon").src = currentUser.userIcon;
  }
});

// @desc Get User Item
// @desc async function for data fetching
// @desc DOM event listener, call function on click
if (document.getElementById("get-item")) {
  document.getElementById("get-item").addEventListener("click", function (e) {
    e.preventDefault();
    getUserItem();
  });
}

// @desc async function for getting item from database
async function getUserItem() {
  const response = await fetch(window.itemPORT, {
    headers: {
      Authorization: `Bearer ${window.currentUser.token}`,
      "User-Agent": "*",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (data) {
    setupItems(data);
  }
}

// @desc Get User Item and Setup UI
// @desc DOM, call function on data fetching
const setupItems = (data) => {
  if (data.length) {
    let item = "";
    data.map((doc, index) => {
      const id = doc._id;
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
            <div>
              <button onclick="deleteUserItem('${id}')">Delete</button>
            </div>
          </div>
        </div>`;
      item += temp;
    });

    document.querySelector(".item-content").innerHTML = item;
  } else {
    document.querySelector(".item-content").innerHTML =
      '<div class="item"><h4 class="center-align">You have no items, add your items now!</h4></div>';
  }
};

// @desc Post Item By User
// @desc Store Html id scope in the variable
// @desc DOM event listener, call function on submit
if (document.getElementById("setItem")) {
  document.getElementById("setItem").onsubmit = function (e) {
    e.preventDefault();
    setItem();
  };
}

// @desc async function for setting item into database
async function setItem() {
  const itemName = document.getElementById("item-name").value;
  const itemDetails = document.getElementById("item-details").value;
  const itemType = document.getElementById("item-type").value;
  const itemPrice = document.getElementById("item-price").value;
  const itemImg = document.querySelector("#item-img");
  const itemUserName = window.currentUser.name;
  const itemUserPhone = window.currentUser.phone;

  var reader = new FileReader();
  reader.readAsDataURL(itemImg.files[0]);
  reader.onload = async function () {
    const img = reader.result; //base64encoded string
    window.itemImage = img;
  };

  if (!window.itemImage) {
    document.querySelector("#confirm-message").innerHTML =
      "Click again to confirm";
  } else {
    document.querySelector("#confirm-message").innerHTML = " ";
  }

  if (window.itemImage) {
    const resp = await fetch(window.itemPORT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${window.currentUser.token}`,
        "Content-Type": "application/json",
        "User-Agent": "*",
      },
      body: JSON.stringify({
        itemName,
        itemDetails,
        itemImg: window.itemImage,
        itemType,
        itemPrice,
        itemUserName,
        itemUserPhone,
      }),
    });
    const data = await resp.json();
    if (data) {
      document.getElementById("s-message").innerHTML = "Item add successfully!";
      document.getElementById("s-message").classList.add("success-message");
      getUserItem();
    }
  }
}

// @desc Delete User Item
// @desc async function for data deleting
async function deleteUserItem(id) {
  await fetch(`${window.itemPORT}${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${window.currentUser.token}`,
      "User-Agent": "*",
      "Content-Type": "application/json",
    },
  });
  getUserItem();
}
