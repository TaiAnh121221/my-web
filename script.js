// Khai báo các thành phần
const splash = document.getElementById('splash-screen');
const bgMusic = document.getElementById('bg-music');
const authSection = document.getElementById('auth-section');
const gallerySection = document.getElementById('gallery-section');

const btnMain = document.getElementById('btn-main');
const switchBtn = document.getElementById('switch-mode');
const formTitle = document.getElementById('form-title');
const rePassGroup = document.getElementById('re-pass-group');
const statusText = document.getElementById('status-text');

const emailInp = document.getElementById('user-email');
const passInp = document.getElementById('user-pass');
const rePassInp = document.getElementById('user-re-pass');

let isRegister = true;

// 1. Xử lý Màn hình chờ & Nhạc
splash.addEventListener('click', () => {
    splash.classList.add('hidden'); // Ẩn màn hình đen
    bgMusic.play().catch(err => console.log("Yêu cầu tương tác để phát nhạc"));
});

// 2. Chuyển đổi Đăng ký / Đăng nhập
switchBtn.addEventListener('click', () => {
    isRegister = !isRegister;
    if (isRegister) {
        formTitle.innerText = "ĐĂNG KÝ TÀI KHOẢN";
        btnMain.innerText = "XÁC NHẬN ĐĂNG KÝ";
        rePassGroup.style.display = "block";
        switchBtn.innerText = "Đăng nhập ngay";
    } else {
        formTitle.innerText = "ĐĂNG NHẬP";
        btnMain.innerText = "VÀO HỆ THỐNG";
        rePassGroup.style.display = "none";
        switchBtn.innerText = "Đăng ký tại đây";
    }
});

// 3. Xử lý logic nút Chính (Quan trọng nhất)
btnMain.addEventListener('click', () => {
    const email = emailInp.value;
    const pass = passInp.value;

    if (!email || !pass) {
        statusText.innerText = "❌ Nhập đủ thông tin đi nhẫn giả!";
        return;
    }

    if (isRegister) {
        // Logic Đăng ký
        if (pass !== rePassInp.value) {
            statusText.innerText = "❌ Mật khẩu không khớp!";
            return;
        }
        localStorage.setItem('uEmail', email);
        localStorage.setItem('uPass', pass);
        statusText.innerText = "✅ Đăng ký thành công! Hãy đăng nhập.";
        setTimeout(() => { isRegister = false; switchBtn.click(); }, 1000);
    } else {
        // Logic Đăng nhập & Chuyển cảnh xuyên suốt
        const sEmail = localStorage.getItem('uEmail');
        const sPass = localStorage.getItem('uPass');

        if (email === sEmail && pass === sPass) {
            statusText.innerText = "✅ Đang vào kho lưu trữ...";
            
            // LỆNH ẢO THUẬT: Ẩn form, Hiện Gallery
            authSection.style.display = 'none';
            gallerySection.style.display = 'block';
            
            // NHẠC VẪN CHẠY VÌ KHÔNG ĐỔI TRANG!
        } else {
            statusText.innerText = "❌ Thông tin sai rồi!";
        }
    }
});