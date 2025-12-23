const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let userImage = new Image();
let frameImage = new Image();

let userLoaded = false;
let frameLoaded = false;

// Upload user image
document.getElementById("upload").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    userImage.src = reader.result;
  };
  reader.readAsDataURL(file);
});

userImage.onload = () => {
  userLoaded = true;
  draw();
};

// Frame select
const frameSelect = document.getElementById("frameSelect");
frameImage.src = frameSelect.value;

frameSelect.addEventListener("change", () => {
  frameLoaded = false;
  frameImage.src = frameSelect.value;
});

frameImage.onload = () => {
  frameLoaded = true;
  draw();
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw user image FIRST
  if (userLoaded) {
    ctx.drawImage(userImage, 0, 0, canvas.width, canvas.height);
  }

  // Draw frame LAST (overlay)
  if (frameLoaded) {
    ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
  }
}

// Download
document.getElementById("download").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "framed-image.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
