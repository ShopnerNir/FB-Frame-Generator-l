const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let userImage = new Image();
let frameImage = new Image();

// Upload user image
document.getElementById("upload").addEventListener("change", (e)=>{
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = function(event){
        userImage.src = event.target.result;
    }
    reader.readAsDataURL(file);
});

// Frame selection
const frameSelect = document.getElementById("frameSelect");
frameSelect.addEventListener("change", (e)=>{
    frameImage.src = e.target.value;
});
frameImage.src = frameSelect.value;

// Draw function
function drawImage(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(userImage.src) ctx.drawImage(userImage, 0,0,canvas.width,canvas.height);
    if(frameImage.src) ctx.drawImage(frameImage, 0,0,canvas.width,canvas.height);
}

userImage.onload = drawImage;
frameImage.onload = drawImage;

// Download functionality
document.getElementById("download").addEventListener("click", ()=>{
    const link = document.createElement('a');
    link.download = 'framed-image.png';
    link.href = canvas.toDataURL();
    link.click();
});
