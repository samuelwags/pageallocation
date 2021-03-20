import { writable } from 'svelte/store';

export const inks = writable([
    {title: "Cyan", color: "#00b7eb"},
    {title: "Magenta", color: "#ff0090"},
    {title: "Yellow", color: "#FFEF00"},
    {title: "Black", color: "#000000"}
]);

export const sections = writable([
    {title: "", pages: 0, sectionInks: ["Cyan", "Magenta", "Yellow", "Black"], sectionPaper: "0"}
]);

export const papers = writable([
    {title: "", color: "#f0f0f0"}
]);