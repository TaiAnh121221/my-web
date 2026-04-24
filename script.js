const authSection = document.getElementById('auth-section');
const gallerySection = document.getElementById('gallery-section');
const btnMain = document.getElementById('btn-main');
const switchBtn = document.getElementById('switch-mode');
const formTitle = document.getElementById('form-title');
const rePassGroup = document.getElementById('re-pass-group');
const statusText = document.getElementById('status-text');
const bgMusic = document.getElementById('bg-music');

let isRegister = true;

// 1. MẸO BẬT NHẠC TỰ ĐỘNG: Ngay khi người dùng di chuột hoặc chạm vào web
const autoPlayMusic = () => {
    bgMusic.play().then(() => {
        ["click", "mousemove", "touchstart"].forEach(e => window.removeEventListener(e, autoPlayMusic));
    }).catch(err => console.log("Chờ tương tác..."));
};
["click", "mousemove", "touchstart"].forEach(e => window.addEventListener(e, autoPlayMusic));

// 2. CHUYỂN ĐỔI ĐĂNG KÝ / ĐĂNG NHẬP
switchBtn.addEventListener('click', () => {
    isRegister = !isRegister;
    formTitle.innerText = isRegister ? "ĐĂNG KÝ TÀI KHOẢN" : "ĐĂNG NHẬP";
    btnMain.innerText = isRegister ? "XÁC NHẬN ĐĂNG KÝ" : "VÀO HỆ THỐNG";
    rePassGroup.style.display = isRegister ? "block" : "none";
    switchBtn.innerText = isRegister ? "Đăng nhập ngay" : "Đăng ký tại đây";
});

// 3. XỬ LÝ LOGIC CHÍNH
btnMain.addEventListener('click', () => {
    const email = document.getElementById('user-email').value;
    const pass = document.getElementById('user-pass').value;

    if (!email || !pass) {
        statusText.innerText = "❌ Điền đủ thông tin đã!";
        return;
    }

    if (isRegister) {
        // Đăng ký
        localStorage.setItem('uEmail', email);
        localStorage.setItem('uPass', pass);
        statusText.innerText = "✅ Xong! Hãy Đăng nhập.";
        setTimeout(() => { isRegister = false; switchBtn.click(); }, 1000);
    } else {
        // Đăng nhập
        if (email === localStorage.getItem('uEmail') && pass === localStorage.getItem('uPass')) {
            // CHUYỂN CẢNH KHÔNG NGẮT NHẠC
            authSection.style.display = 'none';
            gallerySection.style.display = 'block';
        } else {
            statusText.innerText = "❌ Sai thông tin rồi!";
        }
    }
});