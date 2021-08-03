const container = document.querySelector('.track-container');
const track = document.querySelector('.track');
const trackChildren = track.children;
const slides = Array.from(trackChildren);
const prevButton = document.querySelector('.left-button');
const nextButton = document.querySelector('.right-button');
const slideWidth = slides[0].getBoundingClientRect().width;

const positionSlides = (slides) => {
    slides.forEach((slide, index) => {
        slide.style.left = `${index*slideWidth}px`;
        slide.style.zIndex = -index;
    })
}

positionSlides(slides);


nextButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const index = slides.findIndex(slide => slide === nextSlide);
    if(index === -1) return;

    track.style.transform = `translateX(-${(index*slideWidth)}px)`;
    nextSlide.classList.add('current-slide');
    currentSlide.classList.remove('current-slide');
    if(index === slides.length-1) {
        nextButton.classList.add('button-hidden');
        prevButton.classList.remove('button-hidden');
    } else {
        nextButton.classList.remove('button-hidden');
        prevButton.classList.remove('button-hidden');
    }
})

prevButton.addEventListener('click', (event) => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const index = slides.findIndex(slide => slide === prevSlide);
    if(index === -1) return;

    track.style.transform = `translateX(-${(index*slideWidth)}px)`;
    prevSlide.classList.add('current-slide');
    currentSlide.classList.remove('current-slide');

    if(index === 0) {
        prevButton.classList.add('button-hidden');
        nextButton.classList.remove('button-hidden');
    } else {
        prevButton.classList.remove('button-hidden');
        nextButton.classList.remove('button-hidden');
    }
})
