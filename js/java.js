var count = 0;
let productNameInp = document.getElementById("productName");
let productPriceInp = document.getElementById("productPrice");
let productCompanyInp = document.getElementById("productCompany");
let productDescInp = document.getElementById("productDesc");
let addBtn = document.getElementById("addBtn");
let search1 = document.getElementById("search");
let searchout1 = document.getElementById("searchout");
let productscontiner;

if (localStorage.getItem("productscontiner") == null) {
    productscontiner = [];
}
else {
    productscontiner = JSON.parse(localStorage.getItem("productscontiner"));
    showdata();
}

search1.onkeyup = function () {
    search(search1.value)
}


function search(term) {
    var searchout = "";
    for (var i = 0; i < productscontiner.length; i++) {
        if (productscontiner[i].name.includes(term)) {
            searchout += `
                <div class="col-md ">
                    <h1>${productscontiner[i].name}</h1>
                    <h5>${productscontiner[i].price}</h5>
                    <p>${productscontiner[i].company}</p>
                    <p>${productscontiner[i].desc}</p>
                </div>
            `;
            searchout1.innerHTML = searchout;
        }

}
}


addBtn.onclick = function () {
    if (addBtn.innerHTML == "submit") {
        getelement();
        showdata();
        cleardata();
    }
    else {
        updateproduct();
    }

}

function getelement() {
    var products =
    {
        name: productNameInp.value,
        price: productPriceInp.value,
        desc: productDescInp.value,
        company: productCompanyInp.value
    };
        var namerx = /^[A-Z]\w{0,}$/;
        var pricerx = /^[0-9]{1,4}/;
        if (namerx.test(productNameInp.value) == true & pricerx.test(productPriceInp.value) == true) {
        productscontiner.push(products);
        localStorage.setItem("productscontiner", JSON.stringify(productscontiner));
    }
    else {
        alert("please enter valid name first char captial and price max 4 digits ");
    }
}

function showdata() {
    var cols = "";
    for (var i = 0; i < productscontiner.length; i++) {
        cols += `<div class="col-md-3">
        <h1>` + productscontiner[i].name + `</h1>
        <h5>` + productscontiner[i].price + `</h5>
        <p>` + productscontiner[i].desc + `</p>
        <p>` + productscontiner[i].company + `</p>
        <button class="btn btn-danger mx-2" onclick="setform(` + i +`)"> update</button>
        <button class="btn btn-info" onclick="deleteprod(` + i +` )"> delete</button></div>`
    }
    document.getElementById("rowData").innerHTML = (cols);
}

function setform(i) {
    productNameInp.value = productscontiner[i].name;
    productPriceInp.value = productscontiner[i].price;
    productDescInp.value = productscontiner[i].desc;
    productCompanyInp.value = productscontiner[i].company;
    addBtn.innerHTML = "update";
    count = i;
}

function updateproduct() {
    var namerx = /^[A-Z]\w{0,}$/;
    var pricerx = /^[0-9]{1,4}/;
    if (namerx.test(productNameInp.value) == true & pricerx.test(productPriceInp.value) == true) {
    productscontiner[count].name = productNameInp.value;
    productscontiner[count].price = productPriceInp.value;
    productscontiner[count].desc = productDescInp.value;
    productscontiner[count].company = productCompanyInp.value;
    localStorage.setItem("productscontiner", JSON.stringify(productscontiner));
    showdata();
    cleardata();
    addBtn.innerHTML = "submit";
    }
  
}


function cleardata() {
    var inputs = document.getElementsByClassName("form-control");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

function deleteprod(id) {
    productscontiner.splice(id, 1);
    localStorage.setItem("productscontiner", JSON.stringify(productscontiner));
    showdata();
};



