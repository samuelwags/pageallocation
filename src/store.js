import { writable } from 'svelte/store';
import uuidv4 from 'uuid/v4';

export const inks = writable([
    {title: "Cyan", color: "#00b7eb"},
    {title: "Magenta", color: "#ff0090"},
    {title: "Yellow", color: "#FFEF00"},
    {title: "Black", color: "#000000"}
]);

export const sections = writable([
    {title: "", pages: 0, sectionInks: ["Cyan", "Magenta", "Yellow", "Black"], sectionPaper: "0", id: uuidv4()}
]);

export const papers = writable([
    {title: "", color: "#f0f0f0"}
]);

export const sizeShipping = writable("");
export const header = writable("");
export const finishing = writable("asdfasd\nasd");
export const proofing = writable("");