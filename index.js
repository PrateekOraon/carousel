const container = document.querySelector('.track-container');
const track = document.querySelector('.track');
const trackChildren = track.children;
const slides = Array.from(trackChildren);
const prevButton = document.querySelector('.left-button');
const nextButton = document.querySelector('.right-button');
const slideWidth = slides[0].getBoundingClientRect().width;
const dotsContainer = document.querySelector('.dots-container');
let dots = "";

const positionSlides = (slides) => {
    slides.forEach((slide, index) => {
        slide.style.left = `${index*slideWidth}px`;
        slide.style.zIndex = -index;
    })
}

const makeDots = () => {
    let dots = "<div class='dot current-dot'></div>";
    const noOfDots = slides.length;

    for(let i=0;i<noOfDots-1;i++) {
        dots += "<div class='dot'></div>";
    }

    dotsContainer.innerHTML = dots;
}

const moveToPosition = (currentSlide, targetSlide, index) => {
    if(index === -1) return;
    track.style.transform = `translateX(-${(index*slideWidth)}px)`;
    targetSlide.classList.add('current-slide');
    currentSlide.classList.remove('current-slide');

    if(index === slides.length-1) {
        nextButton.classList.add('button-hidden');
        prevButton.classList.remove('button-hidden');
    } else if(index === 0) {
        prevButton.classList.add('button-hidden');
        nextButton.classList.remove('button-hidden');
    } else {
        nextButton.classList.remove('button-hidden');
        prevButton.classList.remove('button-hidden');
    }

    const currentDot = dotsContainer.querySelector('.current-dot');
    currentDot.classList.remove('current-dot');
    dots[index].classList.add('current-dot');


}

positionSlides(slides);
makeDots();

dots = Array.from(dotsContainer.children);

dotsContainer.addEventListener('click', (e) => {
    const currentSlide = track.querySelector('.current-slide');
    const index = dots.findIndex(dot => dot === e.target);
    const targetSlide = slides[index];
    if(index !== -1) {
        moveToPosition(currentSlide, targetSlide, index);
    }
});

nextButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const index = slides.findIndex(slide => slide === nextSlide);
    moveToPosition(currentSlide, nextSlide, index);

});

prevButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const index = slides.findIndex(slide => slide === prevSlide);
    moveToPosition(currentSlide, prevSlide, index);
});