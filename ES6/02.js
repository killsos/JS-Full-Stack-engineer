function ajax({ method = "get", data }) {
    console.log(arguments);
}


ajax({
    method: "post",
    data: { "name": "ql" }
});