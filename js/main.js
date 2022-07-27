//INITIALIZE AOS
AOS.init();

// find cars slider
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3.5,
    spaceBetween: 5,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        clickable: true,
    },
});



var swiper = new Swiper(".myCarStyle", {
    slidesPerView: 3.6,
    spaceBetween: 5,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        clickable: true,
    },
});

var swiper = new Swiper(".myCarBrand ", {
    slidesPerView: 3.6,
    spaceBetween: 5,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        clickable: true,
    },
});

// range style in javascript
const rangeInputs = document.querySelectorAll('input[type="range"]')
const numberInput = document.querySelector('input[type="number"]')

function handleInputChange(e) {
    let target = e.target
    if (e.target.type !== 'range') {
        target = document.getElementById('range')
    }
    const min = target.min
    const max = target.max
    const val = target.value

    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100% '
}

rangeInputs.forEach(input => {
    input.addEventListener('input', handleInputChange)
})

// numberInput.addEventListener('input', handleInputChange);

/**____________________________________________________________________________________________ */









// localization 

// The locale our app first shows
const defaultLocale = "en";
const supportedLocales = ["en", "ar"];

// The active locale
let locale;

// Gets filled with active locale translations
let translations = {};


// When the page content is ready...
document.addEventListener("DOMContentLoaded", () => {
    const initialLocale =
        supportedOrDefault(browserLocales(true));

    setLocale(initialLocale);

    bindLocaleSwitcher(initialLocale);
});


function isSupported(locale) {
    return supportedLocales.indexOf(locale) > -1;
}

// Retrieve the first locale we support from the given
// array, or return our default locale
function supportedOrDefault(locales) {
    return locales.find(isSupported) || defaultLocale;
}

// ...

function browserLocales(languageCodeOnly = false) {
    return navigator.languages.map((locale) =>
        languageCodeOnly ? locale.split("-")[0] : locale,
    );
}


// Load translations for the given locale and translate
// the page to this locale
async function setLocale(newLocale) {
    if (newLocale === locale) return;

    const newTranslations =
        await fetchTranslationsFor(newLocale);

    locale = newLocale;
    translations = newTranslations;

    translatePage();
}

// Retrieve translations JSON object for the given
// locale over the network
async function fetchTranslationsFor(newLocale) {
    const response = await fetch(`../lang/${newLocale}.json`);
    return await response.json();
}

// Replace the inner text of each element that has a
// data-i18n-key attribute with the translation corresponding
// to its data-i18n-key
function translatePage() {
    document
        .querySelectorAll("[data-i18n-key]")
        .forEach(translateElement);
}

// Replace the inner text of the given HTML element
// with the translation in the active locale,
// corresponding to the element's data-i18n-key
function translateElement(element) {
    const key = element.getAttribute("data-i18n-key");
    const translation = translations[key];
    element.innerText = translation;
}

// Whenever the user selects a new locale, we
// load the locale's translations and update
// the page
function bindLocaleSwitcher(initialValue) {
    const switcher =
        document.querySelector("[data-i18n-switcher]");

    switcher.value = initialValue;

    switcher.onclick = (e) => {
        // Set the locale to the selected option[value]
        setLocale(e.target.value)


    };


}

/**
 * Retrieve user-preferred locales from the browser
 *
 * @param {boolean} languageCodeOnly - when true, returns
 * ["en", "fr"] instead of ["en-US", "fr-FR"]
 * @returns array | undefined
 */
function browserLocales(languageCodeOnly = false) {
    return navigator.languages.map((locale) =>
        languageCodeOnly ? locale.split("-")[0] : locale,
    );
}



// ...

// Load translations for the given locale and translate
// the page to this locale
async function setLocale(newLocale) {
    if (newLocale === locale) return;

    const newTranslations = await fetchTranslationsFor(
        newLocale,
    );

    locale = newLocale;
    translations = newTranslations;

    // Set <html dir> attribute
    document.documentElement.dir = dir(newLocale);

    // Not necessary for direction flow, but for good measure...
    document.documentElement.lang = newLocale;

    translatePage();
}

// ...

function dir(locale) {
    return locale === "en" ? "ltr" : "rtl";
}
