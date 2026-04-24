const splash = document.getElementById('splash-screen');
const bgMusic = document.getElementById('bg-music');

// Khi nhấn vào bất cứ đâu trên màn hình chờ
splash.addEventListener('click', () => {
    splash.classList.add('hidden'); // Ẩn màn hình đen đi
    bgMusic.play(); // Bật nhạc lên
});
window.addEventListener('load', () => {
    const music = document.getElementById('bg-music');
    
    // Thử phát nhạc ngay khi load trang
    let promise = music.play();

    if (promise !== undefined) {
        promise.then(_ => {
            // Nếu phát được (trình duyệt cho phép) thì tốt
            console.log("Nhạc đang phát!");
        }).catch(error => {
            // Nếu bị chặn, ta sẽ chờ người dùng tương tác lần đầu
            console.log("Trình duyệt chặn autoplay. Nhạc sẽ phát sau khi bạn click.");
            
            const startMusic = () => {
                music.muted = false; // Bật tiếng lại
                music.play();
                document.removeEventListener('click', startMusic);
                document.removeEventListener('keydown', startMusic);
            };
            
            // Lắng nghe cả click và phím bấm
            document.addEventListener('click', startMusic);
            document.addEventListener('keydown', startMusic);
        });
    }
});
const formTitle = document.getElementById('form-title');
const btnMain = document.getElementById('btn-main');
const switchBtn = document.getElementById('switch-mode');
const rePassGroup = document.getElementById('re-pass-group');
const statusText = document.getElementById('status-text');

const emailInp = document.getElementById('user-email');
const passInp = document.getElementById('user-pass');
const rePassInp = document.getElementById('user-re-pass');

let isRegister = true;

switchBtn.addEventListener('click', () => {
    isRegister = !isRegister;
    if (isRegister) {
        formTitle.innerText = "ĐĂNG KÝ UCHIHA";
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

btnMain.addEventListener('click', () => {
    const email = emailInp.value;
    const pass = passInp.value;

    if (isRegister) {
        if (pass !== rePassInp.value) {
            statusText.innerText = "❌ Mật khẩu không khớp!";
            return;
        }
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPass', pass);
        statusText.innerText = "✅ Đăng ký xong! Đang chuyển trang...";
        setTimeout(() => switchBtn.click(), 1000);
    } else {
        const savedEmail = localStorage.getItem('userEmail');
        const savedPass = localStorage.getItem('userPass');
        if (email === savedEmail && pass === savedPass && email !== "") {
            window.location.href = "gallery.html";
        } else {
            statusText.innerText = "❌ Sai thông tin rồi!";
        }
    }
});
// --- Dán vào cuối file script.js ---
const splash = document.getElementById('splash-screen');
const logo = document.getElementById('sharingan-logo');
const bgMusic = document.getElementById('bg-music');

// Khi nhấn vào con mắt
logo.addEventListener('click', () => {
    bgMusic.play(); // Bật nhạc
    splash.classList.add('hidden'); // Ẩn màn hình đen đi
});