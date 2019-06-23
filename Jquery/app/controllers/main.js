$(document).ready(function() {
    var quanLyNguoiDung = new QuanLyNguoiDung();
    var danhsachNguoiDungService = new DanhsachNguoiDungService();

    //Lấy dữ liệu trả về từ ajax
    var resultAjax = danhsachNguoiDungService.layDanhSachNguoiDung();
    resultAjax
        .done(
            function(result) {
                quanLyNguoiDung.mangNguoiDung = result;
                HienThi();
                localStorage.setItem("DSND", JSON.stringify(result));
            }
        )
        .fail(
            function(err) {
                console.log(err);
            }
        )
        // console.log(resultAjax);


    //Function show modal
    function showModal(title, buttonLabel, buttonID) {
        var modalTitle = $("#modal-title");
        modalTitle.text(title);
        console.log(modalTitle);

        // `` được gọi là template string
        var contentFooter = `
			<button id="btn${buttonID}" type="button" class="btn btn-warning">${buttonLabel}</button>
			<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
		`;

        var modalFooter = $("#modal-footer");
        modalFooter.html(contentFooter);
    }

    $("#btnThemNguoiDung").click(function() {
        showModal("Thêm Người Dùng", 'Thêm', "ThemND");
    });

    //Them nhân vien
    //delegate : xác định một element tồn tại, và nó sẽ chờ sự kiện click xảy ra
    $("body").delegate("#btnThemND", "click", function() {
        //Lấy thông tin
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDT = $("#SoDienThoai").val();
        var maLoaiNguoiDung = $("#MaLoaiNguoiDung").val();

        var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, maLoaiNguoiDung);
        // console.log(nguoiDung);

        var ajax = danhsachNguoiDungService.themNguoiDung(nguoiDung);
        ajax
            .done(
                function(result) {
                    if (result == "tai khoan da ton tai!") {
                        alert("Tài khoản và họ tên đã tồn tại, vui lòng nhập tai khoan khac"); // Do API error : Giống tài khoản và họ tên mới hiển thị thông báo lỗi
                    } else {
                        location.reload();
                    }
                }
            )
            .fail(
                function(err) {
                    console.log(err);
                }
            )

        // console.log(quanLyNguoiDung.mangNguoiDung);
        // HienThi();
    });

    function HienThi() {
        var content = "";
        quanLyNguoiDung.mangNguoiDung.map(function(nguoiDung, index) {
            content += `
				<tr>
					<td>${index+1}</td>
					<td>${nguoiDung.TaiKhoan}</td>
					<td>${nguoiDung.MatKhau}</td>
					<td>${nguoiDung.HoTen}</td>
					<td>${nguoiDung.Email}</td>
					<td>${nguoiDung.SoDT}</td>
					<td>${nguoiDung.TenLoaiNguoiDung}</td>
					<td>
						<button class="btnSuaND btn btn-success" data-id="${nguoiDung.TaiKhoan}">Sửa</button>
						<button class="btnXoaND btn btn-danger" data-id="${nguoiDung.TaiKhoan}">Xóa</button>
					</td>
				</tr>
			`;
        });
        $("#tblDanhSachNguoiDung").html(content);
        $(".form-group input").val("");
    }


    //Xóa nhân viên
    $("body").delegate(".btnXoaND", "click", function() {
        //Lây thông tin cần xóa
        var taiKhoanCanXoa = $(this).data("id");

        var ajax = danhsachNguoiDungService.xoaNguoiDung(taiKhoanCanXoa);
        ajax
            .done(
                function(result) {
                    location.reload();
                }
            )
            .fail(
                function(err) {
                    console.log(err);
                }
            )
    });

    //Load thông tin lên bảng cập nhật
    $("body").delegate(".btnSuaND", "click", function() {
        //Load thong tin len form
        var taiKhoanCanSua = $(this).data("id");

        var ajax = danhsachNguoiDungService.thongTinNguoiDung(taiKhoanCanSua);
        ajax
        	.done(
                function(result) {
                   console.log("Mang" + result);
                }
            )
            .fail(
                function(err) {
                    console.log(err);
                }
            )

        console.log("Mang" + thongTin);
        $("#TaiKhoan").val(taiKhoanCanSua);
        $("#HoTen").val(thongTin.HoTen);
        $("#MatKhau").val(thongTin.MatKhau);
        $("#Email").val(thongTin.Email);
        $("#SoDienThoai").val(thongTin.SoDT);
        $("#MaLoaiNguoiDung").val(thongTin.MaLoaiNguoiDung);

        $("#TaiKhoan").attr("readonly", 'readonly');

        showModal("Cập Nhật Người Dùng", 'Cập Nhật', "capNhatND");

        $("#myModal").addClass('show').show();
        $("body").addClass('modal-open');
        $("body").append('<div class="modal-backdrop fade show"></div>');
    })

    //Cập nhật người dùng
    $("body").delegate("#btncapNhatND", "click", function() {
        //Lấy thông tin
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDT = $("#SoDienThoai").val();
        var maLoaiNguoiDung = $("#MaLoaiNguoiDung").val();

        var nguoiDungMoi = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, maLoaiNguoiDung);
        var ajax = quanLyNguoiDung.capNhatNguoiDung(JSON.stringify(nguoiDungMoi));
        ajax
            .done(
                function(result) {
                    location.reload();
                }
            )
            .fail(
                function(err) {
                    console.log(err);
                }
            )
    })
});