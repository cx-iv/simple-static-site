/**
* this is a ~ description ~
* @namespace diopside
* @method ~~~~~~~~~
* @param {String} some string
* @param {Object} some object
* @return {bool} some bool
*/

console.log("HEY!!!")
console.log("please steal, feedback welcome: github.com/cx-iv/simple-static-site")

var ENV = {
    event: "NULL_ON_LOAD",
    metric_classes_accrued: ["classes that get applied are accrued here in event_handler - push classes to this array - animals.push('cows');"],
    type: {
        //this is the full list events in the system - architecture here needs to be ~ rethunk ~
        genesis: "dom",
        click_about: "css",
        click_resources: "css",
        generate_about: "dom",
        generate_resources: "dom",
        click_exit_click_resources: "css",
        click_exit_click_about: "css",
        generate_select_about: "dom",
        generate_select_resources: "dom",
        background_black: "css",
        background_white: "css",
        remove_ghost_accent: "dom",
    },
};

//need DOM loaded first
document.addEventListener('DOMContentLoaded', (event) => { event_handler("genesis"); });

//captures animation events
document.addEventListener("animationend", (event) => {
    if (event.animationName === "rotateGenesisSelectExit" && ENV.event === "click_about") {
        event_handler("background_black");
        event_handler("generate_about");
    }
    else if (event.animationName === "rotateGenesisSelectExit" && ENV.event === "click_resources") {
        event_handler("background_black");
        event_handler("generate_resources");
    }
    else if (event.animationName === "eraseClickSelectExit" && ENV.event === "click_exit_click_resources") {
        event_handler("generate_select_resources")
    }
    else if (event.animationName === "eraseClickSelectExit" && ENV.event === "click_exit_click_about") {
        event_handler("generate_select_about")
    }
    else if (event.animationName === "expandFillPageGhost") {
        event_handler("background_white");
        event_handler("remove_ghost_accent");
    }

});

window.onresize = dimension_update;

function event_handler(event) {
    console.log("EVENT JUST RAN")
    console.log(event)

    console.log(ENV)
    ENV.event = event;

    var components_lib_event = library()
    console.log("LIST_LIB_EVENT_COMPONENTS")
    console.log(components_lib_event)

    var list_dom = Array.from(document.querySelectorAll('div[id]')).map(div => ({ title: div.id }))
    console.log("LIST_DOM")
    console.log(list_dom)

    list_generate = joins("not_on_dom", { array_lib: components_lib_event, array_dom: list_dom, key_value: "title" });
    console.log("LIST_GENERATE")
    console.log(list_generate)

    list_existing_elements = joins("overlap", { array_base: components_lib_event, array_dom: list_dom, key_value: "title" });
    console.log("LIST_list_existing_elements")
    console.log(list_existing_elements)


    length_list_existing_elements = list_existing_elements.length

    if (ENV.type[event] === "css") {
        //APPLY CLASSES
        console.log("APPLY CLASSES")
        for (let i = 0; i < length_list_existing_elements; i++) {
            //APPEND HERE - metric_classes_accrued
            ENV.metric_classes_accrued.push(list_existing_elements[i].event[event].classes.add)
            console.log("*******RELEVANT*******")
            console.log(list_existing_elements[i].event[event].classes)

            //REMOVE CLASSES
            if (list_existing_elements[i].event[event].classes.hasOwnProperty("remove")) {
                console.log("REMOVE THESE CLASSES")
                console.log(list_existing_elements[i].event[event].classes.remove)
                console.log("FROM THIS DIV")
                console.log(list_existing_elements[i].title)
                list_existing_elements[i].event[event].classes.remove.forEach(className => {
                    document.getElementById(list_existing_elements[i].title).classList.remove(className);
                });
            }
            //ADD CLASSES
            console.log("ADD CLASSES")
            list_existing_elements[i].event[event].classes.add.forEach(className => {
                document.getElementById(list_existing_elements[i].title).classList.add(className);
            });
        }
    }
    else if (ENV.type[event] === "dom") {
        //REMOVE COMPONENTS
        console.log("REMOVE COMPONENTS")
        console.log(list_existing_elements)
        for (let i = 0; i < length_list_existing_elements; i++) {
            console.log("COMPONENT-TO-BE-REMOVED")
            console.log(list_existing_elements[i])
            document.getElementById(list_existing_elements[i].title).remove();
        }
    }
    //GENERATE COMPONENTS
    length_generate = list_generate.length
    for (let i = 0; i < length_generate; i++) {
        console.log("GENERATE COMPONENTS")
        generate_component(list_generate[i]);
    }


    dimension_update();

    console.log(ENV)

};

function dimension_update() {
    var w = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    var h = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    var components = library("all")
    //LIST OF ITEMS ON DOM
    var list_dom = Array.from(document.querySelectorAll('div[id]')).map(div => ({ title: div.id }))
    //FILTER OUT ONLY OBJECTS ON DOM
    components = joins("overlap", { array_base: components, array_dom: list_dom, key_value: "title" });

    //FILTER OUT CHILD COMMPONENTS - size determiend by parents
    components = components.filter(obj => obj["parent"] === "none");
    //FILTER OUT static size components like "background"
    components = components.filter(obj => obj.hasOwnProperty("size"));

    length_components = components.length;
    console.log("COMPONENTS IN DIMENSION_UPDATE")
    console.log(components)

    for (let i = 0; i < length_components; i++) {

        if (h > w) {
            shape = "tall";
            item_size = w * components[i].size[shape]
        }
        else {
            shape = "wide";
            item_size = h * components[i].size[shape]
        }
        document.getElementById(components[i].title).style.width = item_size + "px";


    }
};

//EVENTUALLY THE LIBRARY COUL DBE EXCEL SHEET UPDATED
function library(type) {
//library of components and their respetive classes for events
//the order of componenets matters here - parents must come first
    var list = [
        {
            title: "background",
            notes:"size is not dynamic and just set to 100% by the 'background' CSS property",
            parent: "none",
            event: {
                genesis: { classes: { add: ["background","background-white"] }, },
                background_black: { classes: { add: ["background-black"], remove: ["background-white"]  } },
                background_white: { classes: { add: ["background-white"], remove: ["background-black"]  } },
            },
        },
        {
            title: "accent_app",
            notes:"this is for the diopside app",
            parent: "none",
            size: { tall: 5 / 10, wide: 4 / 10 },
            event: {
                genesis: { classes: { add: ["accent-icon"] }, },
            },
            attributes: {
                svg: [
                    { key: "width", value: "100%" },
                    { key: "height", value: "100%" },
                    { key: "version", value: "1.1" },
                    { key: "viewBox", value: "0 0 1200 1200" },
                ],
                circle: [
                    { key: "cx", value: "0" },
                    { key: "cy", value: "0" },
                    { key: "r", value: "800" },
                    { key: "fill", value: "#ffffff" },
                ],
            },
        },
        {
            title: "app",
            parent: "accent_app",
            size: { tall: 1.5 / 10, wide: 2 / 10 },
            event: {
                genesis: { classes: { add: ["icon"] } },
            },
            attributes: {
                svg: [
                    { key: "width", value: "100%" },
                    { key: "height", value: "100%" },
                    { key: "version", value: "1.1" },
                    { key: "viewBox", value: "0 0 1200 1200" },
                ],
                g: [
                    { key: "stroke", value: "#none" },
                    { key: "stroke-width", value: "0" },
                    { key: "fill", value: "#000000" },
                    { key: "stroke-dasharray", value: 1 },
                ],
                paths: [
                    [
                        { key: "d", value: "m95.316 713.37 142.48-472.55 297.98-190.91 415.66 67.422 153.26 353.16-228.53 496.62-631.22 182.99zm883.68-339.23-197.96-15.477-30.969 353.85 90.156 148.86 180.2-391.77-41.43-95.473zm-196.73 540.12-104.6-172.7-6.4648-10.871 0.97656-12.414 25.301-289.45-255.28 284.22-114.22 332.89zm-513.8 67.438 98.957-288.33-97.98-290.51-93.273 309.36zm42.734-696.52 112.52 333.37 269.9-300.67-162.84-173.37-219.59 140.67zm325.34-140.87 127.32 135.55 180.36 14.16-46.586-107.35-261.09-42.363z" },
                        { key: "pathLength", value: 1 },
                        { key: "id", value: "path_one" },
                    ],
                ],
            },
        },
        {
            title: "accent_select",
            parent: "none",
            size: { tall: 9 / 10, wide: 7 / 10 },
            event: {
                genesis: { classes: { add: ["accent-select", "genesis-accent-select"], }, },
                click_about: { classes: { add: ["expand-fill-page"], remove: ["exit-animation-select-accent"]} },
                click_resources: { classes: { add: ["expand-fill-page"], remove: ["exit-animation-select-accent"]} },
                generate_about: { classes: { add: ["none"], }, },
                generate_resources: { classes: { add: ["none"], }, },
                generate_select_about: { classes: { add: ["accent-select-post-exit"], }, },
                generate_select_resources: { classes: { add: ["accent-select-post-exit"], }, },
            },
            attributes: {
                svg: [
                    { key: "width", value: "100%" },
                    { key: "height", value: "100%" },
                    { key: "version", value: "1.1" },
                    { key: "viewBox", value: "0 0 800 300" },
                ],
                g: [
                    { key: "stroke", value: "#000000" },
                    { key: "stroke-width", value: "15" },
                    { key: "stroke-dasharray", value: 1 },
                ],
                paths: [
                    [
                        {
                            key: "d",
                            value: "M 150,250 A 100,100 0 0,1 150,50 L 651 50"
                        },
                        { key: "pathLength", value: 1 },
                        { key: "id", value: "path_one" },
                    ],
                    [
                        {
                            key: "d",
                            value: "M 650,50 A 100,100 0 0,1 650,250 L 149 250"
                        },
                        { key: "pathLength", value: 1 },
                        { key: "id", value: "path_two" },
                    ],
                ],
            }
        },
        {
            title: "ghost_accent_select",
            parent: "none",
            size: { tall: 9 / 10, wide: 7 / 10 },
            event: {
                generate_select_about: { classes: { add: ["genesis-ghost-accent-select"], }, },
                generate_select_resources: { classes: { add: ["genesis-ghost-accent-select"], }, },
                remove_ghost_accent: { classes: { add: ["none"], }, },
            },
            attributes: {
                svg: [
                    { key: "width", value: "100%" },
                    { key: "height", value: "100%" },
                    { key: "version", value: "1.1" },
                    { key: "viewBox", value: "0 0 800 300" },
                ],
                g: [
                    { key: "stroke", value: "#ffffff" },
                    { key: "fill", value: "#ffffff" },
                    { key: "stroke-width", value: "45" },
                    { key: "stroke-dasharray", value: 1 },
                ],
                paths: [
                    [
                        {
                            key: "d",
                            value: "M 150,250 A 100,100 0 0,1 150,50 L 652 50"
                        },
                        { key: "pathLength", value: 1 },
                        { key: "id", value: "path_one" },
                    ],
                    [
                        {
                            key: "d",
                            value: "M 650,50 A 100,100 0 0,1 650,250 L 148 250"
                        },
                        { key: "pathLength", value: 1 },
                        { key: "id", value: "path_two" },
                    ],
                ],
            }
        },
        {
            title: "resources",
            parent: "accent_select",
            size: "ABSOLUTE_DRIVEN_BY_PARENT",
            event: {
                genesis: { classes: { add: ["select-resources", "filter"], } },
                click_about: { classes: { add: ["animate-erase"],remove: ["animate-draw"] } },
                click_resources: { classes: { add: ["animate-clicked",],remove: ["animate-draw"] } },
                generate_select_about: { classes: { add: ["select-resources","animate-draw","filter"], } },
                generate_select_resources: { classes: { add: ["select-resources","animate-draw","filter"], } },
            },
            attributes: {
                svg: [
                    { key: "width", value: "100%" },
                    { key: "height", value: "100%" },
                    { key: "version", value: "1.1" },
                    { key: "viewBox", value: "0 0 1200 1300" },
                    { key: "style", value: "cursor:pointer;" },
                    { key: "onclick", value: "event_handler('click_resources')" },
                ],
                g: [
                    { key: "stroke", value: "#ffffff" },
                    { key: "stroke-width", value: "50" },
                    { key: "fill", value: "none" },
                    { key: "stroke-dasharray", value: 1 },
                ],
                paths: [
                    [
                        { key: "d", value: "m852.68 546.56c-2.3242-0.97656-57.148-23.852-124.01-23.852-49.5 0-93.148 12.227-129.71 36.336-21.148 13.949-38.176 30.789-52.051 48.938 3.2266-122.36 34.613-245.7 118.73-346.57 3.3008 24.336 12.824 51.863 37.688 73.426 56.625 49.199 134.1 17.176 134.1 17.176s20.887-81.227-35.738-130.39c-21.375-18.562-45.676-25.539-67.688-27.039 21.824-17.625 45.523-34.312 72.148-49.539 17.961-10.273 24.227-33.188 13.949-51.148-10.238-17.961-33.148-24.227-51.148-13.949-108.75 62.137-180.64 142.57-226.65 231.49-11.926-29.438-29.773-58.539-57-82.914-42.68-38.137-101.63-58.273-170.41-58.273-44.176 0-77.398 8.4766-78.789 8.8125-14.66 3.75-25.609 16.012-27.711 31.012-0.89844 6.2617-20.812 154.73 76.875 242.1 42.637 38.176 101.55 58.312 170.32 58.312 8.7734 0 16.949-0.375 24.676-0.9375-14.852 103.12-7.8359 208.16 8.7734 303.75-62.809-30.488-127.84 11.699-127.84 11.699s-5.0234 83.699 59.926 121.2c36.148 20.852 73.426 15.676 99.75 7.0859 37.012 131.81 81.75 223.31 83.062 225.98 6.6016 13.164 19.836 20.738 33.602 20.738 5.625 0 11.363-1.2734 16.727-3.9375 18.523-9.2617 26.023-31.801 16.762-50.324-1.5391-3.0742-65.961-134.89-101.55-306.6 18.938 3.7891 41.062 6.7109 64.914 6.7109 49.5 0 93.148-12.227 129.75-36.375 109.39-72.148 111.41-221.89 111.45-228.23 0.074218-15.109-9.0039-28.797-22.914-34.684zm-517.43-150.34c-47.438-42.414-54.262-111.38-54.074-149.02 9.4883-1.0898 21-1.9531 33.711-1.9531 34.914 0 84.113 6.7891 120.38 39.188 47.398 42.414 54.262 111.38 54.074 149.02-9.4883 1.125-21.039 1.9883-33.711 1.9883-34.914 0-84.148-6.7852-120.38-39.223zm387.56 350.66c-24.113 15.898-53.887 24-88.426 24-27.074 0-51.938-4.9883-69.449-9.7109 5.3633-37.312 22.199-104.48 75.301-139.5 24.148-15.898 53.887-23.961 88.426-23.961 27.074 0 51.977 4.9883 69.449 9.7109-5.3242 37.273-22.199 104.44-75.301 139.46z" },
                        { key: "pathLength", value: 1 },
                        { key: "id", value: "path_one" },
                    ],
                ],
                rect: [
                    { key: "x", value: "-50" },
                    { key: "width", value: "1200" },
                    { key: "height", value: "1300" },
                    { key: "fill", value: "none" },
                    { key: "rx", value: "200" },
                ],
            }
        },
        {
            title: "about",
            parent: "accent_select",
            size: "ABSOLUTE_DRIVEN_BY_PARENT",
            event: {
                genesis: { classes: { add: ["select-about","filter"], } },
                click_about: { classes: { add: ["animate-clicked"],remove: ["animate-draw"] } },
                click_resources: { classes: { add: ["animate-erase"],remove: ["animate-draw"] } },
                generate_select_about: { classes: { add: ["select-about","animate-draw","filter"], } },
                generate_select_resources: { classes: { add: ["select-about","animate-draw","filter"], } },
            },
            attributes: {
                svg: [
                    { key: "width", value: "100%" },
                    { key: "height", value: "100%" },
                    { key: "version", value: "1.1" },
                    { key: "viewBox", value: "0 0 1200 1300" },
                    { key: "style", value: "cursor:pointer;" },
                    { key: "onclick", value: "event_handler('click_about')" },
                ],
                g: [
                    { key: "stroke", value: "#ffffff" },
                    { key: "stroke-width", value: "40" },
                    { key: "fill", value: "none" },
                    { key: "stroke-dasharray", value: 1 },
                ],
                paths: [
                    [
                        {
                            key: "d",
                            value: "m1081.2 898.56c-14.797-10.953-28.074-23.824-39.48-38.277-27.84-32.281-59.398-68.281-122.52-68.281-63.121 0-94.68 36-122.52 68.281-25.199 28.918-45.121 51.719-86.281 51.719-41.16 0-61.199-22.801-86.398-51.719-27.84-32.281-59.398-68.281-122.52-68.281-63.121 0-94.68 36-122.52 68.281-25.082 28.918-45 51.719-86.281 51.719s-61.078-22.801-86.281-51.719c-17.258-22.672-39.035-41.512-63.957-55.32-7.6562-3.4727-16.566-2.6875-23.496 2.0664-6.9297 4.7539-10.867 12.785-10.383 21.176 0.48828 8.3906 5.3242 15.914 12.758 19.836 19.004 11.191 35.605 26.039 48.84 43.68 27.961 32.281 59.52 68.281 122.52 68.281s94.68-36 122.52-68.281c25.199-28.918 45.121-51.719 86.281-51.719 41.16 0 61.078 22.801 86.281 51.719 27.84 32.281 59.398 68.281 122.64 68.281 63.238 0 94.68-36 122.52-68.281 25.082-28.918 45.004-51.719 86.281-51.719 41.281 0 61.199 22.801 86.281 51.719 14.188 17.848 30.789 33.641 49.32 46.922 5.3125 3.6289 11.859 4.9688 18.172 3.7266 6.3164-1.2461 11.863-4.9727 15.402-10.348 3.5391-5.3711 4.7734-11.941 3.4258-18.234-1.3516-6.2891-5.168-11.777-10.602-15.227z"
                        },
                        { key: "pathLength", value: 1 },
                        { key: "id", value: "path_one" },
                    ],
                    [
                        {
                            key: "d",
                            value: "m1081.2 718.56c-14.793-10.957-28.07-23.828-39.48-38.277-27.84-32.281-59.398-68.281-122.52-68.281-63.121 0-94.68 36-122.52 68.281-25.199 28.918-45.121 51.719-86.398 51.719-41.281 0-61.082-22.801-86.281-51.719-27.84-32.281-59.398-68.281-122.52-68.281-63.121 0-94.68 36-122.52 68.281-25.082 28.918-45 51.719-86.281 51.719s-61.078-22.801-86.281-51.719c-17.258-22.672-39.035-41.512-63.957-55.32-7.6562-3.4727-16.566-2.6875-23.496 2.0664-6.9297 4.7539-10.867 12.785-10.383 21.176 0.48828 8.3906 5.3242 15.914 12.758 19.836 19.004 11.191 35.605 26.039 48.84 43.68 27.961 32.281 59.52 68.281 122.52 68.281s94.68-36 122.52-68.281c25.199-28.918 45-51.719 86.281-51.719s61.199 22.801 86.281 51.719c27.84 32.281 59.398 68.281 122.52 68.281s94.68-36 122.52-68.281c25.199-28.918 45.121-51.719 86.398-51.719 41.281 0 61.199 22.801 86.281 51.719 14.188 17.848 30.785 33.641 49.32 46.922 5.3125 3.6289 11.859 4.9688 18.172 3.7266 6.3164-1.2461 11.863-4.9727 15.402-10.348 3.5391-5.3711 4.7734-11.941 3.4258-18.234-1.3516-6.2891-5.168-11.777-10.602-15.227z"
                        },
                        { key: "pathLength", value: 1 },
                        { key: "id", value: "path_two" },
                    ],
                    [
                        {
                            key: "d",
                            value: "m1081.2 526.56c-14.797-10.953-28.074-23.824-39.48-38.277-27.84-32.281-59.398-68.281-122.52-68.281-63.121 0-94.68 36-122.52 68.281-25.199 28.918-45.121 51.719-86.281 51.719-41.16 0-61.199-22.801-86.398-51.719-27.84-32.281-59.398-68.281-122.52-68.281-63.121 0-94.68 36-122.52 68.281-25.082 28.918-45 51.719-86.281 51.719s-61.078-22.801-86.281-51.719c-17.258-22.672-39.035-41.512-63.957-55.32-7.6562-3.4727-16.566-2.6875-23.496 2.0664-6.9297 4.7539-10.867 12.785-10.383 21.176 0.48828 8.3906 5.3242 15.914 12.758 19.836 19.004 11.191 35.605 26.039 48.84 43.68 27.961 32.281 59.52 68.281 122.52 68.281s94.68-36 122.52-68.281c25.199-28.918 45.121-51.719 86.281-51.719 41.16 0 61.078 22.801 86.281 51.719 27.84 32.281 59.398 68.281 122.64 68.281 63.238 0 94.68-36 122.52-68.281 25.082-28.918 45.004-51.719 86.281-51.719 41.281 0 61.199 22.801 86.281 51.719 14.188 17.848 30.789 33.641 49.32 46.922 5.3125 3.6289 11.859 4.9688 18.172 3.7266 6.3164-1.2461 11.863-4.9727 15.402-10.348 3.5391-5.3711 4.7734-11.941 3.4258-18.234-1.3516-6.2891-5.168-11.777-10.602-15.227z"
                        },
                        { key: "pathLength", value: 1 },
                        { key: "id", value: "path_three" },
                    ],
                    [
                        {
                            key: "d",
                            value: "m1081.2 346.56c-14.793-10.957-28.07-23.828-39.48-38.277-27.84-32.281-59.398-68.281-122.52-68.281-63.121 0-94.68 36-122.52 68.281-25.199 28.918-45.121 51.719-86.398 51.719-41.281 0-61.082-22.801-86.281-51.719-27.84-32.281-59.398-68.281-122.52-68.281-63.121 0-94.68 36-122.52 68.281-25.082 28.918-45 51.719-86.281 51.719s-61.078-22.801-86.281-51.719c-17.258-22.672-39.035-41.512-63.957-55.32-7.6562-3.4727-16.566-2.6875-23.496 2.0664-6.9297 4.7539-10.867 12.785-10.383 21.176 0.48828 8.3906 5.3242 15.914 12.758 19.836 19.004 11.191 35.605 26.039 48.84 43.68 27.961 32.281 59.52 68.281 122.52 68.281s94.68-36 122.52-68.281c25.199-28.918 45-51.719 86.281-51.719s61.199 22.801 86.281 51.719c27.84 32.281 59.398 68.281 122.52 68.281s94.68-36 122.52-68.281c25.199-28.918 45.121-51.719 86.398-51.719 41.281 0 61.199 22.801 86.281 51.719 14.188 17.848 30.785 33.641 49.32 46.922 5.3125 3.6289 11.859 4.9688 18.172 3.7266 6.3164-1.2461 11.863-4.9727 15.402-10.348 3.5391-5.3711 4.7734-11.941 3.4258-18.234-1.3516-6.2891-5.168-11.777-10.602-15.227z"
                        },
                        { key: "pathLength", value: 1 },
                        { key: "id", value: "path_four" },
                    ],
                ],
            }
        },
        {
            title: "exit",
            parent: "none",
            size: { tall: 2 / 10, wide: 1.5 / 10 },
            event: {
                click_about: { classes: { add: ["select-exit","genesis-select-exit","filter"] } },
                click_resources: { classes: { add: ["select-exit","genesis-select-exit","filter"] } },
                click_exit_click_about: { classes: { add: ["click-select-exit"], remove: ["genesis-select-exit"] } },
                click_exit_click_resources: { classes: { add: ["click-select-exit"], remove: ["genesis-select-exit"] } },
                generate_select_about: { classes: { add: ["none"], } },
                generate_select_resources: { classes: { add: ["none"], } },
            },
            attributes: {
                svg: [
                    { key: "width", value: "100%" },
                    { key: "height", value: "100%" },
                    { key: "version", value: "1.1" },
                    { key: "viewBox", value: "0 0 1200 1200" },
                    { key: "style", value: "cursor:pointer;" },
                    { key: "onclick", value: "event_handler('click_exit_"+ENV.event+"')" },
                ],
                g: [
                    { key: "stroke", value: "#ffffff" },
                    { key: "stroke-width", value: "150" },
                    { key: "fill", value: "none" },
                    { key: "stroke-dasharray", value: 1 },
                ],
                paths: [
                    [
                        {
                            key: "d",
                            value: "M 600 100 L 600 1100"
                        },
                        { key: "pathLength", value: 1 },
                        { key: "id", value: "path_one" },
                    ],
                    [
                        {
                            key: "d",
                            value: "M 100 600 L 1100 600"
                        },
                        { key: "pathLength", value: 1 },
                        { key: "id", value: "path_two" },
                    ],
                ],
            }
        },
        {
            title: "detail_about",
            parent: "none",
            size: { tall: 9 / 10, wide: 8 / 10 },
            event: {
                generate_about: { classes: { add: ["detail",], } },
                click_exit_click_about: { classes: { add: ["fade-hide"]} },
                generate_select_about: { classes: { add: ["none"], } },
            },
            attributes: {
                svg: [
                    { key: "width", value: "100%" },
                    { key: "height", value: "100%" },
                    { key: "version", value: "1.1" },
                    { key: "viewBox", value: "0 0 1200 1200" },
                ],
                g: [
                    { key: "stroke", value: "#7D7D7D" },
                    { key: "stroke-width", value: "15" },
                    { key: "stroke-dasharray", value: 1 },
                ],
                // paths: [
                //     [
                //         {
                //             key: "d",
                //             value: "m1081.2 898.56c-14.797-10.953-28.074-23.824-39.48-38.277-27.84-32.281-59.398-68.281-122.52-68.281-63.121 0-94.68 36-122.52 68.281-25.199 28.918-45.121 51.719-86.281 51.719-41.16 0-61.199-22.801-86.398-51.719-27.84-32.281-59.398-68.281-122.52-68.281-63.121 0-94.68 36-122.52 68.281-25.082 28.918-45 51.719-86.281 51.719s-61.078-22.801-86.281-51.719c-17.258-22.672-39.035-41.512-63.957-55.32-7.6562-3.4727-16.566-2.6875-23.496 2.0664-6.9297 4.7539-10.867 12.785-10.383 21.176 0.48828 8.3906 5.3242 15.914 12.758 19.836 19.004 11.191 35.605 26.039 48.84 43.68 27.961 32.281 59.52 68.281 122.52 68.281s94.68-36 122.52-68.281c25.199-28.918 45.121-51.719 86.281-51.719 41.16 0 61.078 22.801 86.281 51.719 27.84 32.281 59.398 68.281 122.64 68.281 63.238 0 94.68-36 122.52-68.281 25.082-28.918 45.004-51.719 86.281-51.719 41.281 0 61.199 22.801 86.281 51.719 14.188 17.848 30.789 33.641 49.32 46.922 5.3125 3.6289 11.859 4.9688 18.172 3.7266 6.3164-1.2461 11.863-4.9727 15.402-10.348 3.5391-5.3711 4.7734-11.941 3.4258-18.234-1.3516-6.2891-5.168-11.777-10.602-15.227z"
                //         },
                //         { key: "pathLength", value: 1 },
                //         { key: "id", value: "path_one" },
                //     ],
                // ],
                text: [
                    [
                        { key: "x", value: "50" },
                        { key: "y", value: "100" },
                        { key: "font-size", value: "50" },
                        { key: "fill", value: "#ffffff" },
                        { key: "font-family", value: "sans-serif" },
                        { key: "content", value: "ABOUTABOUTABOUTABOUTABOUTABOUTABOUTABOUT" },
                    ]
                ],
            }
        },
        {
            title: "detail_resources",
            parent: "none",
            size: { tall: 9 / 10, wide: 8 / 10 },
            event: {
                generate_resources: { classes: { add: ["detail",], } },
                click_exit_click_resources: { classes: { add: ["fade-hide"]} },
                generate_select_resources: { classes: { add: ["none"], } },
            },
            attributes: {
                svg: [
                    { key: "width", value: "100%" },
                    { key: "height", value: "100%" },
                    { key: "version", value: "1.1" },
                    { key: "viewBox", value: "0 0 1200 1200" },
                ],
                g: [
                    { key: "stroke", value: "#7D7D7D" },
                    { key: "stroke-width", value: "5" },
                    { key: "stroke-dasharray", value: 1 },
                    { key: "transform", value: "rotate(270,800,800)" },
                ],
                // paths: [
                //     [
                //         {
                //             key: "d",
                //             value: "m852.68 546.56c-2.3242-0.97656-57.148-23.852-124.01-23.852-49.5 0-93.148 12.227-129.71 36.336-21.148 13.949-38.176 30.789-52.051 48.938 3.2266-122.36 34.613-245.7 118.73-346.57 3.3008 24.336 12.824 51.863 37.688 73.426 56.625 49.199 134.1 17.176 134.1 17.176s20.887-81.227-35.738-130.39c-21.375-18.562-45.676-25.539-67.688-27.039 21.824-17.625 45.523-34.312 72.148-49.539 17.961-10.273 24.227-33.188 13.949-51.148-10.238-17.961-33.148-24.227-51.148-13.949-108.75 62.137-180.64 142.57-226.65 231.49-11.926-29.438-29.773-58.539-57-82.914-42.68-38.137-101.63-58.273-170.41-58.273-44.176 0-77.398 8.4766-78.789 8.8125-14.66 3.75-25.609 16.012-27.711 31.012-0.89844 6.2617-20.812 154.73 76.875 242.1 42.637 38.176 101.55 58.312 170.32 58.312 8.7734 0 16.949-0.375 24.676-0.9375-14.852 103.12-7.8359 208.16 8.7734 303.75-62.809-30.488-127.84 11.699-127.84 11.699s-5.0234 83.699 59.926 121.2c36.148 20.852 73.426 15.676 99.75 7.0859 37.012 131.81 81.75 223.31 83.062 225.98 6.6016 13.164 19.836 20.738 33.602 20.738 5.625 0 11.363-1.2734 16.727-3.9375 18.523-9.2617 26.023-31.801 16.762-50.324-1.5391-3.0742-65.961-134.89-101.55-306.6 18.938 3.7891 41.062 6.7109 64.914 6.7109 49.5 0 93.148-12.227 129.75-36.375 109.39-72.148 111.41-221.89 111.45-228.23 0.074218-15.109-9.0039-28.797-22.914-34.684zm-517.43-150.34c-47.438-42.414-54.262-111.38-54.074-149.02 9.4883-1.0898 21-1.9531 33.711-1.9531 34.914 0 84.113 6.7891 120.38 39.188 47.398 42.414 54.262 111.38 54.074 149.02-9.4883 1.125-21.039 1.9883-33.711 1.9883-34.914 0-84.148-6.7852-120.38-39.223zm387.56 350.66c-24.113 15.898-53.887 24-88.426 24-27.074 0-51.938-4.9883-69.449-9.7109 5.3633-37.312 22.199-104.48 75.301-139.5 24.148-15.898 53.887-23.961 88.426-23.961 27.074 0 51.977 4.9883 69.449 9.7109-5.3242 37.273-22.199 104.44-75.301 139.46z"
                //         },
                //         { key: "pathLength", value: 1 },
                //         { key: "id", value: "path_one" },
                //     ],
                // ],
                text: [
                    [
                        { key: "x", value: "50" },
                        { key: "y", value: "100" },
                        { key: "font-size", value: "50" },
                        { key: "fill", value: "#ffffff" },
                        { key: "font-family", value: "sans-serif" },
                        { key: "content", value: "RESOURCESRESOURCESRESOURCESRESOURCESRESOURCESRESOURCESRESOURCES" },
                    ]
                ],
            }
        },
    ];

    if (type === "all") {
        return list;
    }
    else{
        return list.filter(obj => obj["event"] && obj["event"].hasOwnProperty(ENV.event));
    }

    // switch "hasOwnProperty" for "includes" for an array sort value - like: return array.filter(obj => obj[filter_key] && obj[filter_key].includes(filter_value));
    // simple filter: return arr.filter(obj => obj[key] === value);

};

function generate_component(component) {
    //the below needs to get wrapped in a FOR LOOP, all SVGs rn - but eventually should take object type into account
    console.log("COMPONENT IN GENERATE COMPONENT")
    console.log(component)
    var classes = component.event[ENV.event].classes.add
    console.log("CLASSES")
    console.log(classes)

    var parent = component.parent

    var parent_element = document.getElementById(parent);

    var div = document.createElement('div');
    div.id = component.title;
    div.className = classes.join(" ");

    //METRICs gathering
    ENV.metric_classes_accrued.push(classes);

    if (component.hasOwnProperty('attributes') == true) {
        var attributes = component.attributes

        // VARIABLE ATTRIBUTES
        if (attributes.hasOwnProperty('svg') == true) {
            var list_svg = attributes.svg
            var length_svg = list_svg.length
    
            var svgNS = "http://www.w3.org/2000/svg";
            var svg_app_icon = document.createElementNS(svgNS, "svg");
            for (let i = 0; i < length_svg; i++) {
                svg_app_icon.setAttributeNS(null, list_svg[i].key, list_svg[i].value);
            }
            div.appendChild(svg_app_icon);
        }
        if (attributes.hasOwnProperty('rect') == true) {
            var list_rect = attributes.rect
            var length_rect = list_rect.length
            var rect = document.createElementNS(svgNS, "rect");
            for (let i = 0; i < length_rect; i++) {
                rect.setAttributeNS(null, list_rect[i].key, list_rect[i].value);
            }
            svg_app_icon.appendChild(rect);
        }
        if (attributes.hasOwnProperty('g') == true) {
            var list_g = attributes.g
            var length_g = list_g.length
            console.log("LIST OF G ATTRIBUTE GROUPS")
            console.log(list_g)
    
            var g = document.createElementNS(svgNS, "g");
            for (let i = 0; i < length_g; i++) {
                g.setAttributeNS(null, list_g[i].key, list_g[i].value);
            }
            svg_app_icon.appendChild(g);
        }
        if (attributes.hasOwnProperty('paths') == true) {
            var list_paths = attributes.paths
            var length_paths = list_paths.length
    
            for (let i = 0; i < length_paths; i++) {
                var path = document.createElementNS(svgNS, "path");
                var list_path = attributes.paths[i]
                var length_path = list_path.length
                for (let i = 0; i < length_path; i++) {
                    path.setAttributeNS(null, list_path[i].key, list_path[i].value);
                }
                g.appendChild(path);
            }
        }
        if (attributes.hasOwnProperty('circle') == true) {
            var list_circle = attributes.circle
            var length_circle = list_circle.length
            var circle = document.createElementNS(svgNS, "circle");
            for (let i = 0; i < length_circle; i++) {
                circle.setAttributeNS(null, list_circle[i].key, list_circle[i].value);
            }
            svg_app_icon.appendChild(circle);
        }
        if (attributes.hasOwnProperty('text') == true) {
    
            var list_text = attributes.text
            var length_text = list_text.length
    
            console.log("LIST OF TEXT ATTRIBUTE GROUPS")
            console.log(list_text)
    
            for (let i = 0; i < length_text; i++) {
                var text = document.createElementNS(svgNS, "text");
                var list_text_object = list_text[i]
                var length_text_object = list_text_object.length
                for (let i = 0; i < length_text_object; i++) {
                    if (list_text_object[i].key === "content") {
                        //NOTHING
                        console.log("LIST_TEXT_OBJECT")
                        console.log(list_text_object)
                        text.textContent = list_text_object[i].value;
                    }
                    else {
                        text.setAttributeNS(null, list_text_object[i].key, list_text_object[i].value);
                    }
                }
                svg_app_icon.appendChild(text);
            }
        }
    
        // END VARIABLE ATTRIBUTES
    

    }


    if (parent === "none") {
        document.body.appendChild(div);
    }
    else {
        parent_element.appendChild(div);
    }
};

function joins(type, argument) {

    if (type === "not_on_dom") {

        array_lib = argument.array_lib;
        array_dom = argument.array_dom;
        key_value = argument.key_value;

        return array_lib.filter(item => !array_dom.some(domItem => domItem[key_value] === item[key_value]));

    }
    else if (type === "components_on_dom") {

        array_base = argument.array_base;
        array_delete = argument.array_delete;
        key_value = argument.key_value;

        return array_base.filter(item => !array_delete.some(delItem => delItem[key_value] === item[key_value]));

    }
    else if (type === "overlap") {

        array_base = argument.array_base;
        array_dom = argument.array_dom;
        key_value = argument.key_value;

        return array_base.filter(item => array_dom.some(delItem => delItem[key_value] === item[key_value]));
    }



}




