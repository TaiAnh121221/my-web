// 1. KHAI BÁO BIẾN
const splash = document.getElementById('splash-screen');
const bgMusic = document.getElementById('bg-music');
const formTitle = document.getElementById('form-title');
const btnMain = document.getElementById('btn-main');
const switchBtn = document.getElementById('switch-mode');
const rePassGroup = document.getElementById('re-pass-group');
const statusText = document.getElementById('status-text');

const emailInp = document.getElementById('user-email');
const passInp = document.getElementById('user-pass');
const rePassInp = document.getElementById('user-re-pass');

let isRegister = true;

// 2. XỬ LÝ MÀN HÌNH CHỜ (SPLASH SCREEN) VÀ NHẠC
if (splash) {
    splash.addEventListener('click', () => {
        // Ẩn màn hình đen
        splash.classList.add('hidden');
        
        // Bật nhạc
        if (bgMusic) {
            bgMusic.muted = false;
            bgMusic.play().catch(err => console.log("Nhạc chờ tương tác:", err));
        }
    });
}

// 3. CHUYỂN ĐỔI ĐĂNG KÝ / ĐĂNG NHẬP
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

// 4. XỬ LÝ LƯU TRỮ (LOCALSTORAGE)
btnMain.addEventListener('click', () => {
    const email = emailInp.value;
    const pass = passInp.value;

    if (!email || !pass) {
        statusText.innerText = "❌ Vui lòng nhập đủ thông tin!";
        return;
    }

    if (isRegister) {
        // Logic Đăng ký
        if (pass !== rePassInp.value) {
            statusText.innerText = "❌ Mật khẩu không khớp!";
            return;
        }
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPass', pass);
        statusText.innerText = "✅ Đăng ký xong! Đang chuyển trang...";
        setTimeout(() => { isRegister = false; switchBtn.click(); }, 1000);
   // ... đoạn code phía trên giữ nguyên ...
    } else {
        // Đây là Logic Đăng nhập
        const savedEmail = localStorage.getItem('userEmail');
        const savedPass = localStorage.getItem('userPass');

        if (email === savedEmail && pass === savedPass) {
            // --- ĐÂY CHÍNH LÀ BƯỚC 2: THAY THẾ LỆNH CHUYỂN TRANG ---
            
            const authSection = document.getElementById('auth-section');
            const gallerySection = document.getElementById('gallery-section');

            if (authSection && gallerySection) {
                authSection.style.display = 'none';    // Ẩn Form
                gallerySection.style.display = 'block'; // Hiện Gallery
            }

            // ---------------------------------------------------
        } else {
            statusText.innerText = "❌ Sai thông tin rồi!";
        }
    }
}); // Kết thúc nút btnMain