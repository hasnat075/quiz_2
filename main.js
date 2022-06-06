const proxy = "https://hasnat-assignemnt-2.herokuapp.com/";

$(document).ready(() => {
  getRecords();

  var name, type, price;
  $("#product_type").change((e) => {
    if (e.target.value) type = e.target.value;
  });
  $("#product_price").change((e) => {
    if (e.target.value) {
      price = parseInt(e.target.value);
    }
  });
  $("#product_name").change((e) => {
    if (e.target.value) name = e.target.value;
  });
  $("#submit").click((e) => {
    e.preventDefault();
    if (!name) {
      alert("Product Name is Empty");
      return;
    }
    if (!type) {
      alert("Product Type is Empty");
      return;
    }
    if (!price) {
      alert("Product Price is Empty");
      return;
    }
    obj = { name, type, price };
    $.post("http://localhost:8080/products", obj, (res) => {
      console.log(res);
      $("#product_name").val("");
      $("#product_type").val("");
      $("#product_price").val("");
      location.reload();
    });
  });
});

function del(e) {
  td = $(e).parent()[0];
  val = $(td).attr("value");
  $.get(proxy + "/products/delete/" + val);
  location.reload();
}
function update(e) {
  td = $(e).parent()[0];
  val = $(td).attr("value");
  $.get(proxy + "/products/details/" + val).then((res) => {
    $("#update").prop("disabled", false);
    $("#update").val(res._id);
    $("#submit").prop("disabled", true);
    $("#product_name").val(res.name);
    $("#product_type").val(res.type);
    $("#product_price").val(res.price);
  });
  // location.reload();
}

const getRecords = () => {
  $.get(proxy + "/products", (res) => {
    res.map((record, index) => {
      document.getElementById("tableBody").innerHTML += `<tr>
    <td scope="row" >${index + 1}</td>
    <td>${record.name}</td>
    <td>${record.type}</td>
    <td>${record.price}</td>
    <td value=${record._id}>
    <button  type="button"  onclick='update(this)' class="btn btn-warning" >Update</button> 
    <button type="button"  onclick='del(this)' class="btn btn-danger">Delete</button>
    </td>
  </tr>`;
    });
  });
};
async function edit(e) {
  btn = $(e)[0];
  id = $(btn).attr("value");
  var name, price, type;
  type = $("#product_type").val();
  price = $("#product_price").val();
  name = $("#product_name").val();
  if (name && type && price) {
    await $.post(proxy + "/products/edit", { name, type, price, id }, (res) => {
      if (res === "OK") {
        location.reload();
      }
    });
  } else {
    alert("Empty Fields Not Allowed");
  }
}
