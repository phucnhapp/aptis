class ExamTimer extends HTMLElement {
    // Hàm này chạy khi thẻ được chèn vào HTML
    connectedCallback() {
        // Lấy thời gian từ thuộc tính 'minutes' (vd: minutes="30"), nếu không có thì mặc định là 15
        let initialMinutes = this.getAttribute('minutes') || 15;

        // 1. Tạo Giao diện (HTML & CSS) - Đã bỏ nút và ô input
        this.innerHTML = `
            <style>
                .timer-wrapper {
                    font-family: Arial, sans-serif;
                    background: white; padding: 10px 10px; border-radius: 10px;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center;
                    display: inline-block; /* Để khối này tự động thu hẹp theo nội dung */
                }
                .timer-display { 
                    font-size: 25px; font-weight: bold; color: #d9534f; 
                    font-family: monospace; margin: 0;
                }
            </style>
            
            <div class="timer-wrapper">
                <div class="timer-display">--:--</div>
            </div>
        `;

        // 2. Xử lý Logic (JavaScript)
        const display = this.querySelector('.timer-display');
        
        let minutes = parseInt(initialMinutes);
        if (isNaN(minutes) || minutes <= 0) {
            display.innerText = "Lỗi!";
            return;
        }

        let timeInSeconds = minutes * 60;

        // Hiển thị thời gian ban đầu lên màn hình ngay lập tức
        this.updateDisplay(timeInSeconds, display);

        // Tự động kích hoạt bộ đếm ngay khi trang vừa tải
        let timerInterval = setInterval(() => {
            timeInSeconds--;
            this.updateDisplay(timeInSeconds, display);

            if (timeInSeconds <= 0) {
                clearInterval(timerInterval);
                setTimeout(() => alert("Đã hết thời gian làm bài!"), 50);
            }
        }, 1000);
    }

    // Hàm phụ trợ để format số phút:giây
    updateDisplay(totalSeconds, displayElement) {
        let m = Math.floor(totalSeconds / 60);
        let s = totalSeconds % 60;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;
        displayElement.innerText = m + ":" + s;
    }
}

// Đăng ký thẻ HTML tự chế với trình duyệt
customElements.define('exam-timer', ExamTimer);