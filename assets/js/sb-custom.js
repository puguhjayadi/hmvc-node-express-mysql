var table;


$(document).ready(function () {

    $("#image").change(function(){
        readURL(this);
    });


});


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#temp-'+input.id).attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function reloadDatatable(){
    table.ajax.reload();
}

function submit(form, url, redirect = '', title = '', type = '', text = ''){
    title   = (title != '') ? title : "Konfirmasi";
    type    = (type != '') ? type : "info";
    text    = (text != '') ? text : "Anda yakin data sudah benar?";
    swal({
        title: title, type: type, text: text,html : true,confirmButtonText: "Simpan",cancelButtonText: "Batal",
        confirmButtonColor: "#1da1f2",showCancelButton: true,closeOnConfirm: false,showLoaderOnConfirm: true,
    }, function () { 
        $.ajax({
            url: url,type: 'POST',data: form,processData: false,contentType: false,
            success: function (response) {
                if(response.success){
                    setTimeout(function(){
                        swal({
                            title:"Pesan",text: response.msg, type: response.icon,showConfirmButton:true,timer: 2000
                        }, function(){
                            (redirect != '') ? window.location = redirect : window.location.reload();
                        });
                    }, 1500);
                } else{
                    swal({title:"Pesan",text: response.msg, type: response.icon,showConfirmButton:true,timer: 2000});
                }
            },
        });
    });
}

function removeDatatable(confirm, url) {
    $('#dataTable').on('click', '.btn-delete', function(){
        var guid = $(this).attr('id');
        var obj = table.row($(this).closest('tr')).data();
        nameConf = (typeof obj[confirm] === 'undefined' || obj[confirm] === null) ? '' : obj[confirm];
        swal({
            title: "Konfirmasi",text: "Anda yakin untuk menghapus data?<br><b>"+nameConf+"</b>",
            html : true,type: "info",confirmButtonText: "Hapus",cancelButtonText: "Kembali",
            confirmButtonColor: "#1da1f2",showCancelButton: true,closeOnConfirm: false,showLoaderOnConfirm: true,
        }, function () { 
            $.get(url+guid, function(response) {
                swal({title:"Pesan",text: response.msg, html:true, type: response.icon,showConfirmButton:false,timer: 2000});
                reloadDatatable();
            });
        }); 
    });

}
