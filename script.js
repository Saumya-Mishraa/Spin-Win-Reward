let canvas = document.getElementById("wheelCanvas");
let ctx = canvas.getContext("2d");
let names = ["Apple", "Banana", "Chocolate", "Mobile Cover", "Free Coffee", "Gift Voucher"];
let angle = 0;
let spinning = false;

function drawWheel() {
    let arc = (2 * Math.PI) / names.length;

    for (let i = 0; i < names.length; i++) {
        let startAngle = i * arc;
        ctx.beginPath();
        ctx.fillStyle = randomColor(i);
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 200, startAngle, startAngle + arc);
        ctx.fill();

        // TEXT
        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(startAngle + arc / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = "18px Arial";
        ctx.fillText(names[i], 170, 10);
        ctx.restore();
    }
}

function randomColor(i) {
    const colors = ["#FF6F91","#FF9671","#FFC75F","#F9F871","#D65DB1","#845EC2","#2C73D2"];
    return colors[i % colors.length];
}

drawWheel();


document.getElementById("updateBtn").onclick = function () {
    let text = document.getElementById("names").value.trim();
    names = text.split("\n").filter(n => n.trim() !== "");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWheel();
};

document.getElementById("spinBtn").onclick = function () {
    if (spinning) return;
    spinning = true;

    let rotate = Math.random() * 360 + 2000; // 5 rounds
    let start = angle;
    let end = start + rotate;
    let startTime = performance.now();
    let duration = 5000;

    function animate(time) {
        let progress = Math.min((time - startTime) / duration, 1);
        angle = start + (end - start) * easeOut(progress);
        canvas.style.transform = `rotate(${angle}deg)`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            showResult();
        }
    }
    requestAnimationFrame(animate);
};

function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
}

function showResult() {
    let finalAngle = angle % 360;
    let sliceAngle = 360 / names.length;
    let index = Math.floor((360 - finalAngle) / sliceAngle);
    if (index >= names.length) index = 0;

    document.getElementById("popupText").innerHTML = "You Won: <br><b>" + names[index] + "</b>";
    document.getElementById("popup").style.display = "flex";
}

// Close Popup
document.getElementById("closePopup").onclick = function () {
    document.getElementById("popup").style.display = "none";
};
