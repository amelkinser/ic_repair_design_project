
// конструктор картинок
function Img_obj(src, alt) {
  this.src = src;
  this.alt = alt;
};

// конструктор с текстовым блоком - описание картинки 
function Info_obj(city, area, time, cost) {
  this.city = city;
  this.area = area;
  this.time = time;
  this.cost = cost;
};

//---------------------------------------------------------------

let images = []; // массив картинок
images[0] = new Img_obj("images/apartment.jpg", "apartment");
images[1] = new Img_obj("images/apartment2.jpg", "apartment2");
images[2] = new Img_obj("images/apartment3.jpg", "apartment3");

let info = []; // массив текстовых блоков
info[0] = new Info_obj("Rostov-on-Don<br>LCD admiral", "81 m2", "3.5 months", "Upon request");
info[1] = new Info_obj("Sochi<br>Thieves", "105 m2", "4 months", "Upon request");
info[2] = new Info_obj("Rostov-on-Don<br>Patriotic", "93 m2", "3 months", "Upon request");


const numObject = images.length; // число слайдеров
let currObject = 0; // текущий слайдер с картинкой и текстом, отображаемый на экране
let newOpacity = 1; // прозрачность картинки слайдера

let img_work = [];
for (let i = 0; i < numObject; i++) { // создаём массив изображений с тегом img
  img_work[i] = document.createElement("img");
  img_work[i].classList.add("project-images__img");
  img_work[i].src = images[i].src;
  img_work[i].alt = images[i].alt;
}

//---------------------------------------------------------------

// ищем контейнер для картинки слайдера
let imgContainer = document.querySelector('.project-images__container');
// добавляем картинку в контейнер
imgContainer.appendChild(img_work[currObject]);

// Ищем отдельные элементы текстового блока слайдера
let cityContainer = document.querySelector('#project-info__item-city');
let areaContainer = document.querySelector('#project-info__item-area');
let timeContainer = document.querySelector('#project-info__item-time');
let costContainer = document.querySelector('#project-info__item-cost');
// Заполняем поля данными
cityContainer.innerHTML = info[currObject].city;
areaContainer.innerHTML = info[currObject].area;
timeContainer.innerHTML = info[currObject].time;
costContainer.innerHTML = info[currObject].cost;

// Находим кнопки перемотки слайдера (белые стрелки)
let btnPrev = document.querySelector('#btn-next');
let btnNext = document.querySelector('#btn-prev');

// Находим кнопки перемотки, появляющиеся на слайдере
// при размере экрана меньше 860px (стрелки в жёлтых кружках)
let btnLeft = document.querySelector('#btn-left');
let btnRight = document.querySelector('#btn-right');

// Находим кнопки меню слайдера
let projectmenuBtn1 = document.querySelector('#project__menu-btn1');
let projectmenuBtn2 = document.querySelector('#project__menu-btn2');
let projectmenuBtn3 = document.querySelector('#project__menu-btn3');

// Находим кружочки м/ду стрелками слайдера
let dotBtn1 = document.querySelector('#dot-btn1');
let dotBtn2 = document.querySelector('#dot-btn2');
let dotBtn3 = document.querySelector('#dot-btn3');



//---------------------------------------------------------------

function sleep2(ms) { // для реализации задержки при анимации смены слайдера
  return new Promise(resolve => setTimeout(resolve, ms));
}

//---------------------------------------------------------------

// Функция смены слайдера
async function changeObject(cs, ns) {
  // cs - номер текущего слайдера
  // ns - номер нового слайдера

  // Определяем, какой кружок и кнопка меню слайдера д.б. выделены
  // (присваиваем дополнительный класс)
  if (ns == 0) {
    projectmenuBtn1.classList.add("project__menu-link--active");
    projectmenuBtn2.classList.remove("project__menu-link--active");
    projectmenuBtn3.classList.remove("project__menu-link--active");
    dotBtn1.classList.add("dot--active");
    dotBtn2.classList.remove("dot--active");
    dotBtn3.classList.remove("dot--active");
  }
  else if (ns == 1) {
    projectmenuBtn2.classList.add("project__menu-link--active");
    projectmenuBtn1.classList.remove("project__menu-link--active");
    projectmenuBtn3.classList.remove("project__menu-link--active");
    dotBtn2.classList.add("dot--active");
    dotBtn1.classList.remove("dot--active");
    dotBtn3.classList.remove("dot--active");
  }
  else if (ns == 2) {
    projectmenuBtn3.classList.add("project__menu-link--active");
    projectmenuBtn1.classList.remove("project__menu-link--active");
    projectmenuBtn2.classList.remove("project__menu-link--active");
    dotBtn3.classList.add("dot--active");
    dotBtn1.classList.remove("dot--active");
    dotBtn2.classList.remove("dot--active");
  }

  // Плавно уменьшаем прозрачность текщего слайдера  
  img_work[cs].style.opacity = 1;
  newOpacity = 1;
  while (newOpacity > 0.2) {
    await sleep2(40);
    newOpacity = newOpacity - 0.2;
    img_work[cs].style.opacity = newOpacity;
  }
  await sleep2(200);

  img_work[ns].style.opacity = 0.2;

  // замена одной картинки на другую
  imgContainer.replaceChild(img_work[ns], img_work[cs]);
  // перезапись полей текстового блока
  cityContainer.innerHTML = info[ns].city;
  areaContainer.innerHTML = info[ns].area;
  timeContainer.innerHTML = info[ns].time;
  costContainer.innerHTML = info[ns].cost;

  img_work[cs].style.opacity = 1;

  // плавно увеличиваем прозрачность нового слайдера
  while (newOpacity < 1) {
    await sleep2(40);
    newOpacity = newOpacity + 0.2;
    img_work[ns].style.opacity = newOpacity;
  }

  currObject = ns;
}

//-------Событие клика мышью по стрелке для перемотки слайдера «вперёд» ---------

btnNext.addEventListener('click', () => {
  let cs = 0, ns = 0;
  // cs - номер текущего слайдера
  // ns - номер нового слайдера
  cs = currObject;
  if (cs == numObject - 1) ns = 0;
  else ns = cs + 1;

  changeObject(cs, ns);
});

// Для кнопки, появляющейся на слайдере при размере экрана меньше 860px
btnRight.addEventListener('click', () => {
  let cs = 0, ns = 0;
  // cs - номер текущего слайдера
  // ns - номер нового слайдера
  cs = currObject;
  if (cs == numObject - 1) ns = 0;
  else ns = cs + 1;

  changeObject(cs, ns);
});


//--------- Событие клика мышью по стрелке для перемотки слайдера «назад» ------

btnPrev.addEventListener('click', () => {
  let cs = 0, ns = 0;
  // cs - номер текущего слайдера
  // ns - номер нового слайдера
  cs = currObject;
  if (cs == 0) ns = numObject - 1;
  else ns = cs - 1;

  changeObject(cs, ns);
});

// Для кнопки, появляющейся на слайдере при размере экрана меньше 860px
btnLeft.addEventListener('click', () => {
  let cs = 0, ns = 0;
  // cs - номер текущего слайдера
  // ns - номер нового слайдера
  cs = currObject;
  if (cs == 0) ns = numObject - 1;
  else ns = cs - 1;

  changeObject(cs, ns);
});


//--------- Обработчики кнопок меню слайдера -------

projectmenuBtn1.addEventListener('click', () => {
  if (currObject == 0) return;
  changeObject(currObject, 0);
});

projectmenuBtn2.addEventListener('click', () => {
  if (currObject == 1) return;
  changeObject(currObject, 1);
});

projectmenuBtn3.addEventListener('click', () => {
  if (currObject == 2) return;
  changeObject(currObject, 2);
});

//--------- Обработчики элементов навигации (точек м/ду стрелками) --------------

dotBtn1.addEventListener('click', () => {
  if (currObject == 0) return;
  changeObject(currObject, 0);
});

dotBtn2.addEventListener('click', () => {
  if (currObject == 1) return;
  changeObject(currObject, 1);
});

dotBtn3.addEventListener('click', async () => {
  if (currObject == 2) return;
  changeObject(currObject, 2);
});