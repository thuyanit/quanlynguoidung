//Lớp đối tượng
function DanhsachNguoiDungService() {
    //Lấy danh sách người dùng từ server thông qua API
    this.layDanhSachNguoiDung = function() {
            return $.ajax({
                    url: 'http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung',
                    type: 'GET',
                    // dataType: 'json',
                    // data: {param1: 'value1'},
                })
                // .done(function(result) {
                // 	console.log(result);
                // })
                // .fail(function(err) {
                // 	console.log(err);
                // })
                // .always(function() {
                // 	console.log("complete");
                // });

        }
        //Them nguoi dung
    this.themNguoiDung = function(dataNguoiDung) {
        return $.ajax({
            url: 'http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung',
            type: 'POST',
            // dataType: 'json', //Header
            data: dataNguoiDung, //Body
        })
    }

    //Xoa nguoi dung
    this.xoaNguoiDung = function(id) {
        return $.ajax({
            url: 'http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/' + id,
            type: 'DELETE',
        })
    }

    //Cập nhật thông tin nguo dùng
    this.capNhatNguoiDung = function() {
        return $.ajax({
            url: 'http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung/',
            type: 'PUT',
        })
    }

    //Lấy thông tin người dùng
    this.thongTinNguoiDung = function(TaiKhoan){
    	return $.ajax({
    		url: "http://svcy.myclass.vn/api/QuanLyTrungTam/ThongTinNguoiDung?taikhoan="+TaiKhoan,
    		type: 'GET',
    	})
    	
    }
}