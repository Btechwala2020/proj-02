import { useEffect, useRef } from "react";

export default function Page4() {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const rand = (a, b) => Math.random() * (b - a) + a;
    const isMobile = window.innerWidth < 768;

    /* -------- RESPONSIVE FONT SIZES (mobile thoda bada) -------- */
    const HAPPY_SIZE = isMobile ? 115 : 160;
    const NEWYEAR_SIZE = isMobile ? 135 : 120;
    const YEAR_SIZE = isMobile ? 140 : 180;

    /* ---------------- FIREWORKS ---------------- */
    const fireworks = [];
    const sparks = [];

    class Firework {
      constructor() {
        this.x = rand(80, canvas.width - 80);
        this.y = canvas.height;
        this.ty = rand(120, canvas.height / 2);
        this.v = rand(6, 9);
        this.hue = rand(0, 360);
      }
      update() {
        this.y -= this.v;
        if (this.y <= this.ty) {
          explode(this.x, this.y, this.hue);
          return true;
        }
        return false;
      }
      draw() {
        ctx.fillStyle = `hsl(${this.hue},100%,60%)`;
        ctx.fillRect(this.x, this.y, 2, 10);
      }
    }

    class Spark {
      constructor(x, y, hue) {
        this.x = x;
        this.y = y;
        this.vx = rand(-4, 4);
        this.vy = rand(-4, 4);
        this.life = 60;
        this.hue = hue;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${this.hue},100%,60%)`;
        ctx.fill();
      }
    }

    function explode(x, y, hue) {
      for (let i = 0; i < 80; i++) sparks.push(new Spark(x, y, hue));
    }

    /* ---------------- TEXT PARTICLES ---------------- */
    const particles = [];
    const flow = (x, y, t) =>
      Math.sin(x * 0.006 + t) + Math.cos(y * 0.006 + t);

    class Particle {
      constructor(x, y, tx, ty, colorType) {
        this.x = x;
        this.y = y;
        this.tx = tx;
        this.ty = ty;
        this.vx = 0;
        this.vy = 0;
        this.r = rand(1.5, 2.8);
        this.colorType = colorType;
        this.hue = rand(0, 360);
        this.off = rand(0, Math.PI * 2);
      }

      update(t) {
        const dx = this.tx - this.x;
        const dy = this.ty - this.y;
        const a = flow(this.x, this.y, t);

        this.vx += dx * 0.035 + Math.cos(a + this.off) * 0.15;
        this.vy += dy * 0.035 + Math.sin(a + this.off) * 0.15;

        this.vx *= 0.92;
        this.vy *= 0.92;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);

        /* 🎨 COLOR CONTROL */
        if (this.colorType === "white") {
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#ffffff";
        } else if (this.colorType === "red") {
          ctx.fillStyle = `hsl(0,100%,60%)`;
          ctx.shadowColor = `hsl(0,100%,60%)`;
        } else if (this.colorType === "yellow") {
          ctx.fillStyle = `hsl(55,100%,60%)`;
          ctx.shadowColor = `hsl(55,100%,60%)`;
        }

        ctx.shadowBlur = 22;
        ctx.fill();
      }
    }

    function buildText(text, size, yOffset, colorType) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = `900 ${size}px Poppins, Arial`;
      ctx.fillText(text, canvas.width / 2, canvas.height / 2 + yOffset);

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      particles.length = 0;

      for (let y = 0; y < canvas.height; y += 5) {
        for (let x = 0; x < canvas.width; x += 5) {
          const i = (y * canvas.width + x) * 4;
          if (data.data[i + 3] > 150) {
            particles.push(
              new Particle(
                rand(0, canvas.width),
                canvas.height + rand(150, 350),
                x,
                y,
                colorType
              )
            );
          }
        }
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    /* ---------------- COUNTDOWN ---------------- */
    let countdown = 6;
    let phase = "countdown";
    let time = 0;

    function drawCountdown() {
      ctx.save();
      ctx.font = "bold 170px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = "white";
      ctx.shadowBlur = 30;
      ctx.shadowColor = "white";
      ctx.fillText(countdown, canvas.width / 2, canvas.height / 2);
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.05) fireworks.push(new Firework());
      for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].draw();
        if (fireworks[i].update()) fireworks.splice(i, 1);
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].draw();
        sparks[i].update();
        if (sparks[i].life <= 0) sparks.splice(i, 1);
      }

      if (phase === "countdown") {
        drawCountdown();
        if (time % 60 === 0) countdown--;
        if (countdown === 0) {
          phase = "happy";
          buildText("HAPPY", HAPPY_SIZE, isMobile ? -70 : -120, "white");
          time = 0;
        }
      }

      if (phase !== "countdown") {
        particles.forEach(p => {
          p.update(time * 0.03);
          p.draw();
        });
      }

      // NEW
if (phase === "happy" && time > 140) {
    buildText("NEW", NEWYEAR_SIZE, isMobile ? 20 : 20, "cyan");
    phase = "new";
    time = 0;
  }
  
  // YEAR
  if (phase === "new" && time > 120) {
    buildText("YEAR", NEWYEAR_SIZE, isMobile ? 20 : 80, "cyan");
    phase = "yearText";
    time = 0;
  }
  

  if (phase === "yearText" && time > 160) {
    buildText("2026", YEAR_SIZE, 0, "yellow");
    phase = "year";
  }
  

      time++;
      requestAnimationFrame(animate);
    }

    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  const startSound = () => {
    audioRef.current?.play();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        onClick={startSound}
        style={{ position: "fixed", inset: 0, background: "transparent" }}
      />
      
    </>
  );
}
