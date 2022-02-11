//@ts-nocheck

import { Button } from "@nextui-org/react";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Link } from "remix";
import { log } from "~/utils";

export default function Index() {
  log(isMobile)
  return isMobile ?
    <Home /> : (
      <StarsBackground>
        <Home />
      </StarsBackground>
    )
}

const Home = () => {
  return (
    <>
      <NavBar />
      <section className="flex flex-col items-center justify-center min-h-screen" style={{ fontFamily: "system-ui, sans-serif" }}>
        <h1 className="text-center px-2">Hello world, I'm Piero Rolando</h1>
        <div className="my-10 flex max-w-4xl justify-center w-full mx-auto h-5">
          <a href="https://gitlab.com/piero_rolando" target="_blank" className="w-20 h-5">
            <img className="grayscale w-full h-full opacity-70" src="https://cdn.svgporn.com/logos/gitlab.svg" />
          </a>
          <a href="https://github.com/pierorolando1" target="_blank" className="w-20 h-5">
            <img className="grayscale w-full h-full opacity-50" style={{ filter: 'invert(1)' }} src="https://cdn.svgporn.com/logos/github-icon.svg" />
          </a>
          <a href="https://stackoverflow.com/users/15279700/piero-rolando" target="_blank" className="w-20 h-5">
            <img className="grayscale w-full h-full opacity-70" src="https://cdn.svgporn.com/logos/stackoverflow-icon.svg" />
          </a>
          <a href="https://www.linkedin.com/in/piero-rolando-8770ba203/" target="_blank" className="w-20 h-5">
            <img className="grayscale w-full h-full" src="https://cdn.svgporn.com/logos/linkedin-icon.svg" />
          </a>
        </div>
        <Link to="/blog">
          <Button shadow>Go to Blog</Button>
        </Link>
      </section>
      <section className="max-w-5xl mx-auto min-h-screen">
        <h2>Proyects</h2>
      </section>
    </>
  )
}

const NavBar = () => {
  return (
    <nav className="fixed px-2 h-20 bg-black/20 backdrop-blur-md w-full" style={{ zIndex: 1000 }}>
      <div
        className="flex items-center mx-auto max-w-5xl justify-between h-full px-3"
      >
        <h4></h4>
        <a href="https://twitter.com/pierorolando1_" target="_blank">Follow me</a>
      </div>
    </nav>
  )
}

const StarsBackground = ({ children }: any) => {
  useEffect(() => {
    /*          *     .        *  .    *    *   . 
 .  *  move your mouse to over the stars   .
 *  .  .   change these values:   .  *
   .      * .        .          * .       */
    const STAR_COLOR = '#ffffff55';
    const STAR_SIZE = 3;
    const STAR_MIN_SCALE = 0.2;
    const OVERFLOW_THRESHOLD = 50;
    const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

    const canvas = document.querySelector('canvas'),
      context = canvas.getContext('2d');

    let scale = 1, // device pixel ratio
      width,
      height;

    let stars = [];

    let pointerX,
      pointerY;

    let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

    let touchInput = false;

    generate();
    resize();
    step();

    window.onresize = resize;
    window.onmousemove = onMouseMove;
    window.ontouchmove = onTouchMove;
    window.ontouchend = onMouseLeave;
    document.onmouseleave = onMouseLeave;

    function generate() {

      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: 0,
          y: 0,
          z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)
        });
      }

    }

    function placeStar(star) {

      star.x = Math.random() * width;
      star.y = Math.random() * height;

    }

    function recycleStar(star) {

      let direction = 'z';

      let vx = Math.abs(velocity.x),
        vy = Math.abs(velocity.y);

      if (vx > 1 || vy > 1) {
        let axis;

        if (vx > vy) {
          axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
        }
        else {
          axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
        }

        if (axis === 'h') {
          direction = velocity.x > 0 ? 'l' : 'r';
        }
        else {
          direction = velocity.y > 0 ? 't' : 'b';
        }
      }

      star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

      if (direction === 'z') {
        star.z = 0.1;
        star.x = Math.random() * width;
        star.y = Math.random() * height;
      }
      else if (direction === 'l') {
        star.x = -OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
      }
      else if (direction === 'r') {
        star.x = width + OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
      }
      else if (direction === 't') {
        star.x = width * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
      }
      else if (direction === 'b') {
        star.x = width * Math.random();
        star.y = height + OVERFLOW_THRESHOLD;
      }

    }

    function resize() {

      scale = window.devicePixelRatio || 1;

      width = window.innerWidth * scale;
      height = window.innerHeight * scale;

      canvas.width = width;
      canvas.height = height;

      stars.forEach(placeStar);

    }

    function step() {

      context.clearRect(0, 0, width, height);

      update();
      render();

      requestAnimationFrame(step);

    }

    function update() {

      velocity.tx *= 0.96;
      velocity.ty *= 0.96;

      velocity.x += (velocity.tx - velocity.x) * 0.8;
      velocity.y += (velocity.ty - velocity.y) * 0.8;

      stars.forEach((star) => {

        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;

        star.x += (star.x - width / 2) * velocity.z * star.z;
        star.y += (star.y - height / 2) * velocity.z * star.z;
        star.z += velocity.z;

        // recycle when out of bounds
        if (star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD) {
          recycleStar(star);
        }

      });

    }

    function render() {

      stars.forEach((star) => {

        context.beginPath();
        context.lineCap = 'round';
        context.lineWidth = STAR_SIZE * star.z * scale;
        context.globalAlpha = 0.5 + 0.5 * Math.random();
        context.strokeStyle = STAR_COLOR;

        context.beginPath();
        context.moveTo(star.x, star.y);

        var tailX = velocity.x * 2,
          tailY = velocity.y * 2;

        // stroke() wont work on an invisible line
        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;

        context.lineTo(star.x + tailX, star.y + tailY);

        context.stroke();

      });

    }

    function movePointer(x, y) {

      if (typeof pointerX === 'number' && typeof pointerY === 'number') {

        let ox = x - pointerX,
          oy = y - pointerY;

        velocity.tx = velocity.tx + (ox / 8 * scale) * (touchInput ? 1 : -1);
        velocity.ty = velocity.ty + (oy / 8 * scale) * (touchInput ? 1 : -1);

      }

      pointerX = x;
      pointerY = y;

    }

    function onMouseMove(event) {

      touchInput = false;

      movePointer(event.clientX, event.clientY);

    }

    function onTouchMove(event) {

      touchInput = true;

      movePointer(event.touches[0].clientX, event.touches[0].clientY, true);

      event.preventDefault();

    }

    function onMouseLeave() {

      pointerX = null;
      pointerY = null;

    }

  }, [])

  return (
    !isMobile ?
      <div className="relative h-screen w-full">
        <canvas></canvas>
        <div className="absolute top-0 left-0 w-full h-screen overflow-auto">
          {
            children
          }
        </div>
      </div>
      : { children }
  )
}

