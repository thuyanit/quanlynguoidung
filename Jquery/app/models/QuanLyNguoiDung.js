function QuanLyNguoiDung(){
	this.mangNguoiDung =[];

	//Method add user
	this.ThemNguoiDung = function (nguoiDung){
		this.mangNguoiDung.push(nguoiDung);
		// console.log(mangNguoiDung);
	}

	//Xoa nguoi dung ra khoi mang
	this.XoaNguoiDung = function (taiKhoanND){
		var index = this.indexPos(taiKhoanND);
        if(index!=-1){
        	this.mangNguoiDung.splice(index,1);
        }
	}

	//Cap nhat thong tin nguoi dung
	this.CapNhatNguoiDung = function (taiKhoanND, nguoidungMoi){
		var index = this.indexPos(taiKhoanND);
		if(index!=-1){
			this.mangNguoiDung[index] = nguoidungMoi;
		}
	}

	//Load thong tin len form
	this.LayThongTinNguoiDung = function(taiKhoanND){
		var index = this.indexPos(taiKhoanND);
		if(index!=-1){
			var nguoiDung = this.mangNguoiDung[index];
		}
		return nguoiDung;
	}

	//Tim vi tri nguoi dung trong danh sach nguoi dung
	this.indexPos = function (taiKhoan){
		for(var i=0; i<this.mangNguoiDung.length; i++){
		    var  nguoidung = this.mangNguoiDung[i];
		    if(taiKhoan === nguoidung.TaiKhoan){
		      return i;
		    }
		}
		return -1;
	}
}